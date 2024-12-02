import { RandomRoom } from "../models/RandomRoom.js";
import { Room } from "../models/Room.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const updateCode = async (roomId, code) => {
  if (!roomId) return;

  const room = await Room.findOne({ roomId });
  if (!room) return;

  room.code = code;
  await room.save();
};
export const updateRandomRoomCode = async (roomId, code) => {
  if (!roomId) return new ErrorHandler("Please provide room id", 401);

  const room = await RandomRoom.findOne({ roomId });
  if (!room) return;

  room.code = code;
  await room.save();
};
