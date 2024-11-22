"use client";

import { Card } from "@/components/ui/card";
import InfoTooltip from "@/components/ui/info-tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { elegantColors } from "@/config/colors";
import { mappedTravelMode } from "@/constants/transports";
import {
  useTransportsCO2EmissionByYearAndModal,
  useTransportsCO2EmissionModalAnalysis,
} from "@/hooks/transports";
import type { TravelMode } from "@/types/transports";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import { formatNumber } from "@/utils/format-number";
import {
  Bike,
  Bus,
  Car,
  Footprints,
  Plane,
  RailSymbol,
  TrainFront,
  TrendingDown,
  TrendingUp
} from "lucide-react";
import { RiMotorbikeFill } from "react-icons/ri";
import {
  Legend,
  Line,
  LineChart,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { Payload } from "recharts/types/component/DefaultLegendContent";

const mappedTravelModeIcons: {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key in TravelMode]: any;
} = {
  AUTOMOBILE: Car,
  BUS: Bus,
  MOTORCYCLE: RiMotorbikeFill,
  RAIL: RailSymbol,
  "ON FOOT": Footprints,
  CYCLING: Bike,
  PLANE: Plane,
  SUBWAY: TrainFront,
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Payload[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-gray-50 border p-3 rounded-lg">
        {label}
        {payload.map((item, index) => {
          return (
            !!item.value && (
              <div
                key={index}
                className="flex gap-10 items-center justify-between "
              >
                <div className="flex items-center  gap-2  h-10">
                  <div
                    className="w-[14px] h-[14px] rounded-xs"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-800 font-bold  text-center">
                    {String(item?.dataKey) || ""}
                  </span>
                </div>
                {formatNumber(item.value.toFixed(0)) || 0} tons
              </div>
            )
          );
        })}
      </div>
    );
  }
};

const CustomLegend = ({ payload }: { payload?: Payload[] }) => {
  return (
    <div className="custom-legend w-full flex gap-3 justify-center items-center mt-8">
      {payload?.map((d, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-[12px] h-[12px] rounded-full"
            style={{ backgroundColor: d?.color }}
          />
          <span className="text-sm text-slate-700 text-center">{d?.value}</span>
        </div>
      ))}
    </div>
  );
};

const ModalEmissionAnalysisCard = ({
  data,
  loading,
}: {
  data: {
    mode: string;
    avgPercentageYearly: number;
    percentageContribution: number;
    contributionStatus: "Elevação" | "Redução";
    isHighestYearlyReduction: boolean;
    isLowestYearlyReduction: boolean;
  };
  loading: boolean;
}) => {
  const modalWithLowestYearlyReductionDescription =
    data?.isLowestYearlyReduction
      ? `O modal ${mappedTravelMode[data?.mode as TravelMode]} foi o maior responsável pelo aumento de emissões, contribuindo de forma significativa para o total de emissões no período analisado`
      : null;
  const modalWithHighestYearlyReductionDescription =
    data?.isHighestYearlyReduction
      ? `As emissões do modal ${mappedTravelMode[data?.mode as TravelMode]} apresentaram a maior redução anual, indicando uma tendência positiva no período analisado`
      : null;

  const title = mappedTravelMode[data?.mode as TravelMode];
  const Icon = mappedTravelModeIcons[data?.mode as TravelMode] || Bus;

  const trend = data?.contributionStatus === "Elevação" ? "up" : "down";

  return loading ? (
    <Skeleton className="h-60 w-full lg:w-96 rounded-xl" />
  ) : (
    <Card className="h-60 w-full lg:w-96 px-4 py-4 hover:shadow-lg transition-shadow">
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl md:text-2xl break-words font-bold text-teal-500">{title}</h3>
            </div>
          </div>
          <div className="rounded-lg bg-teal-100 p-2">
            <Icon className="h-5 w-5 text-teal-500" />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p
              className={` font-bold ${trend === "up" ? "text-red-400" : "text-teal-500"
                }`}
            >
              {data.contributionStatus}
            </p>
          </div>
          <div className=" flex items-center gap-1">
            <p className="text-sm text-muted-foreground ">
              Média anual de {trend === "up" ? "elevação" : "redução"}:
            </p>
            <div className="flex items-center gap-1">
              {trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-red-400" />
              ) : (
                <TrendingDown className="h-4 w-4 text-teal-500" />
              )}
              <span
                className={` font-bold ${trend === "up" ? "text-red-400" : "text-teal-500"
                  }`}
              >
                {data.avgPercentageYearly}%
              </span>
              {modalWithLowestYearlyReductionDescription && (
                <InfoTooltip
                  className="text-white fill-red-400"
                  content={modalWithLowestYearlyReductionDescription}
                />
              )}
              {modalWithHighestYearlyReductionDescription && (
                <InfoTooltip
                  className="text-white fill-teal-400"
                  content={modalWithHighestYearlyReductionDescription}
                />
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <p className="text-sm text-muted-foreground">
              Contribuição no total:
            </p>
            <p className=" font-bold text-teal-500">
              {data.percentageContribution}%
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function Co2EmissionPerTransport() {
  const { data, isFetching } = useTransportsCO2EmissionByYearAndModal();
  const { data: modalAnalysis, isFetching: isLoadingModalAnalysis } =
    useTransportsCO2EmissionModalAnalysis();
  console.log("modalAnalysis", modalAnalysis);
  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-semibold mb-2 text-slate-700">
          Comparação de emissões de CO₂ por tipo de transporte
        </h2>
        <p className="text-muted-foreground max-w-lg">
          Esta seção de comparação divide as emissões de CO2 por tipos
          específicos de transporte, proporcionando uma visão sobre a eficiência
          de cada modalidade ao longo dos últimos 5 anos.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:overflow-x-scroll 2xl:overflow-hidden">
        {modalAnalysis?.modalsData?.map((modal, index) => {
          const formattedModal = {
            ...modal,
            contributionStatus: modal.contributionStatus as
              | "Redução"
              | "Elevação",
          };
          return (
            <div key={index}>
              <ModalEmissionAnalysisCard
                data={formattedModal}
                loading={isLoadingModalAnalysis}
              />
            </div>
          );
        })}
      </div>

      {isFetching ? (
        <Skeleton className="h-[240px] rounded-xl" />
      ) : (
        <Card className="p-4 h-fit">
          <h3 className="font-semibold text-slate-700 text-sm mb-6">
            Emsisão CO₂ (tons)
          </h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={data?.data}
                margin={{
                  top: 30,
                  right: 30,
                }}
              >
                <XAxis
                  dataKey="year"
                  tickSize={1}
                  strokeWidth={0.3}
                  stroke="#888888"
                  fontSize={12}
                  tickMargin={18}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickMargin={10}
                  strokeWidth={0.3}
                  tickFormatter={(value: number) => {
                    return `${formatCO2Emission(value) || 0}`;
                  }}
                />
                <RechartTooltip content={<CustomTooltip />} />

                <Legend content={<CustomLegend />} />
                {data?.modals?.map((modal, index) => (
                  <Line
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    key={index}
                    type="monotone"
                    label={{
                      position: "top",
                      formatter: (value: number) =>
                        `${formatCO2Emission(value) || 0} `,
                      fill: "#666",
                      fontSize: 12,
                      offset: 10,
                    }}
                    dataKey={modal}
                    strokeWidth={2}
                    stroke={elegantColors[index]}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
}
