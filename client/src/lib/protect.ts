export const protect = async (cookies: string) => {
   return await fetch("http://localhost:5000/api/users/profile", {
      headers: {
         Cookie: cookies,
      },
   })
      .then((res) => res.json())
      .then((data) => data);
};
