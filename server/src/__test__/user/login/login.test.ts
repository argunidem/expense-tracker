import supertest from "supertest";
import app from "@/app";
import User from "@/models/user";
import { setupTestEnvironment, teardownTestEnvironment } from "@/__test__/test-setup";
import {
   validLoginInput,
   invalidLoginEmail,
   invalidLoginPassword,
   incorrectLoginPassword,
   userNotFoundLogin,
} from "./login.data";
import { validRegistrationInput } from "../register/register.data";
import { successResponse } from "../user.data";

//- Test route: POST /api/users/login
describe("/api/users/register", () => {
   //- Connect to a new in-memory database before running any tests.
   beforeAll(setupTestEnvironment);
   afterAll(teardownTestEnvironment);

   //- Validation middleware
   describe("validate middleware", () => {
      test("should return 400 and invalid email message", async () => {
         const { statusCode, body } = await supertest(app)
            .post("/api/users/login")
            .set("content-type", "application/json")
            .send(invalidLoginEmail);

         expect(statusCode).toBe(400);
         expect(body.status).toEqual("fail");
         expect(body.message).toEqual("The email provided is invalid.");
      });
      test("should return 400 and invalid password message", async () => {
         const { statusCode, body } = await supertest(app)
            .post("/api/users/login")
            .set("content-type", "application/json")
            .send(invalidLoginPassword);

         expect(statusCode).toBe(400);
         expect(body.status).toEqual("fail");
         expect(body.message).toEqual("Password must have at least 6 characters.");
      });
   });

   //- Controller tests
   describe("controller", () => {
      //- Service tests
      describe("service", () => {
         test("should return 404 and not found message", async () => {
            const { statusCode, body } = await supertest(app)
               .post("/api/users/login")
               .set("content-type", "application/json")
               .send(userNotFoundLogin);

            expect(statusCode).toBe(404);
            expect(body.message).toEqual("User not found.");
         });
         test("should return 401 and invalid credentials message", async () => {
            await User.create(validRegistrationInput);

            const { statusCode, body } = await supertest(app)
               .post("/api/users/login")
               .set("content-type", "application/json")
               .send(incorrectLoginPassword);

            expect(statusCode).toBe(401);
            expect(body.message).toEqual("Invalid credentials.");
         });
         afterEach(async () => {
            await User.deleteMany();
         });
      });

      test("should return 200 and the user data", async () => {
         await User.create(validRegistrationInput);
         const { statusCode, headers, body } = await supertest(app)
            .post("/api/users/login")
            .set("content-type", "application/json")
            .send(validLoginInput);

         expect(statusCode).toBe(200);
         expect(headers["set-cookie"]).toBeDefined();
         expect(body).toEqual(successResponse);
      });
   });
});
