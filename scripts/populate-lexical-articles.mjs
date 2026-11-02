import fs from "node:fs";
import { blogPosts } from "../lib/data/blog-data.ts";

function htmlToLexical(html) {
  const clean = html
    .replace(/<script[^>]*>.*?<\/script>/gi, "")
    .replace(/<style[^>]*>.*?<\/style>/gi, "");

  const rawBlocks = clean
    .split(/<\/p>|<\/h[1-6]>|<br\s*\/?>/gi)
    .map((b) =>
      b
        .replace(/<[^>]+>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/&#8211;/g, "-")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .trim()
    )
    .filter((b) => b.length > 0);

  const children = rawBlocks.map((text) => ({
    type: "paragraph",
    version: 1,
    direction: null,
    format: "",
    indent: 0,
    textFormat: 0,
    textStyle: "",
    children: [
      {
        type: "text",
        version: 1,
        text,
        format: 0,
        detail: 0,
        mode: "normal",
        style: "",
      },
    ],
  }));

  return {
    root: {
      type: "root",
      version: 1,
      direction: null,
      format: "",
      indent: 0,
      children: children.length
        ? children
        : [
            {
              type: "paragraph",
              version: 1,
              direction: null,
              format: "",
              indent: 0,
              textFormat: 0,
              textStyle: "",
              children: [
                {
                  type: "text",
                  version: 1,
                  text: "",
                  format: 0,
                  detail: 0,
                  mode: "normal",
                  style: "",
                },
              ],
            },
          ],
    },
  };
}

let sql = "BEGIN;\n";
for (const post of blogPosts) {
  const lexical = htmlToLexical(post.contentHtml);
  const jsonStr = JSON.stringify(lexical).replace(/'/g, "''");
  sql += `UPDATE artikel SET blok = '${jsonStr}'::jsonb WHERE slug = '${post.slug}';\n`;
}
sql += "COMMIT;\n";

fs.writeFileSync("scripts/update-lexical-articles.sql", sql, "utf8");
console.log(`Generated update-lexical-articles.sql with ${blogPosts.length} articles! Size: ${Buffer.byteLength(sql)} bytes.`);
