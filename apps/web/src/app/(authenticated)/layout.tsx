import { ReactNode } from "react";
import { AuthenticatedProviders } from "@/providers/authenticated";

interface Props {
  children: ReactNode;
}
export default function AuthenticatedLayout({ children }: Props) {
  return (
    <div>
      <AuthenticatedProviders>{children}</AuthenticatedProviders>
    </div>
  );
}
