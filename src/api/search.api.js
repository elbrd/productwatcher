import axios from "axios";
import "dotenv/config";

export async function searchProduct(searchTerm) {
  const response = await axios.get("https://serpapi.com/search.json", {
    params: {
      engine: "google_shopping",
      q: searchTerm,
      api_key: process.env.SERPAPI_KEY,
      gl: "se",
      hl: "sv",
    },
  });

  return response.data.shopping_results;
}

export async function fetchProductLink(longURL) {
  const response = await axios.get(longURL, {
    params: {
      api_key: process.env.SERPAPI_KEY,
    },
  });

  return response.data.product_results?.stores?.[0]?.link;
}
