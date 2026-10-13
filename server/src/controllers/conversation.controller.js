import { asyncHandler } from "../utils/asyncHandler.js";
import { parsePagination } from "../utils/pagination.js";
import * as conversationService from "../services/conversation.service.js";


export const list = asyncHandler(async (req, res) => {
const search = typeof req.query.search === "string" ? req.query.search.trim().slice(0, 100) : "";
const pageInfo = parsePagination(req.query, { defaultLimit: 50, maxLimit: 100 });

const data = await conversationService.listConversations(req.user._id, { search, ...pageInfo });
res.status(200).json({ success: true, data });
});

export const create = asyncHandler(async (req, res) => {
const title = req.body?.title?.trim();
const conversation = await conversationService.createConversation(req.user._id, { title });
res.status(201).json({ success: true, data: { conversation } });
});

export const getOne = asyncHandler(async (req, res) => {
const conversation = await conversationService.getOwnedConversation(req.user._id, req.params.id);
res.status(200).json({ success: true, data: { conversation } });
});

export const rename = asyncHandler(async (req, res) => {
const conversation = await conversationService.renameConversation(
req.user._id,
req.params.id,
req.body.title.trim()
);
res.status(200).json({ success: true, data: { conversation } });
});

export const remove = asyncHandler(async (req, res) => {
await conversationService.deleteConversation(req.user._id, req.params.id);
res.status(200).json({ success: true, data: { message: "Conversation deleted" } });
});

export const getMessages = asyncHandler(async (req, res) => {
const pageInfo = parsePagination(req.query, { defaultLimit: 100, maxLimit: 200 });
const data = await conversationService.listMessages(req.user._id, req.params.id, pageInfo);
res.status(200).json({ success: true, data });
});