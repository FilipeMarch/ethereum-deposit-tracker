CREATE TABLE IF NOT EXISTS "deposits" (
	"hash" text PRIMARY KEY NOT NULL,
	"blockNumber" text NOT NULL,
	"blockTimestamp" timestamp with time zone NOT NULL,
	"fee" text,
	"pubkey" text NOT NULL
);
