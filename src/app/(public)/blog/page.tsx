import { getBlogs } from "@/services/Blog/blogs";
import { Metadata } from "next";
import { TSearchParamsPromise, IBlog } from "@/types";
import { Container } from "@/components/ui/Container";
import { BlogHero } from "@/app/(public)/blog/_components/BlogHero";

import { BlogList } from "@/app/(public)/blog/_components/BlogList";
import generateMetaTags from "@/Seo/generateMetaTags";

export const metadata: Metadata = generateMetaTags({
  title: "Insights & Innovation Blog | Rangdhanu IT",
  description:
    "Explore the latest in web development, app design, and digital strategies. Stay ahead with deep dives and tutorials from the Rangdhanu IT team.",
  keywords:
    "tech blog, development insights, coding tutorials, digital marketing trends",
  websitePath: "blog",
});

export const revalidate = 300;

const BlogGrid = async ({
  searchParams,
}: {
  searchParams: TSearchParamsPromise;
}) => {
  const params = await searchParams;
  const search = params.search as string | undefined;
  const query: Record<string, string> = { status: "PUBLISHED" };
  if (search) query.search = search;

  const data = (await getBlogs(query)) as { success: boolean; data: IBlog[] };
  const blogs = data.success ? data.data : [];
  return <BlogList blogs={blogs} search={search} />;
};

export default function BlogPage({
  searchParams,
}: {
  searchParams: TSearchParamsPromise;
}) {
  return (
    <main className="min-h-screen pb-20 overflow-hidden bg-background transition-colors duration-500">
      <div className="absolute inset-x-0 top-0 -z-10 h-full w-full bg-linear-to-b from-indigo-500/5 via-background to-background" />

      <Container className="relative z-10">
        <BlogHero />
        <BlogGrid searchParams={searchParams} />
      </Container>
    </main>
  );
}
