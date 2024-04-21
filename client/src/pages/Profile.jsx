import React, { useState } from "react";
import tabsArrow from "../assets/tabsArrow.png";
import { MdEdit } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

function Profile() {
  const [tabPos, setTabPos] = useState(45);

  return (
    <div className=" max-w-[2440px] mx-auto flex justify-center gap-4 items-start p-2 md:p-10">
      <div className=" w-[600px] bg-pribla rounded-lg px-8 py-14">
        <h1 className=" bg-transparent text-priwhi text-center text-2xl">
          Profile
        </h1>
        <form
          onSubmit={(e) => handleSignUp(e)}
          className=" flex flex-col gap-4 bg-transparent"
          action=""
        >
          <div className=" bg-pribla flex flex-col">
            <label className=" text-priwhi bg-pribla" htmlFor="name">
              Name
            </label>
            <div className=" flex relative bg-transparent gap-2">
              <input
                className=" bg-priwhi flex-1 bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
                type="text"
                required={true}
                minLength="2"
                maxLength="40"
                name=""
                id="name"
              />
              <button className=" w-10 h-10 flex justify-center items-center rounded-md bg-yellow-500 text-priwhi text-xl transition-all hover:scale-110">
                <MdEdit className=" bg-transparent" />
              </button>
            </div>
          </div>
          <div className=" bg-pribla flex flex-col">
            <label className=" text-priwhi bg-pribla" htmlFor="surname">
              Surname
            </label>
            <div className=" flex relative bg-transparent gap-2">
              <input
                className=" bg-priwhi flex-1 bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
                type="text"
                required={true}
                minLength="2"
                maxLength="40"
                name=""
                id="surname"
              />
              <button className=" w-10 h-10 flex justify-center items-center rounded-md bg-yellow-500 text-priwhi text-xl transition-all hover:scale-110">
                <MdEdit className=" bg-transparent" />
              </button>
            </div>
          </div>

          <div className=" bg-pribla flex flex-col">
            <label className=" text-priwhi bg-pribla" htmlFor="email">
              Email
            </label>
            <div className=" flex relative bg-transparent gap-2">
              <input
                className=" bg-priwhi flex-1 bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
                type="email"
                required={true}
                name=""
                id="email"
              />
              <button className=" w-10 h-10 flex justify-center items-center rounded-md bg-yellow-500 text-priwhi text-xl transition-all hover:scale-110">
                <MdEdit className=" bg-transparent" />
              </button>
            </div>
          </div>
          <div className=" bg-pribla flex flex-col">
            <label className=" text-priwhi bg-pribla" htmlFor="password">
              Password
            </label>

            <div className=" flex relative bg-transparent gap-2">
              <input
                className=" bg-priwhi flex-1 bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
                type="password"
                required={true}
                minLength="6"
                maxLength="30"
                name=""
                id="password"
              />
              <button className=" w-10 h-10 flex justify-center items-center rounded-md bg-yellow-500 text-priwhi text-xl transition-all hover:scale-110">
                <MdEdit className=" bg-transparent" />
              </button>
            </div>
          </div>
        </form>
        <div className=" bg-priwhi bg-opacity-50 h-0.5 rounded-full my-8"></div>
        <div className=" flex gap-2 bg-transparent">
            <button className=" flex-1 justify-center rounded-lg p-3 flex items-center bg-yellow-600 text-priwhi">Logout <CiLogout size={24} className=" bg-transparent" /></button>
            <button className=" flex-1 justify-center rounded-lg p-3 flex items-center bg-red-600 text-priwhi">Delete Account <MdOutlineDelete size={24} className=" bg-transparent" /></button>
        </div>
      </div>

      <div className=" w-full h-[800px] flex flex-col gap-4">
        <div className=" relative bg-pribla font-semibold rounded-lg p-4 flex gap-2">
          <button
            onClick={() => {
              setTabPos(45);
            }}
             className=" bg-priwhi rounded-lg py-2 px-4" 
          >
            Reviews
          </button>
          <button
            onClick={() => {
              setTabPos(128);
            }}
            className=" bg-priwhi rounded-lg py-2 px-4"
          >
            Liked
          </button>
          <button
            onClick={() => {
              setTabPos(206);
            }}
            className=" bg-priwhi rounded-lg py-2 px-4"
          >
            Orders
          </button>
          <button
            onClick={() => {
              setTabPos(296);
            }}
            className=" bg-priwhi rounded-lg py-2 px-4"
          >
            Adresses
          </button>
          <img
            className={"bg-transparent w-6 absolute bottom-0 transition-all "}
            style={{ left: tabPos }}
            src={tabsArrow}
          />
        </div>
        <div className=" bg-pribla rounded-lg p-4 flex gap-2">
          <button className=" bg-priwhi rounded-lg py-2 px-4">Reviews</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
