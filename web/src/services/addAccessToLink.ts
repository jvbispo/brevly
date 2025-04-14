import axios from "axios";


export const addAccessToLink = async ( { customAlias }: { customAlias: string; } ) => {
    const result = await axios( {
        method: "get",
        url: `http://localhost:3333/${customAlias}/access`,
        headers: {
            "Content-Type": "application/json"
        },
    } );

    return result;
};