import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Rangdhanu IT | Leading IT Solutions Provider",
  description: "Rangdhanu IT specializes in web development, app development, digital marketing, graphics design, and SEO services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark", outfit.variable, "font-sans", geist.variable)}>
      <body className="font-sans bg-background text-foreground selection:bg-primary/30 min-h-screen flex flex-col">
        <Navbar />
        <main className="grow pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
