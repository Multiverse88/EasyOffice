import fs from "node:fs";
import path from "node:path";

const srcDir = "/tmp/client-logos/LOGO KLIEN EASYOFFICE BANDUNG";
const destDir = path.resolve("public/images/clients");
fs.mkdirSync(destDir, { recursive: true });

const files = fs.readdirSync(srcDir);
const clients = [];

let id = 1;
for (const file of files) {
  const ext = path.extname(file);
  const baseName = path.basename(file, ext);
  const slug = baseName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const cleanFileName = `${slug}${ext.toLowerCase()}`;
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, cleanFileName);

  fs.copyFileSync(srcPath, destPath);

  // Capitalize nicely for alt & name
  const name = baseName
    .split(/[\s_-]+/)
    .map((w) => w.toUpperCase())
    .join(" ");

  clients.push({
    id: id++,
    name,
    logoUrl: `/images/clients/${cleanFileName}`,
    logoAlt: name,
    sortOrder: id,
  });
}

const outContent = `import type { CmsPartner } from "./cms-data";

export const clientLogos: CmsPartner[] = ${JSON.stringify(clients, null, 2)};
`;

fs.writeFileSync("lib/data/client-logos.ts", outContent, "utf8");
console.log(`Copied ${clients.length} client logos to public/images/clients and generated lib/data/client-logos.ts`);
