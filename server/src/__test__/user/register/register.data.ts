export const validRegistrationInput = {
   name: "John Doe",
   email: "john@email.com",
   password: "testpassword",
   confirmation: "testpassword",
};

export const invalidRegistrationName = {
   name: "",
   email: "john@email.com",
   password: "testpassword",
   confirmation: "testpassword",
};

export const invalidRegistrationEmail = {
   name: "John Doe",
   email: "johnemail.com",
   password: "testpassword",
   confirmation: "testpassword",
};

export const invalidRegistrationPassword = {
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
