import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="min-h-[80vh] mt-40 md:mt-28 p-2">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
