import { Copy, Trash2 } from "lucide-react";
import { useLinks, type ShortenedLink } from "../../store/shortenedLinks";

export const ShortenedLinkItem = ( { link }: { link: ShortenedLink } ) => {
    const { deleteLink } = useLinks()

    const handleDelete = async () => {
       await deleteLink( { linkId: link.id } )
    };

    return (
        <div className="flex border-t-2 h-20 items-center justify-between">
            {/* esquerda */}
            <div className="flex flex-col gap-1 overflow-hidden ">
                <span className="text-bluebase font-semibold font-sans text-md w-30 lg:w-80 truncate">brev.ly/{link.customAlias}</span>
                <span className="text-gray-500 font-light text-sm w-30 lg:w-80 truncate">{ link.originalUrl }</span>
            </div>

            {/* direita */}
            <div className="flex items-center">
                <span className="text-gray-500 mr-5">{ link.accessQuantity } acessos</span>
                
                {/* <button type="button">delete</button> */}
                <div className="flex gap-1">
                    <button type="button" className="w-15 h-15 cursor-pointer bg-gray-200 flex justify-center items-center rounded-md">
                        <Copy className="w-4 h-4" color="#000"/>
                    </button>
                    <button
                        type="button"
                        className="w-15 h-15 cursor-pointer bg-gray-200 flex justify-center items-center rounded-md"
                        onClick={ () => handleDelete() }
                    >
                        <Trash2 color="#000" className="w-4 h-4"/>
                    </button>
                </div>
                
            </div>
        </div>
    )
};