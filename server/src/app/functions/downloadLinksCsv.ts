import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { z } from "zod";
import type { IShortenedLink } from "../interfaces/IShortenedLink";
import { stringify } from "csv-stringify";
import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { uploadFileToStorage } from "@/infra/storage/uploadToStorage";
import { original } from "immer";
import dayjs from "dayjs";

// const downloadLinksCsvInput = z.object({
//     originalUrl: z.string().nonempty().url(),
//     customAlias: z.string().nonempty(),
// });

// type CreateShortenedLinkInput = z.input<typeof createShortenedLinkInput>;


export async function downloadLinksCsv() {    
    const { params, sql } = db.select( {
        id: schema.shortenedLinks.id,
        customAlias: schema.shortenedLinks.customAlias,
        originalUrl: schema.shortenedLinks.originalUrl,
        accessQuantity: schema.shortenedLinks.accessQuantity,
        createdAt: schema.shortenedLinks.createdAt,
    } ).from( schema.shortenedLinks ).toSQL();

    const cursor = pg.unsafe( sql, params as string[] ).cursor( 5 );

    const csv = stringify( {
        delimiter: ",",
        header: true,
        columns: [
            { key: "id", header: "ID" },
            { key: "customAlias", header: "Custom Alias" },
            { key: "originalUrl", header: "Original URL" },
            { key: "accessQuantity", header: "Visits" },
            { key: "createdAt", header: "Created At" },
        ]
    } );

    const uploadToStorageStream = new PassThrough();

    const convertToCSVPipeline = pipeline(
        cursor,
        new Transform({
            objectMode: true,
            transform( chunks, _encoding, callback ) {
                for( const chunk of chunks ) {
                    console.log( chunk.createdAt );
                    this.push( {  ...chunk, createdAt: dayjs( chunk.createdAt ).toISOString()} );
                }

                callback();
            }
        }),
        csv,
        uploadToStorageStream
    );

    const uploadToStorage = uploadFileToStorage({
        contentStream: uploadToStorageStream
    });

    const [{ url, key }] = await Promise.all( [ uploadToStorage, convertToCSVPipeline ] );

    return { url, key };
}