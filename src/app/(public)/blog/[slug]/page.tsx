import { getBlogBySlug, getBlogs } from "@/services/Blog/blogs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ISlugPageProps } from "@/types";
import { BlogDetailsView } from "@/components/modules/public/blog/blog-details/BlogDetailsView";
import metaConfig from "@/config/meta.config";
import { extractPlainText } from "@/helpers/extractPlainText";
import generateMetaTags from "@/Seo/generateMetaTags";

export const generateMetadata = async ({
  params,
}: ISlugPageProps): Promise<Metadata> => {
  const resolvedParams = await (params instanceof Promise
    ? params
    : Promise.resolve(params));
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

    return generateMetaTags({
      title,
      description,
      keywords: tags.join(", "),
      image: featuredImage,
      websitePath: `blog/${slug}`,
      type: "article",
      publishedTime: createdAt,
      authors: [author?.name || metaConfig.siteName],
      tags,
    });
  } catch (error) {
    console.error("Error generating blog metadata:", error);
    return {
      title: "Blog Details",
    };
  }
};

export const generateStaticParams = async () => {
  const res = await getBlogs({ limit: "100", status: "PUBLISHED" });

  if (!res.success || !res.data) {
    return [];
  }

  return res.data.map((blog) => ({
    slug: blog.slug,
  }));
};

const BlogDetailsPage = async ({ params }: ISlugPageProps) => {
  const resolvedParams = await (params instanceof Promise
    ? params
    : Promise.resolve(params));
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
};

export default BlogDetailsPage;
