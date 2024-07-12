import { AlchemyProvider, Contract, ContractEventPayload } from 'ethers';
import { ALCHEMY_API_KEY, BEACON_DEPOSIT_CONTRACT_ADDRESS } from './config';
import { Logger } from './logger';
import { db } from './db';
import { deposits } from './schema';

// ABI for the Deposit event
const deposit_event_abi = [
  'event DepositEvent(bytes pubkey, bytes withdrawal_credentials, bytes amount, bytes signature, bytes index)',
];

// Create an Alchemy provider
const provider = new AlchemyProvider('homestead', ALCHEMY_API_KEY);

// Create a contract instance
const contract = new Contract(
  BEACON_DEPOSIT_CONTRACT_ADDRESS,
  deposit_event_abi,
  {
    provider,
  }
);

const logger = new Logger();

interface DepositEventPayload {
  pubkey: string;
  withdrawal_credentials: string;
  amount: string;
  signature: string;
  index: string;
  event: ContractEventPayload;
}

const handleDepositEvent = async ({
  pubkey,
  withdrawal_credentials,
  amount,
  signature,
  index,
  event,
}: DepositEventPayload): Promise<void> => {
  try {
    const { transactionHash, blockNumber } = event.log;

    const block = await provider.getBlock(blockNumber);
    if (!block) {
      throw new Error('Block not found');
    }

    const transaction = await provider.getTransaction(transactionHash);
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const senderAddress = transaction.from;
    const timestamp = new Date(block.timestamp * 1000);

    // Warn that a new deposit has been made
    logger.info({
      blockNumber,
      transactionHash,
      timestamp,
      senderAddress,
      pubkey,
      withdrawal_credentials,
      amount,
      signature,
      index,
    });

    // Store on Postgres
    await db.insert(deposits).values({
      hash: transactionHash,
      blockNumber: blockNumber.toString(),
      blockTimestamp: timestamp,
      fee: '0',
      pubkey: pubkey,
    });

    // TODO: Notify on Telegram
  } catch (error) {
    logger.error(`Error processing deposit event: ${error}`);
  }
};

export function startTrackingDeposits() {
  // Listen for Deposit events
  contract.on(
    'DepositEvent',
    (
      pubkey: string,
      withdrawal_credentials: string,
      amount: string,
      signature: string,
      index: string,
      event: ContractEventPayload
    ) => {
      handleDepositEvent({
        pubkey,
        withdrawal_credentials,
        amount,
        signature,
        index,
        event,
      });
    }
  );
}
