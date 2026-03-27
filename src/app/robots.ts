import metaConfig from '@/config/meta.config';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: metaConfig.preventCrawler || [],
      },
    ],
    sitemap: `${metaConfig.baseUrl}/sitemap.xml`,
  };
}
