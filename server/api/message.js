// const express = require("express");
// const router = express.Router();
// const {
//   Conversation,
//   Message,
//   UserConversation,
//   Recipient,
//   User,
// } = require("../db/index");

// //GET api/message/:id
// router.get("/:id", async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const convo = await UserConversation.findOne({
//       where: {
//         conversationId: id,
//       },
//       include: [Recipient, Message],
//     });
//     res.json(convo);
//   } catch (e) {
//     next(e);
//   }
// });

// //POST api/message/:id
// router.post("/:id", async (req, res, next) => {
//   try {
//     const id = req.params.id;
//     const convo = await UserConversation.findOne({
//       where: {
//         conversationId: id,
//       },
//     });
//     let message = await Message.create(req.body);
//     console.log(message);
//     console.log("convo ===>", convo);

//     await convo.addMessage(message);

//     const finalConvo = await UserConversation.findOne({
//       where: {
//         conversationId: id,
//       },
//       include: [Recipient, Message],
//     });
//     res.json(finalConvo);
//   } catch (e) {
//     next(e);
//   }
// });

// module.exports = router;
