"use client";

import Modal from "./base-modal";
import { useModal } from "@/hooks/store";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form/input";
import { UserPlus } from "lucide-react";

const TransactionModal = () => {
   const { isOpen, modal, toggleModal } = useModal();

   const schema = z.object({
      name: z.string().nonempty({ message: "Name is required" }),
      description: z.string().nonempty({ message: "Description is required" }),
   });

   const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues: {
         name: "",
         description: "",
      },
   });

   async function onSubmit(values: z.infer<typeof schema>) {
      // submitFn(values);
   }

   const bodyContent = (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            // className={cn(
            //    "w-full max-w-xs space-y-5",
            //    isLoginLoading || (isRegisterLoading && "opacity-60")
            // )}
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
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={form.control}
               name='name'
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
               name='description'
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
            <FormField
               control={form.control}
               name='description'
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
            <Button
               variant={"auth"}
               size={"none"}
               type='submit'
            >
               <UserPlus className='w-6 h-6 -ml-2' />
               <span className='ml-3'>TEXT HERE</span>
            </Button>
         </form>
      </Form>
   );

   return (
      <Modal
         isOpen={modal === "transaction" && isOpen}
         title={"Title"}
         onClose={toggleModal}
         body={bodyContent}
         footer={"Footer"}
      />
   );
};

export default TransactionModal;
