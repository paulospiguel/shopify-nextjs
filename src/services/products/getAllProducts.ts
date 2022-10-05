import { callShopify } from "../../libs/shopify";
import { RequestReturn } from "@shopify/shopify-api";

interface ResponseProduct {
  products: {
    edges: any
  }
}


export async function getAllProducts(): Promise<ResponseProduct> {
  const productQuery = () => `
  query {
      products( first: 10) {
        edges{
          node {
            id
            handle
            title
	
            variants(first: 10){
              edges{
                node{
                  title
              }
            }
          }
      }  
    }
  }
}
`;

  const query = productQuery();

  const response = await callShopify(query);

  return response;
}