import { Router } from "express";
import { register, login, logout, profile } from "../controllers/users";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", profile);

export default router;
