"use client";

import { useAuth } from "@/providers/AuthProvider";
import {
  ShieldCheck,
  User,
  Settings,
  Activity,
  Crown,
  Users,
  LayoutDashboard,
  CheckCircle2,
  Clock,
  ShieldAlert,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
}

const StatCard = ({ label, value, icon: Icon, color }: StatCardProps) => (
  <div className="p-5 bg-card border rounded-2xl flex items-center gap-4 transition-all hover:bg-muted/50 group">
    <div className={cn("p-3 rounded-xl", color)}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <p className="text-sm text-muted-foreground font-medium">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  </div>
);

export function RoleProfileLayout() {
  const { user } = useAuth();

  if (!user) return null;

  const role = user.role;

  return (
    <div className="space-y-8">
      {/* Role Badge & Header */}
      <div className="relative overflow-hidden p-8 rounded-3xl bg-linear-to-br from-primary/10 via-background to-background border border-primary/20">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck className="w-32 h-32" />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
          <div className="p-5 bg-primary/20 rounded-2xl border border-primary/20 backdrop-blur-sm">
            {role === "SUPER_ADMIN" ? (
              <Crown className="w-10 h-10 text-primary" />
            ) : role === "ADMIN" ? (
              <ShieldCheck className="w-10 h-10 text-primary" />
            ) : (
              <User className="w-10 h-10 text-primary" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-bold tracking-tight">
                Account Access Level:
              </h2>
              <span
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                  role === "SUPER_ADMIN"
                    ? "bg-amber-100 text-amber-600 border border-amber-200"
                    : role === "ADMIN"
                      ? "bg-blue-100 text-blue-600 border border-blue-200"
                      : "bg-emerald-100 text-emerald-600 border border-emerald-200",
                )}
              >
                {role.replace("_", " ")}
              </span>
            </div>
            <p className="text-muted-foreground">
              {role === "SUPER_ADMIN"
                ? "Full system control with overarching administrative privileges."
                : role === "ADMIN"
                  ? "Manage system users, portfolios, and standard operations."
                  : "Personal dashboard for account management and activity."}
            </p>
          </div>
        </div>
      </div>

      {/* Role Specific Stats/Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          label="Account Status"
          value={user.status || "ACTIVE"}
          icon={CheckCircle2}
          color="bg-emerald-500"
        />
        <StatCard
          label="Email Verification"
          value={user.isVerified ? "Verified" : "Pending"}
          icon={user.isVerified ? ShieldCheck : ShieldAlert}
          color={user.isVerified ? "bg-blue-500" : "bg-amber-500"}
        />
        <StatCard
          label="Joined"
          value={new Date(user.createdAt!).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}
          icon={Clock}
          color="bg-purple-500"
        />
      </div>

      {/* Quick Links */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Recommended Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            href={role === "USER" ? "/dashboard" : "/admin"}
            className="flex items-center justify-between p-4 bg-muted/40 hover:bg-muted/80 border rounded-xl transition-colors group"
          >
            <div className="flex items-center gap-3">
              <LayoutDashboard className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="font-medium">Go to Dashboard</span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-110" />
          </Link>

          {(role === "ADMIN" || role === "SUPER_ADMIN") && (
            <Link
              href="/admin/users"
              className="flex items-center justify-between p-4 bg-muted/40 hover:bg-muted/80 border rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-medium">Manage Team</span>
              </div>
              <CheckCircle2 className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-110" />
            </Link>
          )}

          <Link
            href="#settings"
            className="flex items-center justify-between p-4 bg-muted/40 hover:bg-muted/80 border rounded-xl transition-colors group"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              <span className="font-medium">Configure API</span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all transform group-hover:scale-110" />
          </Link>
        </div>
      </div>
    </div>
  );
}
