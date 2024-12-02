export const BaseUrl = "http://localhost:4000/api";

export const UserAPI = {
  login: `${BaseUrl}/login`,
  signup: `${BaseUrl}/signUp`,
  logout: `${BaseUrl}/logout`,
  loadUser: `${BaseUrl}/me`,
  verifyUser: `${BaseUrl}/verify`,
};
export const RandomRoomAPI = {
  createRandomRoom: `${BaseUrl}/random`,
  deleteRandomRoom: `${BaseUrl}/random`,
  getRandomRoom: `${BaseUrl}/random`,
};
export const RoomAPI = {
  createRoom: `${BaseUrl}/room`,
  joinRoom: `${BaseUrl}/join`,
  getRoom: `${BaseUrl}`,
};
