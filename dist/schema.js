"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deposits = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.deposits = (0, pg_core_1.pgTable)('deposits', {
    hash: (0, pg_core_1.text)('hash').primaryKey(),
    blockNumber: (0, pg_core_1.text)('blockNumber').notNull(),
    blockTimestamp: (0, pg_core_1.text)('blockTimestamp').notNull(),
    fee: (0, pg_core_1.text)('fee'),
    pubkey: (0, pg_core_1.text)('pubkey').notNull(),
});
