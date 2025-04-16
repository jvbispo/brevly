import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { enableMapSet } from "immer"

export type Alert = {
    title: string;
    description: string;
    variant: "success" | "error";
}


export type LinkState = {
    alert: Alert | null;
    setAlert: ( alert: Alert | null ) => void;
}

enableMapSet();

export const useAlert = create<LinkState, [ [ "zustand/immer", never ] ]>(immer( ( set, get ) => {

    async function setAlert( alert: Alert | null ) {
        if( alert ) {
            set( state => {
                state.alert = alert;
            } )

            setTimeout(() => {
                set( state => {
                    state.alert = null
                } );
              }, 3000);
        }
    }

    return {
        alert: null,
        setAlert
    }
} ));
