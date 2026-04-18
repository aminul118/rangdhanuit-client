import dynamic from "next/dynamic";
import { Metadata } from "next";
import generateMetaTags from "@/Seo/generateMetaTags";
import { AboutHero } from "@/components/modules/public/about/AboutHero";
const AboutMission = dynamic(() =>
  import("@/components/modules/public/about/AboutMission").then(
    (m) => m.AboutMission,
  ),
);
const AboutStats = dynamic(() =>
  import("@/components/modules/public/about/AboutStats").then(
    (m) => m.AboutStats,
  ),
);
const AboutValues = dynamic(() =>
  import("@/components/modules/public/about/AboutValues").then(
    (m) => m.AboutValues,
  ),
);
const AboutStory = dynamic(() =>
  import("@/components/modules/public/about/AboutStory").then(
    (m) => m.AboutStory,
  ),
);
const AboutWhyUs = dynamic(() =>
  import("@/components/modules/public/about/AboutWhyUs").then(
    (m) => m.AboutWhyUs,
  ),
);
const AboutProcess = dynamic(() =>
  import("@/components/modules/public/about/AboutProcess").then(
    (m) => m.AboutProcess,
  ),
);

export const metadata: Metadata = generateMetaTags({
  title: "About Us | Rangdhanu IT",
  description:
    "Learn about Rangdhanu IT's mission, vision, and core values. We are a team of passionate tech experts dedicated to your success.",
  keywords: "about us, our team, mission, vision, IT experts",
  websitePath: "about",
});

export default function AboutPage() {
  return (
    <div className="flex flex-col pb-24 font-bold tracking-tight">
      <AboutHero />
      <AboutStory />
      <AboutMission />
      <AboutStats />
      <AboutWhyUs />
      <AboutValues />
      <AboutProcess />
    </div>
  );
}
