import Client from 'shopify-buy';
export const shopifyClient = Client.buildClient({
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STORE_FRONT_ACCESS_TOKEN,
  domain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
});

export const parseShopifyResponse = (response) =>
  JSON.parse(JSON.stringify(response));
