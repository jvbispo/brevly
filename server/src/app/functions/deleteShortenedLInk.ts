import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";
import type { IShortenedLink } from "../interfaces/IShortenedLink";
import { eq } from "drizzle-orm";

const deleteShortenedLinkInput = z.object({
    linkId: z.string().uuid().nonempty(),
});

type DeleteShortenedLinkInput = z.input<typeof deleteShortenedLinkInput>;


export async function deleteShortenedLink(input: DeleteShortenedLinkInput): Promise<void> {
    const { linkId } = deleteShortenedLinkInput.parse( input );
    
    await db.delete( schema.shortenedLinks).where( eq( schema.shortenedLinks.id, linkId ) );
}