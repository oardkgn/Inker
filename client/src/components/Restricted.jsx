import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Outlet, Navigate } from 'react-router-dom';



function ReqLogin() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return <Navigate to={"/auth"} />
  return <Outlet />;
}
function ReqAdmin() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser.admin) return <Navigate to={"/"} />
  return <Outlet />;
}


export {ReqLogin,ReqAdmin};
