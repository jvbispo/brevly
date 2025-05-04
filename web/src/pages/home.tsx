import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
// import { ShortenedLinkItem } from "@web/components/links/shortenedLinkItem";
import { Download, Link, CircleAlert } from "lucide-react";
import LogoWithName from "../assets/icons/LogoWithName.svg";
import { ShortenedLinkItem } from "../components/links/shortenedLinkItem";
import { useLinks } from "../store/shortenedLinks";
import { CreateLinkForm } from "../components/links/createLinkForm";
// import { Link } from "lucide-react";
import { LinksWrapper } from "../components/links/linksWrapper";
import { Alert, AlertDescription, AlertTitle } from "../components/alert/alert";
// import { CircleAlert } from "lucide-react";

export default function Home() {
  const { getLinks, shortenedLinks, loading } = useLinks();


  useEffect(() => {
    const pullData = () => {
      getLinks();
    };
    pullData();
  }, [getLinks]);

  const linksList = Array.from(shortenedLinks.entries());

  return (
    <div className="min-h-dvh flex items-start justify-center px-4 lg:px-18 lg:pt-60 bg-gray-200 gap-10 w-screen relative pb-5">
      <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-5 w-full max-w-7xl relative">
        <div className="flex flex-col lg:col-span-5">
          <img src={LogoWithName} alt="" style={{ width: "140px", height: "80px" }} />
          <CreateLinkForm />
        </div>

        <LinksWrapper />

      </div>
    </div>
  );
}
