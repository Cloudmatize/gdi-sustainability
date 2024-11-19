"use client";

import DashboardSection1 from "./section-1";
import DashboardSection2 from "./section-2";
import DashboardSection3 from "./section-3";
import DashboardSection4 from "./section-4";

export default function ComprehensiveDashboard() {
  return (
    <div className="min-h-screen bg-background p-6">
      <DashboardSection1 />
      <DashboardSection2 />
      <DashboardSection3 />
      <DashboardSection4 />
    </div>
  );
}
