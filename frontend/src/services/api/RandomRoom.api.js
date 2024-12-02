import axios from "axios";
import { RandomRoomAPI } from "../http.service";

export default {
  createRandomRoom: async function () {
    const { data } = await axios.post(`${RandomRoomAPI.createRandomRoom}`, {
      withCredentials: true,
    });
    return data;
  },
  getRandomRoom: async function (roomId) {
    const { data } = await axios.get(
      `${RandomRoomAPI.createRandomRoom}/${roomId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  },
  deleteRandomRoom: async function (roomId) {
    const { data } = await axios.delete(
      `${RandomRoomAPI.deleteRandomRoom}/${roomId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  },
};
