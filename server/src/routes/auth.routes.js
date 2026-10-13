import { Router } from "express";
import { register, login, getMe, logout } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";
import { validateRegister, validateLogin } from "../middleware/validateAuth.js";

const router = Router();
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);
export default router;