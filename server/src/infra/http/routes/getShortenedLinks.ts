import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";


export const getShortenedLinks: FastifyPluginAsyncZod = async ( server ) => {
    server.get( "/shortened-links",{
        schema: {
            summary: "get list of shortened link",
            tags: [ "link" ]
        }
    }, async ( req, res ) => {
        // const {  } = req.body;
        console.log( req );


        res.send( { ok: "true" } )
    });
}