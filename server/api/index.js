const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/venues", require("./venues"));
router.use("/sports", require("./sports"));
router.use("/auth", require("./venueAuth"));
router.use("/conversation", require("./conversation"));
// router.use("/message", require("./message"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
