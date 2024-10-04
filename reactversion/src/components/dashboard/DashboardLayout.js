import Navbar from "../navigation/Navbar";
import React from "react";
import Sidebar from "./LeftNav";
import { Outlet } from "react-router-dom";

import"./global.css"
// src/components/DashboardLayout.jsx


const DashboardLayout = () => {
  return (
    <div className="flex flex-col bg-gray-50 text-gray-500">

<div className="flex "id="dashboard">
<Sidebar />

<div className="flex-1 overflow-y-auto">
  <h1 className="text-2xl font-semibold">Dashboard</h1>
  <div className=" rounded-lg h-full p-4">
    <Outlet /> {/* Render routed components here */}
  </div>
</div>
</div>
    


    </div>
  );
};

export default DashboardLayout;
