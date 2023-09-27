"use client";

import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { UserPlus } from "lucide-react";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form/form";
import { Input } from "@/components/ui/form/input";
import { Button } from "../../ui/button";
import { loginSchema, registrationSchema } from "@/schemas/auth-schema";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const AuthForm = () => {
   const { toast } = useToast();

   const {
      useLogin: { mutate: login, isLoading: isLoginLoading },
      useRegister: { mutate: register, isLoading: isRegisterLoading },
   } = useAuth();

   const { push } = useRouter();
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
      submitFn(values, {
         onSuccess: () => {
            toast({
               description: `You have successfully ${isRegister ? "registered" : "logged in"}`,
            });
            push("/dashboard");
         },
         onError: (error: any) => {
            toast({
               description: error.message,
               variant: "destructive",
            });
         },
      });
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
               "w-full max-w-xs space-y-5",
               isLoginLoading || (isRegisterLoading && "opacity-60")
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
