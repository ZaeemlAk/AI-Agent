import { AppError } from "../utils/AppError.js";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fail(message) {
return new AppError(message, 400, "VALIDATION_ERROR");
}


export function validateRegister(req, res, next) {
const { name, email, password } = req.body || {};

if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 60) {
return next(fail("Name must be between 2 and 60 characters"));
}
if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim()) || email.length > 254) {
return next(fail("Please provide a valid email address"));
}
if (typeof password !== "string" || password.length < 8 || password.length > 72) {
return next(fail("Password must be between 8 and 72 characters"));
}
if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
return next(fail("Password must contain at least one letter and one number"));
}

next();
}

export function validateLogin(req, res, next) {
const { email, password } = req.body || {};

if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
return next(fail("Email and password are required"));
}
next();
}