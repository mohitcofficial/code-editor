import React, { useEffect, useState } from "react";
import classes from "./Sidebar2.module.css";
import socket from "../socket";
import Modal from "@mui/material/Modal";
import api from "../services/api/Room.api";
import api2 from "../services/api/Auth.api";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Sidebar2 = ({ selectedRoom, setSelectedRoom }) => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const handleNewRoom = () => {
    setOpen(true);
  };
  const handleJoinRoom = () => {
    setOpen2(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  useEffect(() => {
    if (userInfo) {
      setRooms(userInfo?.userInfo?.rooms);
    }
  }, [userInfo]);

  const reloadRooms = async () => {
    setLoading2(true);
    try {
      const resp = await api2.loadUser();
      setRooms(resp?.user?.rooms);
      setLoading2(false);
    } catch (error) {
      setLoading2(false);
      console.log(error);
    }
  };
  const handleCreate = async () => {
    if (inputValue.length === 0) {
      toast("Please provide room ID !", {
        icon: "⚠️",
      });
      return;
    }
    try {
      setLoading(true);
      const resp = await api.createRoom({ roomId: inputValue });
      console.log("New Room: ", resp);
      toast.success("Room Created Successfully !");
      setLoading(false);
      setOpen(false);
      socket.emit("join-room", inputValue);
      reloadRooms();
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Something Went Wrong !");
      console.log(error);
    }
  };
  const handleJoin = async () => {
    if (inputValue2.length === 0) {
      toast("Please provide room ID !", {
        icon: "⚠️",
      });
      return;
    }
    try {
      setLoading(true);
      const resp = await api.joinRoom(inputValue2);
      console.log("joined Room: ", resp);
      toast.success("Room Joined Successfully !");
      setLoading(false);
      setOpen2(false);
      reloadRooms();
      socket.emit("join-room", inputValue2);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message || "Something Went Wrong !");
      console.log(error);
    }
  };
  return (
    <div className={classes.sidebar}>
      <div className={classes.roomsList}>
        {loading2 ? (
          "...loading"
        ) : (
          <>
            {rooms?.map((room, index) => (
              <p
                onClick={() => {
                  setSelectedRoom(room);
                }}
                className={classes.roomName}
                key={index}
              >
                {room}
              </p>
            ))}
          </>
        )}
      </div>
      <div className={classes.buttons}>
        <button className={classes.leaveButton} onClick={handleJoinRoom}>
          Join Room
        </button>
        <button className={classes.newRoomButton} onClick={handleNewRoom}>
          New Room
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div className={classes.modalContainer}>
          <p className={classes.modalHeading}>Create Your New Room</p>
          <input
            placeholder="Enter new room ID"
            className={classes.input}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className={classes.buttonsContainer}>
            <button
              onClick={handleClose}
              className={`${classes.button} ${classes.cancelButton}`}
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className={`${classes.button} ${classes.createButton}`}
            >
              Create
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div className={classes.modalContainer}>
          <p className={classes.modalHeading}>Join Room</p>
          <input
            placeholder="Enter new room ID"
            className={classes.input}
            type="text"
            value={inputValue2}
            onChange={(e) => setInputValue2(e.target.value)}
          />
          <div className={classes.buttonsContainer}>
            <button
              onClick={handleClose2}
              className={`${classes.button} ${classes.cancelButton}`}
            >
              Cancel
            </button>
            <button
              onClick={handleJoin}
              className={`${classes.button} ${classes.createButton}`}
            >
              Join Room
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar2;
