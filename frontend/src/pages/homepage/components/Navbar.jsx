import React from "react";
import classes from "./Navbar.module.css";
import Logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.navbar}>
      <div className={classes.navbarContent}>
        <div onClick={() => navigate("/")} className={classes.leftNav}>
          <img src={Logo} />
          <p>Code Sync</p>
        </div>
        <div className={classes.rightNav}></div>
      </div>
    </div>
  );
};

export default Navbar;
