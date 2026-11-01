import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://easyoffice.co.id").replace(/\/$/, "");

  const disallowList = [
    "/admin/",
    "/api/",
    "/puck-editor/",
    "/puck-builder/",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowList,
      },
      {
        // Google Search, Google AI Overviews, Gemini, Vertex AI
        userAgent: [
          "Googlebot",
          "Google-Extended",
          "GoogleOther",
          "GoogleOther-Image",
          "GoogleOther-Video",
        ],
        allow: "/",
        disallow: disallowList,
      },
      {
        // Leading LLMs & AI Crawlers (OpenAI, Anthropic, Perplexity, Apple Intelligence)
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Applebot-Extended",
        ],
        allow: "/",
        disallow: disallowList,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
