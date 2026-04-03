"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";

const testimonials = [
  {
    name: "John Doe",
    role: "CEO, Tech Solutions",
    content:
      "Rangdhanu IT transformed our business. Their innovative approach and technical expertise are unmatched. We've seen a 300% growth since partnering with them.",
    avatar: "https://i.pravatar.cc/150?u=john",
    rating: 5,
  },
  {
    name: "Sarah Smith",
    role: "Founder, Green Energy",
    content:
      "The team at Rangdhanu IT are visionaries. They understood our needs and delivered a product that exceeded our expectations in every way. Truly premium service.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5,
  },
  {
    name: "David Lee",
    role: "Marketing Director, Global Brands",
    content:
      "We've worked with many agencies, but none compare to Rangdhanu IT. Their attention to detail and commitment to quality is what sets them apart. Recommending to everyone.",
    avatar: "https://i.pravatar.cc/150?u=david",
    rating: 5,
  },
  {
    name: "Emily White",
    role: "CTO, Future Apps",
    content:
      "Building our mobile app with Rangdhanu IT was the best decision we made. Professional, responsive, and technical masters. The app is a massive hit!",
    avatar: "https://i.pravatar.cc/150?u=emily",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Owner, Artisan Coffee",
    content:
      "Our e-commerce site looks and works incredibly well. The level of detail and user experience they built for us is world-class. Thank you team!",
    avatar: "https://i.pravatar.cc/150?u=michael",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-muted/10 text-foreground transition-colors duration-500">
      <Container className="mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h2
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            className="text-3xl md:text-5xl font-black mb-6"
          >
            Voices of Trust
          </motion.h2>
          <motion.p
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground font-medium"
          >
            Don&apos;t just take our word for it. Here&apos;s what our clients
            have to say about their experience working with Rangdhanu IT.
          </motion.p>
        </div>
      </Container>

      {/* Infinite Scroll Wrapper */}
      <div className="flex relative overflow-hidden py-10">
        <div className="flex animate-scroll-left whitespace-nowrap gap-8 pr-8">
          {[...testimonials, ...testimonials, ...testimonials].map(
            (testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="w-[400px] shrink-0 p-10 rounded-[2.5rem] glass-premium border-border/50 hover:border-primary/50 transition-all backdrop-blur-3xl relative group whitespace-normal shadow-2xl"
              >
                <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-lg italic text-muted-foreground leading-relaxed mb-8 font-medium">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 p-0.5 group-hover:border-primary transition-all">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="rounded-full shadow-2xl grayscale group-hover:grayscale-0 transition-all duration-700 object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-lg text-foreground tracking-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Fade Gradients for Masking */}
      <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};

export default Testimonials;
