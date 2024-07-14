import { AlchemyProvider } from 'ethers';

// Define the Block type
export type Block = {
  provider: AlchemyProvider;
  number: number;
  hash: string;
  timestamp: number;
  parentHash: string;
  parentBeaconBlockRoot: string;
  nonce: string;
  difficulty: bigint;
  gasLimit: bigint;
  gasUsed: bigint;
  stateRoot: string;
  receiptsRoot: string;
  blobGasUsed: bigint;
  excessBlobGas: bigint;
  miner: string;
  prevRandao: string;
  extraData: string;
  baseFeePerGas: bigint;
};
