import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../libs/apolloClient";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider, Hydrate } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react'
import { queryClient } from '../libs/reactQueryClient';

function MyApp({ Component, pageProps }: AppProps) {
  const appProps = pageProps as any;
  const apolloClient = useApollo(appProps.initialApolloState);

  return (
    <ChakraProvider>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={appProps.dehydratedState}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen />
          </Hydrate>
        </QueryClientProvider>
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default MyApp
