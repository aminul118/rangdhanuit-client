import fonts from "@/config/fonts.config";
import generateMetaTags from "@/Seo/generateMetaTags";
import generateViewport from "@/Seo/generateViewport";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Metadata, Viewport } from "next";
import TopLoadingBar from "@/components/common/loader/TopLoadingBar";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Providers from "@/providers/Providers";
import envVars from "@/config/env.config";
import { IChildrenProps } from "@/types";

const MainLayout = ({ children }: IChildrenProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          fonts.outfit.variable,
          fonts.geist.variable,
          fonts.spaceGrotesk.variable,
          "antialiased font-sans",
        )}
      >
        <GoogleAnalytics gaId={envVars.analytics.googleAnalytics} />
        <GoogleTagManager gtmId={envVars.analytics.googleTagManagerId} />
        <TopLoadingBar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
};

export default MainLayout;

// SEO
export const metadata: Metadata = generateMetaTags({
  title: "Rangdhanu IT | Leading IT Solutions Provider",
  description:
    "Rangdhanu IT specializes in web development, app development, digital marketing, graphics design, and SEO services.",
  keywords:
    "IT solutions, web development, app development, digital marketing, graphics design, SEO services",
});

export const viewport: Viewport = generateViewport();
