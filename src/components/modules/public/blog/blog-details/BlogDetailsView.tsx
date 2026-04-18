import { IBlog } from "@/types";
import { BlogDetailsHero } from "./BlogDetailsHero";
import { BlogDetailsMainContent } from "./BlogDetailsMainContent";
import { BlogDetailsSidebar } from "./BlogDetailsSidebar";
import metaConfig from "@/config/meta.config";
import { generateJsonLd } from "@/Seo/generateJsonLd";
import { extractPlainText } from "@/helpers/extractPlainText";
import { BlogViewCounter } from "./BlogViewCounter";
import { Suspense } from "react";
import { SidebarSkeleton } from "./SidebarSkeleton";


interface BlogDetailsViewProps {
  blog: IBlog;
}

export const BlogDetailsView = ({ blog }: BlogDetailsViewProps) => {
  const description = extractPlainText(blog?.content || "").slice(0, 200);

  const articleJsonLd = generateJsonLd("BlogPosting", {
    headline: blog.title,
    image: blog.featuredImage,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    author: {
      "@type": "Person",
      name: blog.author?.name || metaConfig.siteName,
    },
    publisher: {
      "@type": "Organization",
      name: metaConfig.siteName,
      logo: {
        "@type": "ImageObject",
        url: `${metaConfig.baseUrl}${metaConfig.bookmarks}`,
      },
    },
    description: extractPlainText(blog?.content || "").slice(0, 160),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${metaConfig.baseUrl}/blog/${blog.slug}`,
    },
  });

  const breadcrumbJsonLd = generateJsonLd("BreadcrumbList", {
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: metaConfig.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${metaConfig.baseUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `${metaConfig.baseUrl}/blog/${blog.slug}`,
      },
    ],
  });

  return (
    <main className="min-h-screen pb-32 bg-background transition-colors duration-500 overflow-x-hidden">
      <BlogViewCounter slug={blog.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={articleJsonLd}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbJsonLd}
      />

      {/* Hero Section Component */}
      <BlogDetailsHero blog={blog} description={description} />

      {/* Content & Sidebar Section */}
      <div className="container mx-auto px-6 -mt-12 relative z-20">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content Area (Article body) */}
          <BlogDetailsMainContent content={blog.content} tags={blog.tags} />

          {/* Sidebar Section (Recent Blogs & CTA) */}
          <Suspense fallback={<SidebarSkeleton />}>
            <BlogDetailsSidebar />
          </Suspense>
        </div>
      </div>
    </main>
  );
};
