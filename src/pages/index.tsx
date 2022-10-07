
import {
  IProduct,
  IProductsQuery,
  ProductsDocument
} from "../graphql/generated";

import { useGQLQuery } from '../hooks/useGQLQuery';
import { UseQueryResult } from '@tanstack/react-query';
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

interface HomeProps {
  products: IProduct[]
}

const Home = ({ products }: HomeProps) => {
  const { data, isLoading, error } = useGQLQuery(["productsList"], ProductsDocument, {
    first: 8
  }) as UseQueryResult<IProductsQuery>;

  return (
    <Stack>
      <p>Hello Shopify Demo</p>
      {isLoading ? "carregando..." :
        <Flex gap={2} alignItems="center" justifyContent="center">
          {data?.products.edges.map(item => (
            <Box rounded="md" key={item.node.id} width={52} height={72} shadow="md" textAlign="center" pt="1.5">
              <Box position="relative" width="full" height={36} px={10}>
                <Image
                  src={item.node.images.edges[0].node.url}
                  layout="fill"
                />
              </Box>
              <Text>{item.node.title}</Text>
              <Text>{item.node.priceRange.minVariantPrice.amount} {item.node.priceRange.minVariantPrice.currencyCode}</Text>
            </Box>
          ))}

        </Flex>}
    </Stack>
  )
}

export default Home
