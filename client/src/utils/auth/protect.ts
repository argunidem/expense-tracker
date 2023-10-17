export const protect = async (cookies: string) => {
   try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/profile`, {
         headers: {
            Cookie: cookies,
         },
      });
      return await response.json();
   } catch (error: any) {
      return error.response.data.status;
   }
};
