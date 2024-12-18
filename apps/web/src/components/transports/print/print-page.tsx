import DataSourceInfo from "@/components/data-source-info";
import InfoCard from "@/components/print/info-card";
import PrintLoadingStatePage from "@/components/print-loading-page";
import { Header } from "@/components/print/header";
import YearSelect from "@/components/year-select";
import { useDictionary } from "@/context/DictionaryContext";
import { useTransportsCO2Emission } from "@/hooks/transports";
import { usePrintStore } from "@/store/print";
import { useTransportsStore } from "@/store/transports";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import { formatNumber } from "@/utils/format-number";
import { Bus } from "lucide-react";
import { MutableRefObject } from "react";
import { MdCo2 } from "react-icons/md";
import PrintCO2InboundAndOutbound from "./print-co2-inbound-and-outbound";
import PrintCo2EmissionPerTransport from "./print-co2-per-transport";
import PrintCo2EmissionPerKilometer from "./print-co2-per-km";

interface Props {
  componentRef?: MutableRefObject<null>;
}

export default function PrintTransportsPage({ componentRef }: Props) {
  const { isPrinting } = usePrintStore();
  const { dict } = useDictionary();
  const { filters } = useTransportsStore();
  const { date } = filters;

  const { data, isFetching } = useTransportsCO2Emission({
    filters,
  });

  return (
    isPrinting && (
      <div className="break-after-all break-before-all">
        {isPrinting && <PrintLoadingStatePage />}
        <div ref={componentRef} className=" space-y-4 text-xs  ">
          <Header
            title="Página de emissões por transporte"
            subtitle="Página de emissões por transporte gerada em 2023 (fix)"
            generatedAt={new Date().toLocaleDateString()}
          />

          <div className="mx-auto space-y-6 py-8 px-10 text-xs">
            {/* Header */}

            <div className="flex items-center justify-between flex-wrap">
              <div className="flex items-center gap-4">
                <h1 className="flex flex-nowrap break-keep items-center gap-3 text-2xl font-bold text-foreground">
                  {dict?.transports.title} <Bus size={36} />
                </h1>
              </div>

              <div className="flex items-center gap-5 my-3 xl:my-0">
                <YearSelect
                  endYear={2023}
                  startYear={2018}
                  value={String(date ? date[0] : new Date().getFullYear() - 1)}
                  onValueChange={() => {}}
                />
              </div>
            </div>

            {/* Description */}
            <p className="text-muted-foreground max-w-lg">
              {dict?.transports.description}
            </p>

            <div className="border-t border-gray-200 py-1" />
            <p className="text-muted-foreground ">
              {dict?.transports.metrics.title}
            </p>
            {/* Metrics */}
            <div className="grid grid-cols-3 gap-3  ">
              <InfoCard
                icon={MdCo2}
                title={dict?.transports.metrics.totalEmissions.title}
                value={formatCO2Emission(data?.total.co2Emission)}
                percentage={"100%"}
                loading={isFetching}
                description={`
           ${formatNumber(data?.total.trips || 0)} ${dict?.transports.metrics.totalEmissions.description}`}
              />
              <InfoCard
                icon={MdCo2}
                title={dict?.transports.metrics.withinTheBorder.title}
                value={formatCO2Emission(data?.inbound.co2Emission)}
                percentage={data?.inbound?.percentage}
                loading={isFetching}
                infoTooltip={
                  dict?.transports.metrics.withinTheBorder.infoTooltip
                }
                description={`
          ${formatNumber(data?.inbound.trips || 0)} ${dict?.transports.metrics.totalEmissions.description}`}
              />
              <InfoCard
                icon={MdCo2}
                value={formatCO2Emission(data?.outbound.co2Emission)}
                title={dict?.transports.metrics.outOfTheBorder.title}
                loading={isFetching}
                percentage={data?.outbound?.percentage}
                infoTooltip={
                  dict?.transports.metrics.outOfTheBorder.infoTooltip
                }
                description={`
            ${formatNumber(data?.outbound.trips || 0)} ${dict?.transports.metrics.outOfTheBorder.description}`}
              />
            </div>
            <PrintCO2InboundAndOutbound />
            <PrintCo2EmissionPerTransport />
            <PrintCo2EmissionPerKilometer />
          </div>
        </div>
      </div>
    )
  );
}
