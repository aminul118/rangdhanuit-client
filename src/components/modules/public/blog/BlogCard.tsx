"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { IBlogSummary } from "@/types";

interface BlogCardProps {
  blog: IBlogSummary;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all backdrop-blur-md"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={blog.featuredImage}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          {blog.category}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 font-medium uppercase tracking-widest">
          <div className="flex items-center gap-1.5">
            <User size={14} className="text-indigo-400" />
            {blog.author.name}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-indigo-400" />
            {new Date(blog.createdAt).toLocaleDateString()}
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4 line-clamp-2 group-hover:text-indigo-400 transition-colors">
          {blog.title}
        </h3>

        <Link
          href={`/blog/${blog.slug}`}
          className="inline-flex items-center gap-2 text-indigo-400 font-bold group/link"
        >
          Read Full Article
          <ArrowRight
            size={18}
            className="group-hover/link:translate-x-1 transition-transform"
          />
        </Link>
      </div>
    </motion.div>
  );
}
