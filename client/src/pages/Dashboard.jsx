import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdSell } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import axios from "axios";
import User from "../components/User";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
function Dashboard() {
  const [tab, setTab] = useState("users");
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("")
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const handleUsers = async (page) => {
    setTab("users");
    try {
      const users = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/getUsers`,
        { page: page },
        {
          withCredentials: true,
        }
      );
      setTotalPages(Math.ceil(users.data.totalUsers / 5));
      setUsers(users.data.users);
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
    handleUsers(1);
  }, []);

  useEffect(() => {
    handleUsers(page);
  }, [page]);

  const makeSearch = async(e)=>{
    e.preventDefault();
    setPage(1);
    try {
      const findedUsers = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/search/${searchText}`,
        { page: page },
        {
          withCredentials: true,
        }
      );
      setTotalPages(Math.ceil(findedUsers.data.totalUsers / 5));
      setUsers(findedUsers.data.users);
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className=" max-w-[2440px] mx-auto p-8">
      <h4 className=" text-4xl text-pribla border-b-2 border-pribla">
        Dashboard
      </h4>
      <div className=" flex gap-4   h-[700px] ">
        <div className=" h-full border-r-2 p-4 w-fit border-pribla">
          <div className=" rounded-lg flex flex-col w-72 p-4 h-full bg-pribla  gap-4 ">
            <button
              onClick={() => handleUsers(1)}
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
          <div className=" mt-4 bg-pribla p-2 rounded-lg flex items-center justify-between w-full">
            <form onSubmit={e => makeSearch(e)} className="max-w-[400px] w-full bg-transparent relative">
              <input
                type="text"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className=" bg-priwhi rounded-lg outline-none p-2  w-full"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 pr-0 group">
                <FiSearch className=" group-hover:scale-110 transition-all  bg-transparent " />
              </button>
            </form>
            <div className=" gap-2 bg-transparent flex items-center">
              {page != 1 && (
                <button
                  onClick={() => setPage(page - 1)}
                  className=" bg-transparent text-priwhi border border-priwhi w-10 h-10 flex items-center justify-center rounded-lg transition-all hover:scale-105 text-xl"
                >
                  <IoCaretBack className=" bg-transparent" />
                </button>
              )}

              {page - 1 > 0 && (
                <button
                  onClick={() => setPage(page - 1)}
                 
                  className={`w-10 h-10 flex justify-center items-center rounded-lg text-priwhi 
                  }`}
                >
                  {page - 1}
                </button>
              )}
              <button
                onClick={() => setPage(page)}
                className={`w-10 h-10 flex justify-center items-center rounded-lg 
                    !text-pribla bg-priwhi
                `}
              >
                {page}
              </button>
              {page + 1 <= totalPages && (
                <button
                  onClick={() => setPage(page + 1)}
                  className={`w-10 h-10 flex justify-center items-center rounded-lg text-priwhi 
                  }`}
                >
                  {page + 1}
                </button>
              )}
              {page + 2 <= totalPages && (
                <button
                  onClick={() => setPage(page + 2)}
                  className={`w-10 h-10 flex justify-center items-center rounded-lg text-priwhi 
                  }`}
                >
                  {page + 2}
                </button>
              )}
             

              {page != totalPages && (
                <button
                  onClick={() => setPage(page + 1)}
                  className=" bg-transparent text-priwhi border border-priwhi w-10 h-10 flex items-center justify-center rounded-lg transition-all hover:scale-105 text-xl"
                >
                  <IoCaretForward className=" bg-transparent" />
                </button>
              )}
            </div>
          </div>
          <div className=" mt-4 flex flex-col gap-4">
            {users.map((user, key) => {
              return <User key={key} user={user} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
