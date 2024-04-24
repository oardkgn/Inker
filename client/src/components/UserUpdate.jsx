import React, { useState, useContext, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notify from "./Notify";
import Modal from "./Modal";

function UserUpdate() {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNot, setShowNot] = useState(false);
  const [notify, setNotify] = useState({
    text:"",
    type:""
  })
  const [error, setError] = useState(false);
  const { currentUser, updateUser } = useContext(AuthContext);
  const [user, setUser] = useState(currentUser);
  const [isEditing, setIsEditing] = useState({
    name: false,
    surname: false,
    email: false,
    newPsw: false,
  });
  const [formData, setFormData] = useState({
    name: user.name,
    surname: user.surname,
    email: user.email,
    prePsw: "",
    newPsw: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const email = user.email;
    try {
      const user = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/update/${email}`,
        formData,
        { withCredentials: true }
      );
      console.log(user.data);
      setLoading(false);
      setShowNot(true);
      setNotify({text:"User updated successfully.",type:"success"})
      updateUser(user.data);
      setIsEditing({
        name: false,
        surname: false,
        email: false,
        newPsw: false,
      });
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
    }
  };

  const handleLogout = async (e) => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/logout`, {
        withCredentials: true,
      });
      updateUser(null);
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDel = async (e) => {
    const email = user.email;
    try {
      const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/user/delete/${email}`, {
        withCredentials: true,
      });
      setShowNot(true)
      setNotify({
        text:"User deleted successfully.",
        type:"Success"
      })
      updateUser(null);
      setShowModal(false)
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className=" w-[600px] bg-pribla rounded-lg px-8 py-14">
      <h1 className=" bg-transparent text-priwhi text-center text-2xl">
        Profile
      </h1>
      <form
        onSubmit={(e) => handleUpdate(e)}
        className=" flex flex-col gap-4 bg-transparent"
        action=""
      >
        <div className=" bg-pribla flex flex-col">
          <label className=" text-priwhi bg-pribla" htmlFor="name">
            Name
          </label>
          <div className=" flex relative bg-transparent gap-2">
            <input
              className=" bg-priwhi flex-1 bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
              type="text"
              required={true}
              minLength="2"
              maxLength="40"
              disabled={!isEditing.name}
              name=""
              value={formData.name}
              id="name"
              onChange={(e) => handleChange(e)}
            />
            <button
              type="button"
              onClick={(e) =>
                setIsEditing({
                  ...isEditing,
                  name: !isEditing.name,
                })
              }
              className={`w-10 h-10 flex justify-center items-center rounded-md bg-yellow-500 text-priwhi text-xl transition-all hover:scale-110 ${
                !isEditing.name && "bg-opacity-30"
              }`}
            >
              <MdEdit className=" bg-transparent" />
            </button>
          </div>
        </div>
        <div className=" bg-pribla flex flex-col">
          <label className=" text-priwhi bg-pribla" htmlFor="surname">
            Surname
          </label>
          <div className=" flex relative bg-transparent gap-2">
            <input
              className=" bg-priwhi flex-1 bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
              type="text"
              required={true}
              minLength="2"
              maxLength="40"
              disabled={!isEditing.surname}
              value={formData.surname}
              name=""
              id="surname"
              onChange={(e) => handleChange(e)}
            />
            <button
              type="button"
              onClick={(e) =>
                setIsEditing({
                  ...isEditing,
                  surname: !isEditing.surname,
                })
              }
              className={`w-10 h-10 flex justify-center items-center rounded-md bg-yellow-500 text-priwhi text-xl transition-all hover:scale-110 ${
                !isEditing.surname && "bg-opacity-30"
              }`}
            >
              <MdEdit className=" bg-transparent" />
            </button>
          </div>
        </div>

        <div className=" bg-pribla flex flex-col">
          <label className=" text-priwhi bg-pribla" htmlFor="email">
            Email
          </label>
          <div className=" flex relative bg-transparent gap-2">
            <input
              className=" bg-priwhi flex-1 bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
              type="email"
              required={true}
              name=""
              disabled={!isEditing.email}
              value={formData.email}
              id="email"
              onChange={(e) => handleChange(e)}
            />
            {!user.googleacc && (
              <button
                type="button"
                onClick={(e) =>
                  setIsEditing({
                    ...isEditing,
                    email: !isEditing.email,
                  })
                }
                className={`w-10 h-10 flex justify-center items-center rounded-md bg-yellow-500 text-priwhi text-xl transition-all hover:scale-110 ${
                  !isEditing.email && "bg-opacity-30"
                }`}
              >
                <MdEdit className=" bg-transparent" />
              </button>
            )}
          </div>
        </div>
        {!user.googleacc && (
          <div className=" bg-pribla flex flex-col">
            <label className=" text-priwhi bg-pribla" htmlFor="password">
              Password
            </label>

            <div className=" flex relative bg-transparent gap-2">
              <input
                className=" bg-priwhi flex-1 bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
                type="password"
                required={true}
                minLength="6"
                maxLength="30"
                placeholder="*********"
                name=""
                id="prePsw"
                onChange={(e) => handleChange(e)}
              />
              <button
                type="button"
                onClick={(e) =>
                  setIsEditing({
                    ...isEditing,
                    newPsw: !isEditing.newPsw,
                  })
                }
                className={`w-10 h-10 flex justify-center items-center rounded-md bg-yellow-500 text-priwhi text-xl transition-all hover:scale-110 ${
                  !isEditing.newPsw && "bg-opacity-30"
                }`}
              >
                <MdEdit className=" bg-transparent" />
              </button>
            </div>
            {isEditing.newPsw && (
              <div className=" flex flex-col relative bg-transparent mt-2">
                <label className=" text-priwhi bg-pribla" htmlFor="password">
                  New Password
                </label>
                <input
                  className=" bg-priwhi flex-1 bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
                  type="password"
                  required={true}
                  minLength="6"
                  maxLength="30"
                  placeholder="*********"
                  name=""
                  value={formData.newPsw}
                  id="newPsw"
                  onChange={(e) => handleChange(e)}
                />
              </div>
            )}
          </div>
        )}
        {error && (
          <p className=" w-full bg-transparent text-center text-red-600">
            {error}
          </p>
        )}
        {(user.name != formData.name ||
          user.email != formData.email ||
          user.surname != formData.surname ||
          formData.newPsw != "") && (
          <button
            disabled={loading}
            className=" transition-all hover:scale-105 bg-priwhi py-3 w-full text-center rounded-lg"
          >
            Update
          </button>
        )}
      </form>
      <div className=" bg-priwhi bg-opacity-50 h-0.5 rounded-full my-5"></div>
      <div className=" flex gap-2 bg-transparent">
        <button
          onClick={handleLogout}
          className=" transition-all hover:scale-105 flex-1 justify-center rounded-lg py-3 flex items-center bg-yellow-600 text-priwhi"
        >
          Logout <CiLogout size={24} className=" bg-transparent" />
        </button>
        <button onClick={() => setShowModal(true)} className=" transition-all hover:scale-105 flex-1 justify-center rounded-lg py-3 flex items-center bg-red-600 text-priwhi">
          Delete Account{" "}
          <MdOutlineDelete size={24} className=" bg-transparent" />
        </button>
      </div>
      <Modal activate={handleDel} setShowModal={setShowModal} show={showModal} text={"Are you sure for deleting this user!"}/>
      <Notify
        text={notify.text}
        type={notify.type}
        show={showNot}
        setShowNot={setShowNot}
      />
    </div>
  );
}

export default UserUpdate;
