"use client";
import { ReactNode } from "react";
import { FeatureFlagsProvider } from "./feature-flags";

type ProvidersProps = {
  children: ReactNode;
};

export function AuthenticatedProviders({ children }: ProvidersProps) {
  
  return <FeatureFlagsProvider>{children}</FeatureFlagsProvider>;
  // return <GraphQLProvider client={graphQLClient}>{children}</GraphQLProvider>;
}
