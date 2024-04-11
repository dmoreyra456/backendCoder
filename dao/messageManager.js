const Message = require('../models/messageModel');

async function saveMessage(user, message) {
try {
    const newMessage = new Message({ user, message });
    await newMessage.save();
    return newMessage;
} catch (error) {
    throw error;
  }
}

async function getMessages() {
try {
    const messages = await Message.find().sort({ timestamp: -1 }).limit(10);
    return messages;
  } catch (error) {
    throw error;
  }
}

module.exports = { saveMessage, getMessages };
