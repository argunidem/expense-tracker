"use client";

import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { UserPlus } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form/form";
import { Input } from "@/components/ui/form/input";
import { Button } from "../../../ui/button";
import { useAuth } from "@/hooks/query/use-auth";
import { cn } from "@/utils/cn";
import { loginSchema, registrationSchema } from "@/schemas/auth-schema";

const AuthForm = () => {
   const {
      login: { mutate: login, isLoading: isLoginLoading },
      register: { mutate: register, isLoading: isRegisterLoading },
   } = useAuth();

   const pathname = usePathname();
   const isRegister = pathname === "/register";

   const schema = isRegister ? registrationSchema : loginSchema;
   const submitFn = isRegister ? register : login;

   const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
         confirmation: "",
      },
   });

   async function onSubmit(values: z.infer<typeof schema>) {
      submitFn(values);
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
               "w-full max-w-xs space-y-5",
               (isLoginLoading || isRegisterLoading) && "opacity-60"
            )}
         >
            {isRegister && (
               <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <Input
                              placeholder='Name'
                              type='text'
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            )}
            <FormField
               control={form.control}
               name='email'
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Input
                           placeholder='Email'
                           type='email'
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name='password'
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Input
                           placeholder='Password'
                           type='password'
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            {isRegister && (
               <FormField
                  control={form.control}
                  name='confirmation'
                  render={({ field }) => (
                     <FormItem>
                        <FormControl>
                           <Input
                              placeholder='Confirmation'
                              type='password'
                              {...field}
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            )}
            <Button
               variant={"auth"}
               size={"none"}
               border={"default"}
               type='submit'
            >
               <UserPlus className='w-6 h-6 -ml-2' />
               <span className='ml-3'>{isRegister ? "Register" : "Login"}</span>
            </Button>
         </form>
      </Form>
   );
};

export default AuthForm;
