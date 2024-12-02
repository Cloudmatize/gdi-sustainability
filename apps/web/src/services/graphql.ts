import { GraphQLClient } from "graphql-request";

const cubrUrl = `${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}/api/cube/graphql`;

export const graphQLClient = new GraphQLClient(cubrUrl, {
  headers: {
    Cm_api_key: process.env.NEXT_PUBLIC_CM_API_KEY as string,
  },
});
