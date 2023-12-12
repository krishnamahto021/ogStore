import algoliasearch from "algoliasearch";
const ALGOLIA_API_ID = process.env.REACT_APP_ALGOLIA_API_ID;
const ALGOLIA_API_KEY = process.env.REACT_APP_ALGOLIA_API_KEY;
const ALGOLIA_INDEX_NAME = process.env.REACT_APP_ALGOLIA_INDEX_NAME;

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

export async function updateProductFromIndex(product) {
  try {
    const algoliaFormattedProduct = {
      objectID: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
    };
    await index.partialUpdateObject(algoliaFormattedProduct);
    // console.log(`Product updated successfully: ${product._id}`);
  } catch (error) {
    console.log(`Error in updating product ${product._id}: ${error}`);
  }
}

export async function deleteProductFromIndex(productID) {
  try {
    await index.deleteObject(productID);
    // console.log(`Product deleted successfully: ${productID}`);
  } catch (error) {
    console.log(`Error in deleting product ${productID}: ${error}`);
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