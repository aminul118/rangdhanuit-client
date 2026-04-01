import metaConfig from "@/config/meta.config";
import { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => {
  return {
    name: metaConfig.siteName,
    short_name: metaConfig.applicationName,
    description: "Premier IT solutions and digital transformation services.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
};

export default manifest;
