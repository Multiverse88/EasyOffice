import fs from "node:fs";
import {
  services,
  locations,
  serviceLocations,
  promotions,
  testimonials,
  comparisonRows,
  allFacilities,
  generalFaqs,
  virtualOfficeFaqs,
  coworkingFaqs,
  meetingRoomFaqs,
} from "../lib/data/mock-data.ts";
import { googleReviews } from "../lib/data/google-reviews.ts";

function esc(val) {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "boolean") return val ? "true" : "false";
  if (typeof val === "number") return String(val);
  return `'${String(val).replace(/'/g, "''")}'`;
}

function parsePrice(raw) {
  if (typeof raw === "number") return raw;
  const cleaned = String(raw || "").toLowerCase().replace(/rp|\s/g, "").replace(/\./g, "").replace(",", ".");
  const multiplier = /\b(jt|juta)\b/.test(String(raw)) ? 1_000_000 : /\b(rb|ribu)\b/.test(String(raw)) ? 1_000 : 1;
  const parsed = Number.parseFloat(cleaned.replace(/[^0-9.]/g, ""));
  return Math.round((Number.isFinite(parsed) ? parsed : 0) * multiplier);
}

const VALID_ICONS = new Set(["briefcase", "users", "door", "wifi", "bell", "map-pin", "printer", "coffee", "car", "clock", "laptop", "presentation", "video", "wallet", "headset", "award", "handshake", "star", "sparkles"]);
function safeIcon(icon) {
  if (icon === "building" || icon === "building-2") return "door";
  return VALID_ICONS.has(icon) ? icon : "sparkles";
}

let sql = `-- Full Production DB Synchronization for EasyOffice
BEGIN;

-- Clean existing partial content
TRUNCATE TABLE 
  kantor_whatsapp_numbers,
  layanan_kantor_paket_harga_benefits,
  layanan_kantor_paket_harga,
  layanan_kantor_fasilitas,
  layanan_kantor,
  kantor,
  services_keunggulan_items,
  services_manfaat_items,
  promotions,
  comparison_rows,
  homepage_facilities,
  testimonials,
  faqs_items,
  faqs,
  site_settings_whatsapp_numbers,
  site_settings_stats_banner,
  site_settings_how_it_works,
  site_settings_homepage_hero_trust_items,
  site_settings,
  about_page_story_highlights,
  about_page_stats,
  about_page
CASCADE;

`;

// 1. Kantor
sql += `-- 1. Kantor\n`;
let kantorId = 1;
const kantorIdMap = new Map();
for (const loc of locations) {
  kantorIdMap.set(loc.slug, kantorId);
  sql += `INSERT INTO kantor (id, nama, slug, kota, deskripsi, alamat, jam_operasional, email, telepon, whatsapp, link_google_maps, latitude, longitude, alt_foto, seo_title, seo_description, seo_canonical_url, seo_no_index, aktif, created_at, updated_at, seo_slug)
VALUES (
  ${kantorId},
  ${esc(loc.name)},
  ${esc(loc.slug)},
  ${esc(loc.name.replace(/^EasyOffice\s*/i, "").trim() || loc.slug)},
  ${esc(loc.shortDescription ?? loc.card?.description ?? "")},
  ${esc(loc.address ?? "")},
  ${esc(loc.operatingHours ?? "Senin–Jumat, 08.00–17.00 WIB")},
  ${esc(loc.email ?? "id.easyoffice@gmail.com")},
  ${esc(loc.phoneDisplay ?? "0818 881 425")},
  ${esc(loc.whatsapp ?? "62818881425")},
  ${esc(loc.mapsUrl ?? "")},
  ${esc(loc.latitude)},
  ${esc(loc.longitude)},
  ${esc(loc.card?.imageAlt ?? loc.name)},
  ${esc(`${loc.name} - Kantor Sewa Virtual Office & Meeting Room`)},
  ${esc(loc.shortDescription ?? loc.card?.description ?? "")},
  ${esc(`/kantor/${loc.slug}`)},
  false,
  true,
  now(),
  now(),
  ${esc(loc.slug)}
);\n`;

  sql += `INSERT INTO kantor_whatsapp_numbers (_order, _parent_id, id, label, number, active, priority)
VALUES (1, ${kantorId}, '${loc.slug}-wa-1', 'Utama', ${esc(loc.whatsapp ?? "62818881425")}, true, 1);\n`;

  kantorId++;
}
sql += `SELECT setval('kantor_id_seq', ${kantorId});\n\n`;

