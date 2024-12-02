import express from "express";
import {
  getMyProfile,
  getUserDetails,
  login,
  logout,
  signup,
  updateMyProfile,
  verify,
} from "../controllers/userController.js";

import { isAuthenticated } from "../middleware/auth.js";
import singleUpload from "../middleware/multer.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/verify").post(verify);
router.route("/me").get(isAuthenticated, getMyProfile);
router.route("/user/:id").get(getUserDetails);
router
  .route("/profile/update")
  .post(isAuthenticated, singleUpload, updateMyProfile);

export default router;
