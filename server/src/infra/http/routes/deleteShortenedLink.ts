import { deleteShortenedLink } from "@/app/functions/deleteShortenedLInk";
import { getShortenedLink } from "@/app/functions/getShortenedLink";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";


export const deleteShortenedLinksRoute: FastifyPluginAsyncZod = async ( server ) => {
    server.delete( "/:id/shortened-link",{
        schema: {
            summary: "delete selected shortened link",
            tags: [ "link" ],
            params: z.object( {
                id: z.string().uuid().nonempty(),
            } )
        }
    }, async ( req, res ) => {
        const { id } = req.params;

        const result = await deleteShortenedLink( { linkId: id } );

        res.send( result )
    });
}