"use client";

import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "ol/ol.css";

const donutData = [
  { name: "Residencial", value: 432, percentage: "30%", color: "#2DD4BF" },
  { name: "Não residencial", value: 1740, percentage: "70%", color: "#99F6E4" },
];

const municipalityData = [
  { label: "Residencial", value: "54.000", subtext: "Total de tCO2e por ano" },
  {
    label: "Não Residencial",
    value: "58.000",
    subtext: "Total de tCO2e por ano",
  },
  {
    label: "Total de emissão",
    value: "112.000",
    subtext: "Total de tCO2e por ano",
  },
];

export default function CO2EmissionsMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        view: new View({
          center: [0, 0],
          zoom: 2,
        }),
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-12 py-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Emissions Chart */}
        <div className="p-6">
          <div className="space-y-2 mb-4">
            <h2 className="text-2xl font-semibold">Emissões de CO₂ </h2>
            <p className="text-muted-foreground">
              Esta seção de comparação divide as emissões de CO2 por tipos
              específicos de transporte, proporcionando uma visão sobre a
              eficiência de cada modalidade ao longo do tempo.
            </p>
          </div>

          <Card className="py-10">
            <div className="flex flex-col h-full">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {donutData.map((entry, index) => (
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
              <div className="flex justify-evenly gap-4 items-center mt-8">
                {donutData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{item.name}</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-teal-500">
                          {item.value}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({item.percentage})
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

        {/* Map and Details */}
        <div className="space-y-6">
          <div className="p-6">
            <div className="space-y-2 mb-4">
              <h2 className="text-2xl font-semibold">
                Mapa do município e suas emissões
              </h2>
            </div>
            <div
              ref={mapRef}
              className="h-[450px] w-full rounded-lg overflow-hidden"
            />
          </div>

          {/* <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Detalhes do município</h3>
            <div className="space-y-4">
              {municipalityData.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-sm text-muted-foreground">
                    {item.label}
                  </div>
                  <div className="text-2xl font-bold text-teal-500">
                    {item.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {item.subtext}
                  </div>
                </div>
              ))}
            </div>
          </Card> */}
        </div>
      </div>
    </div>
  );
}
