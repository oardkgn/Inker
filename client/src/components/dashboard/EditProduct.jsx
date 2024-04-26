import { Transition } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa6";

function EditProduct({ showProductModal, setShowProductModal, type }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "book",
    subtypes: [],
    desc: "",
    brand: "",
    image: "",
    price: 0,
    stock: 0,
  });
  const [checkBoxes, setCheckBoxes] = useState([]);

  const bookSubTypes = [
    "Notebook",
    "Novel",
    "Educational Book",
    "Biographie",
    "Fantasy",
    "Scifi",
    "Romance",
    "Self-Help",
    "Cookbooks",
    "Travel Guides",
    "Drama",
    "Horror",
    "Children's Books",
    "Diaries",
    "Planners",
  ];

  const penSubtypes = [
    "Pencil",
    "Ballpoint",
    "Gel",
    "Fountain",
    "Rollerball",
    "Marker",
    "Fineliner",
    "Calligraphy",
    "Highlighter",
    "Brush",
    "Multifunction",
  ];

  const handleTypeChange = (e) => {
    setFormData({ ...formData, type: e.target.id });
  };

  const renderCheckBoxes = (subtypes) => {
    const arr = [];
    subtypes.map((subtype) => {
      arr.push(
        <label
          key={subtype}
          htmlFor={subtype}
          className="flex transition-all hover:scale-105 cursor-pointer group items-center bg-pribla p-2 rounded-lg"
        >
          <input
            id={subtype}
            type="checkbox"
            value=""
            className="w-4 h-4 cursor-pointer bg-transparent"
          />
          <p
            htmlFor={subtype}
            className="ms-2 text-sm select-none font-medium whitespace-nowrap bg-transparent text-priwhi"
          >
            {subtype}
          </p>
        </label>
      );
    });
    setCheckBoxes(arr);
  };

  const getSubTypes = () => {
    if (formData.type == "book") {
      renderCheckBoxes(bookSubTypes);
    } else if (formData.type == "pen") {
      renderCheckBoxes(penSubtypes);
    }
    return checkBoxes;
  };

  useEffect(() => {
    getSubTypes();
  }, [formData.type]);

  return (
    <Transition
      show={showProductModal}
      enter="transition duration-500"
      className="bg-black z-10 bg-opacity-50 w-screen h-screen fixed flex items-center justify-center left-0 top-0"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className=" relative p-4 rounded-md bg-priwhi w-[500px] h-[600px]">
        <button
          onClick={() => setShowProductModal(false)}
          className=" hover:scale-110 transition-all absolute top-1 right-1"
        >
          <MdCancel size={30} className=" bg-transparent" />
        </button>
        <h1 className=" text-center text-2xl font-semibold text-pribla my-4">
          {type} Product
        </h1>
        <form className=" flex flex-col gap-3" action="">
          <div className=" flex flex-col">
            <label htmlFor="name">Product Name</label>
            <input
              className=" border border-pribla p-2 outline-none rounded-lg"
              type="text"
              placeholder="Name"
              id="name"
            />
          </div>
          <div className=" flex flex-col">
            <label htmlFor="name">Product Type</label>
            <div className="flex mt-1">
              <div className="flex items-center me-4">
                <input
                  id="book"
                  type="radio"
                  value=""
                  defaultChecked
                  onChange={(e) => handleTypeChange(e)}
                  name="type"
                  className=" w-4 h-4 cursor-pointer focus:ring-pribla"
                />
                <label
                  htmlFor="book"
                  className="pl-2 cursor-pointer text-sm font-medium text-pribla "
                >
                  Book
                </label>
              </div>
              <div className="flex items-center me-4">
                <input
                  id="pen"
                  type="radio"
                  value=""
                  onChange={(e) => handleTypeChange(e)}
                  name="type"
                  className=" w-4 h-4 cursor-pointer focus:ring-pribla"
                />
                <label
                  htmlFor="pen"
                  className="pl-2 cursor-pointer text-sm font-medium text-pribla "
                >
                  Pen
                </label>
              </div>
              <div className="flex items-center me-4">
                <input
                  id="office"
                  type="radio"
                  value=""
                  onChange={(e) => handleTypeChange(e)}
                  name="type"
                  className=" w-4 h-4 cursor-pointer focus:ring-pribla"
                />
                <label
                  htmlFor="office"
                  className="pl-2 cursor-pointer text-sm font-medium text-pribla "
                >
                  Office
                </label>
              </div>
              <div className="flex items-center me-4">
                <input
                  id="stationary"
                  type="radio"
                  value=""
                  onChange={(e) => handleTypeChange(e)}
                  name="type"
                  className=" w-4 h-4 cursor-pointer focus:ring-pribla"
                />
                <label
                  htmlFor="stationary"
                  className="pl-2 cursor-pointer text-sm font-medium text-pribla "
                >
                  Stationary
                </label>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="">Subtypes</label>
            <div className="flex mt-1 flex-wrap gap-2">{checkBoxes}</div>
          </div>
          <div className=" flex flex-col">
            <label htmlFor="name">Product Description</label>
            <textarea
              className=" border border-pribla p-2 outline-none rounded-lg"
              type="text"
              id="name"
            />
          </div>
          <div className=" flex items-center gap-6">
            <div className=" relative flex items-center gap-2">
              <label className=" whitespace-nowrap" htmlFor="name">Product Price:</label>
              <input
                className="w-20 border border-pribla p-2 outline-none rounded-lg"
                type="number"
                min={0}
                placeholder="$"
                id="name"
              />
              <FaDollarSign className=" bg-transparent absolute right-1 top-1/2 -translate-y-1/2" />
            </div>
            <div className=" relative flex items-center gap-2">
              <label className=" whitespace-nowrap" htmlFor="name">Product Stock:</label>
              <input
                className="w-20 border border-pribla p-2 outline-none rounded-lg"
                type="number"
                min={0}
                placeholder="#"
                id="name"
              />
              <FaHashtag className=" bg-transparent absolute right-1 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </form>
      </div>
    </Transition>
  );
}

export default EditProduct;
