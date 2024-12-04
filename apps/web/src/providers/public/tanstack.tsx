"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  Query,
  QueryCache,
  QueryClientConfig,
  QueryKey,
} from "@tanstack/react-query";

type Error = {
  response: {
    detail: string;
    status: number;
    headers: {
      map: {
        contentLength: string;
        contentType: string;
      };
    };
  };
  request: {
    query: string;
  };
};

interface Props {
  children: React.ReactNode;
}

function QueryConfig(): QueryClientConfig {
  const handlerOnError = (
    error: unknown,
    query: Query<unknown, unknown, unknown, QueryKey>
  ) => {
    const { response } = error as Error;
    if (response.status === 500 && query.state.data !== undefined) {
      query.destroy();
    }
  };

  return {
    queryCache: new QueryCache({
      onError: handlerOnError,
    }),
    defaultOptions: {
      queries: {
        retry: 3,
      },
    },
  };
}

export function TanstackProvider({ children }: Props) {
  const queryConfig = QueryConfig();
  const queryClient = new QueryClient(queryConfig);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
