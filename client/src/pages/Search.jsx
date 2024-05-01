import React, { useEffect, useState } from "react";
import { FaBook, FaPen } from "react-icons/fa6";
import { MdLocalPostOffice } from "react-icons/md";
import { BsEraserFill } from "react-icons/bs";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";

import axios from "axios";
import {
  bookSubTypes,
  officeSubtypes,
  penSubtypes,
  stationarySubtypes,
} from "../products";
import OneProduct from "../components/home/OneProduct";
import { useParams } from "react-router-dom";

function Search() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tabs, setTabs] = useState("books");
  const [subType, setSubType] = useState("");
  const [products, setProducts] = useState([]);
  let { text } = useParams();
  
  const getSubTypes = (type) => {
    let arr = [];

    if (tabs == "books") {
      bookSubTypes.forEach((item) => {
        arr.push(
          <button key={item} onClick={()=>{setSubType(item);getSubTypeProducts(1,tabs,item)}} className={`px-2 py-1 whitespace-nowrap rounded-lg text-priwhi transition-all hover:bg-white hover:bg-opacity-70 text-md ${subType == item && " !bg-priwhi !text-pribla"}`}>
            {item}
          </button>
        );
      });
    } else if (tabs == "pens") {
      penSubtypes.forEach((item) => {
        arr.push(
          <button key={item} onClick={()=>{setSubType(item);getSubTypeProducts(1,tabs,item)}} className={`px-2 py-1 whitespace-nowrap rounded-lg text-priwhi transition-all hover:bg-white hover:bg-opacity-70 text-md ${subType == item && " !bg-priwhi !text-pribla"}`}>
            {item}
          </button>
        );
      });
    } else if (tabs == "office") {
      officeSubtypes.forEach((item) => {
        arr.push(
          <button key={item} onClick={()=>{setSubType(item);getSubTypeProducts(1,tabs,item)}} className={`px-2 py-1 whitespace-nowrap rounded-lg text-priwhi transition-all hover:bg-white hover:bg-opacity-70 text-md ${subType == item && " !bg-priwhi !text-pribla"}`}>
            {item}
          </button>
        );
      });
    } else if (tabs == "stationary") {
      stationarySubtypes.forEach((item) => {
        arr.push(
          <button key={item} onClick={()=>{setSubType(item);getSubTypeProducts(1,tabs,item)}} className={`px-2 py-1 whitespace-nowrap rounded-lg text-priwhi transition-all hover:bg-white hover:bg-opacity-70 text-md ${subType == item && " !bg-priwhi !text-pribla"}`}>
            {item}
          </button>
        );
      });
    }
    return arr;
  };

  const getProducts = async (type, page) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/getAllProducts`,
        { page: page },
        {
          withCredentials: true,
        }
      );
      setProducts(res.data.products);
      setTotalPages(Math.ceil(res.data.totalProducts / 10));
    } catch (error) {
      console.log(error);
    }
  };


  const getTypeProduct = async (type, page) => {
    console.log(type,page);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/getTypeProduct`,
        { page: page, type: type },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      setProducts(res.data.products);
      setTotalPages(Math.ceil(res.data.totalProducts / 10));
    } catch (error) {
      console.log(error);
    }
  };

  const getSubTypeProducts = async (page, type, subType) => {
    console.log(type,page,subType);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/products/getSubTypeProducts`,
        { page: page, type: type, subType: subType },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setProducts(res.data.products);
      setTotalPages(Math.ceil(res.data.totalProducts / 10));
    } catch (error) {
      console.log(error);
    }
  };

  const searchProduct = async(text,page) => {
    console.log(text);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/search/${text}`,
        { page: page },
        {
          withCredentials: true,
        }
      );
      console.log(res);
      setTotalPages(Math.ceil(res.data.totalProducts / 10));
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  

  useEffect(() => {
    if (tabs == "books") {
      getSubTypes("books");
      getTypeProduct("Book",1)
    } else if (tabs == "pens") {
      getSubTypes("pens");
      getTypeProduct("Pen",1)
    } else if (tabs == "office") {
      getSubTypes("office");
      getTypeProduct("Office",1)
    } else if (tabs == "stationary") {
      getSubTypes("stationary");
      getTypeProduct("Stationary",1)
    }
  }, [tabs]);

  useEffect(() => {
    if (text) {
      if (text == "book") {
        setTabs("books")
      }else if(text == "pen"){
        setTabs("pens")
      }else if(text == "office"){
        setTabs("office")
      }else if(text == "stationary"){
        setTabs("stationary")
      }
      searchProduct(text,1);
    }else{
      
      getTypeProduct("Book", 1);
    }
  }, [text]);

  useEffect(() => {
    console.log(tabs);
    if (tabs == "books") {
      if (subType) {
        getSubTypeProducts(page,"Book",subType)
      }else{
        getTypeProduct("Book",page)
      }
    } else if (tabs == "pens") {
      if (subType) {
        getSubTypeProducts(page,"Pens",subType)
      }else{
        getTypeProduct("Pens",page)
      }
    } else if (tabs == "office") {
      if (subType) {
        getSubTypeProducts(page,"Office",subType)
      }else{
        getTypeProduct("Office",page)
      }
    } else if (tabs == "stationary") {
      if (subType) {
        getSubTypeProducts(page,"Stationary",subType)
      }else{
        getTypeProduct("Stationary",page)
      }
    }
  }, [page]);

  return (
    <div className=" max-w-[2440px] mx-auto min-h-[760px] p-4 flex flex-col md:flex-row gap-4">
        {/* Side Nav Bar */}
      <div className=" min-w-[270px] h-full bg-pribla rounded-lg text-sm md:text-xl text-priwhi p-2 flex flex-row md:flex-col gap-2">
        <button
          onClick={() => setTabs("books")}
          className={`transition-all hover:bg-white hover:bg-opacity-10 w-full flex bg-transparent items-center gap-2 rounded ${
            tabs == "books" && "!bg-priwhi text-pribla"
          }`}
        >
          <p className="pl-2 py-2 md:pl-4 md:py-4 bg-transparent">Books </p>
          <FaBook className=" bg-transparent" />
        </button>
        <button
          onClick={() => setTabs("pens")}
          className={`transition-all hover:bg-white hover:bg-opacity-10 w-full flex bg-transparent items-center gap-2 rounded ${
            tabs == "pens" && "!bg-priwhi text-pribla"
          }`}
        >
          <p className="pl-2 py-2 md:pl-4 md:py-4 bg-transparent">Pens </p>
          <FaPen className=" bg-transparent" />
        </button>
        <button
          onClick={() => setTabs("office")}
          className={`transition-all hover:bg-white hover:bg-opacity-10 w-full flex bg-transparent items-center gap-2 rounded ${
            tabs == "office" && "!bg-priwhi text-pribla"
          }`}
        >
          <p className="pl-2 py-2 md:pl-4 md:py-4 bg-transparent">Office </p>
          <MdLocalPostOffice className=" bg-transparent" />
        </button>
        <button
          onClick={() => setTabs("stationary")}
          className={`transition-all hover:bg-white hover:bg-opacity-10 w-full flex bg-transparent items-center gap-2 rounded ${
            tabs == "stationary" && "!bg-priwhi text-pribla"
          }`}
        >
          <p className="pl-2 py-2 md:pl-4 md:py-4 bg-transparent">Stationary </p>
          <BsEraserFill className=" bg-transparent" />
        </button>
      </div>

      <div className=" flex-1">
        <div className=" bg-pribla flex justify-between gap-2 text-md rounded-lg w-full p-2 text-priwhi">
          <div className=" bg-transparent flex gap-2 max-w-[90%] flex-wrap">
            {getSubTypes()}
          </div>
          {/* Pagination */}
          <div className=" gap-2 bg-transparent items-center hidden md:flex">
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

            {page != totalPages && products.length != 0 && (
              <button
                onClick={() => setPage(page + 1)}
                className=" bg-transparent text-priwhi border border-priwhi w-10 h-10 flex items-center justify-center rounded-lg transition-all hover:scale-105 text-xl"
              >
                <IoCaretForward className=" bg-transparent" />
              </button>
            )}
          </div>
        </div>
        <div className=" grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-8 gap-y-16 p-4">
          {products.map((product, key) => {
            return <OneProduct key={key} product={product} />;
          })}
        </div>
        <div className=" bg-pribla p-2 rounded-lg flex md:hidden">
        <div className=" gap-2 bg-transparent flex items-center ">
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

            {page != totalPages && products.length != 0 && (
              <button
                onClick={() => setPage(page + 1)}
                className=" bg-transparent text-priwhi border border-priwhi w-10 h-10 flex items-center justify-center rounded-lg transition-all hover:scale-105 text-xl"
              >
                <IoCaretForward className=" bg-transparent" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
