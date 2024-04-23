import { Transition } from "@headlessui/react";
import React,{useState} from "react";
import { TiTick } from "react-icons/ti";


function Notify({ show, text, type, setShowNot }) {

    setTimeout(() => {
        setShowNot(false)
    }, 5000);

  return (
    <Transition
      show={show}
      className="fixed bottom-2 right-2"
      enter="transition duration-500"
      enterFrom="opacity-0 translate-x-[30%]"
      enterTo="opacity-100 translate-x-0"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className=" bg-pribla p-6 rounded-lg items-center flex whitespace-nowrap right-2 text-priwhi text-xl">
        {type == "success" && (
          <TiTick size={40} className=" bg-transparent text-green-500" />
        )}
        {text}
      </div>
    </Transition>
  );
}

export default Notify;
