import { Router } from "express";
import user from "./user";
import transaction from "./transaction";
import budget from "./budgets";

const router = Router();

//! /api/users
router.use("/users", user);

//! /api/transactions
router.use("/transactions", transaction);

//! /api/budgets
router.use("/budgets", budget);

export default router;
