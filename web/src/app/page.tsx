import Image from "next/image";
import { Input } from "@web/components/ui/input";

export default function Home() {
  return (
    <div className="h-dvh flex items-center justify-center p-18 bg-gray-200 gap-10">
      <div className="flex grid-cols-2 gap-10">
        <div className="flex flex-col">
          <p className="text-xl text-black">brev.ly</p>
          <div className="bg-white flex flex-col p-8 w-122 rounded-md">
            <h2 className="text-3xl text-black tabular-nums mb-7">Novo Link</h2>

            <span className="text-xl">Link Original</span>
            <Input />

            <span>Link Encurtado</span>
            <Input className="mb-10"/>

            <button type="submit">Salvar Link</button>
          </div>
        </div>
        <div className="flex flex-col p-10 bg-white w-150 h-100 rounded-md">
          <div className="flex align-middle items-center justify-between pb-3">
            <span className="text-black">Meus Links</span>
            <span className="text-black">Baixar csv</span>
          </div>
          {/* BODy */}
          <div className="flex flex-col">

            {/* Item */}
            <div  className="flex border-t-2 h-20 items-center justify-between">
              {/* esquerda */}
              <div className="flex flex-col gap-1">
                <span className="text-bluebase">brev.ly/Portfolio-Dev</span>
                <span className="text-black">devsite.portfolio.com.br/devname-123456</span>
              </div>

              {/* direita */}
              <div className="flex items-center gap-1">
                <span className="text-black">30 acessos</span>
                <span className="text-black">copiar</span>
                <span className="text-black">delete</span>
              </div>
            </div>
            
            {/* Item */}
            <div  className="flex border-t-2 h-20 items-center justify-between">
              {/* esquerda */}
              <div className="flex flex-col gap-1">
                <span className="text-bluebase">brev.ly/Portfolio-Dev</span>
                <span className="text-black">devsite.portfolio.com.br/devname-123456</span>
              </div>

              {/* direita */}
              <div className="flex items-center gap-1">
                <span className="text-black">30 acessos</span>
                <span className="text-black">copiar</span>
                <span className="text-black">delete</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
