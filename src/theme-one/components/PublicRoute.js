import React from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PublicRoute = ({ component }) => {
  const isAuth = window.localStorage.getItem("access_token");

  const navDashboard = () => {
    toast.warning("Already login");
    return <Navigate to="/dashboard" />;
  };
  return isAuth ? navDashboard() : component;
};

export default PublicRoute;
