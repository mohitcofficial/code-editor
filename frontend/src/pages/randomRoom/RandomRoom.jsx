import React from "react";
import Navbar from "../homepage/components/Navbar";
import Page from "./components/Page";

const RandomRoom = () => {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <Page />
    </div>
  );
};

export default RandomRoom;
