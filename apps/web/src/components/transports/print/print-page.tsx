import PrintLoadingStatePage from "@/components/print-loading-page";
import { Header } from "@/components/print/header";
import { usePrintStore } from "@/store/print";
import { MutableRefObject } from "react";

interface Props {
  componentRef?: MutableRefObject<null>;
}

export default function PrintTransportsPage({ componentRef }: Props) {
  const { isPrinting } = usePrintStore();

  return (
    <div className="h-screen">
      {isPrinting && <PrintLoadingStatePage />}
      <div ref={componentRef} className=" space-y-4 text-xs  py-4">
        <Header
          title="Página de emissões por transporte"
          subtitle="Página de emissões por transporte gerada em 2023 (fix)"
          generatedAt={new Date().toLocaleDateString()}
        />

        <div className="px-8  space-y-3"></div>
      </div>
    </div>
  );
}
