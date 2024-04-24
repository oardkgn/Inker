import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/inkerLogo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";
import { FiSearch } from "react-icons/fi";
import { FaShoppingBasket } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

function Navbar() {
  const { currentUser } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);


  return (
    <div className=" max-w-[2460px] bg-pribla pr-2 pl-0  md:px-8 mx-auto h-16 w-full flex items-center justify-between border-b-[1px] border-opacity-40 border-pribla ">
      <Link to="/">
        <img
          className=" w-24 md:h-14 md:w-auto bg-transparent"
          src={logo}
          alt=""
        />
      </Link>
      <div className=" bg-transparent relative flex-1 flex gap-0 lg:gap-8 items-center justify-end">
        <input
          className=" w-full max-w-[390px] bg-white p-2 outline-none rounded-md shadow-md"
          placeholder="Search"
          type="text"
        />
        <button className="absolute  right-2 lg:right-11 p-2 pr-0 group">
          <FiSearch className=" group-hover:scale-110 transition-all  bg-transparent " />
        </button>
        <div className=" bg-pribla w-[1px] h-8 rounded-full"></div>
      </div>
      <div className=" bg-transparent text-priwhi flex items-center text-xl">
        <Link className=" hidden md:block bg-transparent" to="/">
          <button className="group p-4 ml-4 ">
            <p className=" bg-transparent " href="">
              Contact
            </p>
            <div className="w-0 h-[2px] bg-priwhi transition-all group-hover:w-full"></div>
          </button>
        </Link>
        <Link className=" bg-transparent" to={user ? "/profile" : "/auth"}>
          {user === null ? (
            <button className="group p-4">
              <p className=" bg-transparent" href="">
                Login
              </p>
              <div className="w-0 h-[2px] bg-priwhi transition-all group-hover:w-full"></div>
            </button>
          ) : (
            <button className="group p-4 hidden md:block ">
              <p className=" bg-transparent" href="">
                {user.email}
              </p>
              <div className="w-0 h-[2px] bg-priwhi transition-all group-hover:w-full"></div>
            </button>
          )}
        </Link>
        {user?.admin ? (
          <Link to={"/dashboard"} className="group items-center bg-priwhi p-2 text-sm font-semibold transition-all hover:opacity-75 rounded-lg hidden md:block ">
            <p className=" bg-transparent mt-1 text-pribla" href="">
              Admin Dashboard
            </p>
            <div className="w-0 h-[2px] bg-priwhi transition-all group-hover:w-full"></div>
          </Link>
        ):("")}
        {user && (
          <button className=" hidden md:block relative group p-4 ml-4 ">
            <div className="absolute bg-transparent top-0 left-0 text-priwhi transition-all group-hover:scale-110 text-3xl">
              <FaShoppingBasket className=" bg-transparent" />
              <div className="absolute -top-1 -right-2 bg-red-500 text-priwhi text-[12px] rounded-full w-5 flex items-center justify-center h-5">
                1
              </div>
            </div>
          </button>
        )}
        <button className=" md:hidden ml-4 relative group">
          <div className=" bg-transparent text-priwhi transition-all group-hover:scale-110 text-4xl">
            <HiOutlineMenuAlt3 className=" bg-transparent" />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
