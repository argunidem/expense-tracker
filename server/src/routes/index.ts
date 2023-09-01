import { Router } from "express";
import user from "./user";
import income from "./income";

const router = Router();

//! /api/users
router.use("/users", user);

//! /api/incomes
router.use("/incomes", income);

export default router;
