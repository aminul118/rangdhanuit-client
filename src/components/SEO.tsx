import React from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = "Rangdhanu IT | Leading IT Solutions Provider",
  description = "Rangdhanu IT specializes in web development, app development, digital marketing, graphics design, and SEO services. Delivering premium IT solutions for businesses.",
  keywords = "web development, app development, digital marketing, graphics design, SEO, IT solutions, Rangdhanu IT",
  image = "/og-image.jpg",
  url = "https://rangdhanuit.com"
}: SEOProps) {
  const fullTitle = title.includes("Rangdhanu IT") ? title : `${title} | Rangdhanu IT`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      <link rel="canonical" href={url} />
    </>
  );
}
