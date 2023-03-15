// (jw) ADD NEW SPORT.       // REMOVE SPORT.        CREATE VENUE
const router = require("express").Router();
const { Sport, Venue } = require("../db/index");

// GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
});
// GET /api/users/:id
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: Order,
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});
// POST /api/users
router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await User.create(req.body));
  } catch (error) {
    next(error);
  }
});

// PUT /api/users/:id
router.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.send(await user.update(req.body));
  } catch (error) {
    next();
  }
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const usertoDestroy = await User.findByPk(req.params.id);
    await usertoDestroy.destroy();
    res.send(usertoDestroy);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
