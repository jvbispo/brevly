import axios from "axios";

export interface ICreateLinkProps {
    originalUrl: string;
    customAlias: string;
}

export const createLinksService = async ( { customAlias, originalUrl }: ICreateLinkProps ) => {
    const result = await axios( {
        method: "post",
        data: {
            originalUrl,
            customAlias
        },
        url: "http://localhost:3333/shortened-link",
        headers: {
            "Content-Type": "application/json"
        },
    } );

    return result;
};