// 2. Services
sql += `-- 2. Services Keunggulan & Manfaat\n`;
const serviceIdMap = new Map([
  ["virtual-office", 1],
  ["coworking-space", 2],
  ["meeting-room", 3],
]);

for (const s of services) {
  const sid = serviceIdMap.get(s.slug);
  sql += `UPDATE services SET
  title = ${esc(s.title)},
  short_title = ${esc(s.shortTitle)},
  description = ${esc(s.description)},
  intro = ${esc(s.intro)},
  benefits_title = ${esc(`Keunggulan ${s.title}`)},
  benefits_description = ${esc(`Keunggulan utama layanan ${s.title}.`)},
  manfaat_title = ${esc(`Manfaat ${s.title} Untuk Bisnis Anda`)},
  manfaat_description = ${esc(`Pahami lebih lanjut tentang keuntungan memilih layanan ${s.title}.`)},
  is_active = true,
  updated_at = now()
WHERE id = ${sid};\n`;

  if (s.keunggulanItems) {
    s.keunggulanItems.forEach((item, idx) => {
      sql += `INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (${idx + 1}, ${sid}, '${s.slug}-keunggulan-${idx + 1}', ${esc(safeIcon(item.icon))}, ${esc(item.title)}, ${esc(item.description)});\n`;
    });
  }

  if (s.manfaatItems) {
    s.manfaatItems.forEach((item, idx) => {
      sql += `INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (${idx + 1}, ${sid}, '${s.slug}-manfaat-${idx + 1}', ${esc(safeIcon(item.icon))}, ${esc(item.title)}, ${esc(item.description)});\n`;
    });
  }
}
sql += `\n`;

// 3. Layanan Kantor (9 Combos)
sql += `-- 3. Layanan Kantor (9 Offerings)\n`;
let lkId = 1;
for (const combo of serviceLocations) {
  const sid = serviceIdMap.get(combo.serviceSlug);
  const kid = kantorIdMap.get(combo.locationSlug);
  if (!sid || !kid) continue;
  const comboSlug = `${combo.serviceSlug}-${combo.locationSlug}`;
  const officeInfo = combo.offices?.[0];

  sql += `INSERT INTO layanan_kantor (id, kantor_id, layanan_id, slug, nama_tampilan, deskripsi, tagline, harga_mulai, catatan_legalitas, aktif, created_at, updated_at, alt_foto, seo_title, seo_description, seo_canonical_url, seo_no_index, seo_slug)
VALUES (
  ${lkId},
  ${kid},
  ${sid},
  ${esc(comboSlug)},
  ${esc(`${combo.serviceSlug.replace(/-/g, " ")} ${combo.locationSlug}`.replace(/\b\w/g, (c) => c.toUpperCase()))},
  ${esc(officeInfo?.description ?? combo.tagline)},
  ${esc(combo.tagline)},
  ${esc(combo.startingPrice)},
  ${esc(combo.catatanLegalitas ?? "")},
  true,
  now(),
  now(),
  ${esc(combo.imageAlt ?? comboSlug)},
  ${esc(`${combo.serviceSlug.replace(/-/g, " ")} ${combo.locationSlug} | EasyOffice`)},
  ${esc(combo.tagline)},
  ${esc(`/layanan/${combo.serviceSlug}/${combo.locationSlug}`)},
  false,
  ${esc(comboSlug)}
);\n`;

  // Paket harga
  combo.pricing.forEach((plan, pIdx) => {
    const planId = `${comboSlug}-plan-${pIdx + 1}`;
    sql += `INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (${pIdx + 1}, ${lkId}, '${planId}', ${esc(plan.name)}, ${esc(plan.description ?? "")}, ${parsePrice(plan.price)}, ${esc(plan.period ?? "/bulan")}, ${plan.discountPercent ? "true" : "false"}, ${plan.discountPercent ? plan.discountPercent : "NULL"});\n`;

    (plan.features ?? []).forEach((feat, fIdx) => {
      sql += `INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (${fIdx + 1}, '${planId}', '${planId}-feat-${fIdx + 1}', ${esc(feat)});\n`;
    });
  });

  // Fasilitas
  combo.facilities.forEach((fac, fIdx) => {
    sql += `INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (${fIdx + 1}, ${lkId}, '${comboSlug}-fac-${fIdx + 1}', ${esc(safeIcon(fac.icon))}, ${esc(fac.title)}, ${esc(fac.description ?? "")});\n`;
  });

  lkId++;
}
sql += `SELECT setval('layanan_kantor_id_seq', ${lkId});\n\n`;

