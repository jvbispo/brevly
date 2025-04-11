import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { addAccessCountToLink } from "@/app/functions/addAccessCountToLink";


export const addAccessCountRoute: FastifyPluginAsyncZod = async ( server ) => {
    server.put( "/:customAlias/access",{
        schema: {
            summary: "add access to shortened link and redirect",
            tags: [ "access" ],
            params: z.object( {
                customAlias: z.string().nonempty()
            } )
        }
    }, async ( req, res ) => {
        const { customAlias } = req.params;

        const result = await addAccessCountToLink( { customAlias } );

        res.send( result )
    });
}