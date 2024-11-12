"use client";
import { ReactNode } from "react";
import { GraphQLProvider } from "./graphql";
import { graphQLClient } from "@/services/graphql";

type ProvidersProps = {
  children: ReactNode;
};

export function AuthenticatedProviders({ children }: ProvidersProps) {
  return children
  // return <GraphQLProvider client={graphQLClient}>{children}</GraphQLProvider>;
}
