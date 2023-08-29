export const validUpdateInput = {
   name: "Updated Name",
   email: "updated@email.com",
   password: "updatedpassword",
};

export const invalidUpdateName = {
   name: "",
};

export const invalidUpdateEmail = {
   email: "johnemail.com",
};

export const invalidUpdatePassword = {
   password: "short",
};

export const updatedResponse = {
   status: "success",
   data: {
      email: "updated@email.com",
      name: "Updated Name",
      _id: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      __v: 0,
   },
};
