import metaConfig from '@/config/meta.config';
import generateSitemapEntries from '@/Seo/generateSitemapEntries';
import { staticRoutes } from '@/Seo/staticRoutes';
import { getPortfolios } from '@/services/Portfolio/portfolios';
import { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  let portfolioEntries: MetadataRoute.Sitemap = [];
  
  try {
    const portfoliosResponse = await getPortfolios();
    if (portfoliosResponse?.success && Array.isArray(portfoliosResponse.data)) {
      portfolioEntries = portfoliosResponse.data.map((portfolio: { _id: string; updatedAt?: string; createdAt?: string }) => ({
        url: `${metaConfig.baseUrl}/portfolio/${portfolio._id}`,
        lastModified: new Date(portfolio.updatedAt || portfolio.createdAt || new Date()),
        changeFrequency: 'monthly',
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Sitemap portfolio fetch error:', error);
  }

  const staticEntries = generateSitemapEntries(staticRoutes);

  return [...staticEntries, ...portfolioEntries];
};

export default sitemap;
