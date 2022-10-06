import { GraphQLClient } from 'graphql-request';
import { QueryClient } from '@tanstack/react-query';

const GRAPHQL_ENDPOINT = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}.myshopify.com/api/graphql`;

const graphqlRequestClient = new GraphQLClient(GRAPHQL_ENDPOINT, {
  credentials: 'include',
  mode: 'cors',
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000,
    },
  },
});

export default graphqlRequestClient;
