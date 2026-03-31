import { Metadata } from "next";
import generateMetaTags from "@/Seo/generateMetaTags";
import { AboutHero } from "@/components/modules/public/about/AboutHero";
import { AboutMission } from "@/components/modules/public/about/AboutMission";
import { AboutStats } from "@/components/modules/public/about/AboutStats";
import { AboutValues } from "@/components/modules/public/about/AboutValues";

export const metadata: Metadata = generateMetaTags({
  title: "About Us | Rangdhanu IT",
  description:
    "Learn about Rangdhanu IT's mission, vision, and core values. We are a team of passionate tech experts dedicated to your success.",
  keywords: "about us, our team, mission, vision, IT experts",
});

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      <AboutHero />
      <AboutMission />
      <AboutStats />
      <AboutValues />
    </div>
  );
}
