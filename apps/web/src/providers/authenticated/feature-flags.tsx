import { useQuery } from "@tanstack/react-query";
import { ReactNode, createContext } from "react";
import { FliptApi } from "@flipt-io/flipt";
import { FlagList } from "@flipt-io/flipt/api";
import { flipt } from "@/services/flipt";
import LoadingPage from "@/components/loading-page";
import { useSession } from "next-auth/react";
import { AppRuntimeEnv } from "@/domain/env";

type FeatureFlagsContextProps = {
  flags?: FlagList;
  getCurrentFlag: (flagKey: string) => FliptApi.Flag | undefined;
};

type FeatureFlagsProviderProps = {
  children: ReactNode;
};

export const FeatureFlagsContext = createContext(
  {} as FeatureFlagsContextProps
);

export function FeatureFlagsProvider({ children }: FeatureFlagsProviderProps) {
  const { data: session, status } = useSession();

  const { data: dataFlipt, isFetching } = useQuery({
    queryKey: [`feature-flags`, AppRuntimeEnv.NEXT_PUBLIC_FLIPT_NAMESPACE],
    queryFn: async () => {
      const token = session?.token as unknown as string;
      const response = await flipt(token).flags.list(
        AppRuntimeEnv.NEXT_PUBLIC_FLIPT_NAMESPACE as string
      );
      return response;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: !!session && status === "authenticated",
  });


  function getCurrentFlag(flagKey: string) {
    return dataFlipt?.flags?.find((item: any) => item.key === flagKey);
  }


  if (isFetching) {
    return <LoadingPage />;
  }

  if (status === "authenticated" && dataFlipt) {
    return (
      <FeatureFlagsContext.Provider
        value={{ flags: dataFlipt, getCurrentFlag }}
      >
        {children}
      </FeatureFlagsContext.Provider>
    );
  } else if (!(status === "authenticated")) {
    return <>{children}</>;
  }
}