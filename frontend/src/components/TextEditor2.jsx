import Editor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import classes from "./TextEditor2.module.css";
import api from "../services/api/Room.api";
import socket from "../socket";

const TextEditor2 = ({ selectedRoom }) => {
  const [code, setCode] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  console.log("selected room====>", selectedRoom);

  const fetchRoom = async () => {
    setCode("");
    try {
      const resp = await api.getRoom(selectedRoom);
      setCode(resp?.room?.code);
      console.log(resp);
      setTotalUsers(resp?.room?.usersList?.length || 0);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (selectedRoom) {
      fetchRoom();
      socket.emit("get-active-users", selectedRoom);
      socket.on("update-room-size", (roomSize) => {
        setActiveUsers(roomSize);
      });
      socket.on("update-total-users", (count) => {
        setTotalUsers(count);
      });
      socket.on("active-room-size", (size) => {
        setActiveUsers(size);
      });
    }
    socket.on("update-code", ({ code, roomId }) => {
      if (roomId === selectedRoom) setCode(code);
      console.log("roomId:  ", roomId, ", selected: ", selectedRoom);
    });

    return () => {
      socket.off("update-code");
      socket.off("update-room-size");
      socket.off("update-total-users");
      socket.off("active-room-size");
    };
  }, [selectedRoom]);

  const updateCode = async (value, event) => {
    socket.emit("update-code", { roomId: selectedRoom, code: value });
  };

  return (
    <div className={classes.container}>
      <Editor
        height="100%"
        width="100%"
        defaultLanguage="cpp"
        value={code}
        theme="vs-dark"
        onChange={updateCode}
      />
      {selectedRoom && (
        <div className={classes.countContainer}>
          <p className={classes.text}>Total Users: {totalUsers}</p>
          <p className={classes.text}>Active Users: {activeUsers}</p>
        </div>
      )}
    </div>
  );
};

export default TextEditor2;
