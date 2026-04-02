"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/common/Container";
import { FADE_IN_LEFT, FADE_IN_RIGHT, VIEWPORT_CONFIG } from "@/constants/animations";

export function AboutStory() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[40%] h-full bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            variants={FADE_IN_LEFT}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-indigo-500">
                Pioneering the Digital Frontier
              </h2>
              <h3 className="text-4xl md:text-5xl font-black text-foreground leading-tight tracking-tighter">
                A Journey Rooted in <br />
                <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent underline decoration-indigo-500/20 underline-offset-8">
                  Pure Innovation
                </span>
              </h3>
            </div>
            
            <div className="space-y-6 text-lg text-muted-foreground font-medium leading-relaxed">
              <p>
                Founded in Dhaka with a vision to revolutionize the digital landscape, 
                Rangdhanu IT started as a small team of three visionaries. Today, we are 
                a multi-disciplinary power-house of tech enthusiasts, designers, 
                and strategic consultants.
              </p>
              <p>
                Our philosophy has always been simple: build software that matters. 
                Whether it&lsquo;s a complex enterprise platform or a high-performance 
                mobile app, we infuse every pixel and line of code with purpose and 
                performance.
              </p>
              <div className="flex gap-10 pt-4">
                <div>
                  <h4 className="text-3xl font-black text-indigo-500">5+</h4>
                  <p className="text-xs uppercase tracking-widest font-black">Years Expertise</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-purple-500">100+</h4>
                  <p className="text-xs uppercase tracking-widest font-black">Dreams Realized</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visual Content */}
          <motion.div
            variants={FADE_IN_RIGHT}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-linear-to-tr from-indigo-500/20 to-purple-500/20 blur-2xl rounded-[3rem] scale-95 group-hover:scale-100 transition-transform duration-700" />
            <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/about-story.png"
                alt="Innovation Hub"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-10 -right-10 hidden md:block glass-premium p-8 rounded-3xl border border-border/50 shadow-2xl backdrop-blur-3xl animate-bounce-subtle">
              <p className="text-sm font-black text-foreground italic max-w-[200px]">
                &quot;Engineering the future, one pixel at a time.&quot;
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
