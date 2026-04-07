import { MetaConfig } from '@/types';

const metaConfig: MetaConfig = {
  baseUrl: "https://rangdhanuit.com",
  baseImage: "/og-image.png",
  siteName: "Rangdhanu IT",
  description:
    "Leading IT solutions provider specializing in web development, mobile apps, digital marketing, and software innovation.",
  keywords:
    "IT Solutions, Web Development, Mobile Apps, Digital Marketing, SEO, Software Development, Rangdhanu IT",
  category: "Information Technology",
  applicationName: "Rangdhanu IT Portal",
  facebook_app_id: "",
  authors_name: "Rangdhanu IT Team",
  authorPortfolio: "https://rangdhanuit.com",
  twitter_site: "@rangdhanu_it",
  bookmarks: "/logo.png",
  verification: {
    google: "", // Add Google Search Console code here
    microsoft_bing: "", // Add Bing Webmaster code here
    yandex: "",
    me: "",
  },
  publisher: "https://rangdhanuit.com",
  preventCrawler: ["/admin", "/dashboard", "/user"],
};

export default metaConfig;
