import { ReactNode } from "react";
import { AuthenticatedProviders } from "@/providers/authenticated";
import NavBar from "@/components/nav-bar";

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
