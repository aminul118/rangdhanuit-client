import { Metadata } from "next";
import Hero from "@/components/modules/public/home/Hero/Hero";
import Services from "@/components/modules/public/home/Services/Services";
import Partners from "@/components/modules/public/home/Features/Partners";
import CTA from "@/components/modules/public/home/CTA/CTA";
import generateMetaTags from "@/Seo/generateMetaTags";

export const metadata: Metadata = generateMetaTags({
  title: "Rangdhanu IT | Premium IT Solutions for Your Business",
  description:
    "Transform your business with Rangdhanu IT's cutting-edge web development, mobile apps, and digital marketing services. Innovating the future, one pixel at a time.",
  keywords:
    "IT solutions, web development, app development, digital marketing, graphics design, SEO services",
});

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Partners />
      <Services />
      <CTA />
    </div>
  );
}
