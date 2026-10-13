
export default function MessageBubble({ message }) {
const isUser = message.role === "user";

return (
<div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
<div
className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed
whitespace-pre-wrap break-words
${isUser ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-100 border border-slate-700"}
${message.pending ? "opacity-60" : ""}`}
>
{message.content}
</div>
</div>
);
}