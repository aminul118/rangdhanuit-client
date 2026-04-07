import { ThemeProvider } from "next-themes";
import { AuthProvider, IUser } from "./AuthProvider";
import { SocketProvider } from "./SocketProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { ReactNode } from "react";

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
      <AuthProvider initialUser={initialUser}>
        <SocketProvider>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster position="bottom-right" richColors />
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Providers;
