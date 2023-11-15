import { cookies } from "next/headers";
import Hydrate from "@/utils/react-query/hydrate";
import { prefetchProfile } from "@/utils/react-query/prefetch-queries";

export default async function RoutesLayout({
   private: authenticated,
   public: shared,
}: {
   private: React.ReactNode;
   public: React.ReactNode;
}) {
   const dehydratedState = await prefetchProfile(cookies().toString());
   return (
      <Hydrate state={dehydratedState}>
         {dehydratedState.status === "success" ? authenticated : shared}
      </Hydrate>
   );
}
