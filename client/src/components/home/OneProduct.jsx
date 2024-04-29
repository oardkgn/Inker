import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function OneProduct({ product }) {
    const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className=" bg-transparent">
      <div className="bg-transparent group relative ">
        <div className=" absolute top-1 left-1 flex gap-1 bg-transparent">
          {product.subtypes.split(" ").map((subtype, key) => {
            return (
              <div key={key} className=" bg-pribla text-priwhi p-1 rounded-lg">
                {subtype}
              </div>
            );
          })}
        </div>
        <div className=" overflow-hidden rounded-lg">
          <img
          onClick={() => {navigate(`product/${product.id}`)}}
            className="cursor-pointer bg-transparent transition-all group-hover:scale-125 w-full rounded-lg object-contain "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQruRlDDI0EUbDfj05Menp7Sw36Omm_oq66MTBQnWV4hw&s"
            alt=""
          />
        </div>

        <button
          onClick={handleLike}
          className=" absolute bottom-2  right-2 rounded-full w-10 h-10 flex items-center justify-center transition-all hover:scale-105 bg-priwhi "
        >
          {liked ? <FaHeart size={25} /> : <FaRegHeart size={25} />}
        </button>
      </div>

      <h3 className=" bg-transparent text-xl h-14 flex items-center">
        {product.name}
      </h3>
      <p className=" bg-transparent pb-1 font-semibold">${product.price}</p>

      <button className=" w-full bg-pribla text-priwhi font-semibold text-center p-4 rounded-lg transition-all hover:scale-105">
        Add to cart
      </button>
    </div>
  );
}

export default OneProduct;
