import { getBlogBySlug } from "@/services/Blog/blogs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ISlugPageProps, IBlog } from "@/types";
import { BlogDetailsView } from "@/components/modules/public/blog/blog-details/BlogDetailsView";

export async function generateMetadata({
  params,
}: ISlugPageProps): Promise<Metadata> {
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

export default async function BlogDetailsPage({ params }: ISlugPageProps) {
  const { slug } = await params;
  const data = (await getBlogBySlug(slug)) as {
    success: boolean;
    data: IBlog;
  };

  if (!data.success || !data.data) {
    notFound();
  }

  const blog = data.data;

  return <BlogDetailsView blog={blog} />;
}
