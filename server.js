// server.js
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

let players = {};

io.on("connection", (socket) => {
  console.log("Player connected:", socket.id);

  // New player joins
  players[socket.id] = { x: 50, y: 50 };
  io.emit("players", players);

  // Player moves
  socket.on("move", (data) => {
    players[socket.id] = data;
    io.emit("players", players);
  });

  // Disconnect
  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("players", players);
  });
});

httpServer.listen(3001, () => console.log("Socket server running on 3001"));
