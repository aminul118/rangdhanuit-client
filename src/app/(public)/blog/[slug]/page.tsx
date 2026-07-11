import { getBlogBySlug, getBlogs } from "@/services/Blog/blogs";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ISlugPageProps } from "@/types";
import { BlogDetailsView } from "./_components/BlogDetailsView";
import metaConfig from "@/config/meta.config";
import { extractPlainText } from "@/helpers/extractPlainText";
import generateMetaTags from "@/Seo/generateMetaTags";

export const generateMetadata = async (
  props: ISlugPageProps,
): Promise<Metadata> => {
  const params = await props.params;
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

    const { title, content, featuredImage, tags, createdAt, author, seo } =
      res.data;
    const description =
      seo?.description || extractPlainText(content || "").slice(0, 160);

    return generateMetaTags({
      title: seo?.title || title,
      description,
      keywords: seo?.keywords || tags.join(", "),
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

export const dynamic = "force-dynamic";

const BlogDetailsPage = async (props: ISlugPageProps) => {
  const params = await props.params;
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
