const express = require("express");
const router = express.Router();

// router.use("/users", require("./users"));
// router.use("/venues", require("./venues"));

router.get("/", (req, res) => {
  res.send("api routes");
});

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
