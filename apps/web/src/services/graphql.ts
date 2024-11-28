import { GraphQLClient } from "graphql-request";

export const GRAPHQL_API_URL = `${process.env.GRAPHQL_API_URL}`;
const cubeUrl = `https://t895mffh-4000.brs.devtunnels.ms/`;
const oldCubeUrl = `https://gds-api-dev-955707917965.us-central1.run.app/api/cube/graphql`;
export const graphQLClient = new GraphQLClient(oldCubeUrl, {
  errorPolicy: "ignore",
});
