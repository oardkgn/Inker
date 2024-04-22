import React, { useState,useEffect,useContext} from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LuMousePointer2 } from "react-icons/lu";
import { AuthContext } from "../context/AuthContext.jsx";
import { PulseLoader } from "react-spinners";
import Gauth from "./Gauth.jsx";

function Login({ setIsLogin }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    email:"",
    password:""
  });
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  const {updateUser} = useContext(AuthContext)

  const handleFormChange = (e) => {
    let newData = formData;
    const key = e.target.id;
    newData[key] = e.target.value;
    setFormData({
      email: newData.email,
      password: newData.password
    });
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const user = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        formData
      );
      setLoading(false);
      updateUser(user.data);
      navigate("/home");
    } catch (error) {
      setError(error?.response?.data);
      console.log(error);
      setLoading(false);
    }
  };
  
  return (
    <div className="w-full p-8 max-w-[400px] bg-pribla rounded-lg">
      <h3 className=" bg-transparent text-center text-3xl font-semibold text-priwhi mb-8">
        Login
      </h3>
      <form
        onSubmit={(event) => handleLogin(event)}
        className=" flex flex-col gap-4 bg-transparent"
      >
        <div className=" bg-pribla flex flex-col">
          <label className=" text-priwhi bg-pribla" htmlFor="email">
            Email
          </label>
          <input
            className=" bg-priwhi bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
            type="email"
            id="email"
            name="email"
            required={true}
            onChange={(event) => handleFormChange(event)}
          />
        </div>
        <div className=" bg-pribla flex flex-col">
          <label className=" text-priwhi bg-pribla" htmlFor="password">
            Password
          </label>
          <input
            className=" bg-priwhi bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
            type="password"
            name="password"
            id="password"
            maxLength="30"
            minLength="6"
            onChange={(event) => handleFormChange(event)}
          />
        </div>
        <div className="relative bg-transparent mt-4 flex gap-1">
        {error &&  <p className=" absolute -top-6 left-1/2 whitespace-nowrap text-sm -translate-x-1/2 text-red-500 bg-transparent">{error}</p>}
          <button className=" transition-all hover:bg-opacity-80 bg-priwhi flex-1 rounded-md font-semibold text-pribla p-4">
          {loading ? <PulseLoader className=" bg-transparent" size={10} color="#252422" /> : "Login"}
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
          Don't you have an account? -{" "}
          <button
            onClick={() => setIsLogin(false)}
            className=" relative bg-pribla transition-all group hover:scale-105"
          >
            Sign Up
            <LuMousePointer2 className=" bg-transparent transition-all absolute -right-6 -bottom-4 group-hover:-right-4 group-hover:-bottom-2" />
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
