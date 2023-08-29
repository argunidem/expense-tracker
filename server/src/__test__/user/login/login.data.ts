export const validLoginInput = {
   email: "john@email.com",
   password: "testpassword",
};

export const invalidLoginEmail = {
   email: "johnemail.com",
   password: "testpassword",
};

export const invalidLoginPassword = {
   email: "john@email.com",
   password: "short",
};

export const userNotFoundLogin = {
   email: "nonexistent@example.com",
   password: "somepassword",
};

export const incorrectLoginPassword = {
   email: "john@email.com",
   password: "incorrect-password",
};
