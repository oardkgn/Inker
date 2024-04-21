import React, { useState } from "react";
import { Transition } from '@headlessui/react'
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import homebg from "../assets/homebg.png";
import thumbsup from "../assets/thumbsup.png";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className=" w-full h-[648px] flex pt-4 md:pt-8 px-4 md:px-6 mb-12 md:mb-24 gap-2 lg:gap-10 justify-center  bg-priwhi overflow-hidden">
      
        <Transition
        show={isLogin}
        className=" w-full lg:max-w-[400px] h-full flex items-center justify-center  z-10 bg-transparent"
        enter="transition duration-500"
        enterFrom="opacity-0 -translate-x-[30%]"
        enterTo="opacity-100 translate-x-0"
        leave="transition-opacity duration-0"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Login setIsLogin={setIsLogin}/>
        </Transition>

        <Transition
        show={!isLogin}
        className=" w-full lg:max-w-[400px] z-10 bg-transparent"
        enter="transition duration-500"
        enterFrom="opacity-0 -translate-x-[30%]"
        enterTo="opacity-100 translate-x-0"
        leave="transition-opacity duration-0"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <SignUp setIsLogin={setIsLogin}/>
        </Transition>
        <div className=" hidden md:block rounded-lg overflow-hidden">
            <img className="w-[800px] h-[600px] object-cover" src={thumbsup} alt="" />
        </div>
        <div className=" block md:hidden absolute rounded-lg overflow-hidden">
            <img className="w-full h-[660px] object-cover" src={thumbsup} alt="" />
        </div>
    </div>
  );
}

export default Auth;
