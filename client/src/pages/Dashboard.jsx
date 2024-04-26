import React, { useState, useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { MdSell } from "react-icons/md";
import { MdRateReview } from "react-icons/md";
import { MdLocalShipping } from "react-icons/md";
import axios from "axios";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import Notify from "../components/Notify";
import { Outlet, useNavigate } from "react-router-dom";
import { TiPlus } from "react-icons/ti";
import EditProduct from "../components/dashboard/EditProduct";
function Dashboard() {
  const [tab, setTab] = useState("users");
  const [page, setPage] = useState(1);
  const [showNot, setShowNot] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [notify, setNotify] = useState({
    text: "",
    type: "",
  });
  const [searchText, setSearchText] = useState("");
  const [searching, setSearching] = useState(false);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  const handleUsers = async (page) => {
    setTab("users");
    setItems([]);
    setTotalPages(1);
    navigate("/dashboard/users");
    try {
      const users = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/admin/getUsers`,
        { page: page },
        {
          withCredentials: true,
        }
      );
      setTotalPages(Math.ceil(users.data.totalUsers / 5));
      setItems(users.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProducts = async (page) => {
    setTab("products");
    setItems([]);
    setTotalPages(1);
    navigate("/dashboard/products");
    try {
      const products = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/getProducts`,
        { page: page },
        {
          withCredentials: true,
        }
      );
      setTotalPages(Math.ceil(products.data.totalProducts / 5));
      setItems(products.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReviews = () => {
    setTab("reviews");
    navigate("/dashboard/reviews");
    setItems([]);
    setTotalPages(1);
  };
  const handleOrders = () => {
    setTab("orders");
    navigate("/dashboard/orders");
    setItems([]);
    setTotalPages(1);
  };

  useEffect(() => {
    handleUsers(1);
  }, []);

  useEffect(() => {
    if (tab == "users") {
      if (searching == false) {
        handleUsers(page);
      } else {
        makeSearch();
      }
    } else if (tab == "products") {
      if (searching == false) {
        handleProducts(page);
      } else {
        makeSearch();
      }
    }
  }, [page]);

  const makeSearch = async (e) => {
    if (e) {
      e.preventDefault();
    }
    setSearching(true);
    if (tab == "users") {
      try {
        const findedUsers = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/admin/user/search/${searchText}`,
          { page: page },
          {
            withCredentials: true,
          }
        );
        setTotalPages(Math.ceil(findedUsers.data.totalUsers / 5));
        setItems(findedUsers.data.users);
      } catch (error) {
        console.log(error);
      }
    } else if (tab == "products") {
      try {
        const findedProducts = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/products/search/${searchText}`,
          { page: page },
          {
            withCredentials: true,
          }
        );
        setTotalPages(Math.ceil(findedProducts.data.totalProducts / 5));
        setItems(findedProducts.data.products);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAll = () => {
    setSearchText("");
    setSearching(false);
    if (tab == "users") {
      handleUsers(1);
    } else if (tab == "products") {
      handleProducts(1);
    }
  };

  return (
    <div className=" max-w-[2440px] mx-auto p-8">
       <EditProduct type={"Create"} setShowProductModal={setShowProductModal} showProductModal={showProductModal} />
      <h4 className=" text-4xl text-pribla border-b-2 border-pribla">
        Dashboard
      </h4>
      <div className=" flex gap-4 ">
        <div className=" h-full border-r-2 p-4 w-fit border-pribla">
          {/* dashboard navbar */}

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
              onClick={() => handleProducts(1)}
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
            <div className=" flex gap-2 bg-transparent max-w-[500px] w-full">
              <form
                onSubmit={(e) => makeSearch(e)}
                className=" w-full bg-transparent relative"
              >
                <input
                  type="text"
                  placeholder="Search"
                  value={searchText}
                  minLength={2}
                  onChange={(e) => setSearchText(e.target.value)}
                  className=" bg-priwhi rounded-lg outline-none p-2  w-full"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 pr-0 group">
                  <FiSearch className=" group-hover:scale-110 transition-all  bg-transparent " />
                </button>
              </form>
              <button
                onClick={getAll}
                className=" text-priwhi py-2 px-4 transition-all hover:scale-105 border rounded-lg"
              >
                All
              </button>
              {tab == "products" && (
                <button
                  onClick={() => setShowProductModal(true)}
                  className=" text-priwhi flex items-center gap-1 bg-green-500 py-2 px-4 transition-all hover:scale-105 rounded-lg"
                >
                  <span className=" bg-transparent whitespace-nowrap">Create Product</span> <TiPlus className=" bg-transparent" />
                </button>
              )}
            </div>

            {/* pagination */}

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

              {page != totalPages && items.length != 0 && (
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
            <Outlet context={[items, setItems, setShowNot, setNotify]} />
          </div>
        </div>
      </div>
      <Notify
        text={notify.text}
        type={notify.type}
        show={showNot}
        setShowNot={setShowNot}
      />
    </div>
  );
}

export default Dashboard;
