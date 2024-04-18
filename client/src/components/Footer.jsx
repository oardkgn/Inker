"use client";

import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import logo from "../assets/inkerLogo.png";
function Footer() {
  return (
    <footer className=" border w-full overflow-hidden border-opacity-50 max-w-[2460px] mx-auto border-t-pribla border-t-0.5">
      <div className=" overflow-hidden">
        <div className="flex justify-between px-12">
          <div>
            <img src={logo} alt="" srcset="" />
          </div>
          <div className="grid grid-cols-2 gap-6 sm:mt-4 sm:grid-cols-3 sm:gap-3">
            <div className=" flex flex-col">
              <h3 className=" font-semibold text-xl" >About</h3>
              <div className=" flex flex-col gap-2 mt-4">
                <a href="#">Flowbite</a>
                <a href="#">Tailwind CSS</a>
              </div>
            </div>
            <div className=" flex flex-col">
            <h3 className=" font-semibold text-xl" title="about" >Follow Us</h3>
              <div className=" flex flex-col gap-2 mt-4">
                <a href="#">Github</a>
                <a href="#">Discord</a>
              </div>
            </div>
            <div className=" flex flex-col">
            <h3 className=" font-semibold text-xl" title="about" >Legal</h3>
              <div className=" flex flex-col gap-2 mt-4">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-pribla bg-opacity-20 w-full rounded-full" />
        <div className="w-full py-4 px-12 sm:flex sm:items-center sm:justify-between">
            <div>Inker Copyrights 2020</div>
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <a href="#"><BsFacebook/></a>
            <a href="#"><BsInstagram/></a>
            <a href="#"><BsTwitter/></a>
            <a href="#"><BsGithub/></a>
            <a href="#"><BsDribbble/></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer