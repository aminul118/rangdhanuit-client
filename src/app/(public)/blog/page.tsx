import { Sparkles } from "lucide-react";
import BlogCard from "@/components/modules/public/blog/BlogCard";
import { getBlogs } from "@/services/Blog/blogs";
import BlogSearch from "@/components/modules/public/blog/BlogSearch";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Insights & Innovation Blog | Rangdhanu IT",
  description:
    "Stay updated with the latest digital trends, development insights, and innovation stories from the creative minds at Rangdhanu IT.",
  keywords:
    "Web Development, Mobile Apps, UI/UX Design, Digital Marketing, Tech Insights, Rangdhanu IT Blog",
  openGraph: {
    title: "Insights & Innovation Blog | Rangdhanu IT",
    description:
      "Digital insights and innovation stories from our creative team.",
    type: "website",
    url: "https://rangdhanu-it.com/blog",
  },
};

import { TSearchParamsPromise, IBlog } from "@/types";

export default async function BlogPage({
  searchParams,
}: {
  searchParams: TSearchParamsPromise;
}) {
  const params = await searchParams;
  const search = params.search as string | undefined;
  const query: Record<string, string> = { status: "PUBLISHED" };
  if (search) query.search = search;

  const data = (await getBlogs(query)) as { success: boolean; data: IBlog[] };
  const blogs = data.success ? data.data : [];

  return (
    <main className="min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-0 -z-10 h-full w-full bg-linear-to-b from-indigo-500/5 via-background to-background" />

      <div className="container mx-auto px-6 relative z-10">
        <header className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Digital Insights & Innovation</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1]">
            Latest from our <br />
            <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent underline decoration-indigo-500/20 underline-offset-8">
              Creative minds
            </span>
          </h1>

          <Suspense fallback={<div className="h-20" />}>
            <BlogSearch />
          </Suspense>
        </header>

        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-2xl font-bold text-muted-foreground">
              {search
                ? `No blog posts found matching "${search}".`
                : "No digital knowledge found yet. Stay tuned!"}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
