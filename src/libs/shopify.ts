const domain = String(process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
const storefrontAccessToken = String(process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN);
const ShopifyVersion = "2022-07";

export async function callShopify(query: any) {
  const fetchURL = `https://${domain}.myshopify.com/api/${ShopifyVersion}/graphql.json`;

  const GRAPHQL_BODY = () => {
    return {
      async: true,
      crossDomain: true,
      method: 'POST',
      headers: {
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
        'Content-Type': 'application/graphql',
      },
      body: query
    };
  }

  // const storefrontClient = new Shopify.Clients.Storefront(
  //   URL,
  //   storefrontAccessToken
  // );

  try {

    // const data = await storefrontClient.query({
    //   data: query
    // });

    const result = await fetch(fetchURL, GRAPHQL_BODY()).then(res => res.json());

    return result?.data;
  } catch (error) {
    throw new Error("Could not fetch products!");
  }
}