const express = require("express");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");
const { ensureAuthenticated } = require("../middleware/auth");
 
const router = express.Router();
 
// All message routes require authentication
router.use(ensureAuthenticated);
 
// ──────────────────────────────────────────────
// GET /messages/conversations
// Returns all conversations for the logged-in user
// ──────────────────────────────────────────────
router.get("/conversations", async (req, res) => {
  try {
    const userId = req.session.user.id;
 
    const conversations = await Conversation.find({
      participants: userId,
    })
      .populate("participants", "username email")
      .populate("lastMessage.sender", "username")
      .sort({ "lastMessage.timestamp": -1 });
 
    // For each conversation, count unread messages
    const conversationsWithUnread = await Promise.all(
      conversations.map(async (convo) => {
        const unreadCount = await Message.countDocuments({
          conversation: convo._id,
          sender: { $ne: userId },
          readBy: { $nin: [userId] },
        });
 
        return {
          _id: convo._id,
          participants: convo.participants,
          lastMessage: convo.lastMessage,
          unreadCount,
          updatedAt: convo.updatedAt,
        };
      })
    );
 
    return res.status(200).json({
      success: true,
      conversations: conversationsWithUnread,
    });
  } catch (err) {
    console.error("Get conversations error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error fetching conversations.",
    });
  }
});