import React, { useState } from "react";
import { BsCartPlusFill } from "react-icons/bs";
import { AiFillThunderbolt } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { IoAddCircleOutline } from "react-icons/io5";
import { FiMinusCircle } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setRedirectPath,
  userSelector,
  setCart,
} from "../../Redux/Reducers/userReducer";
import {
  deleteProduct,
  updateProduct,
} from "../../Redux/Reducers/adminReducer";
import SliderComponent from "../../Components/Slider";
import { useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { name, price, sizes } = product;
  const { loggedInUser } = useSelector(userSelector);
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newPrice, setNewPrice] = useState(price);
  const dispatch = useDispatch();
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const config = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${loggedInUser.jwtToken}`,
    },
  };

  const handleChangeQuantity = (operand) => {
    //if 1 then add else sub
    const selectedSize = sizes.find((s) => s.size === size);
    if (operand === 1) {
      if (quantity >= selectedSize.quantity) {
        toast.error("No sufficient Stock");
        return;
      }
      setQuantity(quantity + 1);
    } else {
      if (quantity <= 1) {
        toast.error("Buy atleast 1 pair of sneaker for yourself 😃 ");
        return;
      }
      setQuantity(quantity - 1);
    }
  };
  const addToCart = async () => {
    try {
      if (!size || quantity < 1) {
        toast.error(`Buy atleast 1 pair of sneaker for yourself 😃 `);
        return;
      }
      console.log(quantity);
      const { data } = await axios.post(
        "/user/add-to-cart",
        { pId: product._id, size, quantity },
        config
      );
      if (data.success) {
        toast.success(`${data.message}`);
        setSize("");
        setQuantity(1);
      }
    } catch (error) {
      if (error.response) {
        toast.error(`${error.response.data.message}`);
        dispatch(setRedirectPath(location.pathname));
        navigate("/sign-in");
      } else {
        toast.error(`Sign in to Continue`);
        navigate("/sign-in");
      }
    }
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
    <div className="productCard bg-bgThree max-w-xs h-[22rem] flex flex-col gap-1 justify-around rounded overflow-hidden shadow-lg relative">
      <div
        className={`absolute top-2 right-1 flex justify-around text-2xl z-20 ${
          loggedInUser.role === 1 ? "block" : "hidden"
        }`}
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
        <div className="max-w-[10rem]  flex flex-wrap ">
          {size ? (
            <div className="flex gap-5 items-center justify-between">
              <FiMinusCircle
                className="cursor-pointer"
                onClick={() => handleChangeQuantity(2)}
              />
              <p>{quantity}</p>
              <IoAddCircleOutline
                className="cursor-pointer"
                onClick={() => handleChangeQuantity(1)}
              />
            </div>
          ) : (
            <>
              {sizes.map((size) => (
                <div
                  key={size.size}
                  className={`inline-block ${
                    size.quantity !== 0 ? "" : "line-through text-red-500"
                  } bg-bgOne cursor-pointer rounded-full px-1 py-1 text-sm font-semibold text-textFour mr-2 mb-2`}
                  onClick={() => setSize(size.size)}
                >
                  {`${size.size}`}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className="ctaContainer flex items-center flex-col gap-1 justify-between md:flex-row pb-2 px-2">
        <button
          type="submit"
          onClick={addToCart}
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
