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

// ──────────────────────────────────────────────
// POST /messages/conversations
// Start a new conversation with another user
// Body: { recipientUsername: "someuser" }
// ──────────────────────────────────────────────
router.post("/conversations", async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { recipientUsername } = req.body;
 
    if (!recipientUsername) {
      return res.status(400).json({
        success: false,
        message: "Recipient username is required.",
      });
    }
 
    const recipient = await User.findOne({
      username: recipientUsername.trim().toLowerCase(),
    });
 
    if (!recipient) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
 
    if (recipient._id.toString() === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot message yourself.",
      });
    }
 
    // Check if a conversation already exists between these two users
    const existing = await Conversation.findOne({
      participants: { $all: [userId, recipient._id], $size: 2 },
    }).populate("participants", "username email");
 
    if (existing) {
      return res.status(200).json({
        success: true,
        conversation: existing,
        message: "Conversation already exists.",
      });
    }
 
    const newConvo = await Conversation.create({
      participants: [userId, recipient._id],
      lastMessage: {
        content: "",
        sender: userId,
        timestamp: new Date(),
      },
    });
 
    const populated = await Conversation.findById(newConvo._id).populate(
      "participants",
      "username email"
    );
 
    return res.status(201).json({
      success: true,
      conversation: populated,
    });
  } catch (err) {
    console.error("Create conversation error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error creating conversation.",
    });
  }
});
