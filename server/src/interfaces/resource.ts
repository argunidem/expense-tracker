import { z } from "zod";
import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { ExpenseDocument, ExpenseInput } from "./expense";
import { IncomeDocument, IncomeInput } from "./income";
import { MessageResponse, ResourceResponse } from "./response";
import { paramsSchema } from "@/schemas/params";

//! Resource input (income or expense)
type ResourceInput = ExpenseInput & IncomeInput;
//! Update resource input (income or expense)
type UpdateResourceInput = Partial<ResourceInput>;

//! Resource params (/:id)
type ResourceParams = z.infer<typeof paramsSchema>["params"];

//! Resource document (income or expense)
type ResourceDocument = IncomeDocument | ExpenseDocument;

//! Resource controller (create, get, update, delete)
type ResourceController = <T extends ResourceDocument>(
   model: Model<T>
) => (
   req: Request<any, ResourceResponse | MessageResponse, any>,
   res: Response<ResourceResponse | MessageResponse>,
   next: NextFunction
) => Promise<void>;

//! Resource service (get, update, delete)
type ResourceService = <T extends ResourceDocument>(
   req: Request<ResourceParams, any, any>,
   model: Model<T>
) => Promise<ResourceDocument>;

export {
   ResourceInput,
   UpdateResourceInput,
   ResourceParams,
   ResourceDocument,
   ResourceController,
   ResourceService,
};
