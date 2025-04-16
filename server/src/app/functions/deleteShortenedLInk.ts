import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";
import type { IShortenedLink } from "../interfaces/IShortenedLink";
import { eq } from "drizzle-orm";

const deleteShortenedLinkInput = z.object({
    alias: z.string().nonempty(),
});

type DeleteShortenedLinkInput = z.input<typeof deleteShortenedLinkInput>;


export async function deleteShortenedLink(input: DeleteShortenedLinkInput): Promise<{ success: boolean }> {
    const { alias } = deleteShortenedLinkInput.parse( input );
    
    await db.delete( schema.shortenedLinks).where( eq( schema.shortenedLinks.customAlias, alias ) );

    return { success: true };
}