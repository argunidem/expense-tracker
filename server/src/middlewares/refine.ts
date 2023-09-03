import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import { ResourceDocument } from "@/interfaces/resource";

export const refine =
   <T extends ResourceDocument>(model: Model<T>) =>
   async (req: Request, res: Response, next: NextFunction) => {
      try {
         let query;

         //- Copy req.query
         const reqQuery = { ...req.query };

         //- Fields to exclude
         const removeFields = ["select", "sort", "page", "limit", "populate"];

         //- Loop over removeFields and delete them from reqQuery
         removeFields.forEach((param) => delete reqQuery[param]);

         //- Create query string
         let queryStr = JSON.stringify(reqQuery);

         //- Create operators ($gt, $gte, etc)
         queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);

         //- Finding resource
         query = model.find(JSON.parse(queryStr));

         //- Filter by logged-in user's id
         query = query.where("user").equals(req.user?._id);

         //- Select fields
         if (req.query.select) {
            const fields = stripComma(req.query.select as string);
            query = query.select(fields);
         }

         //- Sort
         if (req.query.sort) {
            const sortBy = stripComma(req.query.sort as string);
            query = query.sort(sortBy);
         } else {
            query = query.sort("-createdAt");
         }

         //- Pagination
         const page = parseInt(req.query.page as string, 10) || 1;
         const limit = parseInt(req.query.limit as string, 10) || 25;
         const startIndex = (page - 1) * limit;
         const endIndex = page * limit;
         const total = await model.find({ user: req.user?._id }).countDocuments();

         query = query.skip(startIndex).limit(limit);

         //- Populate
         //- /api/incomes?populate=user-name,email
         //- populate({ path: "user", select: "name email" })
         if (req.query.populate) {
            const populate = req.query.populate as string;
            const path = populate.split("-")[0] || "";
            let select;
            if (populate.split("-")[1]) {
               select = stripComma(populate.split("-")[1]);
            }
            query = query.populate({ path, select: select ?? "-password" });
         }

         //- Executing query
         const results = await query;

         //- Pagination
         type Pagination = { page: number; limit: number };
         const pagination: { next?: Pagination; prev?: Pagination } = {};

         //- If not on last page
         if (endIndex < total) {
            pagination.next = {
               page: page + 1,
               limit,
            };
         }

         //- If not on first page
         if (startIndex > 0) {
            pagination.prev = {
               page: page - 1,
               limit,
            };
         }

         res.results = {
            success: "success",
            count: results.length,
            pagination,
            data: results,
         };

         next();
      } catch (error) {
         next(error);
      }
   };

//- Strip commas and replace with spaces
const stripComma = (str: string) => {
   return str.split(",").join(" ");
};
