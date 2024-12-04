"use client";

import { env as loadEnv } from "next-runtime-env";
import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_GRAPHQL_API_URL: z.string().url(),
  NEXT_PUBLIC_MUNICIPALITY_ID: z.string(),
  NEXT_PUBLIC_MUNICIPALITY_UF: z.string(),
  NEXT_PUBLIC_MUNICIPALITY_NAME: z.string(),
  NEXT_PUBLIC_MUNICIPALITY_BASE_YEAR: z.string(),
  NEXT_PUBLIC_MUNICIPALITY_COMPLETION_YEAR: z.string(),
  NEXT_PUBLIC_MUNICIPALITY_TARGET_REDUCION: z.string(),
  NEXT_PUBLIC_MUNICIPALITY_SLUG: z.string(),
});

/**
 * AppEnv - Variáveis de ambiente validadas para a aplicação.
 *
 * Este objeto contém as variáveis de ambiente necessárias para o funcionamento da aplicação,
 * validadas através do esquema Zod para garantir que os tipos e formatos estejam corretos.
 *
 * As variáveis são carregadas primeiramente do ambiente de runtime e, caso não estejam disponíveis,
 * são buscadas nas variáveis de ambiente do sistema.
 */

export const AppRuntimeEnv = envSchema.parse({
  NEXT_PUBLIC_GRAPHQL_API_URL:
    loadEnv("NEXT_PUBLIC_GRAPHQL_API_URL") ||
    process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  NEXT_PUBLIC_CM_API_KEY:
    loadEnv("NEXT_PUBLIC_CM_API_KEY") || process.env.NEXT_PUBLIC_CM_API_KEY,
  NEXT_PUBLIC_MUNICIPALITY_ID:
    loadEnv("NEXT_PUBLIC_MUNICIPALITY_ID") ||
    process.env.NEXT_PUBLIC_MUNICIPALITY_ID,
  NEXT_PUBLIC_MUNICIPALITY_UF:
    loadEnv("NEXT_PUBLIC_MUNICIPALITY_UF") ||
    process.env.NEXT_PUBLIC_MUNICIPALITY_UF,
  NEXT_PUBLIC_MUNICIPALITY_NAME:
    loadEnv("NEXT_PUBLIC_MUNICIPALITY_NAME") ||
    process.env.NEXT_PUBLIC_MUNICIPALITY_NAME,
  NEXT_PUBLIC_MUNICIPALITY_BASE_YEAR:
    loadEnv("NEXT_PUBLIC_MUNICIPALITY_BASE_YEAR") ||
    process.env.NEXT_PUBLIC_MUNICIPALITY_BASE_YEAR,
  NEXT_PUBLIC_MUNICIPALITY_COMPLETION_YEAR:
    loadEnv("NEXT_PUBLIC_MUNICIPALITY_COMPLETION_YEAR") ||
    process.env.NEXT_PUBLIC_MUNICIPALITY_COMPLETION_YEAR,
  NEXT_PUBLIC_MUNICIPALITY_TARGET_REDUCION:
    loadEnv("NEXT_PUBLIC_MUNICIPALITY_TARGET_REDUCION") ||
    process.env.NEXT_PUBLIC_MUNICIPALITY_TARGET_REDUCION,
  NEXT_PUBLIC_MUNICIPALITY_SLUG:
    loadEnv("NEXT_PUBLIC_MUNICIPALITY_SLUG") ||
    process.env.NEXT_PUBLIC_MUNICIPALITY_SLUG,
});
