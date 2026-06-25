"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider, IUser } from "./AuthProvider";
import { LazyMotion, domAnimation } from "framer-motion";
import dynamic from "next/dynamic";
import { ReactNode } from "react";

const TooltipProvider = dynamic(
  () => import("@/components/ui/tooltip").then((mod) => mod.TooltipProvider),
  { ssr: false },
);
const Toaster = dynamic(() => import("sonner").then((mod) => mod.Toaster), {
  ssr: false,
});
const SocketProvider = dynamic(
  () => import("./SocketProvider").then((mod) => mod.SocketProvider),
  { ssr: false },
);

interface IProvider {
  children: ReactNode;
  initialUser?: IUser | null;
}

const Providers = ({ children, initialUser = null }: IProvider) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={{ "data-cfasync": "false" }}
    >
      <LazyMotion features={domAnimation}>
        <AuthProvider initialUser={initialUser}>
          <SocketProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster position="top-right" richColors />
          </SocketProvider>
        </AuthProvider>
      </LazyMotion>
    </ThemeProvider>
  );
};

export default Providers;
