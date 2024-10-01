import Footer from "./Footer";
import Navbar from "./components/navigation/Navbar";
import React from "react";
import Sidebar from "./components/dashboard/LeftNav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="">
          <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
