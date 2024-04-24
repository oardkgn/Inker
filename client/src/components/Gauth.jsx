import React, { useContext } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
function Gauth() {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const user = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/google`,
        {
          name: result.user.displayName.split(" ")[0],
          email: result.user.email,
          surname:
            result.user.displayName.split(" ")[
              result.user.displayName.split(" ").length - 1
            ],
        },
        {withCredentials:true}
      );
      updateUser(user.data);
      navigate("/home");
    } catch (error) {
      console.log("Couldn't sign in with Google!", error);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      className=" transition-all hover:bg-opacity-80 bg-priwhi rounded-md py-4 px-5 text-2xl"
    >
      <FcGoogle className=" bg-transparent" />
    </button>
  );
}

export default Gauth;
