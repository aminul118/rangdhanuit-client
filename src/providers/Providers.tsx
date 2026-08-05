"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth, IUser } from "./AuthProvider";
import { LazyMotion, MotionConfig } from "framer-motion";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SocketProvider } from "./SocketProvider";

const loadFeatures = () =>
  import("framer-motion").then((res) => res.domAnimation);

interface IProvider {
  children: ReactNode;
  initialUser?: IUser | null;
}

const MaybeSocketProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (!user && !loading) return <>{children}</>;
  return <SocketProvider>{children}</SocketProvider>;
};

const motionConfig = {
  reducedMotion: "user" as const,
};

const Providers = ({ children, initialUser = null }: IProvider) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={{ "data-cfasync": "false" }}
    >
      <LazyMotion features={loadFeatures}>
        <MotionConfig {...motionConfig}>
          <AuthProvider initialUser={initialUser}>
            <MaybeSocketProvider>
              <TooltipProvider>{children}</TooltipProvider>
            </MaybeSocketProvider>
            <Toaster
              theme="system"
              position="bottom-right"
              duration={2000}
              richColors
            />
          </AuthProvider>
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
};

export default Providers;
