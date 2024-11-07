"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export function PublicProviders({ children }: ProvidersProps) {
  return <SessionProvider refetchInterval={4 * 60}>{children}</SessionProvider>;
}
