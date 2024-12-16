import { CardContent } from "@/components/ui/card";
import { useTargetsStore } from "@/store/targets";
import { ArrowDown, ArrowUp, Target } from "lucide-react";
import { MdCo2 } from "react-icons/md";

export default function PrintModalSimulator() {
  const {
    totalCo2Emission: { original, percentage, simulated },
  } = useTargetsStore();
  const percentageColor =
    percentage > 0 ? "text-primary-foreground" : "text-red-500";
  return (
    <div className=" w-full border-gray-200  overflow-auto text-xs h-full flex items-center justify-center pt-4">
      <CardContent className=" space-y-4 flex  h-full justify-center  items-center">
        <div className=" flex gap-12 justify-center w-full  text-xl">
          <div className="flex items-center space-x-2">
            <div className=" w-10">
              <MdCo2 size={30} className="text-foreground" />
            </div>
            <div className="flex-col flex items-center text-center">
              <span className="font-semibold  text-sm text-foreground ">
                {original.toLocaleString()} tCO2e
              </span>
              <span className="text-xs text-muted-foreground  ">
                total de emissão inicial
              </span>
            </div>
          </div>
          <div className="flex  flex-col items-center space-x-2 ">
            <div className="flex items-center justify-center gap-2">
              {percentage > 0 ? (
                <ArrowDown className={`h-4 w-4 ${percentageColor}`} />
              ) : (
                <ArrowUp className={`h-4 w-4 ${percentageColor}`} />
              )}
              <div className="flex flex-col items-center justify-center text-center">
                <span className={`text-sm font-semibold ${percentageColor}`}>
                  {percentage.toFixed(2)}%{" "}
                </span>
                <span className="text-xs text-muted-foreground">
                  {(simulated - original).toLocaleString()} tCO2e
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 ">
            <div className=" w-10">
              <Target size={20} className="text-foreground" />
            </div>
            <div className="flex-col flex items-center  text-center">
              <span className="font-semibold text-sm text-foreground">
                {simulated.toLocaleString()} tCO2e
              </span>
              <span className="text-xs text-muted-foreground ">
                total de emissão prevista
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}
