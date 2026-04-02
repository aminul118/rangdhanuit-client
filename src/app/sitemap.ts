import metaConfig from "@/config/meta.config";
import generateSitemapEntries from "@/Seo/generateSitemapEntries";
import { staticRoutes } from "@/Seo/staticRoutes";
import { getPortfolios } from "@/services/Portfolio/portfolios";
import { getBlogs } from "@/services/Blog/blogs";
import { getServices } from "@/services/Service/services";
import { MetadataRoute } from "next";
import generateDynamicEntries from "@/Seo/generateDynamicEntries";

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const staticEntries = generateSitemapEntries(staticRoutes);

  // Fetch all endpoints concurrently to improve response time
  const [portfolioEntries, blogEntries, serviceEntries] = await Promise.all([
    generateDynamicEntries(
      () => getPortfolios({ limit: "10000" }),
      "/portfolio",
      "monthly",
      0.7,
      "portfolio",
    ),
    generateDynamicEntries(
      () => getBlogs({ limit: "10000" }),
      "/blog",
      "weekly",
      0.7,
      "blog",
    ),
    generateDynamicEntries(
      () => getServices({ limit: "10000" }),
      "/services",
      "monthly",
      0.8,
      "service",
    ),
  ]);

  return [
    ...staticEntries,
    ...portfolioEntries,
    ...blogEntries,
    ...serviceEntries,
  ];
};

export default sitemap;
