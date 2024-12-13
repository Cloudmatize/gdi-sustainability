import { BASE_YEAR, REDUCTION_RATE, TARGET_YEAR } from "@/constants/targets";

export default function PrintOverviewInfo({
  yearBaseCo2Emission = 0,
  lastYearCo2Emission = 0,
  targetCo2EmissionsFinalYear = 0,
  hypothesisMode = false,
  totalCo2Emission,
}: {
  yearBaseCo2Emission: number;
  lastYearCo2Emission: number;
  targetCo2EmissionsFinalYear: number;
  hypothesisMode?: boolean;
  totalCo2Emission: {
    original: number;
    simulated: number;
    percentage: number;
  };
}) {
  const simulatedEmissions = totalCo2Emission?.simulated || 0;
  const baseAdherence =
    (targetCo2EmissionsFinalYear / lastYearCo2Emission) * 100;
  const simulatedAdherence =
    (targetCo2EmissionsFinalYear / simulatedEmissions) * 100;

  return (
    <div className="flex justify-between">
      <div className="space-y-1 ">
        <div className="text-xs font-medium text-gray-500">Ano base</div>
        <div className="text-xl font-bold">{BASE_YEAR}</div>
        <div className="font-semibold text-muted-foreground">
          {Math.trunc(yearBaseCo2Emission).toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">toneladas de CO₂</div>
      </div>

      <div className="space-y-1">
        <div className="text-xs font-medium text-gray-500">Meta</div>
        <div className="text-xl font-bold">{TARGET_YEAR}</div>
        <div className="font-semibold text-muted-foreground">
          {Math.trunc(
            yearBaseCo2Emission * ((100 - REDUCTION_RATE) / 100)
          ).toLocaleString()}
        </div>
        <div className="text-xs text-gray-500">toneladas de CO₂ (-20%)</div>
      </div>

      <div className="space-y-1">
        <div className="text-xs font-medium text-gray-500">
          Índice de aderência à meta
        </div>
        <div className="flex gap-3 items-center">
          <div className="text-xl font-bold">{baseAdherence.toFixed(2)}% </div>
          {hypothesisMode && (
            <>
              <span>{"➜"}</span>
              <div className="text-xl font-bold text-violet-600">
                {typeof simulatedAdherence === "number"
                  ? simulatedAdherence?.toFixed(2)
                  : 0}
                %
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3 items-center">
          <div className="font-semibold text-muted-foreground">
            {Math.trunc(lastYearCo2Emission).toLocaleString()}
          </div>
          {hypothesisMode && (
            <>
              <span>{"➜"}</span>
              <div className="font-semibold text-violet-600">
                {simulatedEmissions ? simulatedEmissions.toLocaleString() : 0}
              </div>
            </>
          )}
        </div>

        <div className="text-xs text-gray-500">toneladas de CO₂</div>
      </div>
    </div>
  );
}
