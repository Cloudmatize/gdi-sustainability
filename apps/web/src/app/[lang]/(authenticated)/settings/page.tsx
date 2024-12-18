"use client";

import { useRef, useState } from "react";
import LangSwitch from "@/components/lang-switch";
import { Separator } from "@/components/ui/separator";
import { useDictionary } from "@/context/DictionaryContext";
import { Settings, Printer, Check, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PrintTransportsPage from "@/components/transports/print/print-page";
import PrintBuildingsPage from "@/components/buildings/print/print-page";
import { PrintButton } from "@/components/print-button";
import { cx } from "class-variance-authority";
import { usePrintStore } from "@/store/print";

const pages = [
  { value: "transports", label: "Transports" },
  { value: "buildings", label: "Buildings" },
];

function Page() {
  const { dict } = useDictionary();
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const handleSelect = (currentValue: string) => {
    setSelectedPages((prev) =>
      prev.includes(currentValue)
        ? prev.filter((value) => value !== currentValue)
        : [...prev, currentValue]
    );
  };

  const pagesToPrint = [
    {
      key: "transports",
      Page: PrintTransportsPage,
    },
    {
      key: "buildings",
      Page: PrintBuildingsPage,
    },
  ];

  const PrintPagesContainer = () => {
    const filteredPages = pagesToPrint.filter((page) =>
      selectedPages.includes(page.key)
    );
    return (
      isPrinting && (
        <div ref={contentRef}>
          {filteredPages.map((page) => (
            <div key={page.key} className="break-after-page">
              <page.Page key={page.key} />
            </div>
          ))}
        </div>
      )
    );
  };

  const contentRef = useRef(null);
  const { isPrinting } = usePrintStore();

  return (
    <>
      <PrintPagesContainer />
      <div
        className={cx(
          "min-h-screen bg-background p-4 md:p-6 lg:px-16",
          isPrinting ? "hidden" : ""
        )}
      >
        <div className="mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center gap-4">
              <h1 className="flex flex-nowrap break-keep items-center gap-3 text-3xl font-bold text-foreground">
                {dict?.settings?.title || "Settings"} <Settings size={36} />
              </h1>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground max-w-lg">
            {dict?.settings?.description ||
              "Manage your application settings here."}
          </p>

          <Separator />

          {/* Translation Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Globe className="h-6 w-6" />
              {dict?.settings?.translationTitle || "Translation"}
            </h2>
            <p className="text-muted-foreground max-w-lg">
              {dict?.settings?.translationDescription ||
                "Change the language of the application interface."}
            </p>
            <div className="flex flex-col max-w-fit gap-4">
              <LangSwitch title={true} />
            </div>
          </section>

          <Separator />

          {/* Print Section */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Printer className="h-6 w-6" />
              {dict?.settings?.printPages || "Print Pages"}
            </h2>
            <p className="text-muted-foreground max-w-lg">
              {dict?.settings?.printDescription ||
                "Select the pages you want to print from the application."}
            </p>
            <div className="flex flex-col gap-4">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                  >
                    {selectedPages.length > 0
                      ? `${selectedPages.length} selected`
                      : "Select pages"}
                    <Check className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className={cx("w-[200px] p-4", isPrinting ? "hidden" : "")}
                >
                  <div className="space-y-4">
                    {pages.map((page) => (
                      <div
                        key={page.value}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={page.value}
                          checked={selectedPages.includes(page.value)}
                          onCheckedChange={() => handleSelect(page.value)}
                        />
                        <label
                          htmlFor={page.value}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {dict?.settings?.[page.value] || page.label}
                        </label>
                      </div>
                    ))}
                  </div>
                  <PrintButton
                    title={dict?.settings?.printTitle || "Print Pages"}
                    showLabel
                    disabled={selectedPages.length === 0}
                    contentToPrint={contentRef}
                    className={"w-full mt-12"}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Page;
