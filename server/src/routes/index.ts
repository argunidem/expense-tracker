import { Router } from "express";
import user from "./user";

const router = Router();

//! /api/users
router.use("/users", user);

export default router;
