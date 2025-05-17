import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ img = "../src/assets/images/logo.png", children }) => {
  return (
    <div>
      <Header img={img} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
