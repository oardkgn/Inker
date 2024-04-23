import React, { useState, useContext } from "react";
import tabsArrow from "../assets/tabsArrow.png";

import UserUpdate from "../components/UserUpdate";

function Profile() {
  const [tabPos, setTabPos] = useState(45);




  


  return (
    <div className=" max-w-[2440px] mx-auto flex justify-center gap-4 items-start p-2 md:p-10">
      
      <UserUpdate/>

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
