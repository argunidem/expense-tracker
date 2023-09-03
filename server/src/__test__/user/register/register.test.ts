import supertest from "supertest";
import app from "@/app";
import User from "@/models/user";
import { setupTestEnvironment, teardownTestEnvironment } from "@/__test__/test-setup";
import {
   validRegistrationInput,
   invalidRegistrationName,
   invalidRegistrationEmail,
   invalidRegistrationPassword,
   passwordMismatch,
} from "./register.data";
import { successResponse } from "../user.data";

//- Test route: POST /api/users/register
describe("/api/users/register", () => {
   //- Connect to a new in-memory database before running any tests.
   beforeAll(setupTestEnvironment);
   afterAll(teardownTestEnvironment);

   //- Middleware tests
   describe("validate middleware", () => {
      //- Validation middleware
      test("should return 400 and invalid name message", async () => {
         const { statusCode, body } = await supertest(app)
            .post("/api/users/register")
            .set("content-type", "application/json")
            .send(invalidRegistrationName);

         expect(statusCode).toBe(400);
         expect(body.status).toEqual("fail");
         expect(body.message).toEqual("Name must have at least 4 characters.");
      });

      test("should return 400 and invalid email message", async () => {
         const { statusCode, body } = await supertest(app)
            .post("/api/users/register")
            .set("content-type", "application/json")
            .send(invalidRegistrationEmail);

         expect(statusCode).toBe(400);
         expect(body.status).toEqual("fail");
         expect(body.message).toEqual("The email provided is invalid.");
      });

      test("should return 400 and invalid password message", async () => {
         const { statusCode, body } = await supertest(app)
            .post("/api/users/register")
            .set("content-type", "application/json")
            .send(invalidRegistrationPassword);

         expect(statusCode).toBe(400);
         expect(body.status).toEqual("fail");
         expect(body.message).toEqual("Password must have at least 6 characters.");
      });

      test("should return 400 and password mismatch message", async () => {
         const { statusCode, body } = await supertest(app)
            .post("/api/users/register")
            .set("content-type", "application/json")
            .send(passwordMismatch);

         expect(statusCode).toBe(400);
         expect(body.status).toEqual("fail");
         expect(body.message).toEqual("Passwords do not match.");
      });
   });

   //- Controller tests
   describe("controller", () => {
      test("should return 409 and conflict message", async () => {
         await User.create(validRegistrationInput);

         const { statusCode, body } = await supertest(app)
            .post("/api/users/register")
            .set("content-type", "application/json")
            .send(validRegistrationInput);

         expect(statusCode).toBe(409);
         expect(body.message).toEqual(
            "Conflict: The email address is already in use by another user."
         );
         await User.deleteMany();
      });

      test("should return 201 and the user data", async () => {
         const { statusCode, headers, body } = await supertest(app)
            .post("/api/users/register")
            .set("content-type", "application/json")
            .send(validRegistrationInput);

         expect(statusCode).toBe(201);
         expect(headers["set-cookie"]).toBeDefined();
         expect(body).toEqual(successResponse);
      });
   });
});
