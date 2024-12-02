import axios from "axios";
import { UserAPI } from "../http.service";

export default {
  login: async function (body) {
    const { data } = await axios.post(`${UserAPI.login}`, body, {
      withCredentials: true,
    });
    return data;
  },
  signUp: async function (body) {
    const { data } = await axios.post(`${UserAPI.signup}`, body, {
      withCredentials: true,
    });
    return data;
  },
  verify: async function (body) {
    const { data } = await axios.post(`${UserAPI.verifyUser}`, body, {
      withCredentials: true,
    });
    return data;
  },
  loadUser: async function () {
    const { data } = await axios.get(`${UserAPI.loadUser}`, {
      withCredentials: true,
    });
    return data;
  },
  logout: async function () {
    const { data } = await axios.get(`${UserAPI.logout}`, {
      withCredentials: true,
    });
    return data;
  },
};
