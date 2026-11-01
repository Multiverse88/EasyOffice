import fs from "node:fs";
import path from "node:path";

const sitemapUrl = "http://127.0.0.1:3000/sitemap.xml";

async function run() {
  console.log("Fetching sitemap from", sitemapUrl);
  const sitemapRes = await fetch(sitemapUrl);
  if (!sitemapRes.ok) {
    throw new Error(`Failed to fetch sitemap: ${sitemapRes.status}`);
  }

  const sitemapXml = await sitemapRes.text();
  const urls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(/https:\/\/easyoffice\.co\.id/g, "http://127.0.0.1:3000").replace(/http:\/\/localhost:3000/g, "http://127.0.0.1:3000")
  );

  console.log(`Found ${urls.length} URLs in sitemap to audit.\n`);

  const missingAssets = new Map();
  const unsplashAssets = new Map();
  const allAuditedImages = new Set();

  for (const pageUrl of urls) {
    const route = new URL(pageUrl).pathname;
    try {
      const pageRes = await fetch(pageUrl);
      if (!pageRes.ok) {
        console.error(`Page ${route} returned status ${pageRes.status}`);
        continue;
      }

      const html = await pageRes.text();

      // Extract image src and srcset
      const imgMatches = [...html.matchAll(/<img[^>]+src="([^">]+)"/g)].map((m) => m[1]);
      const nextImgMatches = [...html.matchAll(/url=([^&"'>]+)/g)].map((m) => decodeURIComponent(m[1]));
      const allSrcs = [...new Set([...imgMatches, ...nextImgMatches])];

      for (const src of allSrcs) {
        allAuditedImages.add(src);

        if (src.includes("unsplash")) {
          const list = unsplashAssets.get(route) || [];
          list.push(src);
          unsplashAssets.set(route, list);
        }

        if (src.startsWith("/") && !src.startsWith("/_next/")) {
          // Check local file in public/
          const cleanPath = src.split("?")[0];
          const localFilePath = path.join("public", cleanPath);
          if (!fs.existsSync(localFilePath)) {
            const list = missingAssets.get(route) || [];
            list.push(src);
            missingAssets.set(route, list);
          }
        }
      }
    } catch (err) {
      console.error(`Error auditing ${route}:`, err.message);
    }
  }

  console.log("================ ASSET AUDIT REPORT ================");
  console.log(`Total unique image sources inspected: ${allAuditedImages.size}\n`);

  if (missingAssets.size === 0) {
    console.log("✅ 0 BROKEN ASSETS (All local images exist in public/ directory)");
  } else {
    console.log(`❌ Found broken/missing assets on ${missingAssets.size} pages:`);
    for (const [route, assets] of missingAssets.entries()) {
      console.log(`  Route: ${route}`);
      for (const a of assets) console.log(`    - ${a}`);
    }
  }

  console.log("\n---------------- UNSPLASH PLACEHOLDERS ----------------");
  if (unsplashAssets.size === 0) {
    console.log("✅ 0 Unsplash placeholders found (All replaced with authentic EasyOffice photos)");
  } else {
    console.log(`⚠️ Remaining Unsplash placeholders on ${unsplashAssets.size} pages:`);
    for (const [route, assets] of unsplashAssets.entries()) {
      console.log(`  Route: ${route}`);
      for (const a of [...new Set(assets)]) console.log(`    - ${a}`);
    }
  }
}

await run();
