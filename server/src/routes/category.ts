import { Router } from "express";
import { protect, validate } from "@/middlewares";
import {
   createCategory,
   getCategories,
   getCategory,
   deleteCategories,
   deleteCategory,
} from "@/controllers/category";
import { categoryBodySchema } from "@/schemas/category";
import { paramsSchema } from "@/schemas/params";

const router = Router();

router
   .route("/")
   .all(protect)
   .get(getCategories)
   .post(validate(categoryBodySchema), createCategory)
   .delete(deleteCategories);

router
   .route("/:id")
   .all(protect)
   .all(validate(paramsSchema))
   .get(getCategory)
   .delete(deleteCategory);

export default router;
