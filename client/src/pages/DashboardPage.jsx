import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function DashboardPage() {
const { user, logout } = useAuth();
const [health, setHealth] = useState(null);

  
useEffect(() => {
api.get("/health").then((res) => setHealth(res.data)).catch(() => setHealth({ failed: true }));
}, []);

return (
<div className="min-h-screen px-4 py-10">
<div className="max-w-2xl mx-auto">
<header className="flex items-center justify-between mb-8">
<h1 className="text-xl font-semibold">NextGen AI Agent</h1>
<button onClick={logout}
className="rounded-lg border border-slate-700 hover:bg-slate-800 px-4 py-2 text-sm">
Log out
</button>
</header>

<section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
<h2 className="text-lg font-medium">Hello, {user.name} 👋</h2>
<p className="text-slate-400 text-sm mt-1">You are logged in. This page is protected.</p>

<dl className="mt-6 grid grid-cols-3 gap-y-3 text-sm">
<dt className="text-slate-400">Email</dt>
<dd className="col-span-2">{user.email}</dd>
<dt className="text-slate-400">Role</dt>
<dd className="col-span-2">{user.role}</dd>
<dt className="text-slate-400">Member since</dt>
<dd className="col-span-2">{new Date(user.createdAt).toLocaleDateString()}</dd>
<dt className="text-slate-400">Backend</dt>
<dd className="col-span-2">
{!health && "Checking..."}
{health?.failed && "Unreachable"}
{health?.success && `Running (database: ${health.data.db})`}
</dd>
</dl>
</section>

<p className="text-slate-500 text-sm mt-6">
Chat is not built yet. It arrives in Phase 3.
</p>
</div>
</div>
);
}