import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Outlet, Navigate } from 'react-router-dom';

function Restricted() {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return <Navigate to={"/auth"} />
  return <Outlet />;
}

export default Restricted;
