import dynamic from "next/dynamic";
import { Metadata } from "next";
import generateMetaTags from "@/Seo/generateMetaTags";
import { AboutHero } from "@/app/(public)/about/_components/AboutHero";
const AboutMission = dynamic(() =>
  import("@/app/(public)/about/_components/AboutMission").then(
    (m) => m.AboutMission,
  ),
);
const AboutStats = dynamic(() =>
  import("@/app/(public)/about/_components/AboutStats").then(
    (m) => m.AboutStats,
  ),
);
const AboutValues = dynamic(() =>
  import("@/app/(public)/about/_components/AboutValues").then(
    (m) => m.AboutValues,
  ),
);
const AboutStory = dynamic(() =>
  import("@/app/(public)/about/_components/AboutStory").then(
    (m) => m.AboutStory,
  ),
);
const AboutWhyUs = dynamic(() =>
  import("@/app/(public)/about/_components/AboutWhyUs").then(
    (m) => m.AboutWhyUs,
  ),
);
const AboutProcess = dynamic(() =>
  import("@/app/(public)/about/_components/AboutProcess").then(
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
