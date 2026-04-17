const mongoose = require("mongoose");
 
const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    lastMessage: {
      content: { type: String, default: "" },
      sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      timestamp: { type: Date, default: Date.now },
    },
  },
  { timestamps: true }
);
 
// Index so we can quickly find all conversations a user is in
conversationSchema.index({ participants: 1 });
 
module.exports = mongoose.model("Conversation", conversationSchema);
 