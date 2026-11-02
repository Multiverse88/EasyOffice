import fs from "node:fs";
import { blogPosts } from "../lib/data/blog-data.ts";

function esc(val) {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "boolean") return val ? "true" : "false";
  if (typeof val === "number") return String(val);
  return `'${String(val).replace(/'/g, "''")}'`;
}

let sql = `-- Seed Kategori & Artikel for EasyOffice
BEGIN;

TRUNCATE TABLE artikel, kategori CASCADE;

-- 1. Kategori
INSERT INTO kategori (id, nama, slug, created_at, updated_at) VALUES
(1, 'Virtual Office', 'virtual-office', now(), now()),
(2, 'Coworking Space', 'coworking-space', now(), now()),
(3, 'Meeting Room', 'meeting-room', now(), now()),
(4, 'Legalitas & PKP', 'legalitas-pkp', now(), now()),
(5, 'Tips Bisnis', 'tips-bisnis', now(), now());

SELECT setval('kategori_id_seq', 6);

-- 2. Artikel (11 Blog Posts)
`;

let artId = 1;
for (const post of blogPosts) {
  sql += `INSERT INTO artikel (
  id, judul, slug, ringkasan, sampul_url, kategori_id, kategori_teks,
  penulis, tanggal_terbit, waktu_baca, konten,
  seo_judul, seo_deskripsi, seo_jangan_indeks,
  created_at, updated_at
) VALUES (
  ${artId},
  ${esc(post.title)},
  ${esc(post.slug)},
  ${esc(post.excerpt)},
  ${esc(post.image)},
  1,
  ${esc(post.category)},
  ${esc(post.author ?? "EasyOffice Team")},
  ${esc(post.date)},
  '5 menit',
  ${esc(post.contentHtml)},
  ${esc(`${post.title} | Blog EasyOffice`)},
  ${esc(post.excerpt.slice(0, 160))},
  false,
  ${esc(post.date)},
  now()
);\n`;
  artId++;
}

sql += `SELECT setval('artikel_id_seq', ${artId});\nCOMMIT;\n`;

fs.writeFileSync("scripts/seed-articles.sql", sql, "utf8");
console.log(`Generated seed-articles.sql with ${blogPosts.length} articles! Size: ${Buffer.byteLength(sql)} bytes.`);
