import express from "express";

import { isAuthenticated } from "../middleware/auth.js";
// import singleUpload from "../middleware/multer.js";
import {
  createRoomAndJoin,
  getRoomInfo,
  joinRoom,
  removeByRoomId,
  updateCode,
} from "../controllers/roomController.js";

const router = express.Router();

router.post("/room", isAuthenticated, createRoomAndJoin);
router.patch("/:roomId", isAuthenticated, updateCode);
router.delete("/:roomId", isAuthenticated, removeByRoomId);
router.get("/join/:roomId", isAuthenticated, joinRoom);
router.get("/:roomId", isAuthenticated, getRoomInfo);

export default router;
