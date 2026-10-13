import { useCallback, useEffect, useRef, useState } from "react";
import { fetchMessages, sendChatMessage } from "../services/chatService";
import { getErrorMessage } from "../utils/getErrorMessage";

export function useChat({ conversationId, onSent }) {
const [messages, setMessages] = useState([]);
const [loading, setLoading] = useState(false);
const [sending, setSending] = useState(false);
const [error, setError] = useState("");


const activeIdRef = useRef(conversationId ?? null);
activeIdRef.current = conversationId ?? null;


const skipLoadForRef = useRef(null);
useEffect(() => {
setError("");

if (!conversationId) {
setMessages([]);
setLoading(false);
return;
}
if (skipLoadForRef.current === conversationId) {
skipLoadForRef.current = null;
return;
}

let ignore = false;
setLoading(true);
setMessages([]);
fetchMessages(conversationId)
.then((data) => {
if (!ignore) setMessages(data.messages);
})
.catch((err) => {
if (!ignore) setError(getErrorMessage(err));
})
.finally(() => {
if (!ignore) setLoading(false);
});

return () => {
ignore = true;
};
}, [conversationId]);


const send = useCallback(
async (content) => {
const startedIn = conversationId ?? null;
const tempId = `temp-${Date.now()}`;

setError("");
setSending(true);

setMessages((prev) => [
...prev,
{ _id: tempId, role: "user", content, createdAt: new Date().toISOString(), pending: true },
]);

try {
const { conversation, userMessage, assistantMessage } = await sendChatMessage({
conversationId,
content,
});

const stillHere = activeIdRef.current === startedIn;
if (stillHere) {
setMessages((prev) => [...prev.filter((m) => m._id !== tempId), userMessage, assistantMessage]);
if (!startedIn) skipLoadForRef.current = conversation._id;
}
onSent?.(conversation, { isNew: !startedIn, stillHere });
return true;
} catch (err) {
if (activeIdRef.current === startedIn) {
setMessages((prev) => prev.filter((m) => m._id !== tempId));
setError(getErrorMessage(err));
}
return false;
} finally {
setSending(false);
}
},
[conversationId, onSent]
);
return { messages, loading, sending, error, send };
}