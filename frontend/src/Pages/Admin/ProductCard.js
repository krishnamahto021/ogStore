import React, { useState } from "react";
import { BsCartPlusFill } from "react-icons/bs";
import { AiFillThunderbolt } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../Redux/Reducers/userReducer";
import {
  deleteProduct,
  updateProduct,
} from "../../Redux/Reducers/adminReducer";
import SliderComponent from "../../Components/Slider";

const ProductCard = ({ product }) => {
  const { name, price, images, sizes } = product;
  const { loggedInUser } = useSelector(userSelector);
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newPrice, setNewPrice] = useState(price);
  const dispatch = useDispatch();

  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };

  const handleUpdate = async () => {
    try {
      const { data } = await axios.post(
        `/admin/update-product/${product._id}`,
        { name: newName, price: newPrice },
        config
      );
      if (data.success) {
        toast.success(`Updated ${name}`);
        dispatch(
          updateProduct({
            id: product._id,
            updatedProduct: data.product,
          })
        );
        setEdit(false);
      }
    } catch (error) {
      toast.error(`Something Went Wrong !!`);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(
        `/admin/delete-product/${product._id}`,
        config
      );

      if (data.success) {
        toast.success(`${name} deleted Successfully`);
        dispatch(deleteProduct({ id: product._id }));
      }
    } catch (error) {
      toast.error(`Something Went Wrong`);
    }
  };
  return (
    <div className="productCard  max-w-xs flex flex-col gap-1 justify-between rounded overflow-hidden shadow-lg relative">
      <div
        className={`absolute top-2 right-1 flex justify-around text-2xl z-20 ${loggedInUser.role === 1 ? "block":"hidden"}`}
      >
        {edit ? (
          <>
            <BiSolidEdit className="cursor-pointer" onClick={handleUpdate} />
            <MdDeleteOutline
              className="text-red-500 cursor-pointer"
              onClick={handleDelete}
            />
          </>
        ) : (
          <>
            <BiSolidEdit
              className="cursor-pointer"
              onClick={() => setEdit(!edit)}
            />
            <MdDeleteOutline
              className="text-red-500 cursor-pointer"
              onClick={handleDelete}
            />
          </>
        )}
      </div>
      <div className="w-full p-1 h-44 ">
        <SliderComponent data={product} />
      </div>

      <div className="md:px-1 flex  items-center justify-evenly">
        {edit ? (
          <input
            className="border-b border-r border-black focus:outline-none"
            value={name}
            onChange={(e) => setNewName(e.target.value)}
          ></input>
        ) : (
          <div className="font-bold text-sm md:text-lg ">{name}</div>
        )}
        {edit ? (
          <>
            <input
              className="border-b px-1 border-black focus:outline-none"
              value={price}
              onChange={(e) => setNewPrice(e.target.value)}
            ></input>
          </>
        ) : (
          <p className="text-textOne text-base">{` $${price}`}</p>
        )}
      </div>

      <div className="flex justify-around p-1">
        <div className="flex flex-wrap ">
          {sizes.map((size) => (
            <span
              key={size.size}
              className={`inline-block ${
                size.quantity !== 0 ? "" : "line-through text-red-500"
              } bg-bgThree rounded-full px-1 py-1 text-sm font-semibold text-textFour mr-2 mb-2`}
            >
              {`${size.size}`}
            </span>
          ))}
        </div>
      </div>
      <div className="ctaContainer flex items-center flex-col gap-1 justify-between md:flex-row pb-2 px-2">
        <button
          type="submit"
          className="p-2 flex items-center justify-center gap-2 w-full rounded-md bg-bgTwo text-textThree hover:bg-bgOne hover:text-textOne duration-300"
        >
          Add to Cart <BsCartPlusFill />
        </button>
        <button
          type="submit"
          className="p-2 flex items-center justify-center gap-2  w-full rounded-md bg-bgTwo text-textThree hover:bg-bgOne hover:text-textOne duration-300"
        >
          Buy Now <AiFillThunderbolt />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
