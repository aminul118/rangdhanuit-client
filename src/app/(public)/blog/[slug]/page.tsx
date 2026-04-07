import { getBlogBySlug } from "@/services/Blog/blogs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ISlugPageProps } from "@/types";
import { BlogDetailsView } from "@/components/modules/public/blog/blog-details/BlogDetailsView";
import metaConfig from "@/config/meta.config";

export async function generateMetadata({
  params,
}: ISlugPageProps): Promise<Metadata> {
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  const slug = resolvedParams?.slug;

  try {
    const res = await getBlogBySlug(slug);

    if (!res.success || !res.data) {
      return {
        title: "Article Not Found",
      };
    }

    const blog = res.data;
    const description = (blog.content || "").replace(/<[^>]*>/g, "").slice(0, 160);

    return {
      title: blog.title,
      description,
      keywords: blog.tags.join(", "),
      openGraph: {
        title: blog.title,
        description,
        images: [blog.featuredImage],
        type: "article",
        publishedTime: blog.createdAt,
        authors: [blog.author?.name || metaConfig.siteName || "Rangdhanu IT"],
        section: "Technology",
        tags: blog.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description,
        images: [blog.featuredImage],
      },
    };
  } catch (error) {
    console.error("Error generating blog metadata:", error);
    return {
      title: "Blog Article",
    };
  }
}

export default async function BlogDetailsPage({ params }: ISlugPageProps) {
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  const res = await getBlogBySlug(slug);

  if (!res.success || !res.data) {
    notFound();
  }

  const blog = res.data;

  return <BlogDetailsView blog={blog} />;
}
