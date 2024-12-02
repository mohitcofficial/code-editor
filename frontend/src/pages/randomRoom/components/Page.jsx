import React from "react";
import Sidebar from "../../../components/Sidebar";
import TextEditor from "../../../components/TextEditor";

const Page = () => {
  return (
    <div style={{ flex: 1, display: "flex", width: "100%" }}>
      <Sidebar />
      <TextEditor />
    </div>
  );
};

export default Page;
