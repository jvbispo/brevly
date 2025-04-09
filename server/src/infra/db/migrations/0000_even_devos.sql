CREATE TABLE "shortenedLinks" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"originalUrl" text NOT NULL,
	"customAlias" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "shortenedLinks_id_unique" UNIQUE("id")
);
