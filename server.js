const express = require("express");
const http = require("http");
const socket = require("socket.io");
const port = 8000;
const app = express();
const server = http.createServer(app);
const IO = socket(server);

const rooms = {};

IO.on("connection", (socket) => {
  socket.on("join room", (roomId) => {
    if (rooms[roomId]) {
      rooms[roomId].push(socket.id);
    } else {
      rooms[roomId] = [socket.id];
    }
    const otherUser = rooms[roomId].find((id) => id !== socket.id);
    if (otherUser) {
      socket.emit("other user", otherUser);
      socket.to(otherUser).emit("user joined", socket.id);
    }
  });
  socket.on("offer", (payload) => {
    IO.to(payload.target).emit("offer", payload);
  });

  socket.on("answer", (payload) => {
    IO.to(payload.target).emit("answer", payload);
  });

  socket.on("ice-candidate", (incoming) => {
    IO.to(incoming.target).emit("ice-candidate", incoming.candidate);
  });
});

server.listen(port, () => {
  console.log(`Listening to localhost:${port}`);
});
