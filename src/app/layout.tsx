import fonts from "@/config/fonts.config";
import { ThemeProvider } from "next-themes";
import generateMetaTags from "@/Seo/generateMetaTags";
import generateViewport from "@/Seo/generateViewport";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Metadata, Viewport } from "next";
import { Toaster } from "sonner";
import TopLoadingBar from "@/components/common/loader/TopLoadingBar";
import { AuthProvider } from "@/providers/AuthProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getMe } from "@/services/User/getMe";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { SocketProvider } from "@/providers/SocketProvider";
import envVars from "@/config/env.config";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();

  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleAnalytics gaId={envVars.analytics.googleAnalytics} />
      <body
        className={cn(
          fonts.outfit.variable,
          fonts.geist.variable,
          "antialiased font-sans",
        )}
      >
        <TopLoadingBar />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider initialUser={user}>
            <SocketProvider>
              <TooltipProvider>{children}</TooltipProvider>
              <Toaster position="top-right" richColors />
            </SocketProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
      <GoogleTagManager gtmId={envVars.analytics.googleTagManagerId} />
    </html>
  );
};

export default MainLayout;

// SEO Metatags
export const metadata: Metadata = generateMetaTags({
  title: "Rangdhanu IT | Leading IT Solutions Provider",
  description:
    "Rangdhanu IT specializes in web development, app development, digital marketing, graphics design, and SEO services.",
  keywords:
    "IT solutions, web development, app development, digital marketing, graphics design, SEO services",
});

export const viewport: Viewport = generateViewport();
