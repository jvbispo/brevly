import { randomUUID } from "node:crypto";
import { basename, extname } from "node:path";
import { Readable } from "node:stream";
import { env } from "@/env";
import { Upload } from "@aws-sdk/lib-storage";
import { z } from "zod";
import { r2 } from "./client";

const uploadFileToStorageInput = z.object( {
    contentStream: z.instanceof( Readable ),
} );

type UploadFileToStorage = z.input< typeof uploadFileToStorageInput >

export async function uploadFileToStorage( input: UploadFileToStorage) {

    const { contentStream } = uploadFileToStorageInput.parse( input );
    const contentType = "text/csv";
    const folder = "downloads";
    const fileName = `${new Date().toISOString()}-uploads.csv`;

    const uniqueFileName = `${folder}/${randomUUID()}-${fileName}`;

    const upload = new Upload({
        client: r2,
        params: {
            Key: uniqueFileName,
            Bucket: env.CLOUDFLARE_BUCKET,
            Body: contentStream,
            ContentType: contentType
        }
    });

    await upload.done();

    return {
        key: uniqueFileName,
        url: new URL( uniqueFileName, env.CLOUDFLARE_PUBLIC_URL ).toString()
    }
}