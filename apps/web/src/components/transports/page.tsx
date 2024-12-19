"use client";

import { Bus } from "lucide-react";

import { useDictionary } from "@/context/DictionaryContext";
import { useTransportsCO2Emission } from "@/hooks/transports";
import { useTransportsStore } from "@/store/transports";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import { formatNumber } from "@/utils/format-number";
import { MdCo2 } from "react-icons/md";
import DataSourceInfo from "../data-source-info";
import InfoCard from "../info-card";
import YearSelect from "../year-select";
import CO2InboundAndOutbound from "./sections/co2-inboud-and-outbound";
import Co2EmissionPerKilometer from "./sections/co2-per-km";
import Co2EmissionPerTransport from "./sections/co2-per-transports";
import { PrintButton } from "../print-button";
import { useRef } from "react";
import PrintTransportsPage from "./print/print-page";
import { usePrintStore } from "@/store/print";
import { cx } from "class-variance-authority";

export default function TransportsPage() {
  const { dict } = useDictionary();
  const { filters, setFilters } = useTransportsStore();

  const handleYearChange = (value: string) => {
    setFilters({ date: [Number(value)] });
  };
  const { date } = filters;

  const contentRef = useRef(null);
  const { isPrinting } = usePrintStore();
  const { data, isFetching } = useTransportsCO2Emission({
    filters,
  });

  return (
    <>
      <div
        className={cx(
          "min-h-screen bg-background p-4 md:p-6 lg:px-16",
          isPrinting ? "hidden" : ""
        )}
      >
        <div className="mx-auto space-y-6 overflow-y-hidden">
          {/* Header */}

          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center gap-4">
              <h1 className="flex flex-nowrap break-keep items-center gap-3 text-3xl font-bold text-foreground">
                {dict?.transports.title} <Bus size={36} />
              </h1>
            </div>

            <div className="flex items-center gap-5 my-3 xl:my-0">
              <YearSelect
                endYear={2023}
                startYear={2018}
                value={String(date ? date[0] : new Date().getFullYear() - 1)}
                onValueChange={handleYearChange}
              />
              <PrintButton
                title="Relatório de Emissões de Transporte - 2022"
                disabled={false}
                contentToPrint={contentRef}
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground max-w-lg">
            {dict?.transports.description}
          </p>
          <DataSourceInfo />

          <div className="border-t border-gray-200 py-6" />
          <p className="text-muted-foreground ">
            {dict?.transports.metrics.title}
          </p>
          {/* Metrics */}
          <div className="flex flex-col xl:flex-row gap-6">
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
              infoTooltip={dict?.transports.metrics.withinTheBorder.infoTooltip}
              description={`
          ${formatNumber(data?.inbound.trips || 0)} ${dict?.transports.metrics.totalEmissions.description}`}
            />
            <InfoCard
              icon={MdCo2}
              value={formatCO2Emission(data?.outbound.co2Emission)}
              title={dict?.transports.metrics.outOfTheBorder.title}
              loading={isFetching}
              percentage={data?.outbound?.percentage}
              infoTooltip={dict?.transports.metrics.outOfTheBorder.infoTooltip}
              description={`
            ${formatNumber(data?.outbound.trips || 0)} ${dict?.transports.metrics.outOfTheBorder.description}`}
            />
          </div>

          <CO2InboundAndOutbound dict={dict} />
          <Co2EmissionPerTransport dict={dict} />
          <Co2EmissionPerKilometer dict={dict} />
        </div>
      </div>
      <div className="h-screen">
        <PrintTransportsPage componentRef={contentRef} />
      </div>
    </>
  );
}
