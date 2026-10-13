import api from "./api";
const unwrap = (response) => response.data.data;

export const fetchConversations = ({ search = "", page = 1, limit = 50 } = {}) =>
api.get("/conversations", { params: { search: search || undefined, page, limit } }).then(unwrap);

export const renameConversation = (id, title) =>
api.patch(`/conversations/${id}`, { title }).then(unwrap);

export const deleteConversation = (id) => api.delete(`/conversations/${id}`).then(unwrap);

export const fetchMessages = (id) => api.get(`/conversations/${id}/messages`).then(unwrap);

export const sendChatMessage = ({ conversationId, content }) =>
api.post("/chat", { conversationId: conversationId || undefined, content }).then(unwrap);