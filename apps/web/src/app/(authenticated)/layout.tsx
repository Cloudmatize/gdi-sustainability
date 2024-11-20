import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { CustomSideBarTrigger, SidebarProvider } from "@/components/ui/sidebar";
import { AuthenticatedProviders } from "@/providers/authenticated";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default async function AuthenticatedLayout({ children }: Props) {
  return (
    <>
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-row w-full h-full p-0 m-0">
          <AppSidebar />
          <div className="w-full p-0 m-0 overflow-hidden flex flex-col gap-4">
            <div className="w-full bg-sidebar flex flex-row items-center gap-2 border-b p-2 h-[65px]">
              <CustomSideBarTrigger className="" />
              Emissões de transporte
            </div>
            <AuthenticatedProviders>
              {children}</AuthenticatedProviders>
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
