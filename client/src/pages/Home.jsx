import "swiper/css";
import "swiper/css/navigation";
import React, { useState, useEffect } from "react";
import homebg from "../assets/homebg.png";
import homeClock from "../assets/homeClock.png";
import homeSticky from "../assets/homeSticky.png";
import books from "../assets/books.png";
import office from "../assets/office.png";
import pens from "../assets/pens.png";
import stationary from "../assets/stationary.png";
import calendar from "../assets/calendar.png";
import lamp from "../assets/lamp.png";
import table from "../assets/table.png";
import axios from "axios";
import OneProduct from "../components/home/OneProduct";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

function Home() {
  const [topSellers, setTopSellers] = useState([]);
  const [topRateds, setTopRateds] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const getTopSellers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products/getTopSellerProducts`,
        {
          withCredentials: true,
        }
      );
      setTopSellers(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const getTopRateds = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products/getTopRatedProducts`,
        {
          withCredentials: true,
        }
      );
      setTopRateds(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };
  const getNewProducts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products/getNewProducts`,
        {
          withCredentials: true,
        }
      );
      setNewProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopSellers();
    getTopRateds();
    getNewProducts();
  }, []);

  return (
    <div className=" max-w-[2460px] pb-[500px] relative overflow-hidden  mx-auto ">
      <div className="relative bg-transparent z-20 h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] xl:h-[800px] 2xl:h-[960px] max-w-[1840px] mx-auto">
        <img
          className="absolute bottom-0 w-full max-h-full bg-transparent z-10 "
          src={homebg}
          alt=""
        />
        <img
          className="absolute -top-[5%] -right-[5%] bg-transparent w-[23%]"
          src={homeClock}
          alt=""
        />
        <img
          className="absolute top-[5%] -left-[5%] bg-transparent w-[35%]"
          src={homeSticky}
          alt=""
        />

        <div className=" bg-transparent absolute lg:left-[30%] left-[10%]  sm:left-[25%] top-20 2xl:top-44">
          <h3 className=" text-pribla bg-transparent  text-2xl md:text-4xl">
            <span
              className=" bg-transparent font-bold text-4xl md:text-8xl
      "
            >
              Inker
            </span>{" "}
            Stationary
          </h3>
          <p className=" bg-transparent text-pribla font-light text-sm md:text-lg mt-4">
            Discover our top stationery picks for refreshing your desk or
            library. <br /> From gratitude books to fancy fountain pens. <br />{" "}
            You’re come to the right place.
          </p>
          <button className=" bg-pribla rounded-md text-priwhi py-2 px-4 mt-4 transition-all hover:scale-110">
            Shop Now
          </button>
        </div>
      </div>
      <div className=" w-1/2 mx-auto h-[400px] grid grid-cols-4 gap-2 -mt-28 mb-20 text-2xl font-light">
        <button className=" transition-all hover:rotate-6"><img src={books} alt="" /><span>Books</span></button>
        <button className=" transition-all hover:rotate-6"><img src={pens} alt="" /><span>Pens</span></button>
        <button className=" transition-all hover:rotate-6"><img src={office} alt="" /><span>Office</span></button>
        <button className=" transition-all hover:rotate-6"><img src={stationary} alt="" /><span>Stationary</span></button>
      </div>
      <img src={table} className=" top-[1300px] right-4 absolute w-[900px]" alt="" />
      <img src={calendar} className=" top-[2100px] left-4 absolute w-[900px]" alt="" />
      <img src={lamp} className=" top-[2700px] -right-16 absolute w-[900px]" alt="" />
      <div className="bg-transparent px-20 mx-auto flex z-30   flex-col">
        <h1 className=" text-4xl text-pribla font-semibold bg-sticky1 z-20 bg-transparent bg-contain bg-no-repeat flex p-8 -ml-4 items-center justify-start ">
          {" "}
          <span className=" ml-12">Most Populars</span>{" "}
        </h1>
        <div className=" bg-transparent mt-6 ">
          <Swiper
            className=" px-12 bg-transparent  "
            spaceBetween={20}
            navigation={true}
            modules={[Navigation]}
            slidesPerView={5}
          >
            {topSellers.map((product, key) => {
              return (
                <SwiperSlide className=" bg-transparent p-4 rounded-lg backdrop-blur-md" key={key}>
                  <OneProduct product={product} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className=" mt-20 px-20 mx-auto flex z-30   flex-col">
        <h1 className=" text-4xl text-pribla font-semibold bg-sticky1 bg-contain bg-no-repeat flex p-8 -ml-4 items-center justify-start ">
          {" "}
          <span className=" ml-12">Best Ratings</span>{" "}
        </h1>
        <div className="bg-transparent relative mt-8 ">
          <Swiper
            className="bg-transparent w-full px-12 mt-6"
            spaceBetween={20}
            navigation={true}
            modules={[Navigation,Pagination]}
            slidesPerView={5}
          >
            {topRateds.map((product, key) => {
              return (
                <SwiperSlide className=" p-4 bg-transparent rounded-lg backdrop-blur-md" key={key}>
                  <OneProduct product={product} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      <div className="px-20 mt-20 mx-auto flex z-30   flex-col">
        <h1 className=" text-4xl text-pribla font-semibold bg-sticky1 bg-contain bg-no-repeat flex p-8 -ml-4 items-center justify-start ">
          {" "}
          <span className=" ml-12">New Products</span>{" "}
        </h1>
        <div className=" bg-transparent relative mt-6 ">
          <Swiper
            className=" bg-transparent w-full px-12 mt-5"
            spaceBetween={20}
            navigation={true}
            modules={[Navigation,Pagination]}
            slidesPerView={5}
          >
            {newProducts.map((product, key) => {
              return (
                <SwiperSlide className=" p-4 bg-transparent rounded-lg backdrop-blur-md"  key={key}>
                  <OneProduct product={product} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Home;
