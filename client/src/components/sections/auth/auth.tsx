import AuthForm from "@/components/sections/auth/auth-form";
import GoogleButton from "./google-button";
import AuthSwitchLink from "./auth-switch-link";
import { cn } from "@/lib/utils";

interface AuthProps {
   type: "login" | "register";
}

const Auth = ({ type }: AuthProps) => {
   const title = type.charAt(0).toUpperCase() + type.slice(1);

   return (
      <main className='w-full max-w-[1800px] mx-auto min-h-screen flex items-center justify-center pt-20 text-neutral-800/90 dark:text-neutral-200 lg:items-stretch'>
         <div className='lg:flex lg:justify-center flex-1'>
            <div
               className={cn(
                  "self-center lg:w-1/2 xl:w-5/12 xl:mb-12",
                  type === "register" && "lg:w-1/3 lg:mx-12 xl:mx-0"
               )}
            >
               <div className='flex flex-col items-center'>
                  <h2 className='text-2xl xl:text-3xl font-extrabold'>{title}</h2>

                  <GoogleButton title={title} />

                  <div className='my-12 text-sm text-gray-500 tracking-wide font-medium dark:text-neutral-400'>
                     Or {type} with e-mail
                  </div>

                  <AuthForm />

                  <AuthSwitchLink type={type} />
               </div>
            </div>
            <div className='flex-1 text-center hidden lg:flex'>
               <div className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat bg-sign-up'></div>
            </div>
         </div>
      </main>
   );
};

export default Auth;
