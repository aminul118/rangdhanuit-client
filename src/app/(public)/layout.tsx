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
      "https://www.facebook.com/rangdhanuit.dev",
      "https://twitter.com/rangdhanu_it",
      "https://linkedin.com/company/rangdhanu-it",
    ],
  });

  const professionalServiceJsonLd = generateJsonLd("ProfessionalService", {
    name: metaConfig.siteName,
    image: `${metaConfig.baseUrl}${metaConfig.baseImage}`,
    "@id": metaConfig.baseUrl,
    url: metaConfig.baseUrl,
    telephone: "+88017 105 104 77", // Updated to match Footer
    address: {
      "@type": "PostalAddress",
      streetAddress: "278, 1W Monipur, Mirpur",
      addressLocality: "Dhaka",
      addressRegion: "Dhaka",
      postalCode: "1230",
      addressCountry: "BD",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.8103, // Replace with real coords
      longitude: 90.4125,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
    sameAs: [
      "https://www.facebook.com/rangdhanuit.dev",
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
        dangerouslySetInnerHTML={professionalServiceJsonLd}
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
