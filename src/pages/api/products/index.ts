// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Shopify from "@shopify/shopify-api"

type Data = {
  [key: string]: any
}

const shop = process.env.SHOPIFY_HOST || "";
const accessToken = process.env.SHOPIFY_ACCESS_TOKEN || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  /*   const session = await Shopify.Utils.loadCurrentSession(
      req,
      res
    );
  
    if (!session) {
      return res.status(200).send("Session info not found!");
    } */

  const storefrontClient = new Shopify.Clients.Storefront(
    "doggie-petshop-store.myshopify.com",
    "7b140bbc1975dbc500367857d601da8b"
  );

  const products = await storefrontClient.query({
    data: `{
      products (first: 3) {
        edges {
          node {
            id
            title
          }
        }
      }
    }`,
  });

  return res.status(200).json(products.body as any)
}
