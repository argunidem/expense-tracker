export interface IncomeData {
   type: string;
   amount: number;
   category?: string;
}

export const invalidIncomeData = {
   type: "income",
   amount: 20,
};

export const missingType = {
   category: "654bac301e6322cdd4cab744",
   amount: 20,
};

export const invalidType = {
   type: "invalid type",
   category: "654bac301e6322cdd4cab744",
   amount: 20,
};

export const invalidAmount = {
   type: "income",
   category: "654bac301e6322cdd4cab744",
   amount: 0,
};

export const successResponse = {
   status: "success",
   data: {
      type: "income",
      amount: 20,
      budgets: expect.arrayContaining([expect.any(String)]),
      category: expect.any(String),
      date: expect.any(String),
      regular: false,
      _id: expect.any(String),
      user: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      __v: expect.any(Number),
   },
};
