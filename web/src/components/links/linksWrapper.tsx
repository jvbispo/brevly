import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
// import { ShortenedLinkItem } from "@web/components/links/shortenedLinkItem";
import { Download } from "lucide-react";
import LogoWithName from "../assets/icons/LogoWithName.svg";
import { ShortenedLinkItem } from "./shortenedLinkItem";
import { useLinks } from "../../store/shortenedLinks";
import { Link } from "lucide-react";
import { Loader } from "../ui/loader";
import { useCycle } from "motion/react";
import { downloadLinksCsvService } from "../../services/downloadLinksCsv";

export const LinksWrapper = () => {
    const { getLinks, shortenedLinks, loading } = useLinks();
    const [ localLoading, setLocalLoading ] = useState( true );
    const [ downloadLoading, setDownloadingLoading ] = useState( false );

    useEffect(() => {
        const pullData = () => {
            getLinks().finally( () => {
                setLocalLoading( false );
            } );
        };
        pullData();
    }, [ getLinks ]);

    const linksList = Array.from(shortenedLinks.entries());

    const handleDownloadClick = async () => {
        setDownloadingLoading( true );

        const result = await downloadLinksCsvService( );

        if( result.data?.url ) {
            const { url, key } = result.data;
            const a = document.createElement("a");
            a.href = url;
            a.download = key; // Nome sugerido para o arquivo
            document.body.appendChild(a);
            a.click();
            a.remove();
        }

        setDownloadingLoading( false );
    }

    return (
        <div
            className={` flex flex-col p-5 lg:px-10 lg:py-10 bg-white rounded-md mt-8 lg:mt-20 lg:col-span-7 relative overflow-x-hidden 
            ${loading ? "before:content-[''] before:absolute before:top-0 before:left-0 before:h-1 before:w-1/5 before:bg-bluebase before:animate-bar-loop" : ""}
          `}
        >
            <div className="flex align-middle items-center justify-between pb-5">
                <h3 className="text-black text-xl font-bold tracking-tight">Meus Links</h3>
                <button
                    type="button"
                    data-disabled={linksList?.length === 0}
                    disabled={linksList?.length === 0}
                    className="bg-gray-200 px-3 py-2 rounded-md flex items-center gap-2 cursor-pointer data-[disabled=true]:bg-gray-300 data-[disabled=true]:hover:border-none data-[disabled=true]:cursor-not-allowed"
                    onClick={() => handleDownloadClick()}
                >
                    { downloadLoading ? <Loader className="w-5 h-5" /> : <Download color="#4d4d4d" className="w-5 h-5" /> }
                    <span className="text-gray-600 font-normal">
                        Baixar csv
                    </span>
                </button>

            </div>

            <div className="flex flex-col max-h-[400px] lg:max-h-[550px] overflow-y-auto">
                {
                    localLoading ? (
                        <div className="flex flex-col gap-3 items-center mt-10">
                            <Loader />
                            <span className="text-md font-normal text-gray-600">Carregando Links...</span>
                        </div>
                    ) :
                    (linksList?.length > 0 ? (
                        linksList.map(([linkId, link]) => (
                            <ShortenedLinkItem key={linkId} link={link} />
                        ))
                    ) : (
                        <div className="flex flex-col gap-3 items-center mt-10">
                            <Link width="43px" height="43px" color="#767676" />
                            <span className="text-md font-normal text-gray-600">Ainda não existem links cadastrados</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
