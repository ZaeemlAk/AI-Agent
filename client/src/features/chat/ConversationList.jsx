import { Link } from "react-router-dom";

export default function ConversationList({ conversations, activeId, loading, search, onRename, onDelete, onNavigate }) {
if (loading) return <p className="px-3 py-2 text-sm text-slate-500">Loading...</p>;

if (conversations.length === 0) {
return (
<p className="px-3 py-2 text-sm text-slate-500">
{search ? "No conversations match your search." : "No conversations yet."}
</p>
);
}

return (
<ul className="space-y-1">
{conversations.map((c) => {
const active = c._id === activeId;
return (
<li
key={c._id}
className={`group flex items-center rounded-lg ${active ? "bg-slate-800" : "hover:bg-slate-800/60"}`}
>
<Link
to={`/chat/${c._id}`}
onClick={onNavigate}
title={c.title}
className="flex-1 min-w-0 truncate px-3 py-2 text-sm"
>
{c.title}
</Link>
<button
onClick={() => onRename(c)}
aria-label={`Rename ${c.title}`}
className="px-2 py-1 text-slate-500 hover:text-slate-200 md:opacity-0 group-hover:opacity-100 focus:opacity-100"
>
</button>
<button
onClick={() => onDelete(c)}
aria-label={`Delete ${c.title}`}
className="px-2 py-1 mr-1 text-slate-500 hover:text-red-400 md:opacity-0 group-hover:opacity-100 focus:opacity-100"
>
✕
</button>
</li>
);
})}
</ul>
);
}