import axios from "axios";


export const downloadLinksCsvService = async ( ) => {
    const result = await axios( {
        method: "get",
        url: "http://localhost:3333/shortened-links/downloads",
        headers: {
            "Content-Type": "application/json"
        },
    } );
    console.log( result );
    return result;
   
};