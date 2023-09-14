import { Request } from "express";
import { Document, Model } from "mongoose";
import { ForbiddenError, NotFoundError } from "@/utils/error";
import {
   ResourceDocument,
   ResourceInput,
   ResourceParams,
   ResourceService,
   UpdateResourceInput,
} from "@/interfaces/resource";
import { IncomeInput } from "@/interfaces/income";
import { ExpenseInput } from "@/interfaces/expense";
import { MessageResponse, ResourceResponse } from "@/interfaces/response";

const createResource = async <T extends ResourceDocument>(
   body: IncomeInput | ExpenseInput,
   model: Model<T>
) => {
   const resource = new model(body);
   return await resource.save();
};

const getAndVerifyResource: ResourceService = async (
   req: Request<ResourceParams, any, ResourceInput>,
   model
) => {
   try {
      //- Get resource by id
      const resource = await model.findOne({ _id: req.params.id });

      //- Check if resource exists
      if (!resource) {
         throw new NotFoundError(model.modelName);
      }

      //- Check if user is owner of resource
      if (resource.user.toString() !== req.user?._id.toString()) {
         throw new ForbiddenError();
      }

      //- If query has populate, populate the resource with the user
      if (req.query.populate) {
         await (resource as Document).populate(req.query.populate as string);
      }

      return resource;
   } catch (error) {
      throw error;
   }
};

const updateResourceById: ResourceService = async (
   req: Request<ResourceParams, ResourceResponse, UpdateResourceInput>,
   model
) => {
   try {
      const { body } = req;
      //- Check if resource exists and user is owner
      const resource = await getAndVerifyResource(req, model);

      //- Update resource
      resource.set(body);

      //- Trigger the post save middleware to update the budget
      await resource.save();

      return resource as ResourceDocument;
   } catch (error) {
      throw error;
   }
};

const deleteResourceById = async <T extends ResourceDocument>(
   req: Request<ResourceParams, MessageResponse, {}>,
   model: Model<T>
): Promise<void> => {
   try {
      //- Check if resource exists and user is owner
      const resource = await getAndVerifyResource(req, model);

      //- Delete resource
      await resource.deleteOne();
   } catch (error) {
      throw error;
   }
};

export { createResource, getAndVerifyResource, updateResourceById, deleteResourceById };
