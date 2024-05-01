import React, { useState } from "react";
import { MdOutlineDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import UpdateProduct from "./UpdateProduct";

function product({
  product,
  setShowNot,
  setNotify,
  setProducts,
  products,
}) {
  const [showProductModal, setShowProductModal] = useState(false);
  const handleDel = async () => {
    const id = product.id;
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/products/delete/${id}`,
        {
          withCredentials: true,
        }
      );
      setShowNot(true);
      setNotify({
        text: "Product deleted successfully.",
        type: "success",
      });
      const newProducts = products.filter((product) => {
        if (product.id != id) {
          return product;
        }
      });
      setProducts(newProducts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" relative top border text-pribla flex flex-col lg:flex-row items-center  border-pribla p-4 rounded-lg w-full">
      <UpdateProduct
        product={product}
        showProductModal={showProductModal}
        setShowProductModal={setShowProductModal}
        setNotify={setNotify}
        setShowNot={setShowNot}
      />
      <div className=" max-w-[200px] p-2">
        <img
          className=" object-contain rounded-lg"
          src={product.images}
          alt=""
        />
      </div>

      <div className=" flex-1 px-4 w-full bg-transparent">
        <div className=" flex flex-col gap-2 ">
          <div className=" flex gap-1 items-center">
            <h3 className=" text-xl font-semibold">{product.name}</h3>
            <h3 className=" bg-pribla text-sm text-priwhi p-1 rounded-lg">
              {product.type}
            </h3>
          </div>

          <div className=" flex gap-1">
            {product.subtypes?.split(" ").map((type, key) => {
              return (
                <h3
                  key={key}
                  className="bg-pribla text-sm text-priwhi p-1 rounded-lg"
                >
                  {type}
                </h3>
              );
            })}
          </div>
        </div>
        <div className="h-[100px] overflow-y-scroll mt-1 bg-transparent ">
          {product.description}
        </div>
        <h3 className=" text-sm font-light">Brand:{product.brand}</h3>
        <div className=" flex gap-2 mt-2">
          <p className=" bg-pribla p-2 rounded-lg text-priwhi">
            Price: <span className=" bg-transparent">{product.price}$</span>{" "}
          </p>
          <p className=" bg-pribla p-2 rounded-lg text-priwhi">
            Stock: <span className=" bg-transparent">{product.stock}</span>{" "}
          </p>
        </div>
        <div className=" flex gap-2 mt-2">
          <button
            onClick={handleDel}
            className=" whitespace-nowrap  transition-all hover:scale-105 justify-center rounded-lg p-3 flex items-center bg-red-600 text-priwhi"
          >
            Delete Product
            <MdOutlineDelete size={24} className=" bg-transparent" />
          </button>
          <button
            type="button"
            onClick={() => {
              setShowProductModal(true);
            }}
            className={` whitespace-nowrap transition-all hover:scale-105 justify-center rounded-lg p-3 flex items-center bg-yellow-600 text-priwhi`}
          >
            Edit Product
            <MdEdit size={24} className=" bg-transparent" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default product;
