import app from "./app.js";
import { Server } from "socket.io";
import http from "http";
import { connectDB } from "./config/database.js";
import { updateCode, updateRandomRoomCode } from "./services/room.js";
import { RandomRoom } from "./models/RandomRoom.js";
import { catchAsyncError } from "./middleware/catchAsyncError.js";
import { Room } from "./models/Room.js";

connectDB();

app.get("/", (req, res) => {
  res.send("<h1>Working Fine</h1>");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH"],
  },
});

const onlineUserList = new Map();

io.on("connection", (socket) => {
  console.log("Connected to socketio with id: ", socket.id);
  socket.on("join-random-room", async (roomId) => {
    let check = await RandomRoom.findOne({ roomId });
    if (check) {
      socket.join(roomId);
      socket.emit("join-random-success", roomId);
      const roomSize = io.sockets.adapter.rooms.get(roomId)?.size || 0;
      io.to(roomId).emit("update-room-size", roomSize);
    } else {
      socket.emit("join-random-failed");
    }
  });
  socket.on("join-room", async (roomId) => {
    let check = await Room.findOne({ roomId });
    if (check) {
      socket.join(roomId);
      socket.emit("join-success", roomId);
      const roomSize = io.sockets.adapter.rooms.get(roomId)?.size || 0;
      io.to(roomId).emit("update-room-size", roomSize);
      io.to(roomId).emit("update-total-users", check?.usersList?.length || 0);
    } else {
      socket.emit("join-failed");
    }
  });
  socket.on("get-active-users", (selectedRoom) => {
    const roomSize = io.sockets.adapter.rooms.get(selectedRoom)?.size || 0;
    socket.emit("active-room-size", roomSize);
  });
  socket.on("user-joined", async (userInfo) => {
    if (!userInfo) return;
    const userId = userInfo._id;
    onlineUserList.set(socket.id, userId);
    console.log(onlineUserList);

    const roomIds = userInfo?.rooms || [];
    if (roomIds.length != 0) {
      roomIds.map(async (room) => {
        await socket.join(room);
      });
    }
    if (roomIds.length != 0) {
      roomIds.forEach((roomId) => {
        const roomSize = io.sockets.adapter.rooms.get(roomId)?.size || 0;
        io.to(roomId).emit("update-room-size", roomSize);
      });
    }
  });
  socket.on("signout", () => {
    const roomIDs = [...socket.rooms];
    socket.leaveAll();
    roomIDs.forEach((roomId) => {
      const roomSize = io.sockets.adapter.rooms.get(roomId)?.size || 0;
      io.to(roomId).emit("update-room-size", roomSize);
    });
  });
  socket.on("update-code", async ({ roomId, code }) => {
    await updateCode(roomId, code);
    socket.broadcast.to(roomId).emit("update-code", { code, roomId });
  });
  socket.on(
    "update-random-code",
    catchAsyncError(async ({ roomId, code }) => {
      await updateRandomRoomCode(roomId, code);
      socket.broadcast.to(roomId).emit("update-random", code);
    })
  );
  socket.on("leave-random-room", (roomId) => {
    socket.leave(roomId);
    const roomSize = io.sockets.adapter.rooms.get(roomId)?.size || 0;
    io.to(roomId).emit("update-room-size", roomSize);
  });
  socket.on("disconnecting", () => {
    const rooms = Array.from(socket?.rooms);
    rooms.forEach((roomId) => {
      const roomSize = io.sockets.adapter.rooms.get(roomId)?.size || 0;
      io.to(roomId).emit("update-room-size", roomSize);
    });
  });
  socket.on("disconnect", () => {
    console.log("disconnect fired");
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT: ${process.env.PORT}`);
});

export { io };
