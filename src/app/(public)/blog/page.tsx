import { getBlogs } from "@/services/Blog/blogs";
import { Metadata } from "next";
import { TSearchParamsPromise, IBlog } from "@/types";
import { Container } from "@/components/common/Container";
import { BlogHero } from "@/components/modules/public/blog/BlogHero";
import { BlogList } from "@/components/modules/public/blog/BlogList";

import generateMetaTags from "@/Seo/generateMetaTags";

export const metadata: Metadata = generateMetaTags({
  title: "Insights & Innovation Blog | Rangdhanu IT",
  description:
    "Explore the latest in web development, app design, and digital strategies. Stay ahead with deep dives and tutorials from the Rangdhanu IT team.",
  keywords: "tech blog, development insights, coding tutorials, digital marketing trends",
  websitePath: "blog",
});

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
    <main className="min-h-screen pt-32 pb-20 overflow-hidden bg-background transition-colors duration-500">
      {/* Background decoration */}
      <div className="absolute inset-x-0 top-0 -z-10 h-full w-full bg-linear-to-b from-indigo-500/5 via-background to-background" />

      <Container className="relative z-10">
        <BlogHero />
        <BlogList blogs={blogs} search={search} />
      </Container>
    </main>
  );
}
