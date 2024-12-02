import React, { useState } from "react";
import classes from "./Navbar2.module.css";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import api from "../services/api/Auth.api";
import { logoutSuccess } from "../store/userSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import socket from "../socket";

const Navbar2 = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      setLoading(true);
      const resp = await api.logout();
      setLoading(false);
      toast.success("Logged Out Successfully !");
      dispatch(logoutSuccess());
      socket.emit("signout");
      navigate("/");
    } catch (error) {
      setLoading(false);
      dispatch(logoutFail());
      toast.error("Something Went Wrong !");
      console.log(error);
    }
  };
  return (
    <div className={classes.navbar}>
      <div className={classes.navbarContent}>
        <div className={classes.leftNav}>
          <img src={Logo} />
          <p>Code Sync</p>
        </div>
        <div className={classes.rightNav}></div>
      </div>
      <button onClick={handleSignOut} className={classes.signOutButton}>
        {loading ? "Signing Out..." : "Sign Out"}
      </button>
    </div>
  );
};

export default Navbar2;
