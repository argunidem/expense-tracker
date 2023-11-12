import { Router } from "express";
import user from "./user";
import transaction from "./transaction";
import budget from "./budget";
import category from "./category";

const router = Router();

//! /api/users
router.use("/users", user);

//! /api/transactions
router.use("/transactions", transaction);

//! /api/budgets
router.use("/budgets", budget);

//! /api/categories
router.use("/categories", category);

export default router;
