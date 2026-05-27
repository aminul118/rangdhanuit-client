import { ThemeProvider } from "next-themes";
import { AuthProvider, IUser } from "./AuthProvider";
import { SocketProvider } from "./SocketProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { ReactNode } from "react";
import { LazyMotion, domAnimation } from "framer-motion";

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
    >
      <LazyMotion features={domAnimation}>
        <AuthProvider initialUser={initialUser}>
          <SocketProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <Toaster position="top-right" richColors closeButton />
          </SocketProvider>
        </AuthProvider>
      </LazyMotion>
    </ThemeProvider>
  );
};

export default Providers;
