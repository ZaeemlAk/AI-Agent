import mongoose from "mongoose";

export const AGENT_TYPES = Object.freeze({
GENERAL: "GENERAL",
RESEARCH: "RESEARCH",
DOCUMENT: "DOCUMENT",
CODING: "CODING",
DATA_ANALYSIS: "DATA_ANALYSIS",
SUPPORT: "SUPPORT",
});

const conversationSchema = new mongoose.Schema(
{
userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
title: { type: String, trim: true, maxlength: 100, default: "New conversation" },
agentType: { type: String, enum: Object.values(AGENT_TYPES), default: AGENT_TYPES.GENERAL },
},
{ timestamps: true }
);

conversationSchema.index({ userId: 1, updatedAt: -1 });

export default mongoose.model("Conversation", conversationSchema);