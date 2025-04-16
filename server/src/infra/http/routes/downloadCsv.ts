import { downloadLinksCsv } from "@/app/functions/downloadLinksCsv";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";


export const downloadCsvRoute: FastifyPluginAsyncZod = async ( server ) => {
    server.get( "/shortened-links/downloads",{
        schema: {
            summary: "Download Csv with links info",
            tags: [ "link" ]
        }
    }, async ( req, res ) => {
        try {
            const result = await downloadLinksCsv( );

            res.send( result )
        } catch ( err ) {
            console.log( err );
            res.status( 500 ).send( { message: "An error occurred creating file.." } )
        }
    });
}