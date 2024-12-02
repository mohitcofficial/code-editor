import React, { useState } from "react";
import Sidebar2 from "./Sidebar2";
import TextEditor2 from "./TextEditor2";

const Page2 = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div
      style={{ display: "flex", width: "100%", height: "calc(100% - 61px)" }}
    >
      <Sidebar2 selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />
      <TextEditor2 selectedRoom={selectedRoom} />
    </div>
  );
};

export default Page2;
