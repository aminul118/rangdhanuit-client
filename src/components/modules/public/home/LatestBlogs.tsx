"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IBlog } from "@/types/Blog/blog.types";
import { Container } from "@/components/ui/Container";
import { format } from "date-fns";
import {
  FADE_IN_UP,
  VIEWPORT_CONFIG,
} from "@/constants/animations";

interface LatestBlogsProps {
  blogs: IBlog[];
}

const LatestBlogs = ({ blogs }: LatestBlogsProps) => {
  if (!blogs?.length) return null;

  return (
    <section className="py-24 relative bg-background overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              className="flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-xs mb-4"
            >
              <div className="w-8 h-px bg-primary/30" />
              <span>Latest Insights</span>
            </motion.div>
            <motion.h2
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-black mb-6"
            >
              Stories from the <br />
              <span className="text-muted-foreground">Frontier of Tech.</span>
            </motion.h2>
          </div>
          <motion.div
            variants={FADE_IN_UP}
            initial="initial"
            whileInView="whileInView"
            viewport={VIEWPORT_CONFIG}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/blog"
              className="group flex items-center gap-3 glass px-12 py-5 rounded-2xl hover:bg-muted transition-all font-bold tracking-wide text-sm border-white/5 border"
            >
              Explore Our Blog
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              variants={FADE_IN_UP}
              initial="initial"
              whileInView="whileInView"
              viewport={VIEWPORT_CONFIG}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/blog/${blog.slug}`} className="block h-full">
                <article className="relative h-full flex flex-col bg-muted/30 rounded-[2.5rem] border border-border/50 overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5">
                  {/* Image Container */}
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={blog.featuredImage}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {blog.isFeatured && (
                      <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-primary/95 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-xl">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        Featured
                      </div>
                    )}

                    <div className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-[10px] font-bold uppercase tracking-widest">
                      {blog.category}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col grow">
                    <div className="flex items-center gap-6 mb-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar size={12} className="text-primary" />
                        {format(new Date(blog.createdAt), "MMM dd, yyyy")}
                      </div>
                      <div className="flex items-center gap-2">
                        <User size={12} className="text-primary" />
                        {blog.author.name}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-4 line-clamp-2 grow group-hover:text-primary transition-colors leading-tight">
                      {blog.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-foreground mt-4 group-hover:gap-4 transition-all duration-300">
                      Inside Full Story
                      <ArrowRight size={14} className="text-primary" />
                    </div>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default LatestBlogs;
