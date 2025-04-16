import axios from "axios";

export interface IDeleteLinkProps {
    customAlias: string;
}

export const deleteLinkService = async ( { customAlias }: IDeleteLinkProps ) => {
    const result = await axios( {
        method: "delete",
        url: `http://localhost:3333/${customAlias}/shortened-link`,
        headers: {
            "Content-Type": "application/json"
        },
    } );

    return result;
};