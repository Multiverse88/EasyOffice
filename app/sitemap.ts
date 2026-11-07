import type { MetadataRoute } from "next";
import { getCmsServiceLocations, getCmsServices } from "@/lib/data/cms-data";
import { blogPosts } from "@/lib/data/blog-data";

export const revalidate = 3600; // revalidate at most every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://easyoffice.co.id").replace(/\/$/, "");
  const now = new Date();

  // Core static marketing routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/promo`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privat-office-bekasi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tentang-kami`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kontak`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lp`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sewa-virtualoffice-easyoffice-metaads`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/verifikasi-rekening`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kebijakan-privasi`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/syarat-dan-ketentuan`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Dynamic service landing routes
  const services = await getCmsServices().catch(() => []);
  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${baseUrl}/layanan/${service.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic service-location and office routes
  const combos = await getCmsServiceLocations().catch(() => []);
  const locationRoutes: MetadataRoute.Sitemap = [];
  const seenUrls = new Set<string>();

  for (const combo of combos) {
    const comboUrl = `${baseUrl}/layanan/${combo.serviceSlug}/${combo.locationSlug}`;
    if (!seenUrls.has(comboUrl)) {
      seenUrls.add(comboUrl);
      locationRoutes.push({
        url: comboUrl,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }

    for (const office of combo.offices ?? []) {
      const officeUrl = `${baseUrl}/layanan/${combo.serviceSlug}/${office.slug}`;
      if (!seenUrls.has(officeUrl)) {
        seenUrls.add(officeUrl);
        locationRoutes.push({
          url: officeUrl,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.8,
        });
      }
    }
  }

  // Dynamic blog post routes
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date || now),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes, ...blogRoutes];
}
