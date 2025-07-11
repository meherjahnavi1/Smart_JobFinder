import React from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Secure = () => {
  const token = Cookies.get("jwtToken");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        alert("Session expired. Please log in again.");
        Cookies.remove("jwtToken");
        return <Navigate to="/" replace />;
      }
      return <Outlet />;
    } catch (error) {
      console.error("Invalid token:", error);
      Cookies.remove("jwtToken");
      return <Navigate to="/" replace />;
    }
  }

  return <Navigate to="/" replace />;
};

export default Secure;
