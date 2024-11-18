import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthenticatedProviders } from "@/providers/authenticated";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default async function AuthenticatedLayout({ children }: Props) {
  const cookieStore = cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <AuthenticatedProviders>
        {children}</AuthenticatedProviders>
    </SidebarProvider>
  );
}
