import React, { useEffect, useState } from "react";
import classes from "./TextEditor.module.css";
import Editor from "@monaco-editor/react";
import socket from "../socket";
import api from "../services/api/RandomRoom.api";
import { useNavigate } from "react-router-dom";

const TextEditor = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [roomId, setRoomId] = useState(null);
  const navigate = useNavigate();
  const updateCode = async (value, event) => {
    socket.emit("update-random-code", { roomId: roomId, code: value });
  };

  const getRoomInfo = async (roomId) => {
    const resp = await api.getRandomRoom(roomId);
    setCode(resp?.room?.code);
  };

  useEffect(() => {
    if (roomId) {
      socket.emit("join-random-room", roomId);
      setLoading(true);
      try {
        getRoomInfo(roomId);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  }, [roomId]);

  useEffect(() => {
    socket.on("update-random", (code) => {
      setCode(code);
    });
    socket.on("join-random-success", (roomId) => {
      navigate(`/random-room/${roomId}`);
    });
    socket.on("join-random-failed", () => {
      navigate(`/`);
    });
    return () => {
      socket.off("update-random-code");
    };
  }, []);

  useEffect(() => {
    const urlSegments = window.location.pathname.split("/");
    const lastSegment = urlSegments[urlSegments.length - 1];
    setRoomId(lastSegment);
  }, []);
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
    </div>
  );
};

export default TextEditor;
