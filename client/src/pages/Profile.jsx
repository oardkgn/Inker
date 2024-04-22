import React, { useState, useContext } from "react";
import tabsArrow from "../assets/tabsArrow.png";
import { MdEdit } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [tabPos, setTabPos] = useState(45);
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

  const navigate = useNavigate()

  console.log(user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleLogout = async (e) => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/logout`);
      updateUser(null)
      navigate("/auth")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" max-w-[2440px] mx-auto flex justify-center gap-4 items-start p-2 md:p-10">
      <div className=" w-[600px] bg-pribla rounded-lg px-8 py-14">
        <h1 className=" bg-transparent text-priwhi text-center text-2xl">
          Profile
        </h1>
        <form
          onSubmit={(e) => handleSignUp(e)}
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
            </div>
          </div>
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
          {(user.name != formData.name ||
            user.email != formData.email ||
            user.surname != formData.surname ||
            formData.newPsw != "") && (
            <button className=" transition-all hover:scale-105 bg-priwhi py-3 w-full text-center rounded-lg">
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
          <button className=" transition-all hover:scale-105 flex-1 justify-center rounded-lg py-3 flex items-center bg-red-600 text-priwhi">
            Delete Account{" "}
            <MdOutlineDelete size={24} className=" bg-transparent" />
          </button>
        </div>
      </div>

      <div className=" w-full h-[800px] flex flex-col gap-4">
        <div className=" relative bg-pribla font-semibold rounded-lg p-4 flex gap-2">
          <button
            onClick={() => {
              setTabPos(45);
            }}
            className=" bg-priwhi rounded-lg py-2 px-4"
          >
            Reviews
          </button>
          <button
            onClick={() => {
              setTabPos(128);
            }}
            className=" bg-priwhi rounded-lg py-2 px-4"
          >
            Liked
          </button>
          <button
            onClick={() => {
              setTabPos(206);
            }}
            className=" bg-priwhi rounded-lg py-2 px-4"
          >
            Orders
          </button>
          <button
            onClick={() => {
              setTabPos(296);
            }}
            className=" bg-priwhi rounded-lg py-2 px-4"
          >
            Adresses
          </button>
          <img
            className={"bg-transparent w-6 absolute bottom-0 transition-all "}
            style={{ left: tabPos }}
            src={tabsArrow}
          />
        </div>
        <div className=" bg-pribla rounded-lg p-4 flex gap-2">
          <button className=" bg-priwhi rounded-lg py-2 px-4">Reviews</button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
