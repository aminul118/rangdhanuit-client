"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User, LockKeyhole, Palette, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileInfoForm } from "@/components/modules/dashboard/profile/ProfileInfoForm";
import { SecuritySettingsForm } from "@/components/modules/dashboard/profile/SecuritySettingsForm";
import { ThemeSettings } from "@/components/modules/dashboard/profile/ThemeSettings";
import { RoleProfileLayout } from "@/components/modules/dashboard/profile/RoleProfileLayout";
import useSearchParamsValues from "@/hooks/useSearchParamsValues";

const tabs = [
  {
    id: "profile",
    label: "My Profile",
    icon: User,
    description: "Manage your personal information and public profile details.",
  },
  {
    id: "overview",
    label: "Account Roles",
    icon: LayoutDashboard,
    description:
      "Review your current account access and system-wide privileges.",
  },
  {
    id: "security",
    label: "Security",
    icon: LockKeyhole,
    description:
      "Secure your account by managing passwords and authentication.",
  },
  {
    id: "theme",
    label: "Appearance",
    icon: Palette,
    description:
      "Personalize your dashboard experience with themes and colors.",
  },
];

export function ProfileContent() {
  const { values, setParams } = useSearchParamsValues("tab");
  const queryTab = values.tab;

  // Derive the active tab directly from the URL query parameter
  const activeTab =
    queryTab && tabs.some((t) => t.id === queryTab) ? queryTab : "profile";

  // Function to handle tab changes by updating the URL query parameter
  const setActiveTab = (tabId: string) => {
    if (tabId === activeTab) return;
    setParams({ tab: tabId }, { scroll: false });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      {/* Navigation Sidebar */}
      <div className="lg:w-72 space-y-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 relative group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5",
                  isActive ? "" : "opacity-60 group-hover:opacity-100",
                )}
              />
              <span className="font-semibold text-sm tracking-wide">
                {tab.label}
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute -left-1 w-1 h-6 bg-primary-foreground rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-card border rounded-[2.5rem] p-8 md:p-12 shadow-sm relative animate-in fade-in slide-in-from-bottom-5 duration-500">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Tab Header Detail */}
            <div className="pb-8 border-b border-border/50">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {tabs.find((t) => t.id === activeTab)?.icon &&
                    (() => {
                      const Icon = tabs.find((t) => t.id === activeTab)!.icon;
                      return <Icon className="w-5 h-5" />;
                    })()}
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  {tabs.find((t) => t.id === activeTab)?.label}
                </h2>
              </div>
              <p className="text-muted-foreground">
                {tabs.find((t) => t.id === activeTab)?.description}
              </p>
            </div>

            {/* Render Tab Contents */}
            <div className="pt-2">
              {activeTab === "profile" && <ProfileInfoForm />}
              {activeTab === "overview" && <RoleProfileLayout />}
              {activeTab === "security" && <SecuritySettingsForm />}
              {activeTab === "theme" && <ThemeSettings />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
