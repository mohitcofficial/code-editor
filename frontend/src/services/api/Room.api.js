import axios from "axios";
import { RoomAPI } from "../http.service";

export default {
  createRoom: async function (body) {
    const { data } = await axios.post(`${RoomAPI.createRoom}`, body, {
      withCredentials: true,
    });
    return data;
  },
  getRoom: async function (roomId) {
    const { data } = await axios.get(`${RoomAPI.getRoom}/${roomId}`, {
      withCredentials: true,
    });
    return data;
  },
  joinRoom: async function (roomId) {
    const { data } = await axios.get(`${RoomAPI.joinRoom}/${roomId}`, {
      withCredentials: true,
    });
    return data;
  },
};
