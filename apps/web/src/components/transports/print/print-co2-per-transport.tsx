"use client";

import { Card } from "@/components/ui/card";
import CardIcons from "@/components/ui/card-icons";
import InfoTooltip from "@/components/ui/info-tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { elegantColors } from "@/config/colors";
import { mappedTravelMode } from "@/constants/transports";
import {
  useDictionary,
  type DictionaryContextType,
} from "@/context/DictionaryContext";
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
  TrendingUp,
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
import ModalAnalysisYearlyCard from "../cards/modal-anaylsis-yearly-card";
import PrintModalAnalysisYearlyCard from "./modal-anaylsis-yearly-card";

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
  dict,
}: {
  active?: boolean;
  payload?: Payload[];
  label?: string;
  dict: DictionaryContextType["dict"];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-gray-50 border p-3 rounded-lg">
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
                  <span className="text-foreground font-bold  text-center">
                    {dict?.mappedTravelMode[String(item?.dataKey)] || ""}
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

const CustomLegend = ({
  payload,
  dict,
}: {
  payload?: Payload[];
  dict: DictionaryContextType["dict"];
}) => {
  return (
    <div className="custom-legend w-fit flex gap-3 justify-center items-start mt-8">
      {payload?.map((d, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-[8px] h-[8px] rounded-full"
            style={{ backgroundColor: d?.color }}
          />
          <span className="text-xs text-foreground text-center">
            {dict?.mappedTravelMode[d?.value]}
          </span>
        </div>
      ))}
    </div>
  );
};

export const ModalEmissionAnalysisCard = ({
  data,
  loading,
}: {
  data: {
    mode: string;
    avgPercentageYearly: number;
    percentageContribution: number;
    contributionStatus: string;
    isHighestYearlyReduction: boolean;
    isLowestYearlyReduction: boolean;
  };
  loading: boolean;
}) => {
  const modalWithLowestYearlyReductionDescription =
    data?.isLowestYearlyReduction
      ? `O modal ${mappedTravelMode[data?.mode as TravelMode]} foi o maior responsável pelo aumento de emissões, contribuindo de forma significativa para o total de emissões no período analisado (2018-2023)`
      : null;
  const modalWithHighestYearlyReductionDescription =
    data?.isHighestYearlyReduction
      ? `As emissões do modal ${mappedTravelMode[data?.mode as TravelMode]} apresentaram a maior redução anual, indicando uma tendência positiva no período analisado (2018-2023)`
      : null;

  const title = mappedTravelMode[data?.mode as TravelMode];
  const Icon = mappedTravelModeIcons[data?.mode as TravelMode] || Bus;

  const trend = data?.contributionStatus === "ELEVATION" ? "up" : "down";

  return loading ? (
    <Skeleton className="h-60 w-full rounded-xl" />
  ) : (
    <Card className="h-60  w-full px-4 py-4 hover:shadow-lg transition-shadow">
      <div className="space-y-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-xl md:text-2xl break-words font-bold text-primary-foreground">
                {title}
              </h3>
            </div>
          </div>
          <CardIcons>
            <Icon />
          </CardIcons>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p
              className={` font-bold ${
                trend === "up"
                  ? "text-destructive-foreground"
                  : "text-primary-foreground"
              }`}
            >
              {data.contributionStatus}
            </p>
          </div>
          <div className=" flex items-center gap-1">
            <p className="text-sm text-muted-foreground ">
              Média anual de {trend === "up" ? "ELEVATION" : "redução"}: mexer
              aqui
            </p>
            <div className="flex items-center gap-1">
              {trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-destructive-foreground" />
              ) : (
                <TrendingDown className="h-4 w-4 text-primary-foreground" />
              )}
              <span
                className={` font-bold ${
                  trend === "up"
                    ? "text-destructive-foreground"
                    : "text-primary-foreground"
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
            <p className=" font-bold text-primary-foreground">
              {data.percentageContribution}%
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function PrintCo2EmissionPerTransport() {
  const { dict } = useDictionary();
  const { data, isFetching } = useTransportsCO2EmissionByYearAndModal({});
  const { data: modalAnalysis, isFetching: isLoadingModalAnalysis } =
    useTransportsCO2EmissionModalAnalysis();
  return (
    <div className="space-y-12 py-6 text-xs">
      <div className="flex flex-col gap-4">
        <h2 className="text-base font-semibold mb-2 text-foreground">
          {dict?.transports.sections.Co2EmissionPerTransport.title}
        </h2>
        <p className="text-muted-foreground max-w-lg">
          {dict?.transports.sections.Co2EmissionPerTransport.description}
        </p>
      </div>

      <div className="flex  gap-6  break-inside-avoid">
        {modalAnalysis?.modalsData?.map((modal, index) => {
          const formattedModal = {
            ...modal,
            contributionStatusTranslated:
              dict?.chartTrends[modal.contributionStatus],
          };
          return (
            <div className="w-full" key={index}>
              {isLoadingModalAnalysis ? (
                <Skeleton className="h-[300px]" />
              ) : (
                <PrintModalAnalysisYearlyCard
                  transport={formattedModal}
                  dict={dict}
                />
              )}
            </div>
          );
        })}
      </div>

      {isFetching ? (
        <Skeleton className="h-[350px] rounded-xl" />
      ) : (
        <Card className="p-6 h-[400px]  mt-10 pt-10  break-inside-avoid ">
          <h3 className="font-semibold text-foreground text-sm ">
            {dict?.transports.sections.Co2EmissionPerTransport.chart.title}
          </h3>
          <div className="h-full  w-full">
            <ResponsiveContainer height="100%" width="100%">
              <LineChart
                data={data?.data}
                margin={{
                  top: 30,
                  right: 30,
                  bottom: 30,
                }}
              >
                <XAxis
                  dataKey="year"
                  tickSize={1}
                  strokeWidth={0.3}
                  stroke="#888888"
                  fontSize={10}
                  tickMargin={18}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={10}
                  tickMargin={10}
                  strokeWidth={0.3}
                  tickFormatter={(value: number) => {
                    return `${formatCO2Emission(value) || 0}`;
                  }}
                />

                <Legend align="left" content={<CustomLegend dict={dict} />} />
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
                      fontSize: 10,
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
