import { PassThrough, Readable, Transform } from "node:stream";

import { pipeline } from "node:stream/promises";
import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { stringify } from "csv-stringify";
import { asc, count, desc, ilike } from "drizzle-orm";
import { z } from "zod";
import type { IShortenedLink } from "../interfaces/IShortenedLink";

const createShortenedLinkInput = z.object({
    originalUrl: z.string().nonempty().url(),
    customAlias: z.string().nonempty(),
});

type CreateShortenedLinkInput = z.input<typeof createShortenedLinkInput>;


type CreateShortenedLinkOutput = {
    shortenedLink: IShortenedLink
}

export async function createShortenedLink(input: CreateShortenedLinkInput): Promise<CreateShortenedLinkOutput> {
    const { originalUrl, customAlias } = createShortenedLinkInput.parse( input );
    
    const [ item ] = await db.insert( schema.shortenedLinks ).values({ customAlias, originalUrl }).returning();

   
    return { shortenedLink: item };
}