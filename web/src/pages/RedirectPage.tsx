import React, { useEffect, useMemo } from "react";
import { useLinks } from "../store/shortenedLinks";
import { useParams } from "react-router-dom";
import Logo from "../assets/icons/Logo.svg";
import { Link } from "react-router-dom";
import NotFound from "../assets/images/404.svg";


export default function RedirectPage() {
    const { accessLink, loading } = useLinks();
    const [ localLoading, setLocalLoading ] = React.useState( true );
    const { slug } = useParams();

    console.log(slug);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const pullData = () => {
            if( slug ) {
                accessLink( { customAlias: slug } ).then( ( response ) => {
                    const { success, urlToBeRedirected } = response;
                    if( success && urlToBeRedirected ) {
                        window.location.href = urlToBeRedirected;
                        return;
                    } 

                    
                } ).finally( () => setTimeout( () => setLocalLoading( false ), 2000 ) );
            }
        };
        pullData();
    }, [ slug, accessLink ]);

   
    const isLoading = useMemo( () => loading || localLoading, [ loading, localLoading ] );
    console.log( isLoading );
    return (
        <div className="h-dvh flex items-center justify-center px-4 bg-gray-200 w-screen">
            {( isLoading ) ? (
                <div className="flex flex-col bg-white rounded-lg items-center pt-12 pb-16 px-20">
                    <img src={Logo} alt="" className="mb-10" width="48px" height="48px" />

                    <h2 className="text-pretty text-3xl font-medium mb-5">Redirecionando...</h2>

                    <p className="text-pretty text-md mb-1 text-gray-700">O link será aberto automaticamente em alguns instantes. </p>
                    <p className="text-pretty text-md text-gray-700">
                        Não foi redirecionado?
                        {" "}
                        <Link to="/">
                            <span className="text-bluebase underline">Acesse aqui</span>
                        </Link>
                    </p>
                </div>
            ) : (
                <div className="max-w-2xl flex flex-col bg-white rounded-lg items-center pt-12 pb-16 px-20 ">
                    <img src={NotFound} alt="" className="mb-8" width="220px" />

                    <h2 className="text-pretty text-3xl font-medium mb-5">Link Não encontrado</h2>

                    <p className="text-pretty text-md mb-1 text-gray-700 max-w-90 text-center">
                        O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em
                        {" "}
                        <Link to="/">
                            <span className="text-bluebase underline">brev.ly</span>
                        </Link>.
                    </p>
                </div>
            )}
        </div>
    );
}
