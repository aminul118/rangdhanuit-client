"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider, useAuth, IUser } from "./AuthProvider";
import { LazyMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const loadFeatures = () =>
  import("framer-motion").then((res) => res.domAnimation);

const TooltipProvider = dynamic(
  () => import("@/components/ui/tooltip").then((mod) => mod.TooltipProvider),
  { ssr: false },
);
const Toaster = dynamic(() => import("sonner").then((mod) => mod.Toaster), {
  ssr: false,
});
const LazySocketProvider = dynamic(
  () => import("./SocketProvider").then((mod) => mod.SocketProvider),
  { ssr: false },
);

interface IProvider {
  children: ReactNode;
  initialUser?: IUser | null;
}

const MaybeSocketProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  if (!user) return <>{children}</>;
  return <LazySocketProvider>{children}</LazySocketProvider>;
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
      </LazyMotion>
    </ThemeProvider>
  );
};

export default Providers;
