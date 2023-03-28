const express = require("express");
const router = express.Router();
const {
  Conversation,
  Message,
  UserConversation,
  Recipient,
  User,
} = require("../db/index");

//GET api/message/:id
router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const allConversations = await Conversation.findAll({
      include: {
        model: UserConversation,
        where: {
          userId: id,
        },
        include: {
          model: Recipient,
          include: [User, Message],
        },
      },
    });
    res.json(allConversations);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
