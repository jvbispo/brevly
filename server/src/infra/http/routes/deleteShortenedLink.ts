import { deleteShortenedLink } from "@/app/functions/deleteShortenedLInk";
import { getShortenedLink } from "@/app/functions/getShortenedLink";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";


export const deleteShortenedLinksRoute: FastifyPluginAsyncZod = async ( server ) => {
    server.delete( "/:alias/shortened-link",{
        schema: {
            summary: "delete selected shortened link",
            tags: [ "link" ],
            params: z.object( {
                alias: z.string().nonempty(),
            } )
        }
    }, async ( req, res ) => {
        const { alias } = req.params;

        const result = await deleteShortenedLink( { alias } );

        res.send( result )
    });
}