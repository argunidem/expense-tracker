import { cookies } from "next/headers";
import { makeRequest } from "@/utils/request";
import { ProfileResponse } from "@/interfaces/profile";

export default async function RoutesLayout({
   private: authenticated,
   public: shared,
}: {
   private: React.ReactNode;
   public: React.ReactNode;
}) {
   const { status } = await makeRequest<ProfileResponse>("/users/profile", {
      cookies: cookies().toString(),
   });

   return <>{status === "success" ? authenticated : shared}</>;
}
