import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { LuMousePointer2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import{PulseLoader} from "react-spinners"
import { AuthContext } from "../../context/AuthContext.jsx";
import Gauth from "./Gauth.jsx";

function SignUp({ setIsLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    surname: "",
  });

  const {updateUser} = useContext(AuthContext)
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    let newData = formData;
    const key = e.target.id;
    newData[key] = e.target.value;
    setFormData({
      name: newData.name,
      surname: newData.surname,
      email: newData.email,
      password: newData.password,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const user = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/register`,
        formData,
        {withCredentials:true}
      );
      console.log(user.data);
      setLoading(false);
      updateUser({email:user.data[0],name:user.data[2],surname:user.data[3],admin:user.data[4],googleacc:user.data[5]});
      navigate("/home");
    } catch (error) {
      setLoading(false);
      setError(error.response.data);
      
    }
  };

  return (
    <div className="w-full max-w-[400px] mx-auto p-8 bg-pribla rounded-lg">
      <h3 className=" bg-transparent text-center text-3xl font-semibold text-priwhi mb-8">
        Sign Up
      </h3>
      <form
        onSubmit={(e) => handleSignUp(e)}
        className=" flex flex-col gap-4 bg-transparent"
        action=""
      >
        <div className=" bg-pribla flex flex-col">
          <label className=" text-priwhi bg-pribla" htmlFor="name">
            Name
          </label>
          <input
            className=" bg-priwhi bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
            type="text"
            required={true}
            minLength="2"
            maxLength="40"
            name=""
            onChange={(e) => handleFormChange(e)}
            id="name"
          />
        </div>
        <div className=" bg-pribla flex flex-col">
          <label className=" text-priwhi bg-pribla" htmlFor="surname">
            Surname
          </label>
          <input
            className=" bg-priwhi bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
            type="text"
            required={true}
            minLength="2"
            maxLength="40"
            name=""
            id="surname"
            onChange={(e) => handleFormChange(e)}
          />
        </div>

        <div className=" bg-pribla flex flex-col">
          <label className=" text-priwhi bg-pribla" htmlFor="email">
            Email
          </label>
          <input
            className=" bg-priwhi bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
            type="email"
            required={true}
            name=""
            id="email"
            onChange={(e) => handleFormChange(e)}
          />
        </div>
        <div className=" bg-pribla flex flex-col">
          <label className=" text-priwhi bg-pribla" htmlFor="password">
            Password
          </label>
          <input
            className=" bg-priwhi bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
            type="password"
            required={true}
            minLength="6"
            maxLength="30"
            name=""
            id="password"
            onChange={(e) => handleFormChange(e)}
          />
        </div>
        <div className=" relative bg-transparent mt-4 flex gap-1">
        {error &&  <p className=" absolute whitespace-nowrap text-sm -top-6 left-1/2 -translate-x-1/2 text-red-500 bg-transparent">{error}</p>}
          <button disabled={loading} className=" transition-all hover:bg-opacity-80 bg-priwhi flex-1 rounded-md font-semibold text-pribla p-4">
            {loading ? <PulseLoader className=" bg-transparent" size={10} color="#252422" /> : "Sign Up"}
          </button>
          <Gauth/>
        </div>
      </form>
      <div className=" bg-transparent items-center gap-3 mt-4 flex">
        <div className=" h-0.5 flex-1 bg-priwhi rounded-full"></div>
        <span className=" bg-pribla text-priwhi">Or</span>
        <div className=" h-0.5 flex-1 bg-priwhi rounded-full"></div>
      </div>
      <div className="mt-3  text-priwhi">
        <p className=" bg-pribla">
          Do you have an account? -{" "}
          <button
            onClick={() => setIsLogin(true)}
            className=" relative bg-pribla transition-all group hover:scale-105"
          >
            Login
            <LuMousePointer2 className=" bg-transparent transition-all absolute -right-6 -bottom-4 group-hover:-right-4 group-hover:-bottom-2" />
          </button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
