module.exports = {
  schema: {
    [`https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}.myshopify.com/api/graphql`]:
      {
        headers: {
          "X-Shopify-Storefront-Access-Token":
            process.env.NEXT_PUBLIC_SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
        },
      },
  },
  documents: "./src/graphql/**/*.graphql",
  generates: {
    ["./src/graphql/generated.ts"]: {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
        //"typescript-react-query",
      ],
      config: {
        // reactApolloVersion: 3,
        // withHooks: true,
        // withHOC: false,
        // withComponent: false,
        // typesPrefix: "Shopify",
        //fetcher: "graphql-request",
      },
      hooks: {
        afterAllFileWrite: ["eslint --fix", " prettier --write"],
      },
      require: ["dotenv/config"],
    },
  },
};
