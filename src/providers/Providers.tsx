"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth, IUser } from "./AuthProvider";
import { LazyMotion, MotionConfig } from "framer-motion";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { Toaster } from "sonner";

const loadFeatures = () =>
  import("framer-motion").then((res) => res.domAnimation);

const TooltipProvider = dynamic(
  () => import("@/components/ui/tooltip").then((mod) => mod.TooltipProvider),
  { ssr: false },
);
const LazySocketProvider = dynamic(
  () => import("./SocketProvider").then((mod) => mod.SocketProvider),
  { ssr: false },
);

interface IProvider {
  children: ReactNode;
  initialUser?: IUser | null;
}

const MaybeSocketProvider = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (!user && !loading) return <>{children}</>;
  return <LazySocketProvider>{children}</LazySocketProvider>;
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
