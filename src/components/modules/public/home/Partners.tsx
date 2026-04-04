"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FADE_IN, VIEWPORT_CONFIG } from "@/constants/animations";

const partners = [
  { name: "A1 Lift", logo: "/images/company/a1-lift.svg" },
  { name: "Primo BD" },
  { name: "SHRL", logo: "/images/company/shrl.webp" },
  { name: "Digital Twins Energy" },
];

const Partners = () => {
  // Repeat partners to fill the scrolling marquee
  const repeatedPartners = [
    ...partners,
    ...partners,
    ...partners,
    ...partners,
    ...partners,
    ...partners,
  ];

  return (
    <section className="py-16 border-y border-border/50 bg-muted/5 overflow-hidden text-foreground">
      <Container className="mb-10 text-center text-foreground">
        <motion.p
          variants={FADE_IN}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          className="text-sm font-bold text-muted-foreground uppercase tracking-[0.3em]"
        >
          Partnering with Innovation
        </motion.p>
      </Container>
      <div className="flex relative group">
        <div className="flex animate-scroll-left whitespace-nowrap min-w-full items-center py-6">
          {[...repeatedPartners, ...repeatedPartners].map((partner, index) => (
            <div
              key={index}
              className="mx-12 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
            >
              {partner.logo ? (
                <div className="relative h-12 w-32">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 128px"
                  />
                </div>
              ) : (
                <span className="text-xl font-bold tracking-tight text-foreground/80 whitespace-nowrap">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
