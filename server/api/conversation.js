const express = require("express");
const router = express.Router();
const { Conversation, ConversationMessage, User } = require("../db/index");
const Sequelize = require("sequelize");

//get All users conversations.
router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.cookies.token);
    if (!user) {
      next(new Error("User not found"));
    }
    const conversations = await Conversation.findAll({
      include: {
        model: User,
        where: { id: user.id },
      },
    });
    if (!conversations) {
      next(new Error("No conversations found"));
    }
    let updated = [];
    await Promise.all(
      conversations.map(async (e) => {
        updated.push(
          await Conversation.findByPk(e.id, {
            include: {
              model: User,
              attributes: ["firstName", "lastName", "id"],
              where: {
                id: {
                  [Sequelize.Op.not]: [user.id],
                },
              },
            },
          })
        );
      })
    );
    res.send(updated);
  } catch (e) {
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.cookies.token);
    const conversation = await Conversation.findByPk(req.params.id, {
      include: [
        {
          model: User,
          where: {
            id: {
              [Sequelize.Op.not]: [user.id],
            },
          },
        },
        {
          model: ConversationMessage,
          include: {
            model: User,
          },
        },
      ],
    });
    res.send(conversation);
  } catch (e) {
    next(e);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.cookies.token);
    const id = user.id;
    const { otherId } = req.body;
    const conversations = await Conversation.findAll({
      include: [
        {
          model: User,
          required: true,
          through: { attributes: [] },
          where: { id: [id, otherId] },
          group: ["conversation.id"],
          having: Sequelize.literal(`COUNT(DISTINCT users.id) = 2`),
        },
        { model: ConversationMessage },
      ],
    });
    const filteredConversations = conversations.filter((conversation) => {
      const userIds = conversation.users.map((user) => user.id);
      return userIds.includes(id) && userIds.includes(otherId);
    });
    if (filteredConversations.length === 0) {
      const conversation = await Conversation.create();
      await conversation.addUser(id);
      await conversation.addUser(otherId);
      const conversationWithUsers = await Conversation.findByPk(
        conversation.id,
        {
          include: [
            {
              model: User,
              where: {
                id: {
                  [Sequelize.Op.not]: [user.id],
                },
              },
            },
            {
              model: ConversationMessage,
            },
          ],
        }
      );
      res.json(conversationWithUsers);
    } else {
      const finalConvo = await Conversation.findByPk(
        filteredConversations[0].id,
        {
          include: [
            {
              model: User,
              where: {
                id: {
                  [Sequelize.Op.not]: [user.id],
                },
              },
            },
            {
              model: ConversationMessage,
            },
          ],
        }
      );
      res.json(finalConvo);
    }
  } catch (e) {
    next(e);
  }
});

router.post("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.cookies.token);
    const convoId = req.params.id;
    const io = req.io;
    const { content, otherId } = req.body;
    await ConversationMessage.create({
      senderId: user.id,
      conversationId: convoId,
      content: content,
    });
    const conversationWithUsers = await Conversation.findByPk(convoId, {
      include: [
        {
          model: User,
        },
        {
          model: ConversationMessage,
          include: {
            model: User,
          },
        },
      ],
    });
    console.log(otherId);
    io.to(otherId).emit("newMessage");
    res.json(conversationWithUsers);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
