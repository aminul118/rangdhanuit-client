import React from "react";
import Image from "next/image";
import { getPartners } from "@/services/Partner/partner";

const PartnersSection = async () => {
  const { data: partners = [] } = await getPartners();

  if (!partners || partners.length === 0) return null;

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-[120px]" />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Trusted by Industry <span className="text-primary">Leaders</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We collaborate with forward-thinking companies to deliver
            exceptional digital experiences and innovative solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 items-center">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="group relative flex items-center justify-center p-8 bg-zinc-900/50 hover:bg-zinc-800/80 border border-white/5 hover:border-primary/30 rounded-2xl transition-all duration-500 shadow-xl"
            >
              <div className="relative w-full h-12 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>

              {partner.link && (
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-20 cursor-pointer"
                  aria-label={`Visit ${partner.name} website`}
                />
              )}

              {/* Subtle light effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-radial-gradient from-primary to-transparent rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
