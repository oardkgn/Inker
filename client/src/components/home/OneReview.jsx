import React,{useEffect} from "react";
import { useState } from "react";
import { FaStarHalf, FaStar } from "react-icons/fa";

function OneReview({ review }) {
  const [ratingStars, setRatingStars] = useState([])

    const getRatingStars = () => {
        const arr = []
        if (review.rating) {
            let star = Math.floor(review.rating)
            let halfStar = Math.ceil(review.rating - star)
            for (let i = 0; i < star; i++) {
                arr.push(<FaStar className=" bg-transparent text-priwhi" key={i} />)
            }
            if (halfStar) {
                arr.push(<FaStarHalf className=" bg-transparent text-priwhi" key={6} />)
            }
        }
        setRatingStars(arr)
    }

    useEffect(() => {
        getRatingStars()
    }, [review])
    


  return (
    <div className=" bg-pribla p-2 rounded-lg text-priwhi">
      <div className=" flex gap-2 bg-transparent items-center">
        <h1 className=" bg-transparent text-xl p-2 font-semibold">
          {review.user_email}
        </h1>
        <div className=" bg-transparent flex mr-auto">{ratingStars}</div>
        {review.comment_time && <p className=" text-sm text-gray-500 bg-transparent">{review.comment_time.split("T")[0]}</p>}
      </div>
      <p className=" bg-white bg-opacity-10 p-2 rounded-lg">{review.comment}</p>
    </div>
  );
}

export default OneReview;
