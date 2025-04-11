import axios from "axios";

export const getLinksService = async () => {
    const result = await axios( {
        method: "get",
        url: "http://localhost:3333/shortened-links",
        headers: {
            "Content-Type": "application/json"
        },
    } );

    return result.data;
};