import { ReactNode } from "react";
import { AuthenticatedProviders } from "@/providers/authenticated";
import NavBar from "@/components/nav-bar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
interface Props {
  children: ReactNode;
}
export default function AuthenticatedLayout({ children }: Props) {
  return (
    <div>
      <NavBar />
      <AuthenticatedProviders>{children}</AuthenticatedProviders>
    </div>
  );
}
