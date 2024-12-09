"use client";

import { Button } from "@/components/ui/button";
import { MutableRefObject } from "react";
import { Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";

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
  const handlePrint = useReactToPrint({
    documentTitle: title,
    contentRef: contentToPrint,
    onBeforePrint: async () => {
      console.log("Printing...");
    },
    onAfterPrint: () => console.log("after printing..."),
  });

  return (
    <Button
      id="print-button"
      variant="outline"
      size="icon"
      className="bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800"
      disabled={disabled}
      onClick={() => handlePrint()}
    >
      <Printer className="h-4 w-4" />
      <span className="sr-only">Print</span>
    </Button>
  );
}
