"use client";

import { Button } from "@/components/ui/button";
import { MutableRefObject, useEffect, useState } from "react";
import { Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { usePrintStore } from "@/store/print";

interface PrintButtonProps {
  title?: string;
  disabled: boolean;
  contentToPrint: MutableRefObject<null>;
}

export function PrintButton({
  title = "Print This Document",
  disabled,
  contentToPrint,
}: PrintButtonProps) {
  const { setIsPrinting } = usePrintStore();
  const [startToPrint, setStartToPrint] = useState(false);

  useEffect(() => {
    if (startToPrint) {
      setIsPrinting(true);
      const timer = setTimeout(() => {
        handlePrint();
        setStartToPrint(false);
        setIsPrinting(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [startToPrint]);

  const handlePrint = useReactToPrint({
    documentTitle: title,
    onBeforePrint: async () => {
      setIsPrinting(true);
    },
    onAfterPrint: () => {
      setIsPrinting(false);
    },
    pageStyle: `
      @page {
      }
      body {
      }
    `,
    contentRef: contentToPrint,
  });

  return (
    <Button
      id="print-button"
      variant="outline"
      size="sm"
      className="bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 p-2"
      disabled={disabled || startToPrint}
      onClick={() => setStartToPrint(true)}
    >
      <Printer className="h-4 w-4" />
    </Button>
  );
}
