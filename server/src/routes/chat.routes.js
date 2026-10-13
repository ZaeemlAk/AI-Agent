import { Router } from "express";
import { chat } from "../controllers/chat.controller.js";
import { protect } from "../middleware/auth.js";
import { validateSendMessage } from "../middleware/validateChat.js";

const router = Router();

router.use(protect);
router.post("/", validateSendMessage, chat);

export default router;