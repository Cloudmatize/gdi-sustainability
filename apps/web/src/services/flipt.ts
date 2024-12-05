import { AppRuntimeEnv } from "@/domain/env";
import { FliptApiClient } from "@flipt-io/flipt";
export const flipt = (token: string | undefined) =>
  new FliptApiClient({
    environment: `${AppRuntimeEnv.NEXT_PUBLIC_REST_API_URL}/secure/v1/features/`,
    token: token,
  });
