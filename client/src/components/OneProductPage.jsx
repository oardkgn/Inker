import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaRegStar } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { Rating } from "react-simple-star-rating";
import { AuthContext } from "../context/AuthContext";
import OneReview from "./home/OneReview";

function OneProductPage() {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [addingReview, setAddingReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState({
    rating: 0,
    comment: "",
    product_id:"",
    user_email:""
  });
  let { id } = useParams();
  const { currentUser } = useContext(AuthContext);

  const getRating = () => { // burayı degiştirecek
    if (product.reviews) {
      const numberOfRating = product.reviews.split(" ")[0];

      if (0 == numberOfRating) {
        setRating(0);
      } else {
        const arr = product.reviews.split(" ");
        arr.shift();
        let total = 0;
        arr.forEach((e) => {
          total += parseFloat(e);
        });
        const rating = (
          Math.round((total / numberOfRating) * 100) / 100
        ).toFixed(2);
        setRating(rating);
      }
    }
  };

  console.log(review);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/products/getProduct/${id}`, //sending product id as a param
        {
          withCredentials: true,
        }
      );
      setProduct(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getReviews = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/reviews/${id}`, //sending product id as a param
        {
          withCredentials: true,
        }
      );
      setReviews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resizeTA = (e) => {
    setReview({ ...review, comment: e.target.value });
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute(
        "style",
        "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
      );
      tx[i].addEventListener("input", OnInput, false);
    }
    function OnInput() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }
  };

  const handleRating = (rate) => {
    setReview({ ...review, rating: rate });
  };
  console.log(reviews);

  const makeReview = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/reviews/create`,
        review,
        {
          withCredentials: true,
        }
      );
      setReview({
        rating:0,
        comment:""
      })
      setAddingReview(false);
      getReviews();
      setReview({...review,product_id:product.id,user_email:currentUser.email})
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct();
    getReviews();
  }, []);
  useEffect(() => {
    getRating();
    setReview({...review,product_id:product.id,user_email:currentUser.email})
  }, [product]);

  return (
    <div className=" ">
      <div className="p-4 m-8 flex gap-6 h-[650px]">
        <div className=" w-full max-w-[400px] ">
          <img
            className=" h-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQruRlDDI0EUbDfj05Menp7Sw36Omm_oq66MTBQnWV4hw&s"
            alt=""
          />
        </div>
        <div className=" text-pribla max-w-[600px] flex flex-col justify-between">
          <div>
            <div className=" flex items-center gap-4">
              <h3 className=" text-4xl font-semibold">{product.name}</h3>
              <div className="flex gap-1 bg-transparent">
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
            </div>
            <p>{product.brand}</p>
            <p className=" mt-6  ">{product.description}</p>
            <div>
              {rating <= 5 && rating >= 4.5 && (
                <div
                  className={`my-6 py-2 px-4 text-2xl w-fit flex items-center gap-2 rounded-lg text-priwhi bg-green-800`}
                >
                  {rating}
                  <FaRegStar className=" bg-transparent" />
                </div>
              )}
              {rating <= 4.5 && rating >= 4 && (
                <div
                  className={`my-6 py-2 px-4 text-2xl w-fit flex items-center gap-2 rounded-lg text-priwhi bg-green-500`}
                >
                  {rating}
                  <FaRegStar className=" bg-transparent" />
                </div>
              )}
              {rating <= 4 && rating >= 3.5 && (
                <div
                  className={`my-6 py-2 px-4 text-2xl w-fit flex items-center gap-2 rounded-lg text-priwhi bg-green-300`}
                >
                  {rating}
                  <FaRegStar className=" bg-transparent" />
                </div>
              )}
              {rating <= 3.5 && rating >= 3 && (
                <div
                  className={`my-6 py-2 px-4 text-2xl w-fit flex items-center gap-2 rounded-lg text-priwhi bg-yellow-400`}
                >
                  {rating}
                  <FaRegStar className=" bg-transparent" />
                </div>
              )}
              {rating <= 3 && rating >= 2.5 && (
                <div
                  className={`my-6 py-2 px-4 text-2xl w-fit flex items-center gap-2 rounded-lg text-priwhi bg-yellow-700`}
                >
                  {rating}
                  <FaRegStar className=" bg-transparent" />
                </div>
              )}
              {rating <= 2.5 && rating >= 2 && (
                <div
                  className={`my-6 py-2 px-4 text-2xl w-fit flex items-center gap-2 rounded-lg text-priwhi bg-red-500`}
                >
                  {rating}
                  <FaRegStar className=" bg-transparent" />
                </div>
              )}
              {rating <= 2 && rating > 0 && (
                <div
                  className={`my-6 py-2 px-4 text-2xl w-fit flex items-center gap-2 rounded-lg text-priwhi bg-red-700`}
                >
                  {rating}
                  <FaRegStar className=" bg-transparent" />
                </div>
              )}
              {rating == 0 && (
                <div
                  className={`my-6 py-2 px-4 text-2xl w-fit flex items-center gap-2 rounded-lg text-priwhi bg-gray-400`}
                >
                  No Rating
                </div>
              )}
            </div>
            <p className="my-4 font-semibold text-3xl">{product.price}$</p>
          </div>

          <button className=" w-full bg-pribla text-priwhi font-semibold text-center p-4 rounded-lg transition-all hover:scale-105">
            Add to cart
          </button>
        </div>
        <div className=" flex-1 flex flex-col justify-between">
          <div>
            <h5 className=" text-2xl font-semibold mb-2 ">Reviews</h5>
            <div className=" flex flex-col gap-2 overflow-y-scroll max-h-[500px]">{rating == 0 && <p>There are no reviews yet.</p>}
              {reviews.length != 0 && reviews.map((review,key) => {
                return (<OneReview key={key} review={review}/>)
              })}
            </div>
          </div>
          <div className=" relative">
            {addingReview && (
              <div className=" absolute  -top-32 right-0 bg-transparent flex justify-end">
                <form
                  onSubmit={e => makeReview(e)}
                  className=" relative text-pribla p-2 flex gap-2 mb-2  border border-pribla w-[360px] rounded-lg"
                  action=""
                >
                  <div className=" flex-1 flex flex-col bg-transparent">
                    <div
                      style={{
                        direction: "ltr",
                        fontFamily: "sans-serif",
                        touchAction: "none",
                      }}
                      className=" flex flex-row bg-transparent"
                    >
                      <Rating
                        className=" bg-transparent rounded-lg"
                        allowFraction={true}
                        transition={true}
                        onClick={handleRating}
                      />
                    </div>
                    <textarea
                      onChange={(e) => resizeTA(e)}
                      value={review.comment}
                      placeholder="Your comment"
                      maxLength={1000}
                      className=" resize-none text-pribla bg-pribla bg-opacity-10 rounded-lg p-2 outline-none"
                      type="text"
                    />
                  </div>
                  <div className=" flex items-end bg-transparent">
                    <button className=" transition-all hover:scale-105 bg-green-500 text-priwhi p-2 rounded-lg h-fit">
                      Send
                    </button>
                    <button
                      type="button"
                      onClick={() => setAddingReview(false)}
                      className=" hover:scale-110 transition-all absolute top-1 right-1"
                    >
                      <MdCancel size={30} className=" bg-transparent" />
                    </button>
                  </div>
                </form>
              </div>
            )}
            <button
              onClick={() => setAddingReview(!addingReview)}
              className="w-full bg-pribla text-priwhi font-semibold text-center p-4 rounded-lg transition-all hover:scale-105"
            >
              Add Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneProductPage;
