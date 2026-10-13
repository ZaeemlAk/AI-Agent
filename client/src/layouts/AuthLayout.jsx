export default function AuthLayout({ title, subtitle, children }) {
return (
<div className="min-h-screen flex items-center justify-center px-4">
<div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
<h1 className="text-2xl font-semibold">{title}</h1>
<p className="text-slate-400 mt-1 mb-6">{subtitle}</p>
{children}
</div>
</div>
);
}