// 4. Promotions
sql += `-- 4. Promotions\n`;
let promoId = 1;
for (const promo of promotions) {
  const sid = promo.serviceSlug ? serviceIdMap.get(promo.serviceSlug) : null;
  sql += `INSERT INTO promotions (id, badge, title, description, period, service_id, is_active, created_at, updated_at, cta_label)
VALUES (${promoId}, ${esc((promo.badge === "trial" || promo.badge === "diskon") ? promo.badge : "promo")}, ${esc(promo.title)}, ${esc(promo.description)}, ${esc(promo.period)}, ${sid ? sid : "NULL"}, true, now(), now(), 'Ambil Promo');\n`;
  promoId++;
}
sql += `SELECT setval('promotions_id_seq', ${promoId});\n\n`;

// 5. Comparison Rows
sql += `-- 5. Comparison Rows\n`;
let compId = 1;
for (let i = 0; i < comparisonRows.length; i++) {
  const row = comparisonRows[i];
  sql += `INSERT INTO comparison_rows (id, feature, easyoffice, typical, placement, sort_order, is_active, created_at, updated_at)
VALUES (${compId}, ${esc(row.feature)}, ${esc(row.easyoffice ? "true" : "false")}, ${esc(row.typical === true ? "true" : row.typical === false ? "false" : "neutral")}, 'global', ${i + 1}, true, now(), now());\n`;
  compId++;
}
sql += `SELECT setval('comparison_rows_id_seq', ${compId});\n\n`;

// 6. Homepage Facilities
sql += `-- 6. Homepage Facilities\n`;
let facId = 1;
for (let i = 0; i < allFacilities.length; i++) {
  const f = allFacilities[i];
  sql += `INSERT INTO homepage_facilities (id, title, description, icon, sort_order, is_active, created_at, updated_at)
VALUES (${facId}, ${esc(f.title)}, ${esc(f.description)}, ${esc(safeIcon(f.icon))}, ${i + 1}, true, now(), now());\n`;
  facId++;
}
sql += `SELECT setval('homepage_facilities_id_seq', ${facId});\n\n`;

// 7. Testimonials
sql += `-- 7. Testimonials\n`;
let testId = 1;
const combinedReviews = [...testimonials, ...googleReviews.slice(0, 5)];
for (const rev of combinedReviews) {
  sql += `INSERT INTO testimonials (id, name, company, quote, is_active, created_at, updated_at)
VALUES (${testId}, ${esc(rev.name)}, ${esc(rev.company ?? "Klien EasyOffice")}, ${esc(rev.quote)}, true, now(), now());\n`;
  testId++;
}
sql += `SELECT setval('testimonials_id_seq', ${testId});\n\n`;

// 8. FAQs
sql += `-- 8. FAQs\n`;
const faqList = [
  { title: "FAQ Umum EasyOffice", placement: "global", category: "Umum", sid: null, items: generalFaqs },
  { title: "FAQ Virtual Office", placement: "service", category: "Virtual Office", sid: 1, items: virtualOfficeFaqs },
  { title: "FAQ Coworking Space", placement: "service", category: "Coworking Space", sid: 2, items: coworkingFaqs },
  { title: "FAQ Meeting Room", placement: "service", category: "Meeting Room", sid: 3, items: meetingRoomFaqs },
];
let faqId = 1;
for (const fGroup of faqList) {
  fGroup.items.forEach((item, idx) => {
    sql += `INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (${faqId}, ${esc(item.question)}, ${esc(item.answer)}, ${esc(fGroup.category)}, ${fGroup.sid ? fGroup.sid : "NULL"}, ${esc(fGroup.placement)}, ${esc(fGroup.title)}, ${idx + 1}, true, now(), now());\n`;

    sql += `INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (${idx + 1}, ${faqId}, 'faq-${faqId}-item-${idx + 1}', ${esc(item.question)}, ${esc(item.answer)}, ${idx + 1});\n`;

    faqId++;
  });
}
sql += `SELECT setval('faqs_id_seq', ${faqId});\n\n`;

