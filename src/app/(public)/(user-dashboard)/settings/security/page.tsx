import { SecuritySettingsForm } from "@/app/(public)/(user-dashboard)/settings/security/_components/SecuritySettingsForm";
import { LockKeyhole } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security Settings | Rangdhanu IT",
  description: "Secure your account by managing passwords and authentication.",
};

export default function SecurityPage() {
  return (
    <div className="container max-w-6xl py-10 px-4">
      {/* Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Security Settings
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Secure your account by managing passwords and authentication.
        </p>
      </div>

      <div className="w-full">
        <div className="w-full bg-[#0a0b10] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative animate-in fade-in slide-in-from-bottom-5 duration-500">
          <div className="space-y-8">
            <div className="pb-8 border-b border-white/10 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-full text-blue-400">
                <LockKeyhole className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Security
              </h2>
            </div>
            <div className="pt-2">
              <SecuritySettingsForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
