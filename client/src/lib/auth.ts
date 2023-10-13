import { cookies } from "next/headers";
import axios from "axios";

export const getAuthStatus = async () => {
   try {
      const {
         data: { status },
      } = await axios.get("http://localhost:5000/api/users/profile", {
         headers: {
            Cookie: cookies().toString(),
         },
         withCredentials: true,
      });
      return status;
   } catch (error: any) {
      return error.response.data.status;
   }
};

export const protect = async (cookies: string) => {
   return await fetch("http://localhost:5000/api/users/profile", {
      headers: {
         Cookie: cookies,
      },
   })
      .then((res) => res.json())
      .then((data) => data);
};
