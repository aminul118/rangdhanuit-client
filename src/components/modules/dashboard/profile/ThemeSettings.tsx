"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Laptop, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const ThemeSettings = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This is a standard hydration pattern for theme switching
    // Using an animation frame to avoid the synchronous setState warning in some linters
    const handle = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(handle);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    {
      name: "Light",
      value: "light",
      icon: Sun,
    },
    {
      name: "Dark",
      value: "dark",
      icon: Moon,
    },
    {
      name: "System",
      value: "system",
      icon: Laptop,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themes.map((t) => {
          const isActive = theme === t.value;
          const Icon = t.icon;

          return (
            <button
              key={t.value}
              onClick={() => setTheme(t.value)}
              className={cn(
                "group relative flex flex-col items-center justify-center p-6 bg-card border rounded-2xl transition-all duration-300 hover:border-primary/50 hover:shadow-lg",
                isActive
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border",
              )}
            >
              <div
                className={cn(
                  "p-3 rounded-xl mb-4 transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                )}
              >
                <Icon className="w-6 h-6" />
              </div>
              <span className="font-medium">{t.name}</span>
              {isActive && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground p-0.5 rounded-full shadow-sm">
                  <Check className="w-3 h-3" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4 bg-muted/50 rounded-xl">
        <p className="text-sm text-muted-foreground">
          Current active mode:{" "}
          <span className="font-semibold text-foreground capitalize">
            {resolvedTheme}
          </span>
        </p>
      </div>
    </div>
  );
};
