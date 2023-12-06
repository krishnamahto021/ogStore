import algoliasearch from "algoliasearch";
const ALGOLIA_API_ID = "M5H0L3Q5G6";
const ALGOLIA_API_KEY = "eaf84a19c4bb36a6403b1131b507776a";
const ALGOLIA_INDEX_NAME = "ogStore";

const client = algoliasearch(ALGOLIA_API_ID, ALGOLIA_API_KEY);

const index = client.initIndex(ALGOLIA_INDEX_NAME);

export async function indexProducts(products) {
  try {
    const algoliaFormattedProducts = products.map((product) => ({
      objectID: product._id,
      name: product.name,
      slug: product.slug,
      sizes: product.sizes,
      price: product.price,
      images: product.images,
      category: product.category,
      shipping: product.shipping,
    }));
    await index.saveObjects(algoliaFormattedProducts);
    // console.log(`products indexed successfully : ${objectIDs.join(",")}`);
  } catch (error) {
    console.log(`Error in indexing products ${error}`);
  }
}

export async function searchProduct(query) {
  try {
    const { hits } = await index.search(query);
    return hits;
  } catch (error) {
    console.log(`Error in searching products ${error}`);
  }
}
