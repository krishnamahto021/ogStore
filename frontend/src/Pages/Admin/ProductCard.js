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

const ProductCard = ({ product }) => {
  const { name, price, image, sizes } = product;
  const { loggedInUser } = useSelector(userSelector);
  const [edit, setEdit] = useState(false);
  const [editable, setEditable] = useState({
    name,
    price,
  });
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
        editable,
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
    <div className="productCard h-[20rem] max-w-xs flex flex-col gap-1 justify-between rounded overflow-hidden shadow-lg relative">
      <div className="absolute top-2 right-1 flex justify-around text-2xl">
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
        <img className="w-full h-full object-cover " src={image} alt={name} />
      </div>

      <div className="px-1 flex  items-center justify-evenly">
        {edit ? (
          <input
            className="border-b border-r border-black focus:outline-none"
            value={editable.name}
            onChange={(e) => setEditable({ ...editable, name: e.target.value })}
          ></input>
        ) : (
          <div className="font-bold text-xl ">{name}</div>
        )}
        {edit ? (
          <>
            <input
              className="border-b px-1 border-black focus:outline-none"
              value={editable.price}
              onChange={(e) =>
                setEditable({ ...editable, price: e.target.value })
              }
            ></input>
          </>
        ) : (
          <p className="text-textOne text-base">{`Price: $${price}`}</p>
        )}
      </div>

      <div className="flex justify-around">
        <div className="flex ">
          {sizes.map((size) => (
            <span
              key={size.size}
              className={`inline-block ${
                size.quantity !== 0 ? "" : "line-through text-red-500"
              } bg-bgThree rounded-full px-3 py-1 text-sm font-semibold text-textFour mr-2 mb-2`}
            >
              {`${size.size}`}
            </span>
          ))}
        </div>
      </div>
      <div className="ctaContainer flex items-center justify-between pb-2 px-2">
        <button
          type="submit"
          className="p-2 flex items-center gap-2 rounded-md bg-bgTwo text-textThree hover:bg-bgOne hover:text-textOne duration-300"
        >
          Add to Cart <BsCartPlusFill />
        </button>
        <button
          type="submit"
          className="p-2 flex items-center gap-2 rounded-md bg-bgTwo text-textThree hover:bg-bgOne hover:text-textOne duration-300"
        >
          Buy Now <AiFillThunderbolt />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
