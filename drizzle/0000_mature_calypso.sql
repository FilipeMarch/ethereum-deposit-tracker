CREATE TABLE IF NOT EXISTS "deposits" (
	"hash" text PRIMARY KEY NOT NULL,
	"blockNumber" text NOT NULL,
	"blockTimestamp" text NOT NULL,
	"fee" text,
	"pubkey" text NOT NULL
);
