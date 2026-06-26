"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider, IUser } from "./AuthProvider";
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
      <LazyMotion features={loadFeatures} strict>
        <AuthProvider initialUser={initialUser}>
          <SocketProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster
              theme="system"
              position="bottom-right"
              duration={2000}
              richColors
            />
          </SocketProvider>
        </AuthProvider>
      </LazyMotion>
    </ThemeProvider>
  );
};

export default Providers;
