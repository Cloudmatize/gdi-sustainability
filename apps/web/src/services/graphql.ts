import { GraphQLClient } from "graphql-request";

export const GRAPHQL_API_URL = `${process.env.GRAPHQL_API_URL}`;
const cubrUrl = `https://gds-api-dev-955707917965.us-central1.run.app/api/cube/graphql`;
export const graphQLClient = new GraphQLClient(cubrUrl, {
  errorPolicy: "ignore",
  headers: {
    Cm_api_key: process.env.NEXT_PUBLIC_CM_API_KEY as string
  }
});
