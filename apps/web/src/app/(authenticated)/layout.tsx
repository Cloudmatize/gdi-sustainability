import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { CustomSideBarTrigger, SidebarProvider } from "@/components/ui/sidebar";
import { AuthenticatedProviders } from "@/providers/authenticated";
import Link from "next/link";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default async function AuthenticatedLayout({ children }: Props) {
  return (
    <AuthenticatedProviders>
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-row w-full h-full p-0 m-0">
          <AppSidebar />

          <div className="w-full p-0 m-0 overflow-hidden flex flex-col gap-4">
            <div className="w-full bg-sidebar flex flex-row items-center gap-2 border-b p-2 h-[65px]">
              <CustomSideBarTrigger className="" />
              <Link href={"/"}>
                <div className="flex items-center justify-center w-full cursor-pointer ">
                  <img
                    className=" h-14 p-1"
                    src={`/logos/logo-${process.env.NEXT_PUBLIC_MUNICIPALITY_SLUG}.png`}
                    alt={process.env.NEXT_PUBLIC_MUNICIPALITY_SLUG}
                  />
                </div>
              </Link>
            </div>
            {children}
          </div>
        </div>
      </SidebarProvider>
    </AuthenticatedProviders>
  );
}
