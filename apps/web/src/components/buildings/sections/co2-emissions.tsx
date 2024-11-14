"use client";

import { Card } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useBuildingsCO2EmissionsBySector } from "@/hooks/buildings";

export default function CO2Emissions() {
  const { data } = useBuildingsCO2EmissionsBySector({});

  const getCO2EmissionPercentage = (coe2: number) => {
    const totalEmission = data?.reduce((acc, item) => acc + item?.co2e, 0);
    if (!totalEmission) return "0%";
    return ((coe2 / totalEmission) * 100).toFixed(2) + "%";
  };
  return (
    <div className="space-y-12 py-6">
      <div>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold text-slate-700 mb-2">
            Emissões de CO₂
          </h2>
          <p className="text-muted-foreground max-w-lg">
            Esta seção de comparação divide as emissões de CO2 por tipos
            específicos de transporte, proporcionando uma visão sobre a
            eficiência de cada modalidade ao longo do tempo.
          </p>
        </div>

        <Card className="p-6 mt-10 ">
          <div className="flex items-center justify-center gap-3 w-full ">
            <ResponsiveContainer height={300}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  name="Emissão de CO2"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="co2e"
                  startAngle={90}
                  endAngle={450}
                >
                  {data?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${value} kg/m²`}
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "6px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col gap-4  space-y-5 items-center  w-full  mt-8">
              {data?.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="space-y-1">
                    <div className="text-sm font-medium">{item.sector}</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-slate-700">
                        {item.co2e}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({getCO2EmissionPercentage(item.co2e)})
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">kg/m²</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
