"use client";

import Image from "next/image";
import { m as m } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { FADE_IN, VIEWPORT_CONFIG } from "@/constants/animations";
import { IPartner } from "@/types";

interface PartnersProps {
  partners?: IPartner[];
}

const Partners = ({ partners = [] }: PartnersProps) => {
  if (partners.length === 0) return null;

  // Repeat partners to fill the scrolling marquee natively without JS observer loops
  const repeatedPartners = Array.from({ length: 6 }, () => partners).flat();

  return (
    <section className="py-16 border-y border-border/60 bg-muted/10 overflow-hidden text-foreground">
      <Container className="mb-10 text-center text-foreground">
        <m.h2
          variants={FADE_IN}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          className="text-sm font-bold text-muted-foreground uppercase tracking-[0.3em]"
        >
          Partnering with Innovation
        </m.h2>
      </Container>
      <div className="flex relative group">
        <div className="flex animate-scroll-left whitespace-nowrap min-w-full items-center py-6">
          {[...repeatedPartners, ...repeatedPartners].map((partner, index) => (
            <div
              key={index}
              className="mx-4 md:mx-8 lg:mx-12 flex items-center justify-center grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
            >
              {partner.logo && partner.logo !== "" ? (
                <div className="relative h-10 w-24 md:h-12 md:w-32 px-2 md:px-4">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    priority={index < 4}
                    sizes="128px"
                  />
                </div>
              ) : (
                <span className="text-xl font-black tracking-tight text-foreground whitespace-nowrap">
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
