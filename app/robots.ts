import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://easyoffice.co.id").replace(/\/$/, "");

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/puck-editor/", "/puck-builder/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
