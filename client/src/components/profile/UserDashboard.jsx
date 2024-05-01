import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import tabsArrow from "../../assets/tabsArrow.png";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import axios from "axios";
import OneReview from "../home/OneReview";
import { MdOutlineDelete } from "react-icons/md";
import OneProduct from "../home/OneProduct";
function UserDashboard() {
  const [tabPos, setTabPos] = useState(206);
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

  function groupOrders(orders) {
    const groupedOrders = {};

    orders.forEach((order) => {
      const { order_id, amount, images, name, price, total_price, order_time } =
        order;

      if (!groupedOrders[order_id]) {
        groupedOrders[order_id] = {
          names: [],
          prices: [],
          amounts: [],
          prices: [],
          images: [],
          order_time,
          total_price,
        };
      }

      groupedOrders[order_id].names.push(name);
      groupedOrders[order_id].amounts.push(amount);
      groupedOrders[order_id].prices.push(price); // Assuming price is the same as amount in your example
      groupedOrders[order_id].images.push(images);
    });

    return groupedOrders;
  }

  const getUserOrders = async () => {
    setItems([]);
    setTotalPages(1);
    const email = currentUser.email;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/getUserOrders/${email}`,
        {
          withCredentials: true,
        }
      );
      const groupedOrders = groupOrders(res.data.data);
      let arr = [];
      setItems(Object.entries(groupedOrders).forEach((item) => arr.push(item)));
      setItems(arr);
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

  const renderOrders = (item) => {
    let arr = [];
    if (item[1].names.length != 0) {
      for (let i = 0; i < item[1].names.length; i++) {
        arr.push(
          <div className=" bg-transparent max-w-40" key={item[1].names[i]}>
            <img
              className=" rounded-md  h-48 w-full object-cover"
              src={item[1].images[i]}
              alt=""
            />
            <p className=" bg-transparent text-priwhi text-sm">
              {item[1].names[i]}
              <span className=" ml-2 bg-transparent text-priwhi text-xl font-semibold">
                x{item[1].amounts[i]}
              </span>
            </p>
          </div>
        );
      }
    }
    return arr;
  };

  const setTime = (timeText) => {
    const dateParts = timeText.split("T");
    const date = dateParts[0];
    const time = dateParts[1].slice(0, 8); // Extract only the time part

    const properDateTimeString = `${date} - ${time}`;
    return properDateTimeString;
  };

  useEffect(() => {
    getUserOrders();
  }, []);

  useEffect(() => {
    if (tabPos == 45) {
      getUserReviews(page);
    } else if (tabPos == 128) {
      getUserLikes(page);
    } else {
      getUserOrders();
    }
  }, [page]);

  console.log(items);

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
              getUserOrders(1);
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
        {tabPos != 206 && (
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
        )}
      </div>
      <div className=" w-full flex gap-2">
        {items.length == 0 && <div className=" p-4 text-xl whitespace-nowrap">There is no item to show yet.</div>  }
        {tabPos == 45 && (
          <div className=" flex flex-col gap-4 w-full">
            {items.map((item, key) => {
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
        )}

        {tabPos == 128 && (
          <div className="grid bg-transparent grid-cols-2 md:grid-cols-4 gap-8 p-4">
            {items.map((item, key) => {
              return (
                <div key={key} className="relative bg-transparent">
                  <OneProduct product={item} />
                </div>
              );
            })}
          </div>
        )}

        {tabPos == 206 && (
          <div className="flex flex-col bg-transparent w-full gap-4 p-2">
            {items.map((item, key) => {
              return (
                <div
                  key={key}
                  className="relative border-2 bg-pribla border-pribla p-4 rounded-lg flex w-full justify-between"
                >
                  <div className=" flex gap-4 bg-transparent">
                    {renderOrders(item)}
                  </div>
                  <div className=" bg-transparent text-priwhi">
                    <p className=" bg-transparent text-lg text-gray-500 p-4">
                      {setTime(item[1].order_time)}
                    </p>
                    <p className=" bg-transparent text-2xl px-4">
                      Total - {item[1].total_price}$
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
