import { fetchProductLink } from "../api/search.api.js";

export const productFilter = async (product, results) => {
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

  console.log(candidates.length);

  const candidatesShortened = candidates.splice(0, 5);

  const settledResults = await Promise.allSettled(
    candidatesShortened.map(async (product) => ({
      title: product.title,
      price: product.price,
      source: product.source,
      productLink: await fetchProductLink(
        product.serpapi_immersive_product_api,
      ),
    })),
  );

  const cleanedCandidates = settledResults
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value)
    .filter((product) => product.productLink);

  console.log("cleanedCandidates:", cleanedCandidates);
  return cleanedCandidates;
};

// const cleanedCandidates = candidates.map((product) => ({
//   title: product.title,
//   price: product.price,
//   source: product.source,
// }));
