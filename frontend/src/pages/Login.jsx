import React, { useState } from "react";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./homepage/components/Navbar";
import api from "../services/api/Auth.api";
import toast from "react-hot-toast";
import { loginFail, loginSuccess } from "../store/userSlice";
import { useDispatch } from "react-redux";
import socket from "../socket";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (email.length === 0) {
      toast("Please enter valid email", {
        icon: "⚠️",
      });
      return;
    }
    if (password.length === 0) {
      toast("Please enter valid password", {
        icon: "⚠️",
      });
      return;
    }
    try {
      setLoading(true);
      const data = await api.login({ email: email, password: password });
      console.log("data: ", data);
      setLoading(false);
      dispatch(loginSuccess(data?.user));
      toast.success("Logged In Successfully !");
      socket.emit("user-joined", data?.user);
      navigate("/you");
    } catch (error) {
      dispatch(loginFail());
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message || "Something Went Wrong !");
    }
  };
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.createRoomForm}>
          <form className={classes.form} onSubmit={handleLogin}>
            <p className={classes.heading}>Sign In</p>
            <input
              type={"text"}
              placeholder={"Enter your E-mail"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type={"password"}
              placeholder={"Enter your password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type={"submit"}>
              {loading ? "Validating..." : "Login"}
            </button>
            <p className={classes.text}>
              New User ? <span onClick={handleSignUp}>SignUp</span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
