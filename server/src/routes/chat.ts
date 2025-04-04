import { Router } from "express";
const ai = require("../controllers/chat");

const router = Router();

router.post("/chat", ai.chatWithGPT);

export default router;
