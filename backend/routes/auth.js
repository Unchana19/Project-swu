import { Router } from "express";
const router = Router();
import { createAccount, login } from "../controllers/authController";

router.post("/createAccount", createAccount);
router.post("/login", login);

export default router;