"use client";

import DashboardSection1 from "./section-1";
import DashboardSection2 from "./section-2";
import DashboardSection4 from "./section-4";

export default function ComprehensiveDashboard() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-6 flex flex-col gap-6 lg:p-12">
      <DashboardSection1 />
      <DashboardSection2 />
      <DashboardSection4 />
    </div>
  );
}
