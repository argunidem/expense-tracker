import supertest from "supertest";
import app from "@/app";
import User from "@/models/user";
import { setupTestEnvironment, teardownTestEnvironment } from "@/__test__/test-setup";
import { validLoginInput } from "../login/login.data";
import { validRegistrationInput } from "../register/register.data";

describe("/api/users/logout", () => {
   beforeAll(setupTestEnvironment);
   afterAll(teardownTestEnvironment);

   describe("protect middleware", () => {
      test("should return 401 and unauthorized message", async () => {
         const { statusCode, body } = await supertest(app).get("/api/users/logout");

         expect(statusCode).toBe(401);
         expect(body.message).toEqual(
            "Unauthorized: You must be logged in to access this resource."
         );
      });
   });

   describe("controller", () => {
      test("should return 200 and logout message", async () => {
         await User.create(validRegistrationInput);
         const login = await supertest(app).post("/api/users/login").send(validLoginInput);

         const { statusCode, headers, body } = await supertest(app)
            .get("/api/users/logout")
            .set("Cookie", [login.headers["set-cookie"]]);

         expect(statusCode).toBe(200);
         expect(headers["set-cookie"]).not.toBeDefined();
         expect(body.message).toEqual("Logout successful");
      });
   });
});
