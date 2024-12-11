"use client";

import Image from "next/image";
import { useTargetsStore } from "@/store/targets";
import ModalSimulator from "./modal-simulator";
import { CardContent } from "../ui/card";
import { MdCo2 } from "react-icons/md";
import { ArrowDown, ArrowUp, Target } from "lucide-react";
import PrintGoalTrackerTable from "./print/print-goal-tracker-table";
import { TravelMode } from "@/types/transports";
import PrintTransportEmissionTargets from "./print/print-transport-emissions-targets";
import PrintModalSimulator from "./print/print-modal-simulator";

interface Props {
  componentRef: any;
  data: {
    loadingCo2EmissionByYear: boolean;
    yearBaseCo2Emission: number;
    lastYearCo2Emission: number;
    targetCo2EmissionsFinalYear: {
      targetCo2Emission: number | null;
    };
    targetsCo2EmissionByModal:
      | {
          mode: TravelMode;
          co2Emissions: number;
          trips: number;
        }[]
      | undefined;
    transportEmissionsTarget:
      | {
          year: number;
          co2Emission: number | null;
          targetCo2Emission: number | null;
        }[]
      | undefined;
  };
}

const Header = () => {
  return (
    <div className="p-6 flex  flex-col  border-b border-gray-100  space-y-4  rounded-sm   ">
      <div className="flex justify-between items-center">
        <Image
          src="/logos/logo-go-sustainability.png"
          className="-translate-x-2.5 "
          alt="Company Logo"
          width={130}
          height={130}
        />

        <div className="text-xs text-gray-400/90">
          Gerado em: {new Date().toLocaleDateString()}
        </div>
      </div>

      <h1 className="text-sm font-semibold text-slate-700">
        Relatório de simulações de transferência de viagens nos modais
      </h1>
    </div>
  );
};

const PrintOverviewInfo = () => {
  return (
    <div className="flex justify-between">
      <div className="space-y-1 ">
        <div className="text-xs font-medium text-gray-500">Ano base</div>
        <div className="text-xl font-bold">2019</div>
        <div className="font-semibold text-muted-foreground">216.820</div>
        <div className="text-xs text-gray-500">toneladas de CO₂</div>
      </div>

      <div className="space-y-1">
        <div className="text-xs font-medium text-gray-500">Meta</div>
        <div className="text-xl font-bold">2030</div>
        <div className="font-semibold text-muted-foreground">173.456</div>
        <div className="text-xs text-gray-500">toneladas de CO₂ (-20%)</div>
      </div>

      <div className="space-y-1">
        <div className="text-xs font-medium text-gray-500">
          Índice de aderência à meta
        </div>
        <div className="flex gap-3 items-center">
          <div className="text-xl font-bold">89.43% </div>
          <span>{"➜"}</span>
          <div className="text-xl font-bold text-violet-600">89.43%</div>
        </div>

        <div className="flex gap-3 items-center">
          <div className="font-semibold text-muted-foreground">193.953</div>
          <span>{"➜"}</span>
          <div className="font-semibold text-violet-600">193.953</div>
        </div>

        <div className="text-xs text-gray-500">toneladas de CO₂</div>
      </div>
    </div>
  );
};
export default function PrintTargetReportPage({
  componentRef,
  data: {
    loadingCo2EmissionByYear,
    yearBaseCo2Emission,
    lastYearCo2Emission,
    targetCo2EmissionsFinalYear,
    targetsCo2EmissionByModal,
    transportEmissionsTarget,
  },
}: Props) {
  const { hypothesisMode } = useTargetsStore();
  return (
    <div>
      <div ref={componentRef} className=" space-y-4 text-xs ">
        <Header />
        <div className="px-8   space-y-3">
          <div className="pb-10 pt-5 px-4">
            <PrintOverviewInfo />
          </div>
          <div className="mt-8 border rounded-lg">
            <PrintGoalTrackerTable data={targetsCo2EmissionByModal || []} />
          </div>
          <div className="pt-8">
            <PrintTransportEmissionTargets
              data={transportEmissionsTarget || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
