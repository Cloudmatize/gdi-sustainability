"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTransportsCO2EmissionByTravelBounds } from "@/hooks/transports";
import { useTransportsStore } from "@/store/transports";
import { formatCO2Emission } from "@/utils/format-co2-emission";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Payload } from "recharts/types/component/DefaultLegendContent";

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
    const mapped: { [key: string]: string } = {
      withinLimit: "Dentro do limite",
      outsideLimit: "Fora do limite",
    };
    return (
      <div className="custom-tooltip bg-gray-50 border p-3 rounded-lg">
        <p className="py-1">{label}</p>
        {payload.map((item, index) => {
          return (
            <div
              key={index}
              className="flex gap-5 items-center justify-between "
            >
              <div className="flex items-center gap-2  h-10">
                <div
                  className="w-[14px] h-[14px] rounded-xs"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-800 font-bold   text-center">
                  {mapped[item?.dataKey as string] || ""}
                </span>
              </div>
              {formatCO2Emission(item.value)} tons
            </div>
          );
        })}
      </div>
    );
  }

  return null;
};

const CustomLegend = ({ payload }: { payload?: Payload[] }) => {
  return (
    <div className="custom-legend w-full flex gap-3 justify-center items-center mt-6">
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

export default function CO2InboundAndOutbound() {
  const { filters } = useTransportsStore();

  const { data, isFetching } = useTransportsCO2EmissionByTravelBounds({
    filters,
  });
  return (
    <div className="space-y-12 py-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-700">
            Comparação de emissões dentro e fora dos limites geográficos
            específicos
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Esta seção compara a média de emissão de CO2 por quilômetro entre
            diferentes tipos de transporte, diferenciando as emissões dentro e
            fora dos limites geográficos
          </p>
        </div>

        {/* Está comentado pra ver qual será a métrica de comparação, talvez entre em uma V2 */}

        {/* {isFetching ? (
          <Skeleton className="h-[130px]  min-w-[250px]" />
        ) : (
          <Card className="p-4 min-w-[250px]">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">
                  Perfil do município
                </div>
                <div className="font-semibold text-slate-700">Municipio de entrada</div>
                <div className="text-sm text-muted-foreground">
                  Recebe muitos cidadãos locais
                </div>
              </div>
              <div className="rounded-lg bg-teal-400 p-2">
                <Building2 className="h-5 w-5 text-white" />
              </div>
            </div>
          </Card>
        )} */}
      </div>

      {isFetching ? (
        <Skeleton className="h-[450px]" />
      ) : (
        <Card className="p-6">
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis
                  stroke="#888888"
                  fontSize={12}
                  dataKey="name"
                  strokeWidth={0.3}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  strokeWidth={0.3}
                  tickMargin={10}
                  label={{
                    value: "Emsisão CO₂ (tons)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
                <Bar
                  strokeWidth={1}
                  maxBarSize={50}
                  dataKey="withinLimit"
                  name="Dentro do limite"
                  legendType="circle"
                  stackId="a"
                  fill="#1ba18d"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="outsideLimit"
                  maxBarSize={50}
                  name="Fora do limite"
                  legendType="circle"
                  stackId="a"
                  fill="#9aeee2"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
}
