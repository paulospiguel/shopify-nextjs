import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import { useMemo } from "react";

const isServerSide = typeof window === "undefined";
let apolloClient: any;
const domain = String(process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
const storefrontAccessToken = String(process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN);

const httpLink = createHttpLink({
  uri: `https://${domain}.myshopify.com/api/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: isServerSide,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (isServerSide) return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState: any) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}