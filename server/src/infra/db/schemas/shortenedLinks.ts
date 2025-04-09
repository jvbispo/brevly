import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const shortenedLinks = pgTable( 'shortenedLinks', {
    id: text( 'id' ).primaryKey().unique().$defaultFn( () => uuidv7() ),
    originalUrl: text( "originalUrl" ).notNull(),
    customAlias: text( "customAlias" ).notNull(),
    createdAt: timestamp( 'created_at', { withTimezone: true }).defaultNow().notNull()
} );