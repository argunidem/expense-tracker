import Link from "next/link";
import Image from "next/image";
import googleIcon from "@/../public/google.svg";
import getGoogleUrl from "@/utils/get-google-url";

const GoogleButton = ({ title }: { title: string }) => {
   return (
      <Link
         href={getGoogleUrl()}
         className='w-full mt-8 mx-auto max-w-xs shadow-sm rounded-lg py-3 bg-gray-100/70 flex items-center justify-center transition-all duration-300 ease-in-out dark:bg-gray-500/10 hover:shadow-md hover:shadow-neutral-300 dark:hover:shadow-none dark:hover:bg-neutral-500/5'
      >
         <div className='bg-white p-2 rounded-full dark:bg-neutral-600/40'>
            <Image
               src={googleIcon}
               alt='Google icon'
               priority={true}
               width={20}
               height={20}
            />
         </div>
         <span className='ml-2 text-sm text-slate-600 dark:text-neutral-300 lg:text-base'>
            {title} with Google
         </span>
      </Link>
   );
};

export default GoogleButton;
