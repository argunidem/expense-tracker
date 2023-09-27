"use client";

import { useEffect } from "react";

export default function Error({
   error,
   reset,
}: {
   error: Error & { digest?: string };
   reset: () => void;
}) {
   useEffect(() => {
      console.error(error);
   }, [error]);

   return (
      <main className='h-screen w-full flex flex-col justify-center items-center bg-neutral-900'>
         <h1 className='text-6xl font-extrabold text-neutral-300 tracking-widest'>{error.name}</h1>
         <h2 className='mt-10 text-4xl font-extrabold text-neutral-300 tracking-widest'>
            {error.message}
         </h2>
         <button
            className='mt-10 px-24 py-3 text-2xl font-black text-neutral-400 border rounded-md border-neutral-800 hover:bg-neutral-700/20'
            onClick={() => reset()}
         >
            Try again
         </button>
      </main>
   );
}
