import React, { useState } from "react";
import Navbar2 from "../../components/Navbar2";
import Page2 from "../../components/Page2";

function You() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Navbar2 />
      <Page2 />
    </div>
  );
}

export default You;
