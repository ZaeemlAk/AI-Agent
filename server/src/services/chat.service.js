import Conversation from "../models/Conversation.js";
import Message, { MESSAGE_ROLES } from "../models/Message.js";
import { getOwnedConversation } from "./conversation.service.js";
import { generateMockReply } from "./mockAi.service.js";

const TITLE_MAX_LENGTH = 50;

function makeTitle(text) {
const oneLine = text.replace(/\s+/g, " ").trim();
return oneLine.length > TITLE_MAX_LENGTH ? `${oneLine.slice(0, TITLE_MAX_LENGTH).trim()}...` : oneLine;
}

export async function sendMessage({ userId, conversationId, content }) {
let conversation;

if (conversationId) {
conversation = await getOwnedConversation(userId, conversationId);
} else {
conversation = await Conversation.create({ userId, title: makeTitle(content) });
}

const userMessage = await Message.create({
conversationId: conversation._id,
role: MESSAGE_ROLES.USER,
content,
});

const replyText = await generateMockReply(content);

const assistantMessage = await Message.create({
conversationId: conversation._id,
role: MESSAGE_ROLES.ASSISTANT,
content: replyText,
});

conversation.updatedAt = new Date();
await conversation.save();
return { conversation, userMessage, assistantMessage };
}