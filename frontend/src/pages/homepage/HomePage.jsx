import React from "react";
import classes from "./HomePage.module.css";
import CreateRoom from "./components/CreateRoom";
import Navbar from "./components/Navbar";

function HomePage() {
  return (
    <div className={classes.container}>
      <Navbar />
      <CreateRoom />
    </div>
  );
}

export default HomePage;
