import React, { useContext } from "react";
import UserUpdate from "../components/profile/UserUpdate";
import UserDashboard from "../components/profile/UserDashboard.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

function Profile() {
  const { currentUser, showCart, setShowCart } = useContext(AuthContext);

  return (
    <div className=" relative max-w-[2440px] mx-auto flex flex-col md:flex-row justify-center gap-4 items-start p-2 md:p-10">
       {currentUser?.admin ? (
          <Link
            to={"/dashboard"}
            className="group absolute right-4 top-4 items-center bg-priwhi p-2 text-sm font-semibold transition-all hover:opacity-75 rounded-lg block md:hidden "
          >
            <p className=" bg-transparent mt-1 text-pribla" href="">
              Admin Dashboard
            </p>
            <div className="w-0 h-[2px] bg-priwhi transition-all group-hover:w-full"></div>
          </Link>
        ) : ""}
      <UserUpdate/>
      <UserDashboard />
    </div>
  );
}

export default Profile;
