import fs from "node:fs";

const vueContent = fs.readFileSync("/home/fullstackiteasylegal/Documents/LP - EO/pages/index.vue", "utf8");
const styleMatch = vueContent.match(/<style[^>]*>([\s\S]*?)<\/style>/);

if (styleMatch) {
  let css = styleMatch[1];
  // Replace asset base paths with local Next.js paths
  css = css.replace(/\/sewa-virtualoffice-easyoffice-metaads\//g, "/images/lp-eo/");
  fs.writeFileSync("app/(site)/sewa-virtualoffice-easyoffice-metaads/lp-eo.css", css, "utf8");
  console.log("Successfully extracted lp-eo.css (" + css.length + " bytes)");
} else {
  console.error("Could not find <style> block in index.vue");
}
