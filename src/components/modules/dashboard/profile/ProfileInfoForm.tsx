"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { profileSchema } from "@/zod/profile.validation";
import { useAuth } from "@/providers/AuthProvider";
import { updateProfileAction } from "@/services/User/update-profile";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileAvatarUploader } from "./ProfileAvatarUploader";
import { useUploadFile } from "@/components/rich-text/hooks/use-upload-file";
import { Loader2 } from "lucide-react";

export function ProfileInfoForm() {
  const { user, refreshUser } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);
  const { uploadFile, isUploading } = useUploadFile();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      contactNo: user?.contactNo || "",
      designation: user?.designation || "",
      bio: user?.bio || "",
      picture: user?.picture || "",
    },
  });

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    setIsUpdating(true);
    try {
      let pictureUrl = data.picture;

      if (selectedFile) {
        const uploaded = await uploadFile(selectedFile);
        if (uploaded) {
          pictureUrl = uploaded.url;
        } else {
          toast.error("Failed to upload profile picture");
          setIsUpdating(false);
          return;
        }
      }

      const res = await updateProfileAction({
        name: data.name,
        contactNo: data.contactNo,
        designation: data.designation,
        bio: data.bio,
        picture: pictureUrl,
      });

      if (res.success) {
        toast.success("Profile updated successfully");
        await refreshUser();
      } else {
        toast.error(res.message || "Failed to update profile");
      }
    } catch {
      toast.error("An error occurred while updating profile");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <div className="flex flex-col items-center justify-center p-6 bg-card border border-white/5 rounded-[2.5rem] shadow-sm overflow-hidden relative group">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-linear-to-b from-primary/5 to-transparent -z-10" />
        <ProfileAvatarUploader
          onImageChange={(file) => setSelectedFile(file)}
          defaultValue={user?.picture}
          name={user?.name}
        />
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="text-xs text-destructive">
                {errors.name.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              {...register("email")}
              disabled
              className="bg-muted cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactNo">Contact Number</Label>
            <Input
              id="contactNo"
              {...register("contactNo")}
              placeholder="Enter contact number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              {...register("designation")}
              placeholder="e.g. Full Stack Developer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Input
            id="bio"
            {...register("bio")}
            placeholder="Tell us about yourself"
          />
        </div>
      </div>

      <Button type="submit" disabled={isUpdating || isUploading}>
        {(isUpdating || isUploading) && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Save Changes
      </Button>
    </form>
  );
}
