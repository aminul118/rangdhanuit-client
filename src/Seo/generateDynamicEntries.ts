import metaConfig from "@/config/meta.config";
import { MetadataRoute } from "next";

export type SitemapItem = {
  slug: string;
  updatedAt?: string | Date;
  createdAt?: string | Date;
};

export type ChangeFrequency =
  | "always"
  | "hourly"
  | "daily"
  | "weekly"
  | "monthly"
  | "yearly"
  | "never";

const generateDynamicEntries = async <T extends SitemapItem>(
  fetcher: () => Promise<unknown>,
  pathPrefix: string,
  changeFrequency: ChangeFrequency,
  priority: number,
  resourceName: string,
): Promise<MetadataRoute.Sitemap> => {
  try {
    const response = (await fetcher()) as { success?: boolean; data?: T[] };
    if (response?.success && Array.isArray(response.data)) {
      return response.data.map((item: T) => ({
        url: `${metaConfig.baseUrl}${pathPrefix}/${item.slug}`,
        lastModified: new Date(item.updatedAt || item.createdAt || new Date()),
        changeFrequency,
        priority,
      }));
    }
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "digest" in error &&
      error.digest === "DYNAMIC_SERVER_USAGE"
    ) {
      throw error;
    }
    console.error(`Sitemap ${resourceName} fetch error:`, error);
  }
  return [];
};

export default generateDynamicEntries;
