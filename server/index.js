const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");
const api = require("./api");
const PORT = 5000;
const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
); // MIGHT need to edit these credentials. possibly.

// MAYBE cut this, becase we already HAVE a server listening

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET, POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    /* BROADCAST is for all rooms; otherwise, u gotta specify WHICH room.
    socket.broadcast.emit("receive_message", data); */
    socket.to(data.room).emit("receive_message", data);
  });
});
/*server.listen(3001, () => {
  console.log("Pacman-$erver is running.");
});*/

app.use("/api", api);
app.use("/", (req, res) => {
  res.send("API Home page");
});
app.use((err, req, res, next) => {
  console.error(err);
});

server.listen(PORT, () => {
  console.log("server.listen + PORT var => socket.io SERVER IS RUNNING.");
});
// app.listen(PORT, () => {
//   console.log(`Listening on "regular" port ${PORT}`);
// });
