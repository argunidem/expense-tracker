export const validUserInput = {
   name: "John Doe",
   email: "john@email.com",
   password: "testpassword",
   confirmation: "testpassword",
};

export const invalidName = {
   name: "",
   email: "john@email.com",
   password: "testpassword",
   confirmation: "testpassword",
};

export const invalidEmail = {
   name: "John Doe",
   email: "johnemail.com",
   password: "testpassword",
   confirmation: "testpassword",
};

export const invalidPassword = {
   name: "John Doe",
   email: "john@email.com",
   password: "short",
   confirmation: "short",
};

export const passwordMismatch = {
   name: "John Doe",
   email: "john@email.com",
   password: "testpassword",
   confirmation: "mismatch",
};

export const successResponse = {
   status: "success",
   data: {
      email: "john@email.com",
      name: "John Doe",
      _id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      __v: 0,
   },
};
