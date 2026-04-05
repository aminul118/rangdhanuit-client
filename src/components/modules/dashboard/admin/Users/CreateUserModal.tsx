"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitButton } from "@/components/common/form";
import { createUser } from "@/services/User/allUsers";
import useActionHandler from "@/hooks/useActionHandler";
import { UserPlus, Sparkles, Shield } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["ADMIN", "USER", "SUPER_ADMIN"]),
});

const CreateUserModal = () => {
  const [open, setOpen] = useState(false);
  const { execute, isPending } = useActionHandler();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await execute({
      action: () => createUser(values),
      success: {
        message: "User created successfully. A magical moment! ✨",
        onSuccess: () => {
          setOpen(false);
          form.reset();
        },
        isRefresh: true,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-2xl bg-linear-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/20 text-white gap-2 transition-all duration-300">
          <UserPlus size={18} />
          Create New User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-white/10 rounded-[2rem] p-0 overflow-hidden shadow-2xl">
        <div className="bg-linear-to-r from-indigo-500 to-purple-600 p-8 text-white relative overflow-hidden">
          <Sparkles
            className="absolute top-4 right-4 text-white/20 animate-pulse"
            size={48}
          />
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              New Identity
            </DialogTitle>
            <p className="text-white/80 text-sm mt-1">
              Create a new inhabitant of Rangdhanu IT.
            </p>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-8 space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Wick"
                        {...field}
                        className="rounded-2xl bg-white/5 border-white/10 focus:border-indigo-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="wick@high-table.com"
                        {...field}
                        className="rounded-2xl bg-white/5 border-white/10 focus:border-indigo-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Secret Key
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        className="rounded-2xl bg-white/5 border-white/10 focus:border-indigo-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Access Level
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="rounded-2xl bg-white/5 border-white/10 focus:border-indigo-500/50">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-2xl bg-background/95 backdrop-blur-xl border-white/10">
                        <SelectItem
                          value="USER"
                          className="rounded-xl focus:bg-indigo-500/10 cursor-pointer"
                        >
                          User
                        </SelectItem>
                        <SelectItem
                          value="ADMIN"
                          className="rounded-xl focus:bg-indigo-500/10 cursor-pointer"
                        >
                          Admin
                        </SelectItem>
                        <SelectItem
                          value="SUPER_ADMIN"
                          className="rounded-xl focus:bg-indigo-500/10 cursor-pointer"
                        >
                          Super Admin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />
            </div>

            <SubmitButton
              label="Confirm Creation"
              loadingLabel="Initiating..."
              isLoading={isPending}
              size="lg"
              iconRight={<Shield size={20} />}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
