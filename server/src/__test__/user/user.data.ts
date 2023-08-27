export const validRegistrationInput = {
   name: "John Doe",
   email: "john@email.com",
   password: "testpassword",
   confirmation: "testpassword",
};

export const validLoginInput = {
   email: "john@email.com",
   password: "testpassword",
};

export const invalidName = {
   name: "",
   email: "john@email.com",
   password: "testpassword",
   confirmation: "testpassword",
};

export const invalidLoginEmail = {
   email: "johnemail.com",
   password: "testpassword",
};

export const invalidRegistrationEmail = {
   name: "John Doe",
   ...invalidLoginEmail,
   confirmation: "testpassword",
};

export const invalidLoginPassword = {
   email: "john@email.com",
   password: "short",
};

export const incorrectLoginPassword = {
   email: "john@email.com",
   password: "incorrect-password",
};

export const invalidRegistrationPassword = {
   name: "John Doe",
   ...invalidLoginPassword,
   confirmation: "short",
};

export const userNotFoundLogin = {
   email: "nonexistent@example.com",
   password: "somepassword",
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
