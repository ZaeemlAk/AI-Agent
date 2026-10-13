import mongoose from "mongoose";

export const MESSAGE_ROLES = Object.freeze({
USER: "user",
ASSISTANT: "assistant",
SYSTEM: "system",
});

const messageSchema = new mongoose.Schema(
{
conversationId: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
role: { type: String, enum: Object.values(MESSAGE_ROLES), required: true },
content: { type: String, required: true, maxlength: 20000 },
sources: { type: [mongoose.Schema.Types.Mixed], default: [] },
toolCalls: { type: [mongoose.Schema.Types.Mixed], default: [] },
},
{ timestamps: { createdAt: true, updatedAt: false } }
);
messageSchema.index({ conversationId: 1, createdAt: 1 });

export default mongoose.model("Message", messageSchema);