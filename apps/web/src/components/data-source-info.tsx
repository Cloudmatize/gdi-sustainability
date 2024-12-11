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
import { HelpCircle } from "lucide-react";
import Link from "next/link";

export default function DataSourceInfo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          className="gap-2 text-slate-600 border-slate-200 hover:bg-slate-50"
        >
          <HelpCircle className="h-4 w-4" />
          De onde vêm os dados?
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px]">
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Fontes de Dados</h4>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Google Environmental Insights Explorer
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col  items-center">
                  <p>
                    O Explorador de Insights Ambientais (EIE) do Google é
                    fundamentado na ideia de que dados e tecnologias podem
                    ajudar a acelerar a transição do mundo para um futuro com
                    baixas emissões de carbono. O EIE tem como objetivo
                    simplificar o processo de estabelecimento de uma linha de
                    base de emissões e identificação de oportunidades tangíveis
                    de redução, o que estabelece o alicerce para ação eficaz. O
                    EIE utiliza fontes de dados exclusivas do Google e
                    capacidades de modelagem para produzir estimativas de
                    atividade, emissões e oportunidades de redução. Ao
                    disponibilizar informações ambientais em uma plataforma
                    robusta e gratuita, buscamos atender a tomadores de decisão
                    e pesquisadores que trabalham nessas questões e soluções
                    para cidades em todo o mundo.
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
                        Ver mais
                      </Button>
                    </Link>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-center ">
                Emissão de transportes
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col  items-center">
                  <p>
                    Os veículos de transporte geram emissões de gases do efeito
                    estufa diretamente pela combustão de combustíveis fósseis e
                    indiretamente pelo consumo de eletricidade de veículos
                    elétricos (VE). A quantidade de GEE emitidos pelo setor de
                    transporte em uma cidade depende de fatores como: Meios de
                    transporte Tipos de combustíveis usados Data de fabricação e
                    eficiência de veículos Número total de viagens Quilômetros
                    percorridos anualmente
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
                        Ver mais
                      </Button>
                    </Link>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-center ">
                Emissão de edifícios
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col  items-center">
                  <p>
                    Os edifícios geram emissões de gases do efeito estufa
                    diretamente da combustão de combustíveis fósseis (por
                    exemplo, o aquecimento) e indiretamente da eletricidade que
                    os residentes e equipamentos utilizam. A quantidade de GEE
                    emitida direta ou indiretamente pelos edifícios depende de
                    muitos fatores, como: numéro de edifícios, tipo de edifícios
                    etc...
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
                        Ver mais
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
