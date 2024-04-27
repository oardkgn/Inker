import { Transition } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa6";
import { PulseLoader } from "react-spinners";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../firebase";
import { v4 } from "uuid";
import axios from "axios";
import {
  penBrands,
  penSubtypes,
  bookBrands,
  bookSubTypes,
  officeBrands,
  officeSubtypes,
  stationaryBrands,
  stationarySubtypes,
} from "../../products";
import product from "./OneProduct";

function EditProduct({product, showProductModal, setShowProductModal, type }) {
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    type: "book",
    subtypes: [],
    desc: "",
    brand: "None",
    images: [],
    price: 0,
    stock: 0,
  });
  const [checkBoxes, setCheckBoxes] = useState([]);

  const handleTypeChange = (e) => {
    setFormData({ ...formData, type: e.target.id });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 3) {
      alert("Only 3 files accepted.");
      return;
    }
    setFiles(e.target.files);
  };

  const handleCheckBoxes = (e, subtype) => {
    if (e.target.checked) {
      let checkedArr = formData.subtypes;
      checkedArr.push(subtype);
      setFormData({ ...formData, subtypes: checkedArr });
    } else {
      let checkedArr = formData.subtypes;
      const index = checkedArr.indexOf(subtype);
      if (index > -1) {
        checkedArr.splice(index, 1);
      }
      setFormData({ ...formData, subtypes: checkedArr });
    }
  };

  const renderCheckBoxes = (subtypes) => {
    const arr = [];
    subtypes.map((subtype, key) => {
      arr.push(
        <label
          key={key}
          htmlFor={subtype}
          className="flex transition-all hover:scale-105 cursor-pointer group items-center bg-pribla p-2 rounded-lg"
        >
          <input
            id={subtype}
            type="checkbox"
            checked={formData.subtypes.includes(subtype)}
            onChange={(e) => handleCheckBoxes(e, subtype)}
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
    if (formData.type == "Book") {
      renderCheckBoxes(bookSubTypes);
    } else if (formData.type == "Pen") {
      renderCheckBoxes(penSubtypes);
    } else if (formData.type == "Office") {
      renderCheckBoxes(officeSubtypes);
    } else {
      renderCheckBoxes(stationarySubtypes);
    }
    return checkBoxes;
  };

  const getOptions = () => {
    let arr = [];
    if (formData.type == "Book") {
      arr = renderOptions(bookBrands);
    } else if (formData.type == "Pen") {
      arr = renderOptions(penBrands);
    } else if (formData.type == "Office") {
      arr = renderOptions(officeBrands);
    } else {
      arr = renderOptions(stationaryBrands);
    }
    return arr;
  };

  const renderOptions = (brands) => {
    const arr = [];
    brands.map((brand, key) => {
      arr.push(
        <option
          id={brand}
          key={key}
          value={brand}
          className=" text-priwhi bg-pribla rounded-lg"
        >
          {brand}
        </option>
      );
    });
    return arr;
  };

  const uploadImage = async () => {
    if (files.length == 0) {
      setLoading(false);
      setError(false);
      alert("You need to upload 1 image at least!");
      return;
    }
    const imagesUrl = [];
    for (let file of files) {
      try {
        const imageRef = ref(storage, `images/${file.name + v4()}`);
        const snapshot = await uploadBytes(imageRef, file);

        await getDownloadURL(snapshot.ref).then((url) => {
          imagesUrl.push(url);
        });
      } catch (error) {
        setError("Error when uploading images check their size less than 2mb.");
        setLoading(false);
        return 0;
      }
    }
    setFormData({ ...formData, images: imagesUrl });
    return imagesUrl;
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const imagesUrl = await uploadImage();
    if (imagesUrl) {
      try {
        const product = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/products/create`,
          { ...formData, images: imagesUrl },
          { withCredentials: true }
        );
        console.log(product);
        setLoading(false);
        setFormData({
          name: "",
          type: "book",
          subtypes: [],
          desc: "",
          brand: "None",
          images: [],
          price: 0,
          stock: 0,
        });
        setImages([]);
        setShowProductModal(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getSubTypes();
  }, [formData.type]);

  useEffect(() => {
    if (files.length != 0) {
      let imagesArr = [];
      for (const file of files) {
        imagesArr.push(URL.createObjectURL(file));
      }
      setImages(imagesArr);
    }
  }, [files]);

  console.log(formData);

  useEffect(() => {
    if (type == "Updating") {
      console.log();
      setFormData({
        name: product.name,
        type: product.type,
        subtypes: product.subtypes,
        desc: product.description,
        brand: product.brand,
        images: product.images,
        price: product.price,
        stock: product.stock,
      });
    }
  }, []);

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
      <div className=" relative p-4 rounded-md bg-priwhi h-[580px]">
        <button
          onClick={() => setShowProductModal(false)}
          className=" hover:scale-110 transition-all absolute top-1 right-1"
        >
          <MdCancel size={30} className=" bg-transparent" />
        </button>
        <h1 className=" text-center text-2xl font-semibold text-pribla my-2">
          {type} Product
        </h1>
        <form
          onSubmit={(e) => handleCreateProduct(e)}
          className=" flex gap-2"
          action=""
        >
          <div className=" flex flex-col gap-2 max-w-[400px]">
            <div className=" flex flex-col">
              <label htmlFor="name">Product Name</label>
              <input
                className=" border border-pribla p-2 outline-none rounded-lg"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                value={formData.name}
                placeholder="Name"
                minLength={5}
                maxLength={50}
                required
                id="name"
              />
            </div>
            <div className=" flex flex-col">
              <label htmlFor="name">Product Type</label>
              <div className="flex mt-1">
                <div className="flex items-center me-4">
                  <input
                    id="Book"
                    type="radio"
                    value=""
                    defaultChecked = {formData.type == "Book"}
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
                    id="Pen"
                    type="radio"
                    defaultChecked = {formData.type == "Pen"}
                    value=""
                    lang="eng"
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
                    id="Office"
                    type="radio"
                    defaultChecked = {formData.type == "Office"}
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
                    id="Stationary"
                    type="radio"
                    defaultChecked = {formData.type == "Stationary"}
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
            <div className=" flex items-center gap-4">
              <div className=" relative flex items-center gap-2">
                <label className=" whitespace-nowrap" htmlFor="name">
                  Product Price:
                </label>
                <input
                  className="w-20 border border-pribla p-2 outline-none rounded-lg"
                  type="number"
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  value={formData.price}
                  step=".01"
                  min={0}
                  max={9999}
                  required
                  placeholder="$"
                  id="name"
                />
                <FaDollarSign className=" bg-transparent absolute right-1 top-1/2 -translate-y-1/2" />
              </div>
              <div className=" relative flex items-center gap-2">
                <label className=" whitespace-nowrap" htmlFor="name">
                  Product Stock:
                </label>
                <input
                  className="w-20 border border-pribla p-2 outline-none rounded-lg"
                  type="number"
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  value={formData.stock}
                  min={0}
                  max={9999}
                  required
                  placeholder="#"
                  id="name"
                />
                <FaHashtag className=" bg-transparent absolute right-1 top-1/2 -translate-y-1/2" />
              </div>
            </div>
            <div className=" flex mt-1 items-center">
              <label htmlFor="select">Brand:</label>
              <select
              defaultValue={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                className=" border border-pribla p-2 rounded-lg ml-2"
                name=""
                id="select"
              >
                <option value="">None</option>
                {getOptions()}
              </select>
            </div>
          </div>
          <div className=" w-full max-w-[400px]">
            <div className=" flex flex-col">
              <label htmlFor="name">Product Description</label>
              <textarea
                className=" w-[400px] max-h-[200px] min-h-12 border border-pribla p-2 outline-none rounded-lg"
                type="text"
                onChange={(e) =>
                  setFormData({ ...formData, desc: e.target.value })
                }
                value={formData.desc}
                id="name"
              />
            </div>
            <div className=" flex mt-2 flex-col">
              <label htmlFor="image">Product Image</label>
              <span className="font-normal text-gray-600">
                The first image will be the cover (max 3)
              </span>

              <input
                accept="image/*"
                onChange={(e) => handleFileChange(e)}
                multiple
                type="file"
                name="image"
                id="image"
              />

              <div className=" my-4 grid grid-cols-3 gap-2 h-48">
                {images.map((image, key) => {
                  return (
                    <img
                      className=" object-cover rounded-lg h-full"
                      key={key}
                      src={image}
                      alt=""
                    />
                  );
                })}
              </div>

              {loading ? (
                <div className=" p-4 text-green-700 border bg-green-500 text-center border-green-700 rounded transition-all uppercase">
                  <PulseLoader
                    className=" mt-1 bg-transparent"
                    color="#eeeeee"
                  />
                </div>
              ) : (
                <button
                  type="submit"
                  className=" p-4 text-green-700 border border-green-700 rounded transition-all uppercase hover:text-priwhi hover:bg-green-500"
                >
                  {"Create Product"}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </Transition>
  );
}

export default EditProduct;
