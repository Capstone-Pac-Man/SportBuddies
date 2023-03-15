const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

const api = require("./api");

const PORT = 5000;

const app = express();

app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "http:/localhost:3000",
    credentials: true,
  })
);

app.use("/api", api);

app.use("/", (req, res) => {
  res.send("API Home page");
});

app.use((err, req, res, next) => {
  console.error(err);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
