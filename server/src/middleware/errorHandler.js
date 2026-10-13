export function errorHandler(err, req, res, next) {
let statusCode = err.statusCode || 500;
let errorCode = err.errorCode || "INTERNAL_SERVER_ERROR";
let message = err.message || "Something went wrong";


if (err.code === 11000) {
statusCode = 409;
errorCode = "DUPLICATE_KEY";
message = "That value is already in use";
}

if (err.name === "ValidationError" && err.errors) {
statusCode = 400;
errorCode = "VALIDATION_ERROR";
message = Object.values(err.errors).map((e) => e.message).join(", ");
}


if (err.name === "CastError") {
statusCode = 400;
errorCode = "INVALID_ID";
message = "Invalid identifier";
}

if (err.type === "entity.parse.failed") {
statusCode = 400;
errorCode = "INVALID_JSON";
message = "Request body contains invalid JSON";
}

if (statusCode >= 500) {
console.error("[error]", err);
if (process.env.NODE_ENV === "production") {
message = "Something went wrong";
}
}

res.status(statusCode).json({ success: false, message, errorCode });
}