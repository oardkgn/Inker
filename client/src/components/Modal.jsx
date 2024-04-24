import { Transition } from "@headlessui/react";
import React from "react";

function Modal({ show, text, activate, setShowModal }) {
  return (
    <Transition
      show={show}
      className=" fixed top-1/2 left-1/2 bg-transparent -translate-y-1/2 -translate-x-1/2"
      enter="transition duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className=" bg-pribla p-6 rounded-lg items-center justify-center flex flex-col gap-2 whitespace-nowrap right-2 text-priwhi text-xl">
        <h1 className=" bg-transparent text-center">{text}</h1>
        <div className=" flex w-full gap-4 bg-transparent">
        <button onClick={()=> {activate()}} className=" bg-red-300 p-2 text-red-600 flex-1 rounded-lg transition-all hover:scale-105 ">Yes</button>
        <button onClick={()=> {setShowModal(false)}} className=" bg-green-300 p-2 text-green-600 flex-1 rounded-lg transition-all hover:scale-105 ">No</button>
        </div>
      </div>
    </Transition>
  );
}

export default Modal;
