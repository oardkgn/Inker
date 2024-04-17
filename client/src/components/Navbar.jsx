import React from "react";
import logo from "../assets/inkerLogo.png";
import homebg from "../assets/homebg.png";
import { FiSearch } from "react-icons/fi";


function Navbar() {
  return (
    <div className=" max-w-[2460px] px-8 mx-auto h-16 w-full flex items-center justify-between border-b-[1px] border-opacity-40 border-pribla ">
      <img className=" h-14" src={logo} alt="" />
      <div className=" relative flex-1 flex gap-8 items-center justify-end">
        <input
          className=" w-full max-w-[390px] bg-white p-2 outline-none rounded-md shadow-md"
          type="text"
        />
        <button className="absolute right-11 p-2 pr-0 group"><FiSearch className=" group-hover:scale-110 transition-all  bg-transparent " /></button>
        <div className=" bg-pribla w-[1px] h-8 rounded-full"></div>
      </div>
      <div className=" text-xl">
        <button className="group p-4 ml-4 ">
        <a className="" href="">Contact</a>
        <div className="w-0 h-[2px] bg-pribla transition-all group-hover:w-full"></div>
        </button>
        <button className="group p-4 ">
        <a className="" href="">Login</a>
        <div className="w-0 h-[2px] bg-pribla transition-all group-hover:w-full"></div>
        </button>
      </div>
      <img src={homebg} className=" absolute w-56 top-60 right-0" alt="" />
    </div>
  );
}

export default Navbar;
