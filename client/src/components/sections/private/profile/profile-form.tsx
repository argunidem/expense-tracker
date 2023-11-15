"use client";

import { useAuth } from "@/hooks/query/use-auth";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form/form";
import { Input } from "@/components/ui/form/input";
import { z } from "zod";
import { updateProfileSchema } from "@/schemas/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";
import { useEffect } from "react";

const ProfileForm = () => {
   const {
      getProfile: { data: response, refetch },
      updateProfile: { mutateAsync: updateProfile, isLoading },
   } = useAuth();
   const profile = response?.data;

   const form = useForm<z.infer<typeof updateProfileSchema>>({
      resolver: zodResolver(updateProfileSchema),
      defaultValues: {
         name: profile?.name,
         email: profile?.email,
      },
   });

   useEffect(() => {
      form.reset({
         name: profile?.name,
         email: profile?.email,
      });
   }, [profile]);

   async function onSubmit(values: z.infer<typeof updateProfileSchema>) {
      try {
         await updateProfile(values);
         form.reset();
         refetch();
      } catch (error) {
         console.error(error);
      }
   }

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className={cn(
               "w-full max-w-xs mx-auto space-y-5 mt-28 mb-8 sm:max-w-md md:max-w-lg lg:mt-44 lg:space-y-6",
               isLoading ? "opacity-60" : "opacity-100"
            )}
         >
            <FormField
               control={form.control}
               name='name'
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Input
                           placeholder='Name'
                           type='text'
                           className='sm:max-w-md md:max-w-lg'
                           {...field}
                           value={field.value || ""}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name='email'
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Input
                           placeholder='Email'
                           type='text'
                           className='sm:max-w-md md:max-w-lg'
                           {...field}
                           value={field.value || ""}
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
                           placeholder='Update Password'
                           type='password'
                           className='sm:max-w-md md:max-w-lg'
                           {...field}
                           value={field.value || ""}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <Button
               variant={"auth"}
               size={"none"}
               border={"default"}
               type='submit'
            >
               Update Profile
            </Button>
         </form>
      </Form>
   );
};

export default ProfileForm;
