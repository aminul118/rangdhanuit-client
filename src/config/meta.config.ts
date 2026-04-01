import { MetaConfig } from '@/types';

const metaConfig: MetaConfig = {
  baseUrl: 'https://rangdhanuit.com',
  baseImage: '/og-image.png',
  siteName: 'Rangdhanu IT',
  category: 'Information Technology',
  applicationName: 'Rangdhanu IT Portal',
  facebook_app_id: '',
  authors_name: 'Rangdhanu IT Team',
  authorPortfolio: 'https://rangdhanuit.com',
  twitter_site: '@rangdhanu_it',
  bookmarks: '/logo.png',
  verification: {
    google: '', // Add Google Search Console code here
    microsoft_bing: '', // Add Bing Webmaster code here
  },
  publisher: 'https://rangdhanuit.com',
  preventCrawler: ['/admin', '/dashboard', '/user'],
};

export default metaConfig;
