import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import tabsArrow from "../../assets/tabsArrow.png";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import axios from "axios";
import OneReview from "../home/OneReview";
import { MdOutlineDelete } from "react-icons/md";
import OneProduct from "../home/OneProduct";
function UserDashboard() {
  const [tabPos, setTabPos] = useState(45);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { currentUser, updateUser } = useContext(AuthContext);

  const getUserReviews = async (page) => {
    setItems([]);
    setTotalPages(1);
    const email = currentUser.email;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/getUserReviews/${email}`,
        { page: page },
        {
          withCredentials: true,
        }
      );

      setItems(res.data.data);
      setTotalPages(Math.ceil(res.data.total_reviews / 10));
    } catch (error) {
      console.log(error);
    }
  };

  const getUserLikes = async (page) => {
    setItems([]);
    setTotalPages(1);
    const email = currentUser.email;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/getUserLikes/${email}`,
        { page: page },
        {
          withCredentials: true,
        }
      );

      setItems(res.data.data);
      setTotalPages(Math.ceil(res.data.total_likes / 8));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRevDel = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/user/review/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      const newReview = items.filter((rev) => {
        if (rev.id != id) {
          return rev;
        }
      });
      setItems(newReview);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserReviews(1);
  }, []);

  useEffect(() => {
    if (tabPos == 45) {
        getUserReviews(page)
    }else if ( tabPos == 128){
        getUserLikes(page)
    }
  }, [page]);

  return (
    <div className=" w-full min-h-[1000px] flex flex-col gap-4">
      <div className=" relative bg-pribla font-semibold rounded-lg p-4 flex justify-between gap-2">
        {/* User dashboard navigation tab */}
        <div className=" bg-transparent flex gap-2">
          <button
            onClick={() => {
              setTabPos(45);
              getUserReviews(1);
            }}
            className=" bg-priwhi rounded-lg py-2 px-4"
          >
            Reviews
          </button>
          <button
            onClick={() => {
              setTabPos(128);
              getUserLikes(1);
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
          <img
            className={"bg-transparent w-6 absolute bottom-0 transition-all "}
            style={{ left: tabPos }}
            src={tabsArrow}
          />
        </div>
        {/* User dashboard pagination tab */}
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
              className={`w-10 h-10 flex justify-center transition-all hover:scale-110 items-center rounded-lg text-priwhi 
                  }`}
            >
              {page - 1}
            </button>
          )}
          <button
            onClick={() => setPage(page)}
            className={`w-10 h-10 flex justify-center transition-all hover:scale-110 items-center rounded-lg 
                    !text-pribla bg-priwhi
                `}
          >
            {page}
          </button>
          {page + 1 <= totalPages && (
            <button
              onClick={() => setPage(page + 1)}
              className={`w-10 h-10 flex justify-center transition-all hover:scale-110 items-center rounded-lg text-priwhi 
                  }`}
            >
              {page + 1}
            </button>
          )}
          {page + 2 <= totalPages && (
            <button
              onClick={() => setPage(page + 2)}
              className={`w-10 h-10 flex justify-center transition-all hover:scale-110 items-center rounded-lg text-priwhi 
                  }`}
            >
              {page + 2}
            </button>
          )}

          {page != totalPages && items?.length != 0 && (
            <button
              onClick={() => setPage(page + 1)}
              className=" bg-transparent text-priwhi border border-priwhi w-10 h-10 flex items-center justify-center rounded-lg transition-all hover:scale-105 text-xl"
            >
              <IoCaretForward className=" bg-transparent" />
            </button>
          )}
        </div>
      </div>
      <div className=" w-full">
        <div className=" flex flex-col gap-4">
        {tabPos == 45 &&
          items.map((item, key) => {
            return (
              <div key={key} className="relative">
                <OneReview review={item} />
                <button
                  onClick={() => handleRevDel(item.id)}
                  className=" absolute -right-4 -top-3 transition-all hover:scale-105 justify-center rounded-lg p-3 flex items-center bg-red-600 text-priwhi"
                >
                  <MdOutlineDelete size={14} className=" bg-transparent" />
                </button>
              </div>
            );
          })}
        </div>
        <div className="grid bg-transparent grid-cols-4 gap-8 p-4"> 
        {tabPos == 128 &&
          items.map((item, key) => {
            return (
              <div key={key} className="relative bg-transparent">
                <OneProduct product={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
