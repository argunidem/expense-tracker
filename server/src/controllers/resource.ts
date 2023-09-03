import { NextFunction, Request, Response } from "express";
import {
   createResource,
   deleteResourceById,
   getAndVerifyResource,
   updateResourceById,
} from "@/services/resource";
import {
   ResourceController,
   ResourceInput,
   ResourceParams,
   UpdateResourceInput,
} from "@/interfaces/resource";
import { MessageResponse, ResourceResponse, ResultsResponse } from "@/interfaces/response";

//! Create resource
//! POST request
//! /api/incomes  or  /api/expenses
//! Private Route
const create: ResourceController =
   (model) => async (req: Request<{}, ResourceResponse, ResourceInput>, res, next) => {
      try {
         //- Add user to request body
         req.body.user = req.user?._id;

         //- Create resource
         const resource = await createResource(req.body, model);

         res.status(201).json({
            status: "success",
            data: resource,
         });
      } catch (error: any) {
         console.log(error);
         next(error);
      }
   };

//! Get resources
//! GET request
//! /api/incomes  or  /api/expenses
//! Private Route
const getResources = async (
   _req: Request<{}, ResultsResponse, {}>,
   res: Response<ResultsResponse>,
   next: NextFunction
) => {
   try {
      res.status(200).json(res.results);
   } catch (error: any) {
      next(error);
   }
};

//! Get single resource
//! GET request
//! /api/incomes/:id  or  /api/expenses/:id
//! Private Route
const getResource: ResourceController =
   (model) => async (req: Request<ResourceParams, ResourceResponse, {}>, res, next) => {
      try {
         //- Get resource by id and verify if user is owner
         const resource = await getAndVerifyResource(req, model);
         res.status(200).json({
            status: "success",
            data: resource,
         });
      } catch (error: any) {
         next(error);
      }
   };

//! Update resource
//! PUT request
//! /api/incomes/:id  or  /api/expenses/:id
//! Private Route
const updateResource: ResourceController =
   (model) =>
   async (req: Request<ResourceParams, ResourceResponse, UpdateResourceInput>, res, next) => {
      try {
         //- Update resource
         const resource = await updateResourceById(req, model);

         res.status(200).json({
            status: "success",
            data: resource,
         });
      } catch (error: any) {
         next(error);
      }
   };

//! Delete resource
//! DELETE request
//! /api/incomes/:id  or  /api/expenses/:id
//! Private Route
const deleteResource: ResourceController =
   (model) => async (req: Request<ResourceParams, MessageResponse, {}>, res, next) => {
      try {
         //- Delete resource
         await deleteResourceById(req, model);

         res.status(200).json({
            status: "success",
            message: "Resource deleted successfully",
         });
      } catch (error: any) {
         next(error);
      }
   };

export { create, getResources, getResource, updateResource, deleteResource };
