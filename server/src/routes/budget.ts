import { Router } from "express";
import { protect } from "@/middlewares";
import { getBudget, getBudgets } from "@/controllers/budget";

const router = Router();

router.get("/", protect, getBudgets);
router.get("/:id", protect, getBudget);

export default router;
