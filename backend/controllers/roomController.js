import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { Room } from "../models/Room.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { User } from "../models/User.js";

export const createRoomAndJoin = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;
  const roomId = req.body.roomId;
  const roomExist = await Room.findOne({ roomId });
  if (roomExist)
    return next(new ErrorHandler("Room already present with this ID !", 403));
  const room = await Room.create({
    roomId,
    admin: req.user._id,
    usersList: [userId.toString()],
  });
  const user = await User.findById(userId);

  let newRoomsList = user.rooms;
  newRoomsList.push(roomId);

  user.rooms = newRoomsList;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Room Created Successfully",
    room,
  });
});
export const removeByRoomId = catchAsyncError(async (req, res, next) => {
  const roomId = req.params.roomId;
  if (!roomId) return next(new ErrorHandler("Please provide room id", 401));

  const room = await Room.findOne({ roomId });
  if (!room)
    return next(new ErrorHandler("No room id found with this id", 401));

  await Room.findByIdAndDelete(room._id);

  res.status(200).json({
    success: true,
    room,
    message: "Room Deleted Successfully !",
  });
});
export const updateCode = catchAsyncError(async (req, res, next) => {
  const roomId = req.params.roomId;
  const code = req.body.code;
  if (!roomId) return next(new ErrorHandler("Please provide room id", 401));

  const room = await Room.findOne({ roomId });
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

export const joinRoom = catchAsyncError(async (req, res, next) => {
  const roomId = req.params.roomId;
  console.log("room Id", roomId);
  const userInfo = req.user;
  if (!roomId) return next(new ErrorHandler("Please provide room ID !", 401));

  const room = await Room.findOne({ roomId });
  if (!room)
    return next(new ErrorHandler("No Room id found with this ID !", 401));

  let currentUserList = room.usersList;

  if (currentUserList.includes(userInfo._id))
    return next(new ErrorHandler("You are already added to this room!", 401));
  currentUserList.push(userInfo._id);

  room.usersList = currentUserList;
  await room.save();

  const user = await User.findById(userInfo._id);

  let newRoomsList = user.rooms;
  if (newRoomsList.includes(roomId))
    return next(new ErrorHandler("Room already added !", 401));

  newRoomsList.push(roomId);

  user.rooms = newRoomsList;
  await user.save();

  res.status(200).json({
    success: true,
    room,
    message: "User Added To Room Successfully !",
  });
});

export const getRoomInfo = catchAsyncError(async (req, res, next) => {
  const roomId = req.params.roomId;
  if (!roomId) return next(new ErrorHandler("Please provide room ID !", 401));

  const room = await Room.findOne({ roomId });
  if (!room)
    return next(new ErrorHandler("No room id found with this ID !", 401));

  res.status(200).json({
    success: true,
    room,
    message: "Info Fetched Successfully !",
  });
});
