"use client";

import { motion } from "framer-motion";
import BlogCard from "@/components/modules/public/blog/BlogCard";
import { IBlogSummary } from "@/types";
import { STAGGER_CHILDREN, VIEWPORT_CONFIG } from "@/constants/animations";

interface BlogListProps {
  blogs: IBlogSummary[];
  search?: string;
}

export const BlogList = ({ blogs, search }: BlogListProps) => {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl md:text-2xl font-bold text-muted-foreground">
          {search
            ? `No blog posts found matching "${search}".`
            : "No digital knowledge found yet. Stay tuned!"}
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      variants={STAGGER_CHILDREN}
      initial="initial"
      whileInView="whileInView"
      viewport={VIEWPORT_CONFIG}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
    >
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </motion.div>
  );
};
