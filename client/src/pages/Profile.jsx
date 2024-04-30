import React from "react";
import UserUpdate from "../components/profile/UserUpdate";
import UserDashboard from "../components/profile/UserDashboard.jsx";

function Profile() {





  


  return (
    <div className=" max-w-[2440px] mx-auto flex justify-center gap-4 items-start p-2 md:p-10">
      <UserUpdate/>
      <UserDashboard />
    </div>
  );
}

export default Profile;
