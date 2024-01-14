import React, { useEffect, useState } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useDispatch, useSelector } from "react-redux";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../layout/Loader";
import {
  clrError,
  clrSuccess,
  signinAction,
  signinWithGoogleAction,
} from "../../redux/authStore";

const Signin = ({ onTabChange }) => {
  const { user, error, loading, success } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    dispatch(signinAction(email, password));
    setEmail("");
    setPassword("");
  };

  const handleSigninWithGoogle = (e) => {
    e.preventDefault();
    dispatch(signinWithGoogleAction());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clrError());
    }
    if (user) {
      toast.success(success);
      navigate("/");
      dispatch(clrSuccess());
    }
  }, [dispatch, error, user, success]);

  return (
    <div className="signin p-4">
      <p className="signinHeading text-center mt-1 text-xl">social_verse</p>
      <form className="signinForm p-3 mt-3" onSubmit={handleSignin}>
        <div className="inputContainer flex items-center mb-5">
          <MailOutlineIcon className="authIcon text-gray-400 ml-2" />
          <input
            type="email"
            placeholder="Email"
            required
            className="p-2.5 w-full border-none outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputContainer flex items-center mb-5">
          <LockOpenIcon className="authIcon text-gray-400 ml-2" />
          <input
            type="password"
            placeholder="Password"
            required
            className="p-2.5 w-full border-none outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="signinBtn text-white border-none p-2.5 font-bold w-full mt-3"
          type="submit"
        >
          {loading ? (
            <Loader color="aliceblue" hgt="1.3rem" wdth="1.3rem" />
          ) : (
            "SIGNIN"
          )}
        </button>

        <button
          className="signinGoogleBtn text-white border-none p-2.5 font-bold w-full mt-3"
          onClick={handleSigninWithGoogle}
        >
          Signin With Google
        </button>

        <p
          className="signinPText mt-5 text-center cursor-pointer text-blue-800 underline"
          onClick={() => onTabChange(2)}
        >
          Don't have any account?
        </p>
      </form>
      <ToastContainer
        autoClose={2000}
        position="top-center"
        toastStyle={{ backgroundColor: "black", color: "aliceblue" }}
      />
    </div>
  );
};

export default Signin;
