import { TARGET_YEAR } from "@/constants/targets";
import { useTransportCO2EmissionByYear } from "@/hooks/transports";
import { calculateCityEmissionTargets } from "@/services/transports/graphql";
import TargetAdherenceCard from "../targets/target-adherence-card";
import { Skeleton } from "../ui/skeleton";

const transformData = (
  data: {
    year: number;
    co2Emission: number | null;
  }[]
) => {
  const targetEmissions = calculateCityEmissionTargets(
    data[0]?.co2Emission || 0,
  );

  const formattedData: {
    year: number;
    co2Emission: number | null;
    targetCo2Emission: number | null;
  }[] = [];

  const allYears = new Set([
    ...data.map((item) => item.year),
    ...Object.keys(targetEmissions).map((year) => Number.parseInt(year, 10)),
  ]);

  // biome-ignore lint/complexity/noForEach: <explanation>
  allYears?.forEach((year: number) => {
    const co2Emission =
      data.find((item) => item.year === year)?.co2Emission || null;
    const targetCo2Emission = targetEmissions[year] || null;

    formattedData.push({
      year,
      co2Emission,
      targetCo2Emission,
    });
  });
  return formattedData;
};

export default function TargetAdherenceSection({ dict }: any) {
  const { data: co2EmissionByYear, isFetching: loadingCo2EmissionByYear } =
    useTransportCO2EmissionByYear({});
  const lastYearCo2Emission =
    co2EmissionByYear?.find(
      (item) => item.year === new Date().getFullYear() - 1
    )?.co2Emission || 0;
  const transformDataTest = transformData(co2EmissionByYear || []);
  const targetCo2EmissionsFinalYear =
    transformDataTest?.[transformDataTest.length - 1];
  return (
    <div className="w-full h-full">
      {loadingCo2EmissionByYear ? (
        <Skeleton className="h-[200px]" />
      ) : (
        <TargetAdherenceCard
          targetYear={TARGET_YEAR}
          baseEmissions={lastYearCo2Emission || 0}
          targetEmissions={targetCo2EmissionsFinalYear.targetCo2Emission || 0}
          dict={dict}
        />
      )}

      {/* <div className='w-full flex justify-end'>
          <Card className='w-fit h-fit'>
            <CardHeader>
              <CardTitle>Mapas</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-row gap-4 justify-between'>
              <Link href="/green_area" className="w-fit max-w-fit flex flex-col items-center  border-b border-primary-foreground">
                <CardIcons>
                  <TreePine />
                </CardIcons>
                Áreas verdes
              </Link>

            </CardContent>
          </Card>
        </div> */}
    </div>
  );
}
