import { getBlogs } from "@/services/Blog/blogs";
import { Metadata } from "next";
import { TSearchParamsPromise, IBlog } from "@/types";
import { Container } from "@/components/common/Container";
import { BlogHero } from "@/components/modules/public/blog/BlogHero";
import { BlogList } from "@/components/modules/public/blog/BlogList";

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
