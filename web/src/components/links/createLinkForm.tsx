import { useState } from "react"
import { Input } from "../ui/input"
import { useLinks } from "../../store/shortenedLinks";

export const CreateLinkForm = () => {
    const [ linkData, setLinkData ] = useState<{ originalUrl: string; customAlias: string; }>({ customAlias: "", originalUrl: "" });
    const { createLink, loading } = useLinks();
    const [ errors, setErros ] = useState<{ originalUrl: boolean; customAlias: boolean; }>({ customAlias: false, originalUrl: false });

    const handleChange = (value: string, field: "originalUrl" | "customAlias") => {
        setLinkData(prev => ({
            ...prev,
            [field]: value
        }));
    };



    const handleSubmit = async () => {
        if (linkData.originalUrl === "" || linkData.customAlias === "") {
            alert("Preencha todos os campos");
            return;
        }

        const { success } = await createLink( { customAlias: linkData.customAlias, originalUrl: linkData.originalUrl } );

        if( success ) {
            setLinkData({ customAlias: "", originalUrl: "" });
        }
    }

    return (
        <div className="bg-white flex flex-col p-8 rounded-md">
            <h2 className="scroll-m-20 text-black  pb-2 text-2xl font-medium tracking-tight mb-6">
                Novo Link
            </h2>

            <span className="text-xs text-gray-500 antialiased mb-1.5 uppercase">Link Original</span>
            <Input value={linkData.originalUrl} onChange={v => handleChange(v.target.value, "originalUrl")} />

            <span className="text-xs text-gray-500 antialiased mb-1.5 mt-4 uppercase">Link Encurtado</span>
            <Input value={linkData.customAlias} onChange={v => handleChange(v.target.value, "customAlias")} />

            <button
                type="button"
                onClick={() => handleSubmit()}
                data-disabled={loading}
                className="w-100% h-12 bg-bluebase data-[disabled=true]:bg-gray-500 rounded-md cursor-pointer mt-7 text-white"
                disabled={loading}
            >
                { loading ? "Carregando..." : "Salvar Link" }
            </button>
        </div>
    )
}