import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { createShortenedLink } from "@/app/functions/createShortenedLink";


export const createShortenedLinkRoute: FastifyPluginAsyncZod = async ( server ) => {
    server.post( "/shortened-link",{
        schema: {
            summary: "Create a shortened link",
            tags: [ "link" ],
            body: z.object( {
                originalUrl: z.string().url().nonempty(),
                customAlias: z.string().nonempty(),
            } )
        }
    }, async ( req, res ) => {
        const { originalUrl, customAlias } = req.body;

        const result = await createShortenedLink( { customAlias, originalUrl } )

        res.send( result )
    });
}