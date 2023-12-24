import algoliasearch from "algoliasearch";
import axios from "axios";
import { toast } from "react-toastify";

let ALGOLIA_API_ID;
let ALGOLIA_API_KEY;
let ALGOLIA_INDEX_NAME;
let index;

const fetchApiKeys = async () => {
  try {
    const { data } = await axios.get("/user/get-keys");
    ALGOLIA_API_ID = data.apiKeys.REACT_APP_ALGOLIA_API_ID;
    ALGOLIA_API_KEY = data.apiKeys.REACT_APP_ALGOLIA_API_KEY;
    ALGOLIA_INDEX_NAME = data.apiKeys.REACT_APP_ALGOLIA_INDEX_NAME;

    // Initialize Algolia client and index
    const client = algoliasearch(ALGOLIA_API_ID, ALGOLIA_API_KEY);
    index = client.initIndex(ALGOLIA_INDEX_NAME);
  } catch (error) {
    toast.error(`Something went wrong while fetching API keys`);
  }
};

await fetchApiKeys();

export async function indexProducts(products) {
  try {
    const algoliaFormattedProducts = products.map((product) => ({
      objectID: product._id, // for algolia we need to use it
      _id: product._id,
      name: product.name,
      slug: product.slug,
      sizes: product.sizes,
      price: product.price,
      images: product.images,
      category: product.category,
      shipping: product.shipping,
    }));
    await index.saveObjects(algoliaFormattedProducts);
  } catch (error) {
    console.log(error);
    console.log(`Error in indexing products: ${error}`);
  }
}

export async function updateProductFromIndex(product) {
  try {
    const algoliaFormattedProduct = {
      objectID: product._id,
      _id: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
    };
    await index.partialUpdateObject(algoliaFormattedProduct);
  } catch (error) {
    console.log(`Error in updating product ${product._id}: ${error}`);
  }
}

export async function deleteProductFromIndex(productID) {
  try {
    await index.deleteObject(productID);
  } catch (error) {
    console.log(`Error in deleting product ${productID}: ${error}`);
  }
}

export async function searchProduct(query) {
  try {
    const { hits } = await index.search(query);
    return hits;
  } catch (error) {
    console.log(`Error in searching products: ${error}`);
  }
}