// 9. Site Settings Global
sql += `-- 9. Site Settings Global\n`;
sql += `INSERT INTO site_settings (
  id, site_name, tagline, primary_whatsapp, email, phone, operating_hours,
  header_cta_label, header_cta_message,
  homepage_hero_eyebrow, homepage_hero_title, homepage_hero_description,
  homepage_hero_primary_cta_label, homepage_hero_primary_cta_message,
  homepage_hero_secondary_cta_label, homepage_hero_secondary_cta_href,
  homepage_services_title, homepage_services_description,
  homepage_facilities_title, homepage_facilities_description,
  homepage_comparison_title, homepage_comparison_description,
  homepage_promo_title, homepage_promo_description,
  homepage_shopee_title, homepage_shopee_description,
  footer_description, copyright_text, default_seo_title, default_seo_description,
  created_at, updated_at
) VALUES (
  1,
  'EasyOffice',
  'Virtual Office, Coworking Space & Meeting Room Profesional',
  '62818881425',
  'id.easyoffice@gmail.com',
  '0818 881 425',
  'Senin–Jumat, 08.00–17.00 WIB',
  'Hubungi Kami',
  'Halo EasyOffice, saya ingin bertanya tentang layanan Anda.',
  'EasyOffice',
  'Miliki Alamat Kantor Premium di Kota Besar Indonesia',
  'Virtual Office (VO) sudah disetujui pemerintah dan dapat digunakan untuk keperluan legal, seperti pendirian PT, CV, dan pendaftaran PKP. VO memudahkan Anda mengurus dokumen bisnis secara praktis dan efisien.',
  'Hubungi Kami',
  'Halo EasyOffice, saya ingin bertanya tentang layanan Anda.',
  'Lihat Layanan',
  '/layanan/virtual-office',
  'Layanan EasyOffice',
  'Berbagai layanan untuk mendukung operasional dan citra profesional bisnis Anda.',
  'Keuntungan Sewa Virtual Office di Kami',
  'Dapatkan alamat bisnis prestisius dengan biaya terjangkau! Virtual office kami menawarkan fasilitas lengkap, layanan profesional, serta fleksibilitas tinggi.',
  'Perbandingan dengan Office Lain',
  'Perbandingan fasilitas yang Anda dapatkan bersama EasyOffice.',
  'Penawaran Spesial untuk Anda',
  'Temukan penawaran EasyOffice untuk kebutuhan ruang kerja dan bisnis Anda.',
  'Pesan Paket EasyOffice dengan Mudah',
  'Pembayaran layanan EasyOffice tersedia melalui marketplace Shopee dengan transaksi yang aman dan terpercaya.',
  'EasyOffice adalah penyedia layanan kantor virtual di Bandung, Jakarta, dan Bekasi yang menawarkan alamat bisnis prestisius, ruang meeting eksklusif, layanan pengelolaan surat, dan resepsionis profesional. Member of EASY CORP.',
  '© 2026 EasyOffice. Member of EASY CORP.',
  'EasyOffice: Virtual Office Bisa PKP Murah dan Profesional',
  'Cari virtual office murah untuk bisnis Anda? EasyOffice menyediakan layanan sewa kantor virtual, Bisa PKP di Bandung, Jakarta, dan Bekasi. Konsultasi Gratis!',
  now(),
  now()
);\n`;

// Site Settings child tables
sql += `INSERT INTO site_settings_whatsapp_numbers (_order, _parent_id, id, label, number, active, priority) VALUES
(1, 1, 'ss-wa-1', 'Bandung (Cihampelas)', '62818881425', true, 1),
(2, 1, 'ss-wa-2', 'Jakarta (Sovereign Plaza)', '62818881425', true, 2),
(3, 1, 'ss-wa-3', 'Bekasi (Summarecon)', '62818881425', true, 3);\n`;

