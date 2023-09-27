import Link from "next/link";

const AuthSwitchLink = ({ type }: { type: string }) => {
   return (
      <div className='text-sm my-5 text-gray-500 dark:text-neutral-400'>
         {type === "login" ? "Don't" : "Already"} have an account?{" "}
         <Link
            href={type === "login" ? "/register" : "/login"}
            className='underline dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-neutral-500'
         >
            {type === "login" ? "Register" : "Login"}
         </Link>
      </div>
   );
};

export default AuthSwitchLink;
