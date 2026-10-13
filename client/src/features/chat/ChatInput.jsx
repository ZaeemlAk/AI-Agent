import { useState } from "react";

const MAX_LENGTH = 4000;

export default function ChatInput({ onSend, disabled }) {
const [value, setValue] = useState("");

const submit = async () => {
const text = value.trim();
if (!text || disabled) return;

setValue("");
const ok = await onSend(text);
if (!ok) setValue(text); 
};

const handleKeyDown = (e) => {
if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
e.preventDefault();
submit();
}
};

return (
<div className="border-t border-slate-800 px-4 py-4">
<div className="max-w-3xl mx-auto">
<div className="flex items-end gap-2 rounded-2xl border border-slate-700 bg-slate-900 p-2
focus-within:ring-2 focus-within:ring-indigo-500">
<textarea
value={value}
onChange={(e) => setValue(e.target.value)}
onKeyDown={handleKeyDown}
rows={2}
maxLength={MAX_LENGTH}
disabled={disabled}
placeholder="Type your message..."
aria-label="Message"
className="flex-1 resize-none bg-transparent px-2 py-1 text-sm placeholder-slate-500
focus:outline-none disabled:opacity-60 max-h-40"
/>
<button
onClick={submit}
disabled={disabled || !value.trim()}
className="rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40
disabled:hover:bg-indigo-600 px-4 py-2 text-sm font-medium"
>
Send
</button>
</div>
<p className="text-xs text-slate-500 mt-2 flex justify-between">
<span>Enter to send · Shift+Enter for a new line</span>
{value.length > MAX_LENGTH * 0.9 && <span>{value.length}/{MAX_LENGTH}</span>}
</p>
</div>
</div>
);
}