import React from "react";
import { Navigate } from "react-router-dom";

// Protected route for admin users
const AdminRoute = ({ children }) => {
  const userRole = localStorage.getItem('userRole'); // Get the user role from localStorage
if(!userRole){
    return <Navigate to="/" />;  
}
  if (userRole !== 'admin') {
    // If the user is not an admin, redirect them to the home page or a "not authorized" page
    return <Navigate to="/" />;
  }

  // If the user is an admin, render the children (protected component)
  return children;
};

export default AdminRoute;
