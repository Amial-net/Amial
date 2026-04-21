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

// ──────────────────────────────────────────────
// GET /messages/:conversationId
// Get all messages in a conversation
// Query: ?page=1&limit=50
// ──────────────────────────────────────────────
router.get("/:conversationId", async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { conversationId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const skip = (page - 1) * limit;
 
    // Verify the user is a participant in this conversation
    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: userId,
    });
 
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }
 
    const messages = await Message.find({ conversation: conversationId })
      .populate("sender", "username")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
 
    const total = await Message.countDocuments({
      conversation: conversationId,
    });
 
    return res.status(200).json({
      success: true,
      messages: messages.reverse(), // oldest first for display
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Get messages error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error fetching messages.",
    });
  }
});
 
// ──────────────────────────────────────────────
// POST /messages/:conversationId
// Send a message in a conversation
// Body: { content: "hello!" }
// ──────────────────────────────────────────────
router.post("/:conversationId", async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { conversationId } = req.params;
    const { content } = req.body;
 
    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message content is required.",
      });
    }
 
    // Verify the user is a participant
    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: userId,
    });
 
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }
 
    const message = await Message.create({
      conversation: conversationId,
      sender: userId,
      content: content.trim(),
      readBy: [userId], // sender has already "read" their own message
    });
 
    // Update the conversation's last message
    conversation.lastMessage = {
      content: content.trim(),
      sender: userId,
      timestamp: new Date(),
    };
    await conversation.save();
 
    const populated = await Message.findById(message._id).populate(
      "sender",
      "username"
    );
 
    return res.status(201).json({
      success: true,
      message: populated,
    });
  } catch (err) {
    console.error("Send message error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error sending message.",
    });
  }
});

// ──────────────────────────────────────────────
// PATCH /messages/:conversationId/read
// Mark all messages in a conversation as read
// ──────────────────────────────────────────────
router.patch("/:conversationId/read", async (req, res) => {
  try {
    const userId = req.session.user.id;
    const { conversationId } = req.params;
 
    // Verify participation
    const conversation = await Conversation.findOne({
      _id: conversationId,
      participants: userId,
    });
 
    if (!conversation) {
      return res.status(404).json({
        success: false,
        message: "Conversation not found.",
      });
    }
 
    // Add userId to readBy for all messages not yet read by this user
    await Message.updateMany(
      {
        conversation: conversationId,
        readBy: { $nin: [userId] },
      },
      {
        $addToSet: { readBy: userId },
      }
    );
 
    return res.status(200).json({
      success: true,
      message: "Messages marked as read.",
    });
  } catch (err) {
    console.error("Mark read error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error marking messages as read.",
    });
  }
});
 
module.exports = router;
