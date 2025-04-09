import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";


export const createShortenedLink: FastifyPluginAsyncZod = async ( server ) => {
    server.post( "/shortened-link",{
        schema: {
            summary: "Create a shortened link",
            tags: [ "link" ],
            body: {
                originalUrl: z.string().url(),
                customAlias: z.string().optional(),
            }
        }
    }, async ( req, res ) => {
        // const {  } = req.body;
        console.log( req );

    });
}