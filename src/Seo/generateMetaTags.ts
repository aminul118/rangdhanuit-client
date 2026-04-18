import metaConfig from "@/config/meta.config";
import { MetaProps } from "@/types";
import { Metadata } from "next";

const generateMetaTags = ({
  title,
  description,
  keywords,
  image = metaConfig.baseImage,
  websitePath = "",
  type = "website",
  publishedTime,
  authors,
  tags,
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

  const getAbsoluteImageUrl = (img: string) => {
    if (img.startsWith("http")) return img;
    const base = baseUrl.replace(/\/+$/, "");
    const path = img.startsWith("/") ? img : `/${img}`;
    return `${base}${path}`;
  };

  const absoluteImage = getAbsoluteImageUrl(image);

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title || siteName,
      template: `%s | ${siteName}`,
    },
    description: description || metaConfig.description,
    keywords: keywords || metaConfig.keywords,
    category,
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
      other: [
        {
          rel: "mask-icon",
          url: "/safari-pinned-tab.svg",
        },
      ],
    },
    openGraph: {
      type,
      url: `${baseUrl}/${cleanPath}`,
      title: title || siteName,
      description: description || metaConfig.description,
      siteName,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
      locale: "en_US",
      ...(type === "article" && {
        publishedTime,
        authors,
        tags,
      }),
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
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
      description: description || metaConfig.description,
      images: [absoluteImage],
    },
    applicationName,
    alternates: {
      canonical: `${baseUrl}/${cleanPath}`,
      languages: {
        "en-US": "/en-US",
      },
    },
    facebook: {
      appId: facebook_app_id,
    },
    verification: {
      google: metaConfig.verification.google,
      yandex: metaConfig.verification.yandex,
      me: metaConfig.verification.me,
      other: {
        "msvalidate.01": metaConfig.verification.microsoft_bing,
      },
    },
    publisher,
    creator: authors_name,
    referrer: "origin-when-cross-origin",
    bookmarks,
    authors: [
      {
        name: authors_name,
        url: authorPortfolio,
      },
    ],
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
  };
};

export default generateMetaTags;
