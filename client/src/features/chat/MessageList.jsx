import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function MessageList({ messages, loading, sending }) {
const bottomRef = useRef(null);

  
useEffect(() => {
bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages.length, sending]);

if (loading) {
return <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">Loading messages...</div>;
}

if (messages.length === 0 && !sending) {
return (
<div className="flex-1 flex items-center justify-center px-6 text-center">
<div>
<h2 className="text-xl font-medium">Start a conversation</h2>
<p className="text-slate-400 text-sm mt-2 max-w-sm">
Type a message below. Replies are placeholders for now — a real AI is connected in Phase 4.
</p>
</div>
</div>
);
}

return (
<div className="flex-1 overflow-y-auto px-4 py-6">
<div className="max-w-3xl mx-auto space-y-4">
{messages.map((m) => (
<MessageBubble key={m._id} message={m} />
))}
{sending && (
<div className="flex justify-start">
<div className="rounded-2xl px-4 py-3 text-sm bg-slate-800 border border-slate-700 text-slate-400">
Thinking...
</div>
</div>
)}
<div ref={bottomRef} />
</div>
</div>
);
}