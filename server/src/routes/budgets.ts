import { getBudget, getBudgets } from "@/controllers/budget";
import { protect } from "@/middlewares";
import { Router } from "express";

const router = Router();

router.get("/", protect, getBudgets);
router.get("/:id", protect, getBudget);

export default router;
