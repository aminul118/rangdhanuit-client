import { Metadata } from "next";
import { ProfileInfoForm } from "@/app/(public)/(user-dashboard)/profile/_components/ProfileInfoForm";
import { RoleProfileLayout } from "@/app/(public)/(user-dashboard)/profile/_components/RoleProfileLayout";
import { User, LayoutDashboard } from "lucide-react";

export const metadata: Metadata = {
  title: "Profile Settings | Rangdhanu IT",
  description: "Manage your personal information and account roles.",
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
          Manage your account settings and view your account roles.
        </p>
      </div>

      <div className="space-y-10">
        {/* Profile Info Section */}
        <div className="w-full bg-[#0a0b10] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div className="space-y-8">
            <div className="pb-8 border-b border-white/10 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-full text-blue-400">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                My Profile
              </h2>
            </div>
            <div className="pt-2">
              <ProfileInfoForm />
            </div>
          </div>
        </div>

        {/* Account Roles Section */}
        <div className="w-full bg-[#0a0b10] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div className="space-y-8">
            <div className="pb-8 border-b border-white/10 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-full text-blue-400">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Account Roles
              </h2>
            </div>
            <div className="pt-2">
              <RoleProfileLayout />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
