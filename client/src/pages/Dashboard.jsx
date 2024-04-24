import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdSell } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import axios from "axios";
import User from "../components/User";

function Dashboard() {
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);



  const handleUsers = async () => {
    setTab("users");
    try {
      const users = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/getUsers`,
        { limit: 1 },
        {
          withCredentials: true,
        }
      );
      setUsers(users.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProducts = () => {
    setTab("products");
  };
  const handleReviews = () => {
    setTab("reviews");
  };
  const handleOrders = () => {
    setTab("orders");
  };

  useEffect(() => {
    handleUsers();
  }, [])
  

  return (
    <div className=" max-w-[2440px] mx-auto p-8">
      <h4 className=" text-4xl text-pribla border-b-2 border-pribla">
        Dashboard
      </h4>
      <div className=" flex gap-4   h-[700px] ">
        <div className=" h-full border-r-2 p-4 w-fit border-pribla">
          <div className=" rounded-lg flex flex-col w-72 p-4 h-full bg-pribla  gap-4 ">
            <button
              onClick={handleUsers}
              className={
                tab == "users"
                  ? " transition-all flex gap-2 items-center  text-left text-pribla p-4 border border-priwhi bg-priwhi rounded-lg"
                  : " transition-all flex gap-2 items-center  text-left text-priwhi p-4 border border-priwhi bg-pribla rounded-lg"
              }
            >
              Users
              <FaUsers size={20} className=" bg-transparent" />
            </button>
            <button
              onClick={handleProducts}
              className={
                tab == "products"
                  ? " transition-all flex gap-2 items-center  text-left text-pribla p-4 border border-priwhi bg-priwhi rounded-lg"
                  : " transition-all flex gap-2 items-center  text-left text-priwhi p-4 border border-priwhi bg-pribla rounded-lg"
              }
            >
              Products
              <MdSell size={20} className=" bg-transparent" />
            </button>
            <button
              onClick={handleReviews}
              className={
                tab == "reviews"
                  ? " transition-all flex gap-2 items-center  text-left text-pribla p-4 border border-priwhi bg-priwhi rounded-lg"
                  : " transition-all flex gap-2 items-center  text-left text-priwhi p-4 border border-priwhi bg-pribla rounded-lg"
              }
            >
              Reviews
              <MdRateReview size={20} className=" bg-transparent" />
            </button>
            <button
              onClick={handleOrders}
              className={
                tab == "orders"
                  ? " transition-all flex gap-2 items-center  text-left text-pribla p-4 border border-priwhi bg-priwhi rounded-lg"
                  : " transition-all flex gap-2 items-center  text-left text-priwhi p-4 border border-priwhi bg-pribla rounded-lg"
              }
            >
              Orders
              <MdLocalShipping size={20} className=" bg-transparent" />
            </button>
          </div>
        </div>
        <div className=" w-full text-pribla">
          <h3 className="text-4xl -mt-11">
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </h3>
          <div className=" mt-4 bg-pribla p-2 rounded-lg w-full">
            <div className="max-w-[400px] bg-transparent relative">
              <input
                type="text"
                className=" bg-priwhi rounded-lg outline-none p-2  w-full"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 pr-0 group">
                <FiSearch className=" group-hover:scale-110 transition-all  bg-transparent " />
              </button>
            </div>
          </div>
          <div className=" mt-4 flex flex-col gap-4">
            {users.map((user, key) => {
                return (
                    <User key={key} user={user} />
                )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
