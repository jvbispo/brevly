import { getShortenedLink } from "@/app/functions/getShortenedLink";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";


export const getShortenedLinksRoute: FastifyPluginAsyncZod = async ( server ) => {
    server.get( "/shortened-links",{
        schema: {
            summary: "get list of shortened link",
            tags: [ "link" ]
        }
    }, async ( req, res ) => {
        const result = await getShortenedLink();

        res.send( result )
    });
}