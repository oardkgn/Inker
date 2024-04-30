import React from "react";
import { useOutletContext } from "react-router-dom";

function Orders() {
  const [items, setItems, setShowNot, setNotify] = useOutletContext();

  const renderOrders = (item) => {
    let arr = [];
    if (item[1].names.length != 0) {
      for (let i = 0; i < item[1].names.length; i++) {
        arr.push(
          <div className=" bg-transparent w-32 relative" key={item[1].names[i]}>
            <img
              className=" rounded-md  h-48 w-full"
              src="https://m.media-amazon.com/images/I/81i1-a1lq9L._AC_UF1000,1000_QL80_.jpg"
              alt=""
            />
            <p className=" p-1 bg-transparent text-priwhi text-sm">
              {item[1].names[i]} 
             
            </p>
            <span className=" ml-2  bg-priwhi text-pribla p-2 rounded-lg absolute -top-1 -right-1  text-xl font-semibold">
                 x{item[1].amounts[i]}
              </span>
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

  return (
    <div className=" flex flex-col gap-4 min-h-[600px] max-h-[1000px] overflow-y-scroll">
      {items.length == 0 && <div className=" p-4 text-lg ">Could not find any order.</div> }
      {items.map((item, key) => {
        return (
          <div
            key={key}
            className="relative border-2 bg-pribla border-pribla p-4 rounded-lg flex justify-between"
          >
            <div className=" flex gap-4 bg-transparent">
              {renderOrders(item)}
            </div>
            <div className=" bg-transparent text-priwhi">
              <p className=" bg-transparent text-lg text-gray-500 p2-4">
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
  );
}

export default Orders;
