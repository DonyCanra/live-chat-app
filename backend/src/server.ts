import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { PORT, CORS_ORIGIN } from "./config";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: CORS_ORIGIN },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("send_message", (data) => {
    io.emit("receive_message", data); // Kirim ke semua client
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
