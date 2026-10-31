import fs from "node:fs";
import path from "node:path";

const imgDir = path.resolve("public/images/easyoffice/blog");
fs.mkdirSync(imgDir, { recursive: true });

async function run() {
  console.log("Fetching posts from easyoffice.co.id REST API...");
  const res = await fetch("https://easyoffice.co.id/wp-json/wp/v2/posts?per_page=20&_embed", {
    headers: {
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts: ${res.status}`);
  }

  const posts = await res.json();
  console.log(`Received ${posts.length} posts.`);

  const articles = [];

  for (const post of posts) {
    const slug = post.slug;
    const rawTitle = post.title?.rendered ?? "";
    const title = rawTitle.replace(/&#8211;/g, "–").replace(/&#8217;/g, "'").replace(/&amp;/g, "&").trim();
    const date = post.date;
    const rawExcerpt = post.excerpt?.rendered ?? "";
    const excerpt = rawExcerpt.replace(/<[^>]+>/g, "").replace(/&hellip;/g, "…").replace(/&#8211;/g, "–").replace(/&#8217;/g, "'").replace(/\n/g, " ").trim();

    const mediaObj = post._embedded?.["wp:featuredmedia"]?.[0];
    const sourceUrl = mediaObj?.source_url;
    let localImagePath = "/images/easyoffice/office-bandung.png";

    if (sourceUrl) {
      const ext = path.extname(new URL(sourceUrl).pathname) || ".png";
      const fileName = `${slug}${ext}`;
      const destPath = path.join(imgDir, fileName);

      try {
        console.log(`Downloading image for ${slug}: ${sourceUrl}`);
        const imgRes = await fetch(sourceUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64)",
          },
        });
        if (imgRes.ok) {
          const buffer = Buffer.from(await imgRes.arrayBuffer());
          fs.writeFileSync(destPath, buffer);
          localImagePath = `/images/easyoffice/blog/${fileName}`;
          console.log(`Saved ${fileName} (${buffer.length} bytes)`);
        }
      } catch (err) {
        console.error(`Error downloading image for ${slug}:`, err.message);
      }
    }

    // Clean up content HTML
    let contentHtml = post.content?.rendered ?? "";
    contentHtml = contentHtml
      .replace(/https:\/\/easyoffice\.co\.id\/wp-content\/uploads\//g, "https://easyoffice.co.id/wp-content/uploads/")
      .replace(/<a\s+href="https:\/\/mauorder\.online\/easyoffice-8"[^>]*>.*?<\/a>/gi, "")
      .replace(/<a\s+href="https:\/\/casinotest2\.com\/"[^>]*>.*?<\/a>/gi, "");

    articles.push({
      id: post.id,
      slug,
      title,
      date,
      excerpt,
      image: localImagePath,
      contentHtml,
      category: "Virtual Office",
      author: "EasyOffice Team",
    });
  }

  const outPath = path.resolve("lib/data/blog-data.ts");
  const fileContent = `export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  contentHtml: string;
  category: string;
  author: string;
}

export const blogPosts: BlogPost[] = ${JSON.stringify(articles, null, 2)};

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
`;

  fs.writeFileSync(outPath, fileContent, "utf8");
  console.log(`Successfully generated ${outPath} with ${articles.length} posts.`);
}

await run();
