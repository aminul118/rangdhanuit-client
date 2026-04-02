"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { changePasswordSchema } from "@/zod/profile.validation";
import { changePasswordAction } from "@/services/Auth/change-password";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export const SecuritySettingsForm = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    setIsUpdating(true);
    try {
      const res = await changePasswordAction({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (res.success) {
        toast.success("Password changed successfully");
        reset();
      } else {
        toast.error(res.message || "Failed to change password");
      }
    } catch {
      toast.error("An error occurred while changing password");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            id="currentPassword"
            type="password"
            {...register("currentPassword")}
            placeholder="Enter current password"
          />
          {errors.currentPassword && (
            <p className="text-xs text-destructive">{errors.currentPassword.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            {...register("newPassword")}
            placeholder="Enter new password"
          />
          {errors.newPassword && (
            <p className="text-xs text-destructive">{errors.newPassword.message as string}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm your new password"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">{errors.confirmPassword.message as string}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isUpdating}>
        {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Update Password
      </Button>
    </form>
  );
};
