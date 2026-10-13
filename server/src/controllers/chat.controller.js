import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMessage } from "../services/chat.service.js";


export const chat = asyncHandler(async (req, res) => {
const result = await sendMessage({
userId: req.user._id,
conversationId: req.body.conversationId || null,
content: req.body.content.trim(),
});
res.status(201).json({ success: true, data: result });
});