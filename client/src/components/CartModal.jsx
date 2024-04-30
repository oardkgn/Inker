import React, { useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { HiOutlineXMark } from "react-icons/hi2";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
function CartModal({ showCart, setShowCart, currentUser, setAmountCartItem }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [prices, setPrices] = useState({});
  const navigate = useNavigate();

  const getCartItems = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/getCartItems/${
          currentUser.email
        }`,
        {
          withCredentials: true,
        }
      );
      setAmountCartItem(res.data.length);
      setItems(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = () => {
    if (Object.keys(prices).length == 0) {
      let total = 0;
      items.forEach((item) => {
        total += item.price;
      });
      setTotal(Math.round(total * 100) / 100);
    } else {
      let total = 0;
      Object.values(prices).forEach((item) => {
        total += item;
      });

      setTotal(Math.round(total * 100) / 100);
    }
  };

  console.log(items,prices);

  const handleOrder = async () => {
    if (items.length) {
      let orders = [];
      let order_id = uuidv4();
      Object.keys(prices).forEach((id) => {
        const product = items.filter((item) => {
          return item.id == id;
        });
        orders.push({
          order_id,
          product_id: id,
          amount: Math.round(prices[id] / product[0].price),
          price: prices[id],
          totalPrice: total,
        });
      });
      console.log(orders);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/makeOrder`,
          { orders },
          {
            withCredentials: true,
          }
        );
        setTotal(0);
        setAmountCartItem(0);
        setShowCart(false);
        setItems([]);
        console.log(res);
        const res2 = await axios.delete(
          `${import.meta.env.VITE_BASE_URL}/user/delCart/${currentUser.email}`,
          {
            withCredentials: true,
          }
        );

        navigate("/profile")
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDel = (itemId) => {
   
    const pos = items.findIndex((el) => el.id === itemId);
    let itemsArr = items;
    itemsArr.splice(pos, 1);
    setItems([...itemsArr]);

    let arr = prices;
    delete arr[itemId];
    setPrices({...arr});

    getTotal()
  };

  useEffect(() => {
    getTotal();
  }, [prices]);

  useEffect(() => {
    getCartItems();
    getTotal();
    let prices = {};
    items.forEach((item) => {
      prices[item.id] = item.price;
    });
    setPrices(prices);
  }, [showCart]);

  useEffect(() => {
    getTotal();
  }, [items]);


  return (
    <Transition
      show={showCart}
      className="w-[400px] bg-pribla h-screen fixed right-0 bottom-0 z-50"
      enter="transition duration-500"
      enterFrom="opacity-0 translate-x-[30%]"
      enterTo="opacity-100 translate-x-0"
      leave="transition duration-500"
      leaveFrom="opacity-100 translate-x-0"
      leaveTo="opacity-0 translate-x-[30%]"
    >
      <div className=" bg-transparent ">
        <button
          className="p-2 rounded-lg bg-priwhi absolute right-5 top-8 transition-all hover:scale-110"
          onClick={() => {
            setPrices({});
            setShowCart(false);
          }}
        >
          <HiOutlineXMark />
        </button>
        <h3 className=" bg-transparent text-3xl text-priwhi font-semibold p-8">
          Shopping Cart
        </h3>
        <div className=" bg-transparent p-4 h-[560px] overflow-y-scroll">
          {items.map((item, key) => {
            const itemId = item.id;

            return (
              <div
                key={key}
                className=" relative p-4 bg-transparent border-b-2 border-priwhi border-opacity-10 flex gap-4 h-[200px] text-priwhi"
              >
                <img
                  className=" rounded-lg"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7q0SVkFGwJybZE1xQ8x2X0LtfL3PXGLXYew2-M1Ytpw&s"
                  alt=""
                />
                <div className=" bg-transparent flex flex-col gap-4">
                  <button
                    className="p-2 rounded-lg bg-red-500 absolute right-1 top-3 transition-all hover:scale-110"
                    onClick={() => handleDel(itemId)}
                  >
                    <HiOutlineXMark className=" bg-transparent" />
                  </button>
                  <p className=" bg-transparent text-2xl">{item.name}</p>
                  <div className=" bg-transparent">
                    #{" "}
                    <input
                      min={1}
                      max={10}
                      id={itemId}
                      onChange={(e) =>
                        setPrices({
                          ...prices,
                          [itemId]: e.target.value * item.price,
                        })
                      }
                      defaultValue={1}
                      className=" rounded-lg w-14 p-2 outline-none bg-white bg-opacity-10"
                      type="number"
                      name=""
                    />
                  </div>
                  {prices[itemId] && (
                    <p className=" bg-transparent text-priwhi text-xl font-semibold p-2">
                      {Math.round(prices[itemId] * 100) / 100}$
                    </p>
                  )}
                  {!prices[itemId] && (
                    <p className=" bg-transparent text-priwhi text-xl font-semibold p-2">
                      {item.price * 1}$
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className=" p-4 bg-transparent">
          <p className=" bg-transparent p-4 text-2xl text-priwhi">
            Total price - {total}$
          </p>
          <button
            onClick={handleOrder}
            className=" bg-green-500 text-priwhi text-xl text-center p-2 rounded-lg w-full transition-all hover:scale-105"
          >
            Order Now
          </button>
        </div>
      </div>
    </Transition>
  );
}

export default CartModal;
