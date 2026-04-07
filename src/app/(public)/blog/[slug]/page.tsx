import { getBlogBySlug } from "@/services/Blog/blogs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ISlugPageProps } from "@/types";
import { BlogDetailsView } from "@/components/modules/public/blog/blog-details/BlogDetailsView";
import metaConfig from "@/config/meta.config";
import { extractPlainText } from "@/helpers/extractPlainText";

export const generateMetadata = async ({
  params,
}: ISlugPageProps): Promise<Metadata> => {
  const resolvedParams = await (params instanceof Promise ? params : Promise.resolve(params));
  const slug = resolvedParams?.slug;

  try {
    const res = await getBlogBySlug(slug);

    if (!res.success || !res.data) {
      return {
        title: "Article Not Found",
      };
    }

    const { title, content, featuredImage, tags, createdAt, author } = res.data;
    const description = extractPlainText(content || "").slice(0, 160);

    return {
      title,
      description,
      keywords: tags.join(", "),
      openGraph: {
        title,
        description,
        images: [featuredImage],
        type: "article",
        publishedTime: createdAt,
        authors: [author?.name || metaConfig.siteName || "Rangdhanu IT"],
        section: "Technology",
        tags: tags,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [featuredImage],
      },
    };
  } catch {

    return {
      title: "Blog Article",
    };
  }
}

const BlogDetailsPage = async ({ params }: ISlugPageProps) => {
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

export default BlogDetailsPage