import supertest from "supertest";
import app from "@/app";
import { setupTestEnvironment, teardownTestEnvironment } from "@/__test__/test-setup";
import {
   IncomeData,
   invalidAmount,
   invalidIncomeData,
   invalidType,
   successResponse,
} from "../transaction.data";
import User from "@/models/user";
import { validRegistrationInput } from "@/__test__/user/register/register.data";
import { validLoginInput } from "@/__test__/user/login/login.data";
import Category from "@/models/category";
import Transaction from "@/models/transaction";
import { TransactionDocument } from "@/interfaces/transaction";

//- Test route: PUT /api/transactions/:id
describe("/api/transactions/:id", () => {
   //- Connect to a new in-memory database before running any tests.
   beforeAll(setupTestEnvironment);
   afterAll(teardownTestEnvironment);

   let login: supertest.Response;
   let validCreateIncomeData: IncomeData = { ...invalidIncomeData };
   let transaction: TransactionDocument;
   beforeAll(async () => {
      await User.create(validRegistrationInput);
      login = await supertest(app).post("/api/users/login").send(validLoginInput);
      const category = await Category.create({
         name: "Salary",
         user: login.body.data._id,
      });
      validCreateIncomeData.category = category._id;

      transaction = await Transaction.create({
         ...validCreateIncomeData,
         user: login.body.data._id,
      });
   });

   //- Middleware tests
   describe("middlewares", () => {
      //- Route protection middleware
      describe("protect middleware", () => {
         test("should return 401 and unauthorized message", async () => {
            const { statusCode, body } = await supertest(app)
               .put(`/api/transactions/${transaction._id}`)
               .set("content-type", "application/json")
               .send(validCreateIncomeData);

            expect(statusCode).toBe(401);
            expect(body.message).toEqual(
               "Unauthorized: You must be logged in to access this resource."
            );
         });
      });

      //- Validation middleware
      describe("validate middleware", () => {
         const makeRequest = async (body: any) => {
            return await supertest(app)
               .put(`/api/transactions/${transaction._id}`)
               .set("content-type", "application/json")
               .set("Cookie", [login.headers["set-cookie"]])
               .send(body);
         };

         test("should return 400 and invalid type message", async () => {
            const { statusCode, body } = await makeRequest(invalidType);
            expect(statusCode).toBe(400);
            expect(body.status).toEqual("fail");
            expect(body.message).toContain("Invalid enum value.");
         });
         test("should return 400 and invalid amount message", async () => {
            const { statusCode, body } = await makeRequest(invalidAmount);
            expect(statusCode).toBe(400);
            expect(body.status).toEqual("fail");
            expect(body.message).toEqual("Number must be greater than or equal to 0.01");
         });
      });
   });

   //- Controller tests
   describe("controller", () => {
      //- Service tests
      describe("service", () => {
         test("should return 404 and not found message", async () => {
            const { statusCode, body } = await supertest(app)
               .put("/api/transactions/654bac301e6322cdd4cab744")
               .set("content-type", "application/json")
               .set("Cookie", [login.headers["set-cookie"]])
               .send(invalidIncomeData);
            expect(statusCode).toBe(404);
            expect(body.message).toEqual("Transaction not found.");
         });
         test("should return 200 and the updated transaction", async () => {
            const { statusCode, body } = await supertest(app)
               .put(`/api/transactions/${transaction._id}`)
               .set("content-type", "application/json")
               .set("Cookie", [login.headers["set-cookie"]])
               .send(validCreateIncomeData);
            expect(statusCode).toBe(200);
            expect(body).toEqual(successResponse);
         });
      });
      afterAll(async () => {
         await User.deleteMany();
      });
   });
});
