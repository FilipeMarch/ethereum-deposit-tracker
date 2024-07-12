import { text, pgTable } from 'drizzle-orm/pg-core';

export const deposits = pgTable('deposits', {
  hash: text('hash').primaryKey(),
  blockNumber: text('blockNumber').notNull(),
  blockTimestamp: text('blockTimestamp').notNull(),
  fee: text('fee'),
  pubkey: text('pubkey').notNull(),
});
