import { getBudget, getBudgets } from "@/controllers/budget";
import { Router } from "express";

const router = Router();

router.get("/", getBudgets);
router.get("/:id", getBudget);

export default router;
