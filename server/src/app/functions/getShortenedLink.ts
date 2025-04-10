import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";
import type { IShortenedLink } from "../interfaces/IShortenedLink";

type GetShortenedLinkOutput = {
    linksArray: IShortenedLink[]
}

export async function getShortenedLink(): Promise<GetShortenedLinkOutput> {
    
    const linksArray = await db.select(  ).from( schema.shortenedLinks );

    return { linksArray };
}