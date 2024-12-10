import { GraphQLClient } from "graphql-request";
import { env as loadEnv } from "next-runtime-env";

const urlBase = loadEnv("NEXT_PUBLIC_GRAPHQL_API_URL") || process.env.NEXT_PUBLIC_GRAPHQL_API_URL;
const cubrUrl = `${urlBase}/api/cube/graphql`;
const cmKey = loadEnv("NEXT_PUBLIC_CM_API_KEY") || process.env.NEXT_PUBLIC_CM_API_KEY;

export const graphQLClient = new GraphQLClient(cubrUrl, {
  headers: {
    Cm_api_key: cmKey as string,
  },
});