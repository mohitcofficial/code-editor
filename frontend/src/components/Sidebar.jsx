import React, { useEffect, useState } from "react";
import classes from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import socket from "../socket";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeUsers, setActiveUsers] = useState(null);
  const handleLeaveRoom = () => {
    const urlSegments = window.location.pathname.split("/");
    const lastSegment = urlSegments[urlSegments.length - 1];
    socket.emit("leave-random-room", lastSegment);
    navigate("/");
  };

  useEffect(() => {
    socket.on("update-room-size", (roomSize) => {
      setActiveUsers(roomSize);
    });
  }, []);
  return (
    <div className={classes.sidebar}>
      <p className={classes.text}>Total Active Users: {activeUsers}</p>
      <div className={classes.newRoomButton}>
        <button onClick={handleLeaveRoom}>Leave</button>
      </div>
    </div>
  );
};

export default Sidebar;
