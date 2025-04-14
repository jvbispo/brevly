import React, { useEffect } from "react";
import { Input } from "@web/components/ui/input";
// import { ShortenedLinkItem } from "@web/components/links/shortenedLinkItem";
import { Download } from "lucide-react";
import LogoWithName from "../assets/icons/LogoWithName.svg";
import { ShortenedLinkItem } from "../components/links/shortenedLinkItem";
import { useLinks } from "../store/shortenedLinks";
import { CreateLinkForm } from "../components/links/createLinkForm";
import { Link } from "lucide-react";

export default function Home() {
  const { getLinks, shortenedLinks, loading } = useLinks();


  useEffect(() => {
    const pullData = () => {
      getLinks();
    };
    pullData();
  }, [ getLinks ]);

  const linksList = Array.from( shortenedLinks.entries() );

  return (
    <div className="h-dvh flex items-start justify-center px-4 lg:px-18 lg:pt-60 bg-gray-200 gap-10 w-screen">
      <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-5 w-full max-w-7xl relative">
        <div className="flex flex-col lg:col-span-5">
          <img src={LogoWithName} alt="" style={{ width: "140px", height: "80px" }} />
          <CreateLinkForm />
        </div>


        <div 
          className={`
            flex flex-col p-5 lg:px-10 lg:py-10 bg-white rounded-md mt-8 lg:mt-20 lg:col-span-7 relative overflow-x-hidden
            ${loading ? "before:content-[''] before:absolute before:top-0 before:left-0 before:h-1 before:w-1/5 before:bg-bluebase before:animate-bar-loop" : ""}
          `}
          >
          <div className="flex align-middle items-center justify-between pb-5">
            <h3 className="text-black text-xl font-bold tracking-tight">Meus Links</h3>
            <button type="button" className="bg-gray-200 px-3 py-2 rounded-md flex items-center gap-2 cursor-pointer">
              <Download color="#4d4d4d" className="w-5"/>
              <span className="text-gray-600 font-normal">
                Baixar csv
                </span>
            </button>
            
          </div>

          <div className="flex flex-col">
            {
              linksList?.length > 0 ? (
                linksList.map( ( [ linkId, link ] ) => (
                  <ShortenedLinkItem key={linkId} link={link} />
                ) ) 
              ) : (
                  <div className="flex flex-col gap-3 items-center mt-10">
                    <Link width="43px" height="43px" color="#767676"/>
                    <span className="text-md font-normal text-gray-600">Ainda não existem links cadastrados</span>
                  </div>
              )
            }
                  
          </div>
        </div>
      </div>
    </div>
  );
}
