import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../libs/apolloClient";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { queryClient } from '../libs/graphqlRequestClient';

function MyApp({ Component, pageProps }: AppProps) {
  const appProps = pageProps as any;
  const apolloClient = useApollo(appProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={appProps.dehydratedState}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </ApolloProvider>
  )
}

export default MyApp
