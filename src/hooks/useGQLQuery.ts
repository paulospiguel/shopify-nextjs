import { QueryKey, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { GraphQLClient } from "graphql-request";
import { GRAPHQL_ENDPOINT } from "../config";

const storefrontAccessToken = String(process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN);

export const useGQLQuery = (key: QueryKey, query: any, variables: any, config: UseQueryOptions = {}) => {

  const client = new GraphQLClient(GRAPHQL_ENDPOINT, {
    headers: {
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    }
  })

  const fetchData = async () => await client.request(query, variables);

  return useQuery(key, fetchData, config);

}