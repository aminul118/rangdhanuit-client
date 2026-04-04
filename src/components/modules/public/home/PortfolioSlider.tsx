"use client";

import { motion } from "framer-motion";
import {
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FADE_IN_UP, VIEWPORT_CONFIG } from "@/constants/animations";
import { IPortfolio } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";

interface PortfolioSliderProps {
  portfolios: IPortfolio[];
}

const PortfolioSlider = ({ portfolios }: PortfolioSliderProps) => {
  if (!portfolios?.length) return null;

  return (
    <section className="py-16 md:py-24 relative bg-background text-foreground transition-colors duration-500 overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[600px] bg-primary/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -z-10" />

      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.h2
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              className="text-4xl md:text-6xl font-black mb-6 tracking-tighter"
            >
              Our Featured <br />{" "}
              <span className="gradient-text italic">Masterpieces.</span>
            </motion.h2>
            <motion.p
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground leading-relaxed font-medium"
            >
              A curated selection of our most impactful work. Each project
              represents our commitment to innovation and digital excellence.
            </motion.p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <motion.div
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              className="flex gap-2 order-2 sm:order-1"
            >
              <button className="portfolio-prev w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl glass-premium flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer border border-border/50 shadow-xl group">
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-x-1 transition-transform" />
              </button>
              <button className="portfolio-next w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl glass-premium flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer border border-border/50 shadow-xl group">
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>

            <motion.div
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              className="w-full sm:w-auto order-1 sm:order-2"
            >
              <Link
                href="/portfolio"
                className="group flex items-center justify-center gap-2 glass-premium px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl hover:bg-primary hover:text-white transition-all font-bold tracking-wide shadow-xl border border-border/50"
              >
                View Gallery
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          variants={FADE_IN_UP}
          initial="initial"
          whileInView="whileInView"
          viewport={VIEWPORT_CONFIG}
          transition={{ delay: 0.2 }}
          className="portfolio-slider-container"
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation, FreeMode]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: ".portfolio-prev",
              nextEl: ".portfolio-next",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16 overflow-visible!"
          >
            {portfolios.map((project) => (
              <SwiperSlide key={project._id}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-[2.5rem] border border-border/50 aspect-4/5 hover:border-primary/50 transition-all cursor-pointer bg-muted/20">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        {project.technologies.slice(0, 2).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary/20 text-primary backdrop-blur-md border border-primary/20"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      <div className="flex items-center gap-3 text-white/60 group-hover:text-white transition-colors">
                        <span className="text-xs font-bold uppercase tracking-[0.2em]">
                          View Case Study
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-all">
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </Container>
    </section>
  );
};

export default PortfolioSlider;
