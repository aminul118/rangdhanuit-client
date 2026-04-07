import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Eye, Sparkles } from "lucide-react";
import { IBlog } from "@/types/Blog/blog.types";

import metaConfig from "@/config/meta.config";

interface BlogDetailsHeroProps {
  blog: IBlog;
  description?: string;
}

export const BlogDetailsHero = ({ blog, description }: BlogDetailsHeroProps) => {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-center pt-24">
      {/* Featured Image Background */}
      <Image
        src={blog.featuredImage || metaConfig.baseImage}
        alt={blog.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-linear-to-b from-background/90 via-background/60 to-background" />

      {/* Hero Content */}
      <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-indigo-400 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all mb-4 group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Blog
        </Link>

        <div className="flex flex-col items-center gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-4 text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px]">
              <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                {blog.category}
              </span>
              <div className="flex items-center gap-2">
                <Sparkles size={12} className="text-amber-400" />
                Featured Publication
              </div>
            </div>

            <h1 className="text-4xl md:text-7xl font-black tracking-tight text-foreground leading-tight max-w-5xl mx-auto">
              {blog.title}
            </h1>

            {description && (
              <p className="text-muted-foreground/80 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed line-clamp-2">
                {description}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground/60 font-black uppercase tracking-widest text-[10px]">
              <div className="flex items-center gap-2 border-r border-border/50 pr-6">
                <User size={14} className="text-indigo-400" />
                {blog.author?.name || "Rangdhanu IT"}
              </div>
              <div className="flex items-center gap-2 border-r border-border/50 pr-6">
                <Calendar size={14} className="text-indigo-400" />
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-2">
                <Eye size={14} className="text-indigo-400" />
                {blog.views} Reads
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent" />
    </section>
  );
};
