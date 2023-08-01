const { Image } = require("../models");

const getAllImages = async (req, res) => {
  try {
    let images = await Image.find();
    res.json(images);
  } catch (error) {
    res.send(error);
  }
};

const getImage = async (req, res) => {
  try {
    let image = await Image.findById(req.params.id);
    res.json(image);
  } catch (error) {
    res.send(error);
  }
};

// const getAllMessages = async (req, res) => {
//   try {
//     let messages = await Message.find({ chat: req.params.chatId }).populate({
//       path: "sender",
//       select: "displayname email",
//     });
//     res.json(messages);
//   } catch (error) {
//     res.send(error);
//   }
// };

// const sendMessage = async (req, res) => {
//   const { sender, content, chat } = req.body;
//   let newMessage = {
//     sender: sender,
//     content: content,
//     chat: chat,
//   };

//   try {
//     let message = await (
//       await Message.create(newMessage)
//     ).populate(["sender", "chat"]);
//     await Chat.findByIdAndUpdate(message.chat, { latestMessage: message._id });
//     //add this created message to the corresponsing chat 'latest message' attribute
//     res.send(message);
//   } catch (error) {
//     res.status(400);
//   }
// };

// module.exports = {
//   getAllMessages,
//   sendMessage,
// };
