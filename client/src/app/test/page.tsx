import AuthForm from "@/components/sections/auth/auth-form";
import Image from "next/image";
import googleIcon from "@/../public/google.svg";

const Test = () => {
   return (
      <main className='w-full max-w-[1800px] mx-auto min-h-screen flex justify-center text-neutral-800/90 dark:bg-neutral-900/40 dark:text-neutral-200'>
         <div className='lg:flex lg:justify-center flex-1 pt-20'>
            <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
               <div className='mt-12 flex flex-col items-center'>
                  <h1 className='text-2xl xl:text-3xl font-extrabold'>Login</h1>
                  <button className='w-full mt-8 mx-auto max-w-xs shadow-sm rounded-lg py-3 bg-gray-100 flex items-center justify-center transition-all duration-300 ease-in-out dark:bg-neutral-800/40 hover:shadow-md hover:shadow-neutral-300 dark:hover:shadow-none dark:hover:bg-neutral-800/80'>
                     <div className='bg-white p-2 rounded-full dark:bg-neutral-600/40'>
                        <Image
                           src={googleIcon}
                           alt='Google icon'
                           width={20}
                           height={20}
                        />
                     </div>
                     <span className='ml-2 text-sm text-slate-600 dark:text-neutral-300 lg:text-base'>
                        Login with Google
                     </span>
                  </button>

                  <div className='my-12 text-sm text-gray-500 tracking-wide font-medium dark:text-neutral-400'>
                     Or login with e-mail
                  </div>

                  <AuthForm />
               </div>
            </div>
            <div className='flex-1 text-center hidden lg:flex'>
               <div className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-sign-up'></div>
            </div>
         </div>
      </main>
   );
};

export default Test;
