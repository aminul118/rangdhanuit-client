import Image from "next/image";
import { ArrowLeft, Calendar, User, Eye } from "lucide-react";
import Link from "next/link";
import RecentBlogsSidebar from "@/components/modules/public/blog/RecentBlogsSidebar";
import { getBlogBySlug } from "@/services/Blog/blogs";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { TParamsPromise, IBlog } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: TParamsPromise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = (await getBlogBySlug(slug)) as {
      success: boolean;
      data: IBlog;
    };

    if (!data.success || !data.data) {
      return {
        title: "Article Not Found | Rangdhanu IT",
      };
    }

    const blog = data.data;
    const description = blog.content.replace(/<[^>]*>/g, "").slice(0, 160);

    return {
      title: `${blog.title} | Rangdhanu IT Blog`,
      description,
      keywords: blog.tags.join(", "),
      openGraph: {
        title: blog.title,
        description,
        images: [blog.featuredImage],
        type: "article",
        publishedTime: blog.createdAt,
        authors: [blog.author.name],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description,
        images: [blog.featuredImage],
      },
    };
  } catch {
    return {
      title: "Blog | Rangdhanu IT",
    };
  }
}

export default async function BlogDetailsPage({
  params,
}: {
  params: TParamsPromise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = (await getBlogBySlug(slug)) as {
    success: boolean;
    data: IBlog;
  };

  if (!data.success || !data.data) {
    notFound();
  }

  const blog = data.data;

  return (
    <main className="min-h-screen pt-32 pb-20 overflow-hidden bg-background transition-colors duration-500">
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-0 -z-10 h-full w-full bg-linear-to-b from-indigo-500/5 via-background to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <article className="flex-1 max-w-4xl">
            <div className="space-y-12">
              <div className="space-y-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-indigo-400 font-bold hover:gap-3 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Blog
                </Link>

                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground font-bold uppercase tracking-widest">
                    <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full">
                      {blog.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <User size={14} className="text-indigo-400" />
                      {blog.author.name}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-indigo-400" />
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye size={14} className="text-indigo-400" />
                      {blog.views} Views
                    </div>
                  </div>

                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight text-foreground">
                    {blog.title}
                  </h1>
                </div>
              </div>

              <div className="relative h-[60vh] w-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={blog.featuredImage}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="space-y-8">
                <div
                  className="prose dark:prose-invert prose-lg max-w-none prose-indigo prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground prose-a:text-indigo-400 prose-img:rounded-3xl prose-img:shadow-2xl prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-500/5 prose-blockquote:p-6 prose-blockquote:rounded-2xl"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                <div className="pt-12 border-t border-border/50">
                  <h3 className="text-xl font-bold mb-6">Tags</h3>
                  <div className="flex flex-wrap gap-3">
                    {blog.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-muted/10 border border-border/50 rounded-xl text-sm font-medium hover:bg-muted/20 transition-all"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div className="lg:w-[380px]">
            <RecentBlogsSidebar />
          </div>
        </div>
      </div>
    </main>
  );
}
