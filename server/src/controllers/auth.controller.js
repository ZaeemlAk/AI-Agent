import bcrypt from "bcrypt";
import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { signToken } from "../utils/jwt.js";

const DUMMY_HASH = bcrypt.hashSync("dummy-password-for-timing", 12);

export const register = asyncHandler(async (req, res) => {
const name = req.body.name.trim();
const email = req.body.email.trim().toLowerCase();

const existing = await User.findOne({ email });
if (existing) throw new AppError("An account with this email already exists", 409, "EMAIL_EXISTS");


const user = await User.create({ name, email, password: req.body.password });
res.status(201).json({ success: true, data: { user, token: signToken(user._id) } });
});

export const login = asyncHandler(async (req, res) => {
const email = req.body.email.trim().toLowerCase();
const user = await User.findOne({ email }).select("+password");

let passwordOk = false;
if (user) passwordOk = await user.comparePassword(req.body.password);
else await bcrypt.compare(req.body.password, DUMMY_HASH); // keeps response time similar

if (!user || !passwordOk) throw new AppError("Invalid email or password", 401, "INVALID_CREDENTIALS");
if (!user.isActive) throw new AppError("This account has been disabled", 403, "ACCOUNT_DISABLED");

res.status(200).json({ success: true, data: { user, token: signToken(user._id) } });
});

export const getMe = asyncHandler(async (req, res) => {
res.status(200).json({ success: true, data: { user: req.user } });
});

export const logout = asyncHandler(async (req, res) => {
res.status(200).json({ success: true, data: { message: "Logged out successfully" } });
});