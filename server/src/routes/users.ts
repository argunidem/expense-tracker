import { Router } from "express";
import { validate } from "../middlewares";
import { register, login, logout, profile } from "../controllers/users";
import { loginSchema, registrationSchema } from "../schemas/user";

const router = Router();

router.post("/register", validate(registrationSchema), register);
router.post("/login", validate(loginSchema), login);
router.get("/logout", logout);
router.get("/profile", profile);

export default router;
