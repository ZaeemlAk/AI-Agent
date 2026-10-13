import { useCallback, useEffect, useState } from "react";
import { fetchConversations } from "../services/chatService";
import { getErrorMessage } from "../utils/getErrorMessage";

export function useConversations() {
const [conversations, setConversations] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [search, setSearch] = useState("");
const [debouncedSearch, setDebouncedSearch] = useState("");
const [refreshKey, setRefreshKey] = useState(0);

useEffect(() => {
const timer = setTimeout(() => setDebouncedSearch(search.trim()), 300);
return () => clearTimeout(timer);
}, [search]);

useEffect(() => {
let ignore = false;
fetchConversations({ search: debouncedSearch })
.then((data) => {
if (ignore) return;
setConversations(data.conversations);
setError("");
})
.catch((err) => {
if (!ignore) setError(getErrorMessage(err));
})
.finally(() => {
if (!ignore) setLoading(false);
});
return () => {
ignore = true;
};
}, [debouncedSearch, refreshKey]);

const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

return { conversations, loading, error, search, setSearch, refresh };
}