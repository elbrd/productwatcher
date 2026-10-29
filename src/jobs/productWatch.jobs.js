import { productFilter } from "../utils/productFilter.utils.js";
import { products } from "../config/products.config.js";
import { invokeLLM } from "../config/llm.config.js";
import { searchProduct } from "../api/search.api.js";

export async function productWatch() {
  const product = products[0];

  const results = await Promise.all(
    product.searchTerms.map((term) => searchProduct(term)),
  );

  const candidates = await productFilter(product, results);

  const result = await invokeLLM(product, candidates);

  return result;
}
