"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const config_1 = require("./config");
const logger_1 = require("./logger");
// ABI for the Deposit event
const deposit_event_abi = [
    'event DepositEvent(bytes pubkey, bytes withdrawal_credentials, bytes amount, bytes signature, bytes index)',
];
// Create an Alchemy provider
const provider = new ethers_1.AlchemyProvider('homestead', config_1.ALCHEMY_API_KEY);
// Create a contract instance
const contract = new ethers_1.Contract(config_1.BEACON_DEPOSIT_CONTRACT_ADDRESS, deposit_event_abi, {
    provider,
});
const logger = new logger_1.Logger();
const handleDepositEvent = (_a) => __awaiter(void 0, [_a], void 0, function* ({ pubkey, withdrawal_credentials, amount, signature, index, event, }) {
    try {
        const { transactionHash, blockNumber } = event.log;
        const block = yield provider.getBlock(blockNumber);
        if (!block) {
            throw new Error('Block not found');
        }
        const transaction = yield provider.getTransaction(transactionHash);
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        const senderAddress = transaction.from;
        const timestamp = new Date(block.timestamp * 1000).toString();
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
        // TODO: Store / notify
    }
    catch (error) {
        const message = error instanceof Error ? error.message : JSON.stringify(error);
        logger.error(`Error processing deposit event: ${message}`);
    }
});
// Listen for Deposit events
contract.on('DepositEvent', (pubkey, withdrawal_credentials, amount, signature, index, event) => {
    handleDepositEvent({
        pubkey,
        withdrawal_credentials,
        amount,
        signature,
        index,
        event,
    });
});
logger.info('Starting...');
