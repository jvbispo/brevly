import { useState } from "react"
import { Input } from "../ui/input"
import { useLinks } from "../../store/shortenedLinks";
import { z } from "zod";
import { TriangleAlert } from "lucide-react";
import { useAlert } from "../../store/alert";

export const CreateLinkForm = () => {
    const [linkData, setLinkData] = useState<{ originalUrl: string; customAlias: string; }>({ customAlias: "", originalUrl: "" });
    const { createLink, loading, shortenedLinks } = useLinks();
    const [errors, setErros] = useState<{ originalUrl: boolean; customAlias: boolean; }>({ customAlias: false, originalUrl: false });
    const { setAlert } = useAlert();

    const handleChange = (value: string, field: "originalUrl" | "customAlias") => {
        setErros( {
            [field]: false
        } );
        setLinkData(prev => ({
            ...prev,
            [field]: value
        }));
    };



    const handleSubmit = async () => {
        const createShortenedLinkInput = z.object({
            originalUrl: z.string().nonempty().url(),
            customAlias: z.string().nonempty().regex(/^[a-z0-9-]+$/),
        });
        const { success: successValidation, error } = createShortenedLinkInput.safeParse({ ...linkData });

        if (!successValidation) {
            setErros({
                customAlias: (error.format().customAlias?._errors?.length ?? 0) > 0,
                originalUrl: (error.format().originalUrl?._errors?.length ?? 0) > 0
            });
            return;
        }

        const existingAlias = Array.from(shortenedLinks).some(([_, link]) => link.customAlias === linkData.customAlias);
        if (existingAlias) {
            setAlert({ description: "Essa URL encurtada já existe", title: "Erro no cadastro", variant: "error" });
            return;
        }

        const { success } = await createLink({ customAlias: linkData.customAlias, originalUrl: linkData.originalUrl });

        if (success) {
            setErros({ customAlias: false, originalUrl: false });
            setLinkData({ customAlias: "", originalUrl: "" });
            setAlert({ description: "Link foi criado com sucess", title: "Link Criado", variant: "success" });
        }
    }

    return (
        <div className="bg-white flex flex-col p-8 rounded-md">
            <h2 className="scroll-m-20 text-black  pb-2 text-2xl font-medium tracking-tight mb-6">
                Novo Link
            </h2>

            <span className="text-xs text-gray-500 antialiased mb-1.5 uppercase">Link Original</span>
            <Input
                className="h-12"
                placeholder="https://www.exemplo.com"
                value={linkData.originalUrl}
                onChange={v => handleChange(v.target.value, "originalUrl")}
            />
            {errors.originalUrl && (
                <span
                    className="text-xs text-gray-500 antialiased mb-1.5 uppercase mt-1 "
                >
                    <TriangleAlert className="w-4 h-4 inline-block mr-1" color="#FF0000" />
                    Informe uma Url Válida
                </span>
            )}

            <span className="text-xs text-gray-500 antialiased mb-1.5 mt-4 uppercase">Link Encurtado</span>
            <Input
                value={`brev.ly/${linkData.customAlias || ""}`}
                placeholder="brev.ly/"
                onChange={(v) => {
                    const value = v.target.value;

                    let sanitizedValue = value;

                    if (!value.startsWith("brev.ly/")) {
                        sanitizedValue = "brev.ly/";
                    }

                    const customAlias = sanitizedValue.slice(8);

                    handleChange(customAlias, "customAlias");
                }}
                className="h-12"
            />
            {errors.customAlias && (
                <span
                    className="text-xs text-gray-500 antialiased mb-1.5 uppercase mt-1 "
                >
                    <TriangleAlert className="w-4 h-4 inline-block mr-1" color="#FF0000" />
                    Informe uma Url minuscula e sem caracteres especiais/espaços.
                </span>
            )}

            <button
                type="button"
                onClick={() => handleSubmit()}
                data-disabled={loading}
                className="w-100% h-12 bg-bluebase data-[disabled=true]:bg-gray-500 rounded-md cursor-pointer mt-7 text-white"
                disabled={loading}
            >
                {loading ? "Carregando..." : "Salvar Link"}
            </button>
        </div>
    )
}