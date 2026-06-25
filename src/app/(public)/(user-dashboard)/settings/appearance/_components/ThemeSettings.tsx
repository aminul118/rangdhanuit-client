"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export const ThemeSettings = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    {
      name: "Light",
      description: "Clean and bright interface",
      value: "light",
      icon: Sun,
    },
    {
      name: "Dark",
      description: "Easy on the eyes",
      value: "dark",
      icon: Moon,
    },
    {
      name: "System",
      description: "Follow system preference",
      value: "system",
      icon: Monitor,
    },
  ];

  return (
    <div className="w-full">
      <div className="border border-white/5 rounded-[2rem] p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {themes.map((t) => {
            const isActive = theme === t.value;
            const Icon = t.icon;

            return (
              <button
                key={t.value}
                onClick={() => setTheme(t.value)}
                className={cn(
                  "group relative flex flex-col items-center justify-center p-8 bg-[#0a0b10] border rounded-2xl transition-all duration-300",
                  isActive
                    ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                    : "border-white/10 hover:border-white/20",
                )}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center mb-6 transition-colors",
                    isActive
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-white/5 text-muted-foreground group-hover:text-white",
                  )}
                >
                  <Icon size={24} />
                </div>
                <span className="font-bold text-white mb-2">{t.name}</span>
                <span className="text-xs text-muted-foreground">
                  {t.description}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-6 bg-[#0a0b10] border border-white/5 rounded-2xl flex flex-col gap-1">
          <p className="text-sm font-semibold text-white">
            Current theme: <span className="capitalize">{resolvedTheme}</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Changes are applied immediately and saved automatically.
          </p>
        </div>
      </div>
    </div>
  );
};
