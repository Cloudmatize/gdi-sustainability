import { GraphQLClient } from "graphql-request";

export const GRAPHQL_API_URL = `${process.env.GRAPHQL_API_URL}`;
export const graphQLClient = new GraphQLClient(
  "https://gds-api-dev-955707917965.us-central1.run.app/api/cube/graphql",
  {
    errorPolicy: "ignore",
  }
);
