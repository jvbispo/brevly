import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";
import type { IShortenedLink } from "../interfaces/IShortenedLink";
import { asc, desc } from "drizzle-orm";

type GetShortenedLinkOutput = {
    linksArray: IShortenedLink[]
}

export async function getShortenedLink(): Promise<GetShortenedLinkOutput> {
    
    const linksArray = await db.select(  ).from( schema.shortenedLinks ).orderBy( asc( schema.shortenedLinks.createdAt ) );

    return { linksArray };
}