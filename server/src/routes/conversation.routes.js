import { Router } from "express";
import * as controller from "../controllers/conversation.controller.js";
import { protect } from "../middleware/auth.js";
import {
validateIdParam,
validateCreateConversation,
validateRenameConversation,
} from "../middleware/validateChat.js";

const router = Router();

router.use(protect); 

router.get("/", controller.list);
router.post("/", validateCreateConversation, controller.create);
router.get("/:id", validateIdParam, controller.getOne);
router.patch("/:id", validateIdParam, validateRenameConversation, controller.rename);
router.delete("/:id", validateIdParam, controller.remove);
router.get("/:id/messages", validateIdParam, controller.getMessages);

export default router;