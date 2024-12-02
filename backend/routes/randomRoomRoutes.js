import express from "express";
import {
  createRandomRoom,
  removeByRoomId,
  updateCode,
  getRoom,
} from "../controllers/randomRoomController.js";

const router = express.Router();

router.post("/random", createRandomRoom);
router.patch("/random/:roomId", updateCode);
router.get("/random/:roomId", getRoom);
router.delete("/random/:roomId", removeByRoomId);

export default router;
