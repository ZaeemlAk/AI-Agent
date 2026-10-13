export function getErrorMessage(error) {
if (error.response?.data?.message) return error.response.data.message;
if (error.request) return "Cannot reach the server. Is the backend running?";
return error.message || "Something went wrong";
}