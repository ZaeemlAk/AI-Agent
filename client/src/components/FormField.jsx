export default function FormField({ label, id, ...inputProps }) {
return (
<div>
<label htmlFor={id} className="block text-sm text-slate-300 mb-1">
{label}
</label>
<input
id={id}
className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm
placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
{...inputProps}
/>
</div>
);
}