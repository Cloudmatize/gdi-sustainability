"use client";
import { useDictionary } from "@/context/DictionaryContext";
import DashboardSection1 from "./section-1";
import DashboardSection2 from "./section-2";
import DashboardSection3 from "./section-3";

export default function ComprehensiveDashboard() {
  const { dict, loadDictionary } = useDictionary();

  // const { getCurrentFlag } = useContext(FeatureFlagsContext);
  // const isFliptBuildingsFlagActive =
  //   IS_FLIPT_ACTIVE && getCurrentFlag(FLIPT_BUILDINGS_FLAG)?.enabled;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 flex flex-col gap-6 lg:px-16 lg:py-10">
      <DashboardSection1 dict={dict} />
      <DashboardSection2 dict={dict} />
      <DashboardSection3 dict={dict} />
    </div>
  );
}
