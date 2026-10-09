import dotenv from "dotenv";
import express from "express";

import { products } from "./config/products.js";
import { searchProduct } from "./src/search.js";

// Config
const app = express();
const PORT = 8081;
dotenv.config();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// "Route"
app.get("/test-search", async (req, res) => {
  try {
    const product = products[0];

    const results = await Promise.all(
      product.searchTerms.map((term) => searchProduct(term)),
    );

    const allResults = results.flat();

    const filterDupes = allResults.filter(
      (item, index, arr) =>
        index === arr.findIndex((i) => i.product_id === item.product_id),
    );

    const candidates = filterDupes.filter((item) => {
      const title = item.title?.toLowerCase() ?? "";

      const matchesPanel = product.panels.some((panel) =>
        new RegExp(`\\b${panel}\\s*[-]?\\s*panel\\b`).test(title),
      );

      const matchesBrand = title.includes(product.brand.toLowerCase());
      const matchesColor = title.includes(product.color.toLowerCase());

      return matchesPanel && (matchesBrand || matchesColor);
    });

    const cleanedCanditates = candidates.map((product) => ({
      position: product.position,
      title: product.title,
      productId: product.product_id,
      price: product.price,
      extractedPrice: product.extracted_price,
      source: product.source,
      thumbnail: product.thumbnail,
      productLink: product.product_link,
      immersiveProductApi: product.serpapi_immersive_product_api,
    }));

    res.json(cleanedCanditates);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Search failed" });
  }
});
