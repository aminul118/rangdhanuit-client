"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { 
  contactSchemaZodValidation, 
  ContactFormValues 
} from "@/zod/contact";
import { contactAction } from "@/services/Contact/contact";
import useActionHandler from "@/hooks/useActionHandler";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/common/form/SubmitButton";

export function ContactForm() {
  const { executePost } = useActionHandler();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchemaZodValidation),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    await executePost({
      action: () => contactAction(data),
      success: {
        onSuccess: () => form.reset(),
        message: "Your message has been sent successfully!",
        loadingText: "Sending message...",
      },
    });
  };

  return (
    <div className="glass-premium p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-md border border-border/50">
      <h2 className="text-3xl font-black mb-8 italic uppercase tracking-tight text-foreground">
        Send a Message
      </h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="John Doe" 
                      className="h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary/50 transition-all font-medium" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="john@example.com" 
                      className="h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary/50 transition-all font-medium" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">
                  Subject
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Project Inquiry" 
                    className="h-12 rounded-xl border-border/50 bg-background/50 focus:border-primary/50 transition-all font-medium" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-black uppercase tracking-widest text-muted-foreground/80 ml-1">
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea 
                    rows={5}
                    placeholder="Tell us about your project..." 
                    className="rounded-2xl border-border/50 bg-background/50 focus:border-primary/50 transition-all font-medium resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton
            label="Send Message"
            isLoading={form.formState.isSubmitting}
            iconRight={<Send className="w-5 h-5" />}
            size="xl"
            className="mt-4"
          />
        </form>
      </Form>
    </div>
  );
}
