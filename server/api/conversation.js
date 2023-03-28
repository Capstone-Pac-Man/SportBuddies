const express = require("express");
const router = express.Router();
const {
  Conversation,
  Message,
  UserConversation,
  Recipient,
  User,
} = require("../db/index");

//GET api/conversation/:id
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
        },
      },
    });
    res.json(allConversations);
  } catch (e) {
    next(e);
  }
});

//POST api/conversation/:id
router.post("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const recipientId = req.body.id;
    console.log(id);

    const createConvo = await Conversation.create();

    const user = await User.findByPk(+id);
    const recipient = await User.findByPk(+recipientId);
    await user.addConversation(createConvo);

    const newUserConvo = await UserConversation.findOne({
      where: {
        conversationId: createConvo.id,
      },
    });
    const newRecipient = await Recipient.create({
      userConversationId: newUserConvo.id,
      userId: recipient.id,
      name: recipient.fullName,
    });

    await newUserConvo.addRecipient(newRecipient);
    const allConversations = await Conversation.findAll({
      include: {
        model: UserConversation,
        where: {
          userId: id,
        },
        include: {
          model: Recipient,
        },
      },
    });
    res.json(allConversations);
  } catch (e) {
    next(e);
  }
});

//PUT api/conversation/:id

router.put("/:id", async (req, res, next) => {
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
