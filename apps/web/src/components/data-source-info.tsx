import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { DictionaryContextType } from "@/context/DictionaryContext";
import { HelpCircle } from "lucide-react";
import Link from "next/link";

export default function DataSourceInfo({ dict }: DictionaryContextType['dict']) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          className="gap-2 text-slate-600 border-slate-200 hover:bg-slate-50"
        >
          <HelpCircle className="h-4 w-4" />
          {dict?.DataSourceInfo?.title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px]">
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Fontes de Dados</h4>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                {dict?.DataSourceInfo?.GoogleEnvironmentalInsightsExplorer?.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col  items-center">
                  <p>
                    {dict?.DataSourceInfo?.GoogleEnvironmentalInsightsExplorer?.description}
                  </p>

                  <div className="w-full">
                    <Link
                      target="_blank"
                      href={
                        "https://insights.sustainability.google/methodology?hl=pt-BR"
                      }
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full"
                      >
                        {dict?.DataSourceInfo?.GoogleEnvironmentalInsightsExplorer?.seeMore}
                      </Button>
                    </Link>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-center ">
                {dict?.DataSourceInfo?.TransportIssuance?.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col  items-center">
                  <p>
                    {dict?.DataSourceInfo?.TransportIssuance?.description}
                  </p>

                  <div className="w-full">
                    <Link
                      target="_blank"
                      href={
                        "https://insights.sustainability.google/methodology?hl=pt-BR#transportation"
                      }
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full"
                      >
                        {dict?.DataSourceInfo?.TransportIssuance?.seeMore}
                      </Button>
                    </Link>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-center ">
                {dict?.DataSourceInfo?.BuildingIssuance?.title}
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col  items-center">
                  <p>
                    {dict?.DataSourceInfo?.BuildingIssuance?.description}
                  </p>

                  <div className="w-full">
                    <Link
                      target="_blank"
                      href={
                        "https://insights.sustainability.google/methodology#buildings"
                      }
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 w-full"
                      >
                        {dict?.DataSourceInfo?.BuildingIssuance?.seeMore}
                      </Button>
                    </Link>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PopoverContent>
    </Popover>
  );
}
