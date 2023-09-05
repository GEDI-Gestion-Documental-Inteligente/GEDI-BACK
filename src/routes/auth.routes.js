import { Router } from "express";
import { authLogin } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/auth", authLogin);

export default router;
