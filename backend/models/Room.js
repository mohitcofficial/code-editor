import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
  roomId: {
    type: String,
    required: [true, "Room ID is required to create a room"],
  },
  code: {
    type: String,
    default: "//comments",
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Admin ID required while createing room"],
    ref: "User",
  },
  usersList: [
    {
      type: String,
    },
  ],
});

export const Room = mongoose.model("Room", roomSchema);
