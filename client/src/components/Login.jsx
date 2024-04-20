import React, { useState,useEffect} from "react";
import { FcGoogle } from "react-icons/fc";
import { LuMousePointer2 } from "react-icons/lu";

function Login({ setIsLogin }) {
  const [name, setName] = useState("");
  const [result, setResult] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = $(e.target);
    fetch({
      type: "POST",
      url: form.attr("action"),
      data: form.serialize(),
      success(data) {
        setResult(data);
      },
    });
  };
  
  return (
    <div className="w-full p-8 max-w-[400px] bg-pribla rounded-lg">
      <h3 className=" bg-transparent text-center text-3xl font-semibold text-priwhi mb-8">
        Login
      </h3>
      <form
        action="http://localhost:8000/server.php"
        method="post"
        onSubmit={(event) => handleSubmit(event)}
        className=" flex flex-col gap-4 bg-transparent"
      >
        <div className=" bg-pribla flex flex-col">
          <label className=" text-priwhi bg-pribla" htmlFor="email">
            Email
          </label>
          <input
            className=" bg-priwhi bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => handleChange(event)}
          />
        </div>
        <div className=" bg-pribla flex flex-col">
          <label className=" text-priwhi bg-pribla" htmlFor="password">
            Password
          </label>
          <input
            className=" bg-priwhi bg-opacity-10 px-3 py-2 text-priwhi outline-none rounded-md"
            type="password"
            name=""
            id="password"
          />
        </div>
        <div className=" bg-transparent mt-4 flex gap-1">
          <button className=" transition-all hover:bg-opacity-80 bg-priwhi flex-1 rounded-md font-semibold text-pribla p-4">
            Login
          </button>
          <button className=" transition-all hover:bg-opacity-80 bg-priwhi rounded-md py-4 px-5 text-2xl">
            <FcGoogle className=" bg-transparent" />
          </button>
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
