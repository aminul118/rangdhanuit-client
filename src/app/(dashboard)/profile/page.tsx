import { Suspense } from "react";
import { ProfileContent } from "@/components/modules/dashboard/profile/ProfileContent";
import { ProfileSkeleton } from "@/components/modules/dashboard/profile/ProfileSkeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Settings | Rangdhanu IT",
  description:
    "Manage your personal information, security settings, and dashboard appearance.",
};

export default function ProfilePage() {
  return (
    <div className="container max-w-6xl py-10 px-4">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Manage your account settings, security preferences, and dashboard
          appearance all in one place.
        </p>
      </div>

      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
