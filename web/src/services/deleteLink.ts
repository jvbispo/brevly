import axios from "axios";

export interface IDeleteLinkProps {
    linkId: string;
}

export const deleteLinkService = async ( { linkId }: IDeleteLinkProps ) => {
    const result = await axios( {
        method: "delete",
        url: `http://localhost:3333/${linkId}/shortened-link`,
        headers: {
            "Content-Type": "application/json"
        },
    } );

    return result;
};