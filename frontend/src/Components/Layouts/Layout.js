import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { authorizeUser } from "../../Redux/Reducers/userReducer";

const Layout = ({ children, title, description, keywords, author }) => {
  const dispatch = useDispatch();
    useEffect(() => {
      dispatch(authorizeUser());
    }, [dispatch]);
  return (
    <div>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main className="min-h-[80vh] mt-40 md:mt-28 p-2">{children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "ogStore",
  author: "ogStore",
  keywords: "premium sneakers",
  description: "Explore our collection of premium sneakers at ogStore.",
};

export default Layout;
