import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import ErrorMiddleware from "./middleware/Error.js";
import { config } from "dotenv";

config({
  path: "./config/config.env",
});

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

import user from "./routes/userRoutes.js";
import randomRoom from "./routes/randomRoomRoutes.js";
import room from "./routes/roomRoutes.js";

app.use("/api/", user);
app.use("/api/", randomRoom);
app.use("/api/", room);

app.use(ErrorMiddleware);

export default app;