sql += `INSERT INTO site_settings_stats_banner (_order, _parent_id, id, value, label, icon) VALUES
(1, 1, 'ss-stat-1', '13.000+', 'Bisnis Terlayani', 'briefcase'),
(2, 1, 'ss-stat-2', '5 Menit', 'Respon WhatsApp', 'message'),
(3, 1, 'ss-stat-3', '4.9 ★', 'Rating Google (700+)', 'star'),
(4, 1, 'ss-stat-4', '100%', 'Legal & Resmi', 'shield');\n`;

sql += `INSERT INTO site_settings_homepage_hero_trust_items (_order, _parent_id, id, text, sort_order) VALUES
(1, 1, 'ss-trust-1', 'Bisa PKP', 1),
(2, 1, 'ss-trust-2', 'Alamat Domisili Gedung Komersial', 2),
(3, 1, 'ss-trust-3', 'Free Meeting Room hingga 70 Jam/Tahun', 3),
(4, 1, 'ss-trust-4', 'Proses Cepat & Tanpa Ribet', 4),
(5, 1, 'ss-trust-5', 'Legalitas Lengkap (IMB & PBB)', 5);\n`;

sql += `INSERT INTO site_settings_how_it_works (_order, _parent_id, id, title, description, sort_order) VALUES
(1, 1, 'ss-hiw-1', 'Konsultasi & Pilih Paket', 'Hubungi tim kami via WhatsApp untuk memilih paket dan lokasi kantor sesuai kebutuhan.', 1),
(2, 1, 'ss-hiw-2', 'Verifikasi & Pembayaran', 'Lengkapi data usaha Anda dan lakukan pembayaran yang aman via marketplace Shopee atau transfer resmi.', 2),
(3, 1, 'ss-hiw-3', 'Kantor Siap Digunakan', 'Surat perjanjian sewa dan domisili diterbitkan, kantor langsung siap digunakan untuk operasional dan PKP.', 3);\n`;

// 10. About Page Global
sql += `-- 10. About Page Global\n`;
sql += `INSERT INTO about_page (
  id, eyebrow, hero_title, hero_description, story_eyebrow, story_title, story_description,
  created_at, updated_at
) VALUES (
  1,
  'Tentang Kami',
  'Buat Bisnismu Terlihat Profesional & Terpercaya',
  'EasyOffice hadir sebagai solusi virtual office dengan layanan profesional, terpercaya, dan harga terjangkau di Bandung, Jakarta, dan Bekasi.',
  'Cerita Kami',
  'Tentang EasyOffice',
  'EasyOffice adalah penyedia layanan virtual office di Bekasi, Jakarta, dan Bandung yang menyediakan alamat bisnis profesional, ruang meeting, layanan resepsionis, serta pengelolaan surat untuk mendukung pertumbuhan bisnis dengan biaya yang lebih hemat dan terjangkau.',
  now(),
  now()
);\n`;

sql += `INSERT INTO about_page_story_highlights (_order, _parent_id, id, value) VALUES
(1, 1, 'ab-hl-1', 'Terdaftar resmi di Kemenkumham RI: CV EASYOFFICE KANTOR BERSAMA (AHU-0094982-AH.01.14 Tahun 2025)'),
(2, 1, 'ab-hl-2', 'Alamat zonasi komersial gedung perkantoran resmi dan dapat digunakan untuk pendaftaran PKP'),
(3, 1, 'ab-hl-3', 'Free pemakaian Meeting Room eksklusif hingga 70 jam/tahun');\n`;

sql += `INSERT INTO about_page_stats (_order, _parent_id, id, value, label) VALUES
(1, 1, 'ab-st-1', '13.000+', 'Bisnis Terlayani'),
(2, 1, 'ab-st-2', '5 Menit', 'Respon WhatsApp'),
(3, 1, 'ab-st-3', '4.9 ★', 'Rating Google'),
(4, 1, 'ab-st-4', '100%', 'Legal & Resmi');\n`;

sql += `\nCOMMIT;\n`;

fs.writeFileSync("scripts/production-seed.sql", sql, "utf8");
console.log(`Generated production-seed.sql successfully! Total SQL size: ${Buffer.byteLength(sql)} bytes.`);
