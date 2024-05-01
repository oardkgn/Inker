import React, { useState, useContext, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function OneProduct({ product }) {
  const navigate = useNavigate();
  const {currentUser, setShowCart } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);

  const handleLike = async (id) => {
    if (!liked) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/like`,
          {
            id: id,
            email: currentUser.email,
          },
          {
            withCredentials: true,
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/user/dislike/${id},${
            currentUser.email
          }`,
          {
            withCredentials: true,
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    setLiked(!liked);
  };

  const isProductLiked = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/findLiked/${id},${
          currentUser.email
        }`,
        {
          withCredentials: true,
        }
      );
      if (res.data.length == 0) {
        setLiked(false);
      } else {
        setLiked(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async(id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/addToCart`,
        {
          id: id,
          email: currentUser.email,
        },
        {
          withCredentials: true,
        }
      );
      setShowCart(true);
    } catch (error) {
      alert("You have added this product yo your cart already!")
    }
  }

  useEffect(() => {
    isProductLiked(product.id);
  }, []);

  return (
    <div className=" bg-transparent">
      <div className="bg-transparent group h-[300px] relative  overflow-hidden">
        {product && (
          <div className=" absolute top-1 left-1 flex z-30 gap-1 bg-transparent">
            {product.subtypes?.split(" ").map((subtype, key) => {
              return (
                <div
                  key={key}
                  className=" bg-pribla text-priwhi p-1 rounded-lg"
                >
                  {subtype}
                </div>
              );
            })}
          </div>
        )}
        <div className=" overflow-hidden w-full h-full object-contain rounded-lg">
          <img
            onClick={() => {
              navigate(`product/${product.id}`);
            }}
            className="cursor-pointer bg-transparent transition-all group-hover:scale-125  w-full h-full  rounded-lg "
            src={product.images}
            alt=""
          />
        </div>

        <button
          onClick={() => handleLike(product.id)}
          className=" absolute -bottom-8  -right-8 group-hover:bottom-2 group-hover:right-2 rounded-full w-10 h-10 flex items-center justify-center transition-all hover:scale-105 bg-priwhi "
        >
          {liked ? <FaHeart size={25} /> : <FaRegHeart size={25} />}
        </button>
      </div>

      <h3 className=" bg-transparent text-xl h-14 flex items-center">
        {product.name}
      </h3>
      <p className=" bg-transparent pb-1 font-semibold">${product.price}</p>

      <button onClick={()=>addToCart(product.id)} className=" w-full bg-pribla text-priwhi font-semibold text-center p-4 rounded-lg transition-all hover:scale-105">
        Add to cart
      </button>
    </div>
  );
}

export default OneProduct;
