"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Plane, Bike, Car, Bus, Train, PersonStanding } from "lucide-react";
import {
  ArrowDownRight,
  ChevronRight,
  ArrowRight,
  CloudIcon,
} from "lucide-react";

interface TransportMode {
  id: string;
  name: string;
  icon: React.ReactNode;
  emissions: number;
  trips: number;
}

const transportModes: TransportMode[] = [
  {
    id: "plane",
    name: "Avião",
    icon: <Plane className="h-4 w-4" />,
    emissions: 130000000,
    trips: 1000000,
  },
  {
    id: "bike",
    name: "Bicicleta",
    icon: <Bike className="h-4 w-4" />,
    emissions: 0,
    trips: 1846398,
  },
  {
    id: "car",
    name: "Automóvel",
    icon: <Car className="h-4 w-4" />,
    emissions: 145209.7936,
    trips: 99367062,
  },
  {
    id: "bus",
    name: "Ônibus",
    icon: <Bus className="h-4 w-4" />,
    emissions: 42096.111,
    trips: 6814228,
  },
  {
    id: "train",
    name: "Trem",
    icon: <Train className="h-4 w-4" />,
    emissions: 0,
    trips: 5642438,
  },
  {
    id: "walk",
    name: "A pé",
    icon: <PersonStanding className="h-4 w-4" />,
    emissions: 0,
    trips: 49430651,
  },
];

export default function ModalSimulator() {
  const [enabled, setEnabled] = useState(false);
  const [fromMode, setFromMode] = useState("plane");
  const [toMode, setToMode] = useState("bike");
  const [percentage, setPercentage] = useState(45);

  const fromTransport = transportModes.find((t) => t.id === fromMode)!;
  const toTransport = transportModes.find((t) => t.id === toMode)!;

  const calculateNewEmissions = () => {
    const reducedTrips = fromTransport.trips * (percentage / 100);
    const reducedEmissions = fromTransport.emissions * (percentage / 100);
    const newEmissions =
      fromTransport.emissions -
      reducedEmissions +
      toTransport.emissions * reducedTrips;
    const reductionPercentage =
      ((fromTransport.emissions - newEmissions) / fromTransport.emissions) *
      100;

    return {
      original: fromTransport.emissions,
      new: newEmissions,
      reduction: reductionPercentage,
    };
  };

  const results = calculateNewEmissions();

  return (
    <div className=" flex   h-full gap-4">
      <Card className="flex-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-semibold">
            Simulador de Substituição de Modal
          </CardTitle>
          <Switch checked={enabled} onCheckedChange={setEnabled} />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-3">
            <div className="space-y-2 w-40">
              <Label>De:</Label>
              <Select value={fromMode} onValueChange={setFromMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {transportModes.map((mode) => (
                    <SelectItem key={mode.id} value={mode.id}>
                      <div className="flex items-center gap-2">
                        {mode.icon}
                        <span>{mode.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 w-40">
              <Label>Para:</Label>
              <Select value={toMode} onValueChange={setToMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {transportModes.map((mode) => (
                    <SelectItem key={mode.id} value={mode.id}>
                      <div className="flex items-center gap-2">
                        {mode.icon}
                        <span>{mode.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Porcentagem de viagens substituídas</Label>
              <Slider
                value={[percentage]}
                onValueChange={(value) => setPercentage(value[0])}
                max={100}
                step={1}
              />
              <div className="text-sm text-muted-foreground">
                {percentage}% das viagens de {fromTransport.name} substituídas
                por {toTransport.name}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-base font-semibold">
            Impacto na Redução de Emissões
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ArrowDownRight className="h-5 w-5 text-green-500" />
              <span className="text-2xl wrww x font-bold">
                {results.reduction.toFixed(2)}% de redução
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between text-lg">
            <div className="flex items-center space-x-2">
              <CloudIcon className="h-5 w-5 text-muted-foreground" />
              <span>{(results.original / 1000000).toFixed(2)}M</span>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <CloudIcon className="h-5 w-5 text-green-500" />
              <span className="text-green-600">
                {(results.new / 1000000).toFixed(2)}M
              </span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground text-center">
            toneladas CO₂
          </div>
          <Progress value={results.reduction} className="h-2" />
        </CardContent>
      </Card>
    </div>
  );
}
