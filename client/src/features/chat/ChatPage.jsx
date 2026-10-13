import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useConversations } from "../../hooks/useConversations";
import { useChat } from "../../hooks/useChat";
import { deleteConversation, renameConversation } from "../../services/chatService";
import { getErrorMessage } from "../../utils/getErrorMessage";
import ErrorBanner from "../../components/ErrorBanner";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";


export default function ChatPage() {
const { conversationId } = useParams();
const navigate = useNavigate();
const { user, logout } = useAuth();
const [sidebarOpen, setSidebarOpen] = useState(false);
const [actionError, setActionError] = useState("");

const { conversations, loading: listLoading, error: listError, search, setSearch, refresh } =
useConversations();


const handleSent = useCallback(
(conversation, { isNew, stillHere }) => {
refresh(); // the sidebar needs the new title / new order
if (isNew && stillHere) navigate(`/chat/${conversation._id}`, { replace: true });
},
[refresh, navigate]
);

const { messages, loading, sending, error, send } = useChat({ conversationId, onSent: handleSent });

const handleDelete = async (conversation) => {
if (!window.confirm(`Delete "${conversation.title}"? This cannot be undone.`)) return;
setActionError("");
try {
await deleteConversation(conversation._id);
if (conversation._id === conversationId) navigate("/chat");
refresh();
} catch (err) {
setActionError(getErrorMessage(err));
}
};

const handleRename = async (conversation) => {
const title = window.prompt("Rename conversation", conversation.title);
if (title === null || !title.trim()) return; // cancelled or empty
setActionError("");
try {
await renameConversation(conversation._id, title.trim());
refresh();
} catch (err) {
setActionError(getErrorMessage(err));
}
};

const activeConversation = conversations.find((c) => c._id === conversationId);

return (
<div className="h-dvh flex">
<Sidebar
user={user}
conversations={conversations}
loading={listLoading}
error={listError}
search={search}
onSearch={setSearch}
activeId={conversationId}
onNewChat={() => setActionError("")}
onRename={handleRename}
onDelete={handleDelete}
onLogout={logout}
open={sidebarOpen}
onClose={() => setSidebarOpen(false)}
/>

<main className="flex-1 min-w-0 flex flex-col">
<header className="flex items-center gap-3 border-b border-slate-800 px-4 py-3">
<button onClick={() => setSidebarOpen(true)} aria-label="Open sidebar"
className="md:hidden rounded-lg border border-slate-700 px-3 py-1 text-sm">
☰
</button>
<h1 className="text-sm font-medium truncate">
{conversationId ? activeConversation?.title || "Conversation" : "New chat"}
</h1>
</header>

{(error || actionError) && (
<div className="px-4 pt-4 max-w-3xl w-full mx-auto">
<ErrorBanner message={error || actionError} />
</div>
)}

<MessageList messages={messages} loading={loading} sending={sending} />
<ChatInput onSend={send} disabled={sending || loading} />
</main>
</div>
);
}