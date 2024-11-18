"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { TanstackProvider } from "./tanstack";

interface ProvidersProps {
  children: ReactNode;
}

export function PublicProviders({ children }: ProvidersProps) {
  return (
    <SessionProvider refetchInterval={4 * 60}>
      <TanstackProvider>{children}</TanstackProvider>
    </SessionProvider>
  );
}
