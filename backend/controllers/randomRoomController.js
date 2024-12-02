import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { v4 as uuidv4 } from "uuid";
import { RandomRoom } from "../models/RandomRoom.js";
import { Room } from "../models/Room.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createRandomRoom = catchAsyncError(async (req, res, next) => {
  let roomId;
  while (true) {
    roomId = uuidv4().substring(0, 15);
    const roomExist = await RandomRoom.findOne({ roomId });
    if (!roomExist) {
      break;
    }
  }
  const room = await RandomRoom.create({ roomId });
  res.status(200).json({
    success: true,
    message: "Random Room Created Successfully",
    room,
  });
});
export const removeByRoomId = catchAsyncError(async (req, res, next) => {
  const roomId = req.params.roomId;
  if (!roomId) return next(new ErrorHandler("Please provide room id", 401));

  const room = await RandomRoom.findOne({ roomId });
  if (!room)
    return next(new ErrorHandler("No room id found with this id", 401));

  await RandomRoom.findByIdAndDelete(room._id);

  res.status(200).json({
    success: true,
    message: "Room Deleted Successfully !",
  });
});
export const updateCode = catchAsyncError(async (req, res, next) => {
  const roomId = req.params.roomId;
  const code = req.body.code;
  if (!roomId) return next(new ErrorHandler("Please provide room id", 401));

  const room = await RandomRoom.findOne({ roomId });
  if (!room)
    return next(new ErrorHandler("No room id found with this id", 401));

  room.code = code;
  await room.save();

  res.status(200).json({
    success: true,
    room,
    message: "Code Updated Successfully !",
  });
});
export const getRoom = catchAsyncError(async (req, res, next) => {
  const roomId = req.params.roomId;
  if (!roomId) return next(new ErrorHandler("Please provide room id", 401));

  const room = await RandomRoom.findOne({ roomId });
  if (!room)
    return next(new ErrorHandler("No room id found with this id", 401));

  res.status(200).json({
    success: true,
    room,
    message: "Room Fetched Successfully !",
  });
});
