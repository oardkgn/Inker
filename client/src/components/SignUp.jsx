import React from 'react'

import { FcGoogle } from "react-icons/fc";
import { LuMousePointer2 } from "react-icons/lu";

function SignUp({setIsLogin}) {
  return (
    <div className="w-full p-8 max-w-[400px] bg-pribla rounded-lg">
          <h3 className=" bg-transparent text-center text-3xl font-semibold text-priwhi mb-8">
            Sign Up
          </h3>
          <form className=" flex flex-col gap-4 bg-transparent" action="">
          <div className=" bg-pribla flex flex-col">
              <label className=" text-priwhi bg-pribla" htmlFor="name">
                Name
              </label>
              <input
                className=" bg-priwhi bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
                type="text"
                name=""
                id="name"
              />
            </div>
            <div className=" bg-pribla flex flex-col">
              <label className=" text-priwhi bg-pribla" htmlFor="surname">
                Surname
              </label>
              <input
                className=" bg-priwhi bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
                type="text"
                name=""
                id="surname"
              />
            </div>
            
            <div className=" bg-pribla flex flex-col">
              <label className=" text-priwhi bg-pribla" htmlFor="email">
                Email
              </label>
              <input
                className=" bg-priwhi bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
                type="email"
                name=""
                id="email"
              />
            </div>
            <div className=" bg-pribla flex flex-col">
              <label className=" text-priwhi bg-pribla" htmlFor="password">
                Password
              </label>
              <input
                className=" bg-priwhi bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
                type="password"
                name=""
                id="password"
              />
            </div>
            <div className=" bg-transparent mt-4 flex gap-1">
              <button className=" transition-all hover:bg-opacity-80 bg-priwhi flex-1 rounded-md font-semibold text-pribla p-4">
                Sign Up
              </button>
              <button className=" transition-all hover:bg-opacity-80 bg-priwhi rounded-md py-4 px-5 text-2xl">
                <FcGoogle className=' bg-transparent' />
              </button>
            </div>
          </form>
          <div className=" bg-transparent items-center gap-3 mt-4 flex">
            <div className=" h-0.5 flex-1 bg-priwhi rounded-full"></div>
            <span className=" bg-pribla text-priwhi">Or</span>
            <div className=" h-0.5 flex-1 bg-priwhi rounded-full"></div>
          </div>
          <div className="mt-3  text-priwhi">
            <p className=" bg-pribla">
              Do you have an account? -{" "}
              <button onClick={() => setIsLogin(true)} className=" relative bg-pribla transition-all group hover:scale-105">
                Login
                <LuMousePointer2 className=" bg-transparent transition-all absolute -right-6 -bottom-4 group-hover:-right-4 group-hover:-bottom-2" />
              </button>
            </p>
          </div>
        </div>
  )
}

export default SignUp