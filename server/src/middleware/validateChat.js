import { AppError } from "../utils/AppError.js";

const OBJECT_ID_REGEX = /^[a-f\d]{24}$/i;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_TITLE_LENGTH = 100;

const fail = (message) => new AppError(message, 400, "VALIDATION_ERROR");

export function validateIdParam(req, res, next) {
if (typeof req.params.id !== "string" || !OBJECT_ID_REGEX.test(req.params.id)) {
return next(new AppError("Invalid identifier", 400, "INVALID_ID"));
}
next();
}

export function validateSendMessage(req, res, next) {
const { content, conversationId } = req.body || {};

if (typeof content !== "string" || content.trim().length === 0) {
return next(fail("Message cannot be empty"));
}
if (content.length > MAX_MESSAGE_LENGTH) {
return next(fail(`Message is too long (max ${MAX_MESSAGE_LENGTH} characters)`));
}
if (conversationId !== undefined && conversationId !== null) {
if (typeof conversationId !== "string" || !OBJECT_ID_REGEX.test(conversationId)) {
return next(new AppError("Invalid conversation id", 400, "INVALID_ID"));
}
}
next();
}

export function validateCreateConversation(req, res, next) {
const { title } = req.body || {};
if (title !== undefined) {
if (typeof title !== "string" || title.trim().length === 0 || title.length > MAX_TITLE_LENGTH) {
return next(fail(`Title must be 1 to ${MAX_TITLE_LENGTH} characters`));
}
}
next();
}

export function validateRenameConversation(req, res, next) {
const { title } = req.body || {};
if (typeof title !== "string" || title.trim().length === 0 || title.length > MAX_TITLE_LENGTH) {
return next(fail(`Title must be 1 to ${MAX_TITLE_LENGTH} characters`));
}
next();
}