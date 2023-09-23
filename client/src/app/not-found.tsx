import Link from "next/link";

export default function NotFound() {
   return (
      <main className='h-screen w-full flex flex-col justify-center items-center bg-neutral-900'>
         <h1 className='text-9xl font-extrabold text-neutral-300 tracking-widest'>404</h1>
         <div className='absolute px-3 rotate-12 text-sm text-neutral-300 bg-neutral-800 rounded'>
            Page Not Found
         </div>
         <Link
            href='/'
            className='mt-10 px-24 py-3 text-2xl font-black text-neutral-400 border rounded-md border-neutral-800 hover:bg-neutral-700/20'
         >
            Go Home
         </Link>
      </main>
   );
}
