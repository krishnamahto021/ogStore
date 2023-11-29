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
import Payment from "./Pages/User/Payment";
import VerifyUserEmail from "./Pages/Auth/VerifyUserEmail";

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

export const router = createBrowserRouter([
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
  { path: "/for-him", element: <Him /> },
  { path: "/for-her", element: <Her /> },
  { path: "/unisex", element: <Unisex /> },
  { path: "/shop-all", element: <ShopAll /> },
  { path: "/verify-user/:token", element: <VerifyUserEmail /> },

  {
    path: "/user/profile",
    element: <ProtectedRouteHome element={<UserProfile />} />,
  },
  {
    path: "/user/payment",
    element: <ProtectedRouteHome element={<Payment />} />,
  },

  { path: "/*", element: <ErrorPage /> },
]);
