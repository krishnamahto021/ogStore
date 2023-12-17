import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home";
import Privacy from "./Pages/Privacy";
import Shipping from "./Pages/Shipping";
import Return from "./Pages/Return";
import Refund from "./Pages/Refund";
import Cancellation from "./Pages/Cancellation";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Him from "./Pages/Product/Him";
import Her from "./Pages/Product/Her";
import Unisex from "./Pages/Product/Unisex";
import ShopAll from "./Pages/Product/ShopAll";
import Disclaimer from "./Pages/Disclaimer";
import Terms from "./Pages/Terms";
import ErrorPage from "./Pages/ErrorPage";
import SignUp from "./Pages/Auth/SignUp";
import SignIn from "./Pages/Auth/SignIn";
import { useSelector } from "react-redux";
import { userSelector } from "./Redux/Reducers/userReducer";
import UserProfile from "./Pages/User/UserProfile";
import Spinner from "./Components/Spinner";
import VerifyUserEmail from "./Pages/Auth/VerifyUserEmail";
import ForgottenPassword from "./Pages/Auth/ForgottenPassword";
import UpdatePassword from "./Pages/Auth/UpdatePassword";
import axios from "axios";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AllOrders from "./Pages/Admin/AllOrders";
import CreateCategory from "./Pages/Admin/CreateCategory";
import CreateProduct from "./Pages/Admin/CreateProduct";
import Orders from "./Pages/User/Orders";
import CartPage from "./Pages/User/CartPage";
import OrderPage from "./Pages/User/OrderPage";
import PaymentVerification from "./Pages/User/PaymentVerfication";
import DeliveryAddress from "./Pages/Auth/DeliveryAddress";
// import WishList from "./Pages/User/WishList";
import Rewards from "./Pages/User/Rewards";

export const ProtectedRouteHome = ({ element }) => {
  const { loggedInUser } = useSelector(userSelector);
  return loggedInUser.jwtToken ? element : <Spinner />;
};

export const ProtectedRoute = ({ element }) => {
  const { loggedInUser, redirectPath } = useSelector(userSelector);
  return loggedInUser.jwtToken ? (
    <Navigate to={redirectPath || "/user/profile"} />
  ) : (
    element
  );
};

export const ProtectedRouteAdmin = ({ element }) => {
  const { loggedInUser } = useSelector(userSelector);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${loggedInUser.jwtToken}`,
          },
        };
        const response = await axios.get("/user/admin", config);
        setIsAdmin(response.status === 200);
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Internal Server error");
        }
        setIsAdmin(false);
      }
    };

    fetchData();
  }, []);

  if (isAdmin === null) {
    // Loading state, you can show a loading spinner here
    return <Spinner />;
  }

  return isAdmin ? element : <Navigate to="/" />;
};

export const router = createBrowserRouter([
  // public routes
  { path: "/", element: <Home /> },
  { path: "/sign-in", element: <ProtectedRoute element={<SignIn />} /> },
  { path: "/sign-up", element: <ProtectedRoute element={<SignUp />} /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/shipping", element: <Shipping /> },
  { path: "/return", element: <Return /> },
  { path: "/refund", element: <Refund /> },
  { path: "/terms-of-use", element: <Terms /> },
  { path: "/disclaimer", element: <Disclaimer /> },
  { path: "/cancellation", element: <Cancellation /> },
  { path: "/for-him/:cid", element: <Him /> },
  { path: "/for-her/:cid", element: <Her /> },
  { path: "/unisex/:cid", element: <Unisex /> },
  { path: "/shop-all", element: <ShopAll /> },
  { path: "/verify-user/:token", element: <VerifyUserEmail /> },
  { path: "/forgotten-password", element: <ForgottenPassword /> },
  { path: "/update-password/:token", element: <UpdatePassword /> },

  // user routes
  {
    path: "/user/profile",
    element: <ProtectedRouteHome element={<UserProfile />} />,
  },
  {
    path: "/user/orders",
    element: <ProtectedRouteHome element={<Orders />} />,
  },
  {
    path: "/user/cart",
    element: <ProtectedRouteHome element={<CartPage />} />,
  },
  {
    path: "/user/order-page",
    element: <ProtectedRouteHome element={<OrderPage />} />,
  },
  {
    path: "/user/update-details",
    element: <ProtectedRouteHome element={<DeliveryAddress />} />,
  },
  // {
  //   path: "/user/wishlist",
  //   element: <ProtectedRouteHome element={<WishList />} />,
  // },
  {
    path: "/user/rewards",
    element: <ProtectedRouteHome element={<Rewards />} />,
  },
  {
    path: "/user/payment-verification",
    element: <PaymentVerification />,
  },

  // admin routes
  {
    path: "/admin",
    element: <ProtectedRouteAdmin element={<AdminDashboard />} />,
  },
  {
    path: "/admin/orders",
    element: <ProtectedRouteAdmin element={<AllOrders />} />,
  },
  {
    path: "/admin/categories",
    element: <ProtectedRouteAdmin element={<CreateCategory />} />,
  },
  {
    path: "/admin/add-product",
    element: <ProtectedRouteAdmin element={<CreateProduct />} />,
  },

  { path: "/*", element: <ErrorPage /> },
]);
