import { UserContext } from "@/context/UserProvider";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const userInfo = localStorage.getItem('userInfo')
  const userData = JSON.parse(userInfo)?.data
  return userData ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
