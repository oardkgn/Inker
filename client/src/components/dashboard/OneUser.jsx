import React from "react";
import { IoMdPerson } from "react-icons/io";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";

function User({ user, setShowNot, setNotify, setUsers, users }) {
  const handleDel = async () => {
    const email = user.email;
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/admin/user/delete/${email}`, {
        withCredentials: true,
      });
      setShowNot(true)
      setNotify({
        text:"User deleted successfully.",
        type:"success"
      })
      const newUsers = users.filter((user) => {
        if (user.email != email) {
          return user
        }
      })
      setUsers(newUsers)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" border flex items-center justify-between border-pribla p-4 rounded-lg w-full">
      <div className=" flex gap-6 items-center">
      <IoMdPerson size={30} />
      <h3 className=" text-lg font-semibold">
        {user.name} {user.surname}
      </h3>
      <h3>{user.email}</h3>
      </div>
      <button onClick={handleDel} className=" transition-all hover:scale-105 justify-center rounded-lg p-3 flex items-center bg-red-600 text-priwhi">
        Delete Account
        <MdOutlineDelete size={24} className=" bg-transparent" />
      </button>
    </div>
  );
}

export default User;
