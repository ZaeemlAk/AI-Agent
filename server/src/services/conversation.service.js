import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { AppError } from "../utils/AppError.js";
import { escapeRegex } from "../utils/escapeRegex.js";
import { buildPagination } from "../utils/pagination.js";

export async function getOwnedConversation(userId, conversationId) {
const conversation = await Conversation.findOne({ _id: conversationId, userId });
if (!conversation) {
throw new AppError("Conversation not found", 404, "CONVERSATION_NOT_FOUND");
}
return conversation;
}

export async function listConversations(userId, { search, page, limit, skip }) {
const filter = { userId };
if (search) {
filter.title = { $regex: escapeRegex(search), $options: "i" };
}

const [conversations, total] = await Promise.all([
Conversation.find(filter).sort({ updatedAt: -1 }).skip(skip).limit(limit),
Conversation.countDocuments(filter),
]);

return { conversations, pagination: buildPagination({ page, limit }, total) };
}

export async function createConversation(userId, { title } = {}) {
return Conversation.create({ userId, ...(title ? { title } : {}) });
}

export async function renameConversation(userId, conversationId, title) {
const conversation = await getOwnedConversation(userId, conversationId);
conversation.title = title;
await conversation.save();
return conversation;
}

export async function deleteConversation(userId, conversationId) {
const conversation = await getOwnedConversation(userId, conversationId);
await Message.deleteMany({ conversationId: conversation._id });
await conversation.deleteOne();
}

export async function listMessages(userId, conversationId, { page, limit, skip }) {
const conversation = await getOwnedConversation(userId, conversationId);

const filter = { conversationId: conversation._id };
const [messages, total] = await Promise.all([
Message.find(filter).sort({ createdAt: 1 }).skip(skip).limit(limit),
Message.countDocuments(filter),
]);
return { conversation, messages, pagination: buildPagination({ page, limit }, total) };
}