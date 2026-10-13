import api from "./api";

export const registerUser = (data) => api.post("/auth/register", data).then((r) => r.data.data);
export const loginUser = (data) => api.post("/auth/login", data).then((r) => r.data.data);
export const fetchCurrentUser = () => api.get("/auth/me").then((r) => r.data.data.user);
export const logoutUser = () => api.post("/auth/logout").then((r) => r.data.data);