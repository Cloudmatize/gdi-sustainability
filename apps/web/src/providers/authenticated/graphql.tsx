"use client";
import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import LoadingPage from "@/components/loading-page";
import { GraphQLClient } from "graphql-request";

interface GraphQLProviderProps {
  children: ReactNode;
  client: GraphQLClient;
}

const GraphQLContext = createContext<GraphQLClient | null>(null);

function updateClientHeaders(client: GraphQLClient, session: any) {
  client.setHeader("Authorization", `Bearer ${session?.token}`);
  client.setHeader("cm_api_key", process.env.NEXT_PUBLIC_CM_API_KEY as string);
}
const requiredHeaders = ["Authorization", "cm_api_key"];

export const GraphQLProvider = ({ client, children }: GraphQLProviderProps) => {
  const { data: session, status } = useSession();
  const headers = Object.keys(client?.requestConfig?.headers || {});

  const hasRequiredHeaders = requiredHeaders.every((header) =>
    headers.includes(header)
  );
  useEffect(() => {
    updateClientHeaders(client, session);
  }, [session, status, headers]);

  if (!session || !hasRequiredHeaders) return <LoadingPage />;
  return (
    <GraphQLContext.Provider value={client}>{children}</GraphQLContext.Provider>
  );
};

export const useGraphQLClient = () => {
  const context = useContext(GraphQLContext);
  if (!context) {
    throw new Error("useGraphQLClient must be used within a GraphQLProvider");
  }
  return context;
};
