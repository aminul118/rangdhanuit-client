"use client";

import { ThemeProvider } from "next-themes";
import { AuthProvider } from "./AuthProvider";
import { SocketProvider } from "./SocketProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { IChildrenProps, IUser } from "@/types";

export const Providers = ({ children, initialUser }: IChildrenProps & { initialUser: IUser | null }) => {
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
