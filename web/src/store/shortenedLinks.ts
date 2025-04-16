import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer"
import { CanceledError } from "axios";
import { getLinksService } from "../services/getLinks";
import { createLinksService, type ICreateLinkProps } from "../services/createLink";
import { deleteLinkService } from "../services/deleteLink";
import { addAccessToLink } from "../services/addAccessToLink";

export type ShortenedLink = {
    id: string;
    customAlias: string;
    originalUrl: string;
    createdAt?: string;
    accessQuantity?: number;

    // name: string;
    // file: File;
    // abortController?: AbortController;
    // status: "progress" | "success" | "error" | "cancelled";
    // uploadSizeInBytes: number;
    // compressedSizeInBytes?: number;
    // originalSizeInBytes: number;
    // remoteUrl?: string;
}

type ICreateLink = { customAlias: string; originalUrl: string; }

export type LinkState = {
    loading: boolean;
    shortenedLinks: Map<string, ShortenedLink>;
    getLinks: (  ) => Promise<void>;
    createLink: ( props: ICreateLink ) => Promise<{ success: boolean; shortenedLinkId?: string; }>;
    deleteLink: ( props: { linkId: string; customAlias: string; } ) => Promise<{ success: boolean; }>;
    accessLink: ( props: { customAlias: string; } ) => Promise<{ success: boolean; urlToBeRedirected?: string; }>;
    // addUploads: ( files: File[] ) => void;
    // cancelUpload: ( uploadId: string ) => void;
    // retryUpload: ( uploadId: string ) => void;
}

enableMapSet();

export const useLinks = create<LinkState, [ [ "zustand/immer", never ] ]>(immer( ( set, get ) => {
    async function getLinks () {
        set( state => { state.loading = true } );
        const response = await getLinksService();

        if( !response.linksArray || !( response.linksArray?.length > 0 ) ) {
            set( state => { state.loading = false } );
            return
        };
        
        const { linksArray } = response;

        for ( const link of linksArray ) {
            set( state => {
                state.shortenedLinks.set( link.id, {
                    ...link
                } )
            } )
        }

        set( state => { state.loading = false } );
    }

    async function createLink( props: ICreateLinkProps ) {
        set( state => { state.loading = true } );
        const response = await createLinksService( props );

        if( !response.data?.shortenedLink ) return { success: false };

        const { shortenedLink } = response.data

        set( state => {
            state.shortenedLinks.set( shortenedLink, {
                ...shortenedLink
            } )
        } )

        set( state => { state.loading = false } );
        return { shortenedLinkId: shortenedLink.id, success: true }
    }

    async function deleteLink( { linkId, customAlias } : { linkId: string; customAlias: string } ) {
        const response = await deleteLinkService( { customAlias } );

        if( !response.data?.success ) return { success: false };

        set( state => {
            state.shortenedLinks.delete( linkId )
        } )

        return { success: true }
    }

    async function accessLink( { customAlias }: { customAlias: string } ) {
        set( state => { state.loading = true } );
        const response = await addAccessToLink( { customAlias } );

        if( !response.data?.success ) {
            set( state => { state.loading = false } );
            return { success: false };
        }

        const { link: linkResult } = response.data;
        const link = get().shortenedLinks.get( linkResult.id );

        if( !link ) {
            set( state => { state.loading = false } );
            return { success: false };
        }

        set( state => {
            state.shortenedLinks.set( linkResult.id, {
                ...link,
                accessQuantity: linkResult.count,
            } )
        } )

        set( state => { state.loading = false } );
        return { success: true, urlToBeRedirected: link.originalUrl }
    }
    // async function updateUpload( uploadId: string, data: Partial<ShortenedLink> ) {
    //     const upload = get().uploads.get( uploadId );

    //     if( !upload ) {
    //         return;
    //     }

    //     set( state => {
    //         state.uploads.set( uploadId, {
    //             ...upload,
    //             ...data
    //         } )
    //     } )
    // }
    
    // async function processUpload( uploadId: string ) {
       
    //     const upload = get().uploads.get( uploadId );

    //     if( !upload) {
    //         return;
    //     }

    //     const abortController = new AbortController();

    //     updateUpload( uploadId, {
    //         uploadSizeInBytes: 0,
    //         status: "progress",
    //         compressedSizeInBytes: undefined,
    //         remoteUrl: undefined,
    //         abortController
    //     } );
        
    //     try {
    //         const compressedFile =  await compressImage( {
    //             file: upload.file,
    //             maxHeight: 1000,
    //             maxWidth: 1000,
    //             quality: 0.8
    //         } );

    //         updateUpload( uploadId, {
    //             compressedSizeInBytes: compressedFile.size
    //         } );

    //        const { url } =  await uploadFileToStorage( { 
    //             file: compressedFile,
    //             onProgress( sizeInBytes ) {
    //                 set( state => {
    //                     state.uploads.set( uploadId, {
    //                         ...upload,
    //                         uploadSizeInBytes: sizeInBytes
    //                     } )
    //                 } )
    //             }
    //         }, { signal: abortController?.signal } );

    //         updateUpload( uploadId, {
    //             status: "success",
    //             remoteUrl: url
    //         } );

    //     } catch ( err ) {
    //         let status: "error" | "cancelled";
    //         if( err instanceof CanceledError ) {
    //             status = "cancelled";
    //         } else {
    //             status = "error";
    //         }
    //         updateUpload( uploadId, {
    //             status
    //         } );
    //     } 
    // }

    // function addUploads( files: File[] ){
    //     for( const file of files ){
    //         const uploadId = crypto.randomUUID();

    //         const upload: Upload = {
    //             name: file.name,
    //             file,
    //             status: "progress",
    //             originalSizeInBytes: file.size,
    //             uploadSizeInBytes: 0
    //         }

    //         set( state => {
    //             state.uploads.set( uploadId, upload )
    //         } )

           

    //         processUpload( uploadId );
    //     }
    // }

    // function cancelUpload( uploadId: string ){
    //     const upload = get().uploads.get( uploadId );

    //     if( !upload) {
    //         return;
    //     }

    //     upload.abortController?.abort();

    //     updateUpload( uploadId, { status: "cancelled" } );
    // }

    // function retryUpload( uploadId: string ){
    //     processUpload( uploadId );
    // }

    return {
        shortenedLinks: new Map(),
        loading: Boolean( false ),
        getLinks,
        createLink,
        deleteLink,
        accessLink
        // addUploads,
        // cancelUpload,
        // retryUpload
    }
} ));

// export const usePendingUploads = () => {
//     return useUploads( useShallow( store => {
//         const isThereAnyPendingUpload = Array.from( store.uploads.values() ).some( upload => upload.status === "progress" );

//         if( !isThereAnyPendingUpload ) {
//             return { isThereAnyPendingUpload, globalPercentage: 100 }
//         }

//         const { total, uploaded } = Array.from( store.uploads.values() ).reduce( ( acc, upload ) => {
//             if( upload.compressedSizeInBytes ) {
//                 acc.uploaded += upload.uploadSizeInBytes;
               
//             }

//             acc.total += upload.compressedSizeInBytes || upload.originalSizeInBytes;
//             return acc;
//         }, { total: 0, uploaded: 0 } );

//         const globalPercentage = Math.min( Math.round( ( uploaded * 100 ) / total ), 100 );

//         return {
//             isThereAnyPendingUpload,
//             globalPercentage
//         }
//     } ) )
// }