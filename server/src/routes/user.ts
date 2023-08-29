import { Router } from "express";
import { protect, validate } from "@/middlewares";
import { register, login, logout, profile, updateUser, googleOAuth } from "@/controllers/user";
import { loginSchema, registrationSchema, updateSchema } from "@/schemas/user";

const router = Router();

router.post("/register", validate(registrationSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/oauth/google", googleOAuth);

router.get("/logout", protect, logout);

router.get("/profile", protect, profile);
router.put("/update", protect, validate(updateSchema), updateUser);

export default router;
