import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminSideBar from "./AdminSideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  adminSelector,
  getInitialProducts,
  getInitialState,
  setProduct,
} from "../../Redux/Reducers/adminReducer";
import Select from "react-select";
import { toast } from "react-toastify";
import axios from "axios";
import { userSelector } from "../../Redux/Reducers/userReducer";
import ProductCard from "./ProductCard";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sizeQuantities, setSizeQuantities] = useState({});
  const [previewImages, setPreviewImages] = useState([]);
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector(userSelector);
  const { categories, products } = useSelector(adminSelector);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    setSizeQuantities({});
  };

  const handleSizeQuantityChange = (sizeId, quantity) => {
    setSizeQuantities({
      ...sizeQuantities,
      [sizeId]: quantity,
    });
  };

  const handleImageUpload = async (files) => {
    const uploadedImages = [];

    for (const file of files) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ogStore");
      data.append("cloud_name", "ogstore");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/ogstore/image/upload",
          data
        );
        const imageUrl = response.data.url.toString();
        uploadedImages.push(imageUrl);
      } catch (error) {
        console.error("Error in uploading image:", error);
      }
    }

    setImages(uploadedImages);
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;
    const previewImagesArray = [];

    const uploadPromises = Array.from(files).map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          previewImagesArray.push(event.target.result);
          resolve();
        };
        reader.readAsDataURL(file);
      });
    });

    await Promise.all(uploadPromises);

    setPreviewImages(previewImagesArray);
    handleImageUpload(files);
  };

  const clearInput = () => {
    setName("");
    setImages([]);
    setPrice("");
    setSelectedCategory("");
    setPreviewImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const sizesPayload = Object.keys(sizeQuantities).map((size) => ({
        size: parseInt(size),
        quantity: parseInt(sizeQuantities[size]),
      }));

      const productData = {
        name,
        price: parseInt(price),
        images,
        category: selectedCategory.value,
        sizes: sizesPayload,
      };

      const { data } = await axios.post(
        `/admin/create-product`,
        productData,
        config
      );

      if (data.success) {
        toast.success(`${productData.name} Added successfully`);
        dispatch(setProduct(data.newProduct));
        clearInput();
      }
    } catch (error) {
      toast.error(`Something Went wrong`);
    }
  };

  useEffect(() => {
    dispatch(getInitialState(config));
    dispatch(getInitialProducts(config));
  }, []);

  return (
    <Layout>
      <div className="flex flex-col justify-between gap-2">
        <AdminSideBar />
        <div className="createProductContainer w-full bg-bgThree p-2 rounded-md">
          <form className="createProductForm" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 justify-between">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                className="p-1 rounded-sm bg-bgOne focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2 justify-between">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="p-1 rounded-sm bg-bgOne focus:outline-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col gap-2 justify-between">
              <label htmlFor="images">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                placeholder="Select up to 3 images"
                className="p-1 rounded-sm bg-bgOne focus:outline-none"
                onChange={handleImageChange}
                required
              />
              <div className="flex space-x-2">
                {previewImages.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="max-h-20"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 justify-between">
              <label htmlFor="category">Category</label>
              <Select
                id="category"
                options={categories.map((category) => ({
                  value: category._id,
                  label: category.name,
                }))}
                value={selectedCategory}
                onChange={handleCategoryChange}
              />
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-left">Sizes</label>
                {selectedCategory &&
                  categories
                    .find((category) => category._id === selectedCategory.value)
                    ?.sizes.map((size) => (
                      <div key={size} className="text-left">
                        {size}
                      </div>
                    ))}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-left">Quantities</label>
                {selectedCategory &&
                  categories
                    .find((category) => category._id === selectedCategory.value)
                    ?.sizes.map((size) => (
                      <div key={size} className="text-left">
                        <input
                          type="number"
                          className="px-1 rounded-md focus:outline-none"
                          value={sizeQuantities[size] || ""}
                          onChange={(e) =>
                            handleSizeQuantityChange(size, e.target.value)
                          }
                          required
                        />
                      </div>
                    ))}
              </div>
            </div>

            <div className="flex justify-around mt-5">
              <button
                type="submit"
                className="p-2 rounded-md bg-bgTwo text-textThree hover:bg-bgOne hover:text-textOne duration-300"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 px-2">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
