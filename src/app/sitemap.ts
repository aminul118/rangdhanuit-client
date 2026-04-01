import metaConfig from '@/config/meta.config';
import generateSitemapEntries from '@/Seo/generateSitemapEntries';
import { staticRoutes } from '@/Seo/staticRoutes';
import { getPortfolios } from '@/services/Portfolio/portfolios';
import { getBlogs } from '@/services/Blog/blogs';
import { getServices } from '@/services/Service/services';
import { IPortfolio, IBlog, IService } from '@/types';
import { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const staticEntries = generateSitemapEntries(staticRoutes);

  let portfolioEntries: MetadataRoute.Sitemap = [];
  let blogEntries: MetadataRoute.Sitemap = [];
  let serviceEntries: MetadataRoute.Sitemap = [];

  // Fetch Portfolios
  try {
    const portfoliosResponse = await getPortfolios();
    if (portfoliosResponse?.success && Array.isArray(portfoliosResponse.data)) {
      portfolioEntries = portfoliosResponse.data.map((item: IPortfolio) => ({
        url: `${metaConfig.baseUrl}/portfolio/${item.slug}`,
        lastModified: new Date(item.updatedAt || item.createdAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Sitemap portfolio fetch error:', error);
  }

  // Fetch Blogs
  try {
    const blogsResponse = await getBlogs();
    if (blogsResponse?.success && Array.isArray(blogsResponse.data)) {
      blogEntries = blogsResponse.data.map((item: IBlog) => ({
        url: `${metaConfig.baseUrl}/blog/${item.slug}`,
        lastModified: new Date(item.updatedAt || item.createdAt || new Date()),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Sitemap blog fetch error:', error);
  }

  // Fetch Services
  try {
    const servicesResponse = await getServices();
    if (servicesResponse?.success && Array.isArray(servicesResponse.data)) {
      serviceEntries = servicesResponse.data.map((item: IService) => ({
        url: `${metaConfig.baseUrl}/services/${item.slug}`,
        lastModified: new Date(item.updatedAt || item.createdAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.8,
      }));
    }
  } catch (error) {
    console.error('Sitemap service fetch error:', error);
  }

  return [...staticEntries, ...portfolioEntries, ...blogEntries, ...serviceEntries];
};

export default sitemap;
