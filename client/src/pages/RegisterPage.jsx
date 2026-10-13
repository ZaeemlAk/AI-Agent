import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../utils/getErrorMessage";
import AuthLayout from "../layouts/AuthLayout";
import FormField from "../components/FormField";
import ErrorBanner from "../components/ErrorBanner";

export default function RegisterPage() {
const { register, isAuthenticated } = useAuth();
const navigate = useNavigate();
const [form, setForm] = useState({ name: "", email: "", password: "" });
const [error, setError] = useState("");
const [submitting, setSubmitting] = useState(false);

if (isAuthenticated) return <Navigate to="/dashboard" replace />;

const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
e.preventDefault();
setError("");
setSubmitting(true);
try {
await register(form);
navigate("/dashboard", { replace: true });
} catch (err) {
setError(getErrorMessage(err));
} finally {
setSubmitting(false);
}
};

return (
<AuthLayout title="Create your account" subtitle="Start using NextGen AI Agent">
<form onSubmit={handleSubmit} className="space-y-4">
<ErrorBanner message={error} />
<FormField label="Name" id="name" name="name" type="text" autoComplete="name"
placeholder="Your name" value={form.name} onChange={handleChange} required />
<FormField label="Email" id="email" name="email" type="email" autoComplete="email"
placeholder="you@example.com" value={form.email} onChange={handleChange} required />
<FormField label="Password" id="password" name="password" type="password"
autoComplete="new-password" placeholder="At least 8 characters, letters + numbers"
value={form.password} onChange={handleChange} required minLength={8} />
<button type="submit" disabled={submitting}
className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 py-2 text-sm font-medium">
{submitting ? "Creating account..." : "Register"}
</button>
</form>
<p className="text-sm text-slate-400 mt-6 text-center">
Already have an account?{" "}
<Link to="/login" className="text-indigo-400 hover:underline">Log in</Link>
</p>
</AuthLayout>
);
}