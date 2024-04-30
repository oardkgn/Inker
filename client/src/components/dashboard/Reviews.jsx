import React from "react";
import { useOutletContext } from "react-router-dom";
import OneReview from "../home/OneReview";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
function Reviews() {
  const [items, setItems, setShowNot, setNotify] = useOutletContext();

  const handleDel = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/admin/review/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      setShowNot(true);
      setNotify({
        text: "Review deleted successfully.",
        type: "success",
      });
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

  return (
    <>
      {items.length != 0 ? (
        <div className=" flex flex-col gap-2">
          {items.map((item, key) => {
            return (
              <div key={key} className="flex relative gap-2">
                <div className=" w-full">
                  <OneReview review={item} />
                </div>
                <div className=" bg-pribla absolute flex gap-2 items-center top-2 right-20 rounded-lg">
                  <p className="bg-transparent text-priwhi top-3">
                    ProductId:{item.product_id}
                  </p>
                  <button
                    onClick={() => handleDel(item.id)}
                    className="transition-all hover:scale-105 justify-center rounded-lg p-3 flex items-center bg-red-600 text-priwhi"
                  >
                    <MdOutlineDelete size={18} className=" bg-transparent" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className=" text-lg text-pribla">There is no review to show.</div>
      )}
    </>
  );
}

export default Reviews;
