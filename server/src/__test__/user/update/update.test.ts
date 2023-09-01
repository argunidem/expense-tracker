import supertest from "supertest";
import app from "@/app";
import User from "@/models/user";
import { setupTestEnvironment, teardownTestEnvironment } from "@/__test__/test-setup";
import {
   validUpdateInput,
   invalidUpdateName,
   invalidUpdateEmail,
   invalidUpdatePassword,
   validRegistrationInputToUpdate,
   validLoginInputToUpdate,
   conflictErrorInput,
   updatedResponse,
} from "./update.data";
import { validLoginInput } from "../login/login.data";
import { validRegistrationInput } from "../register/register.data";

describe("/api/users/update", () => {
   beforeAll(setupTestEnvironment);
   afterAll(teardownTestEnvironment);

   describe("middlewares", () => {
      describe("protect middleware", () => {
         test("should return 401 and unauthorized message", async () => {
            const { statusCode, body } = await supertest(app)
               .put("/api/users/update")
               .set("content-type", "application/json")
               .send(validUpdateInput);

            expect(statusCode).toBe(401);
            expect(body.message).toEqual(
               "Unauthorized: You must be logged in to access this resource."
            );
         });
      });

      describe("validate middleware", () => {
         let login: supertest.Response;

         beforeAll(async () => {
            await User.create(validRegistrationInput);
            login = await supertest(app).post("/api/users/login").send(validLoginInput);
         });

         test("should return 400 and invalid name message", async () => {
            const { statusCode, body } = await supertest(app)
               .put("/api/users/update")
               .set("content-type", "application/json")
               .set("Cookie", [login.headers["set-cookie"]])
               .send(invalidUpdateName);

            expect(statusCode).toBe(400);
            expect(body.status).toEqual("fail");
            expect(body.message).toEqual("Name should be 4 characters minimum");
         });

         test("should return 400 and invalid email message", async () => {
            const { statusCode, body } = await supertest(app)
               .put("/api/users/update")
               .set("content-type", "application/json")
               .set("Cookie", [login.headers["set-cookie"]])
               .send(invalidUpdateEmail);

            expect(statusCode).toBe(400);
            expect(body.status).toEqual("fail");
            expect(body.message).toEqual("Not a valid email");
         });

         test("should return 400 and invalid password message", async () => {
            const { statusCode, body } = await supertest(app)
               .put("/api/users/update")
               .set("content-type", "application/json")
               .set("Cookie", [login.headers["set-cookie"]])
               .send(invalidUpdatePassword);

            expect(statusCode).toBe(400);
            expect(body.status).toEqual("fail");
            expect(body.message).toEqual("Password should be 6 characters minimum");
         });

         afterAll(async () => {
            await User.deleteMany();
         });
      });
   });

   describe("controller", () => {
      describe("service", () => {
         test("should return 409 and conflict message", async () => {
            await User.create(validRegistrationInput);
            await User.create(validRegistrationInputToUpdate);
            const login = await supertest(app)
               .post("/api/users/login")
               .send(validLoginInputToUpdate);

            const { statusCode, body } = await supertest(app)
               .put("/api/users/update")
               .set("content-type", "application/json")
               .set("Cookie", [login.headers["set-cookie"]])
               .send(conflictErrorInput);

            expect(statusCode).toBe(409);
            expect(body.message).toEqual(
               "Conflict: The email address is already in use by another user."
            );
            await User.deleteMany();
         });
      });

      test("should return 200 and update user details", async () => {
         await User.create(validRegistrationInput);
         const login = await supertest(app).post("/api/users/login").send(validLoginInput);

         const { statusCode, body } = await supertest(app)
            .put("/api/users/update")
            .set("Cookie", [login.headers["set-cookie"]])
            .send(validUpdateInput);

         expect(statusCode).toBe(200);
         expect(body).toEqual(updatedResponse);
      });

      test("should confirm that the user details have been updated", async () => {
         const { email, name, password } = validUpdateInput;
         const updatedUser = await User.findOne({ email });

         expect(updatedUser).toBeDefined();
         expect(updatedUser?.name).toEqual(name);
         expect(await updatedUser?.matchPassword(password)).toBeTruthy();
      });
   });
});
