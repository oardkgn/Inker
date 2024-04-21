"use client";

import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import logo from "../assets/inkerLogo.png";
function Footer() {
  return (
    <footer className=" border w-full bg-pribla  text-priwhi overflow-hidden border-opacity-50 max-w-[2460px] mx-auto border-t-pribla border-t-0.5">
      <div className=" bg-transparent overflow-hidden">
        <div className="flex flex-col md:flex-row gap-4 bg-transparent justify-between px-12 py-8">
          <div className=" bg-transparent">
            <img className=" bg-transparent" src={logo} alt=""/>
          </div>
          <div className="grid grid-cols-2 bg-transparent gap-6 sm:mt-4 sm:grid-cols-3 sm:gap-3">
            <div className=" flex bg-transparent flex-col">
              <h3 className=" font-semibold bg-transparent text-xl" >About</h3>
              <div className=" bg-transparent flex flex-col gap-2 mt-4">
                <a href="#">Flowbite</a>
                <a href="#">Tailwind CSS</a>
              </div>
            </div>
            <div className=" bg-transparent flex flex-col">
            <h3 className=" bg-transparent font-semibold text-xl" title="about" >Follow Us</h3>
              <div className="bg-transparent flex flex-col gap-2 mt-4">
                <a href="#">Github</a>
                <a href="#">Discord</a>
              </div>
            </div>
            <div className="bg-transparent flex flex-col">
            <h3 className="bg-transparent font-semibold text-xl" title="about" >Legal</h3>
              <div className="bg-transparent flex flex-col gap-2 mt-4">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-priwh bg-opacity-20 w-full rounded-full" />
        <div className="w-full bg-pribla py-4 px-12 sm:flex sm:items-center sm:justify-between">
            <div className=" bg-transparent">Inker Copyrights 2020</div>
          <div className="mt-4 bg-transparent flex space-x-6 sm:mt-0 sm:justify-center">
            <a href="#"><BsFacebook className=" bg-transparent"/></a>
            <a href="#"><BsInstagram className=" bg-transparent"/></a>
            <a href="#"><BsTwitter className=" bg-transparent"/></a>
            <a href="#"><BsGithub className=" bg-transparent"/></a>
            <a href="#"><BsDribbble className=" bg-transparent"/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer