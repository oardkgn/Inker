import React, {useState,useEffect} from "react";
import homebg from "../assets/homebg.png";

function Home() {
  useEffect(() => {
   
  }, [])
  

  return (
    <div className=" max-w-[2460px] mx-auto ">
      
      <div className=" relative">
        <img
          className=" w-full mx-auto h-[600px] object-contain"
          src={homebg}
          alt=""
        />
         <div className=" bg-transparent absolute left-1/4 exl:left-1/3 top-1/4">
      <h3 className=" text-pribla text-4xl"><span className=" font-bold text-8xl">Inker</span> Stationary</h3>
      <p className=" bg-transparent text-pribla font-light text-lg mt-2">
        Discover our top stationery picks for refreshing your desk or library. <br /> From
        gratitude books to fancy fountain pens. <br /> You’re come to the right
        place.
      </p>
      <button className=" bg-pribla rounded-md text-priwhi py-2 px-4 mt-2 transition-all hover:scale-110">Shop Now</button>
      </div>
      </div>

    </div>
  );
}

export default Home;
