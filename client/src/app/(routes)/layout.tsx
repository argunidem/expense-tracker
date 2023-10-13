import { getAuthStatus } from "@/lib/auth";

export default async function RoutesLayout({
   private: authenticated,
   public: shared,
}: {
   private: React.ReactNode;
   public: React.ReactNode;
}) {
   const status = await getAuthStatus();

   return <>{status === "success" ? authenticated : shared}</>;
}
