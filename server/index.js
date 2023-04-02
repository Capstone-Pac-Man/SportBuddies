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
app.use(express.static(path.join(__dirname, "build")));
app.use(cookieParser());

app.use(cors());

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("makeRoom", ({ id }) => {
    socket.join(id);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api", api);
// Note: NEEDED FOR DEPLOYMENT - DO NOT DELETE
app.get("/css/index.css", (req, res, next) => {
  const cssPath = path.join(__dirname, "..", "src", "index.css");
  res.sendFile(cssPath);
});
app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.use((err, req, res, next) => {
  console.error(err);
});

server.listen(PORT, () => {
  console.log("server.listen + PORT var => socket.io SERVER IS RUNNING.");
});
