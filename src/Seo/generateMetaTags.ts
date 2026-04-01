import metaConfig from "@/config/meta.config";
import { MetaProps } from "@/types";
import { Metadata } from "next";

const generateMetaTags = ({
  title,
  description,
  keywords,
  image = metaConfig.baseImage,
  websitePath = "",
}: MetaProps): Metadata => {
  const cleanPath = websitePath.replace(/^\/+/, "").replace(/\/+$/, "");

  const {
    applicationName,
    twitter_site,
    baseUrl,
    siteName,
    facebook_app_id,
    authors_name,
    authorPortfolio,
    category,
    publisher,
    bookmarks,
  } = metaConfig;

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    keywords,
    category,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/logo.png",
    },
    openGraph: {
      type: "website",
      url: `${baseUrl}/${cleanPath}`,
      title: title || siteName,
      description: description,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    twitter: {
      card: "summary_large_image",
      site: twitter_site,
      creator: twitter_site,
      title: title || siteName,
      description: description,
      images: [image],
    },
    applicationName,
    alternates: {
      canonical: `${baseUrl}/${cleanPath}`,
    },
    facebook: {
      appId: facebook_app_id,
    },
    verification: {
      google: metaConfig.verification.google,
      other: {
        "msvalidate.01": metaConfig.verification.microsoft_bing,
      },
    },
    publisher,
    creator: authors_name,
    referrer: "no-referrer",
    bookmarks,
    abstract: description,
    authors: [
      {
        name: authors_name,
        url: authorPortfolio,
      },
    ],
  };
};

export default generateMetaTags;
