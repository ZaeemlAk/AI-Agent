import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { verifyToken } from "../utils/jwt.js";

export const protect = asyncHandler(async (req, res, next) => {
const header = req.headers.authorization;
if (!header || !header.startsWith("Bearer ")) {
throw new AppError("Authentication required", 401, "AUTH_REQUIRED");
}

let decoded;
try {
decoded = verifyToken(header.split(" ")[1]);
} catch (err) {
if (err.name === "TokenExpiredError") {
throw new AppError("Session expired. Please log in again.", 401, "TOKEN_EXPIRED");
}
throw new AppError("Invalid token", 401, "INVALID_TOKEN");
}

const user = await User.findById(decoded.id);
if (!user || !user.isActive) throw new AppError("This account is not available", 401, "USER_INACTIVE");

req.user = user;
next();
});

export const authorize = (...allowedRoles) => (req, res, next) => {
if (!req.user || !allowedRoles.includes(req.user.role)) {
return next(new AppError("You do not have permission to do this", 403, "FORBIDDEN"));
}
next();
};