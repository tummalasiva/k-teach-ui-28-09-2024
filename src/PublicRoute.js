/** @format */

import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PublicRoute = ({ component }) => {
  const isAuth = window.localStorage.getItem(
    process.env.REACT_APP_ACCESS_TOKEN
  );

  const navDashboard = () => {
    toast.warning("Already logged in!");
    return <Navigate to="/sch/dashboard" />;
  };
  return isAuth ? navDashboard() : component;
};

export default PublicRoute;
