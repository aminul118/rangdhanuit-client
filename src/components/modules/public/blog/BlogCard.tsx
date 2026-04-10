"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { IBlogSummary } from "@/types";
import { FADE_IN_UP, HOVER_LIFT,  } from "@/constants/animations";

import metaConfig from "@/config/meta.config";

interface BlogCardProps {
  blog: IBlogSummary;
  priority?: boolean;
}

const BlogCard = ({ blog, priority = false }: BlogCardProps) => {
  return (
    <motion.div
      variants={FADE_IN_UP}
      initial="initial"
      {...HOVER_LIFT}
      className="relative overflow-hidden rounded-sm md:rounded-sm glass border-border/50 backdrop-blur-xl h-full flex flex-col transition-all duration-500 hover:border-indigo-500/30 hover:shadow-[0_20px_50px_-20px_rgba(99,102,241,0.2)]"
    >
      <Link href={`/blog/${blog.slug}`} className="block relative h-56 md:h-64 w-full overflow-hidden">
        <Image
          src={blog.featuredImage || metaConfig.baseImage}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          priority={priority}
        />
        <div className="absolute top-4 left-4 bg-indigo-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl shadow-indigo-600/30">
          {blog.category}
        </div>
      </Link>

      <div className="p-6 md:p-8 flex flex-col grow">
        <div className="flex flex-wrap items-center gap-4 text-[10px] text-slate-950 dark:text-slate-300 mb-6 font-black uppercase tracking-[0.2em]">
          <div className="flex items-center gap-1.5 group-hover:text-indigo-500 transition-colors">
            <User size={14} className="text-indigo-500" />
            {blog.author?.name || "Rangdhanu IT"}
          </div>
          <div className="flex items-center gap-1.5 group-hover:text-indigo-500 transition-colors">
            <Calendar size={14} className="text-indigo-500" />
            {new Date(blog.createdAt).toLocaleDateString()}
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-black mb-3 tracking-tight group-hover:text-indigo-400 transition-colors text-foreground">
          {blog.title}
        </h2>

        <div className="mt-auto pt-6 border-t border-border/50">
          <Link
            href={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-2 text-indigo-900 dark:text-indigo-400 font-black text-xs uppercase tracking-widest group/link hover:text-indigo-500 transition-all"
          >
            Read Full Article
            <ArrowRight
              size={18}
              className="group-hover/link:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>

      {/* Subtle Glow */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
    </motion.div>
  );
};

export default BlogCard;
