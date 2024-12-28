import React, { useState } from "react";
import classes from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./homepage/components/Navbar";
import toast from "react-hot-toast";
import { registerFail, registerSuccess } from "../store/userSlice";
import { useDispatch } from "react-redux";
import api from "../services/api/Auth.api";

function SignUp() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || email.length === 0) {
      toast("Please provide email !", {
        icon: "⚠️",
      });
      return;
    }
    if (!password || password.length === 0) {
      toast("Please provide password !", {
        icon: "⚠️",
      });
      return;
    }
    if (!username || username.length === 0) {
      toast("Please provide username !", {
        icon: "⚠️",
      });
      return;
    }
    try {
      setLoading(true);
      const resp = await api.signUp({ username, email, password });
      console.log("response: ", resp);
      toast("Verify G-mail via link in G-mail");
      dispatch(registerSuccess(resp.user));
      setLoading(false);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
      console.log(error);
      dispatch(registerFail());
    }
  };
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.createRoomForm}>
          <form className={classes.form} onSubmit={handleSignUp}>
            <p className={classes.heading}>Sign Up</p>
            <input
              type="text"
              placeholder={"Enter your name"}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              type="email"
              placeholder={"Enter your E-mail"}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              type="password"
              placeholder={"Enter your password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type={"submit"}>
              {loading ? "Creating..." : "Sign Up"}
            </button>
            <p className={classes.text}>
              Already a user ? <span onClick={handleLogin}>Login</span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
