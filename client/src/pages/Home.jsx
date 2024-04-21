import React, { useState, useEffect } from "react";
import homebg from "../assets/homebg.png";

function Home() {
  useEffect(() => {}, []);

  return (
    <div className=" max-w-[2460px] mx-auto ">
      <div className="relative h-[400px] md:h-[500px] lg:h-[650px]">
        <img className="absolute bottom-0 w-full max-h-full" src={homebg} alt="" />
        <div className=" bg-transparent absolute lg:left-1/4 left-[5%]  sm:left-[20%] top-10 lg:top-20">
          <h3 className=" text-pribla bg-transparent  text-2xl md:text-4xl">
            <span
              className=" bg-transparent font-bold text-4xl md:text-8xl
      "
            >
              Inker
            </span>{" "}
            Stationary
          </h3>
          <p className=" bg-transparent text-pribla font-light text-sm md:text-lg mt-4">
            Discover our top stationery picks for refreshing your desk or
            library. <br /> From gratitude books to fancy fountain pens. <br />{" "}
            You’re come to the right place.
          </p>
          <button className=" bg-pribla rounded-md text-priwhi py-2 px-4 mt-4 transition-all hover:scale-110">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
