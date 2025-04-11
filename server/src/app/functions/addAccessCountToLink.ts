

import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";
import { eq, sql } from "drizzle-orm";

const addAccessCountToLinkInput = z.object({
    customAlias: z.string().nonempty()
});

type AddAccessCountInput = z.input<typeof addAccessCountToLinkInput>;


type AddAccessCountOutput = {
    success: boolean;
    link?: {
        id: string;
        accessQuantity: number;
    }
}

export async function addAccessCountToLink( props: AddAccessCountInput ): Promise<AddAccessCountOutput> {
    const { customAlias } = props;

    const [ link ] = await db.select( { id: schema.shortenedLinks.id } ).from( schema.shortenedLinks ).where( eq( schema.shortenedLinks.customAlias, customAlias ) );

    if( !link ) return { success: false };

    const [ item ] = await db.update( schema.shortenedLinks ).set({ accessQuantity: sql`${schema.shortenedLinks.accessQuantity} + 1` }).where( eq( schema.shortenedLinks.id, link.id ) ).returning();

    return { success: true, link: { id: item.id, accessQuantity: item.accessQuantity } };
}