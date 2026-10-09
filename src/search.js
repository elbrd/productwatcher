import axios from "axios";

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
