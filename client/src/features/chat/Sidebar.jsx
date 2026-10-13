import { Link } from "react-router-dom";
import ConversationList from "./ConversationList";

const FUTURE_ITEMS = [
{ label: "Agents", phase: "Phase 9" },
{ label: "Documents", phase: "Phase 6" },
{ label: "Tickets", phase: "Phase 11" },
{ label: "Settings", phase: "Later" },
];

export default function Sidebar({
user, conversations, loading, error, search, onSearch, activeId,
onNewChat, onRename, onDelete, onLogout, open, onClose,
}) {
return (
<>

{open && <div className="fixed inset-0 bg-black/60 z-20 md:hidden" onClick={onClose} />}

<aside
className={`fixed inset-y-0 left-0 z-30 w-72 bg-slate-900 border-r border-slate-800 flex flex-col
transform transition-transform md:static md:translate-x-0
${open ? "translate-x-0" : "-translate-x-full"}`}
>
<div className="p-3 space-y-3">
<Link to="/chat" onClick={() => { onNewChat(); onClose(); }}
className="block w-full text-center rounded-lg bg-indigo-600 hover:bg-indigo-500 py-2 text-sm font-medium">
+ New chat
</Link>
<input
type="search"
value={search}
onChange={(e) => onSearch(e.target.value)}
placeholder="Search conversations"
aria-label="Search conversations"
className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm
placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
/>
</div>

<nav className="flex-1 overflow-y-auto px-2" aria-label="Conversations">
{error && <p className="px-3 py-2 text-sm text-red-400">{error}</p>}
<ConversationList
conversations={conversations}
activeId={activeId}
loading={loading}
search={search}
onRename={onRename}
onDelete={onDelete}
onNavigate={onClose}
/>
</nav>

<div className="border-t border-slate-800 p-2">
{FUTURE_ITEMS.map((item) => (
<button key={item.label} disabled
className="w-full flex items-center justify-between px-3 py-2 text-sm text-slate-500 cursor-not-allowed">
{item.label}
<span className="text-xs rounded bg-slate-800 px-2 py-0.5">{item.phase}</span>
</button>
))}
</div>

<div className="border-t border-slate-800 p-3 flex items-center justify-between gap-2">
<div className="min-w-0">
<p className="text-sm truncate">{user.name}</p>
<p className="text-xs text-slate-500 truncate">{user.email}</p>
</div>
<button onClick={onLogout}
className="shrink-0 rounded-lg border border-slate-700 hover:bg-slate-800 px-3 py-1 text-xs">
Log out
</button>
</div>
</aside>
</>
);
}