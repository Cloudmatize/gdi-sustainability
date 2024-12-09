import LangSwitch from "@/components/lang-switch";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { CustomSideBarTrigger, SidebarProvider } from "@/components/ui/sidebar";
import { AuthenticatedProviders } from "@/providers/authenticated";
import Link from "next/link";
import type { ReactNode } from "react";
import { getDictionary } from "../dictionaries";

interface Props {
  children: ReactNode;
  params: { lang: string }
}



export default async function AuthenticatedLayout({ params: { lang }, children }: Props) {
  const dict = await getDictionary(lang)
  return (
    <>
      <SidebarProvider defaultOpen={true}>
        <div className="flex flex-row w-full h-full min-w-full p-0 m-0">
          <AppSidebar dict={dict} />
          <div className="w-full p-0 m-0 overflow-hidden flex flex-col gap-4">
            <div className="min-w-full w-full bg-sidebar flex flex-row items-center gap-2 border-b p-2 h-[65px]">
              <div className="flex flex-row items-center w-full ">
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
              <div className="px-4">
                <LangSwitch dict={dict.dashboard.langSwitch} />
              </div>
            </div>
            <AuthenticatedProviders>{children}</AuthenticatedProviders>
          </div>
        </div>
      </SidebarProvider >
    </>
  );
}
