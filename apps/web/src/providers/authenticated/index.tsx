"use client";
import { ReactNode } from "react";
// import { FeatureFlagsProvider } from "./feature-flags";

type ProvidersProps = {
  children: ReactNode;
};

export function AuthenticatedProviders({ children }: ProvidersProps) {
  
  return children
  // return <FeatureFlagsProvider>{children}</FeatureFlagsProvider>;
}
