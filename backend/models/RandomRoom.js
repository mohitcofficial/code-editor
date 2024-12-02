import mongoose from "mongoose";

const randomRoomSchema = mongoose.Schema({
  roomId: {
    type: String,
    required: [true, "Unique Room Id is required to create a room"],
  },
  code: {
    type: String,
    default: "//comments",
  },
});

export const RandomRoom = mongoose.model("RandomRoom", randomRoomSchema);
