import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { tokenStorage, setUnauthorizedHandler } from "../services/api";
import { registerUser, loginUser, fetchCurrentUser, logoutUser } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(Boolean(tokenStorage.get()));

const clearSession = useCallback(() => { tokenStorage.clear(); setUser(null); }, []);

useEffect(() => {
if (!tokenStorage.get()) return;
fetchCurrentUser().then(setUser).catch(clearSession).finally(() => setLoading(false));
}, [clearSession]);

useEffect(() => { setUnauthorizedHandler(clearSession); }, [clearSession]);

const login = async (credentials) => {
const { user, token } = await loginUser(credentials);
tokenStorage.set(token); setUser(user);
};
const register = async (details) => {
const { user, token } = await registerUser(details);
tokenStorage.set(token); setUser(user);
};
const logout = async () => {
try { await logoutUser(); } catch { /* still log out locally */ }
clearSession();
};

const value = useMemo(
() => ({ user, loading, isAuthenticated: Boolean(user), login, register, logout }),
[user, loading]
);
return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
const ctx = useContext(AuthContext);
if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
return ctx;
}