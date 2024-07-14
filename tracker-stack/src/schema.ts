import { text, pgTable, timestamp } from 'drizzle-orm/pg-core';

export const deposits = pgTable('deposits', {
  hash: text('hash').primaryKey(),
  blockNumber: text('blockNumber').notNull(),
  blockTimestamp: timestamp('blockTimestamp', {
    withTimezone: true,
  }).notNull(),
  fee: text('fee'),
  pubkey: text('pubkey').notNull(),
});
