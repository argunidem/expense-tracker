import { Router } from "express";
import user from "./user";
import { income, expense } from "./resource";

const router = Router();

//! /api/users
router.use("/users", user);

//! /api/incomes
router.use("/incomes", income);
//! /api/expenses
router.use("/expenses", expense);

export default router;
