import React, { useEffect, useState } from "react";
import classes from "./CreateRoom.module.css";
import { useNavigate } from "react-router-dom";
import socket from "../../../socket";
import api from "../../../services/api/RandomRoom.api";
import toast from "react-hot-toast";

const CreateRoom = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const notifyError = () => toast.error("No room present with given ID");

  const handleJoin = async (e) => {
    e.preventDefault();
    console.log("ran");
    socket.emit("join-random-room", roomId);
  };

  useEffect(() => {
    socket.on("join-random-success", (roomId) => {
      navigate(`/random-room/${roomId}`);
    });
    socket.on("join-random-failed", () => {
      notifyError();
    });
    return () => {
      socket.off("join-random-success");
      socket.off("join-random-failed");
    };
  }, []);

  const handleCreateRoom = async () => {
    const resp = await api.createRandomRoom();
    setRoomId(resp?.room?.roomId);
  };

  return (
    <div className={classes.container}>
      <div className={classes.createRoomMessage}>
        <p className={classes.welcomeText}>Welcome to </p>
        <p>
          <strong>Code Sync</strong>
        </p>
      </div>
      <div className={classes.createRoomInput}>
        <div className={classes.createRoomForm}>
          <form onSubmit={handleJoin}>
            <input
              type={"text"}
              placeholder={"ROOM ID"}
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
            />
            <button type={"submit"}>Join</button>
            <p>
              Want to create a new Room ?{" "}
              <span onClick={handleCreateRoom}>Click Here</span>
            </p>
          </form>
        </div>
      </div>
      <div className={classes.buttons}>
        <button
          onClick={() => navigate("/login")}
          className={`${classes.button} ${classes.loginButton}`}
        >
          Login
        </button>
        <button
          onClick={() => navigate("/signup")}
          className={`${classes.button} ${classes.signUpButton}`}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default CreateRoom;
