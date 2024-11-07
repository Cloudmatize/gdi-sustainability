import { ReactNode } from "react";
import { AuthenticatedProviders } from "@/providers/authenticated";

interface Props {
  children: ReactNode;
}
export default function AuthenticatedLayout({ children }: Props) {
  return (
    <div>
      <h2>Área Autenticada</h2>
      <AuthenticatedProviders>{children}</AuthenticatedProviders>
    </div>
  );
}
