import { AppRuntimeEnv } from "@/domain/env";

export const TARGET_YEAR =
  Number(AppRuntimeEnv.NEXT_PUBLIC_MUNICIPALITY_COMPLETION_YEAR) || 2030;
export const BASE_YEAR =
  Number(AppRuntimeEnv.NEXT_PUBLIC_MUNICIPALITY_BASE_YEAR) || 2019;
export const REDUCTION_RATE =
  Number(AppRuntimeEnv.NEXT_PUBLIC_MUNICIPALITY_TARGET_REDUCION) || 20;
