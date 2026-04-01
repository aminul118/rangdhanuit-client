import Navbar from "@/components/layouts/Navbar/Navbar";
import Footer from "@/components/layouts/Footer/Footer";
import { IChildrenProps } from "@/types";
import { generateJsonLd } from "@/Seo/generateJsonLd";
import metaConfig from "@/config/meta.config";

const PublicLayout = ({ children }: IChildrenProps) => {
  const organizationJsonLd = generateJsonLd("Organization", {
    name: metaConfig.siteName,
    url: metaConfig.baseUrl,
    logo: `${metaConfig.baseUrl}${metaConfig.bookmarks}`,
    sameAs: [
      "https://facebook.com/rangdhanuit",
      "https://twitter.com/rangdhanu_it",
      "https://linkedin.com/company/rangdhanu-it",
    ],
  });

  const websiteJsonLd = generateJsonLd("WebSite", {
    name: metaConfig.siteName,
    url: metaConfig.baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${metaConfig.baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={organizationJsonLd}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={websiteJsonLd}
      />
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
