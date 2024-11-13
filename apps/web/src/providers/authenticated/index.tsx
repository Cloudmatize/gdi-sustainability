"use client";

import { ReactNode } from "react";

type ProvidersProps = {
  children: ReactNode;
};

export function AuthenticatedProviders({ children }: ProvidersProps) {
  return children;
}
