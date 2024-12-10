"use client";
import DashboardSection1 from "./section-1";
import DashboardSection2 from "./section-2";
import DashboardSection3 from "./section-3";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default function ComprehensiveDashboard({ dict }: any) {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 flex flex-col gap-6 lg:px-16 lg:py-10">
      <DashboardSection1 dict={dict} />
      <DashboardSection2 dict={dict} />
      <DashboardSection3 />
    </div>
  );
}
