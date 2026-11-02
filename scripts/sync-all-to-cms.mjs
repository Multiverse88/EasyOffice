import {
  services,
  locations,
  serviceLocations,
  promotions,
  testimonials,
  comparisonRows,
  allFacilities as homepageFacilities,
  generalFaqs,
  virtualOfficeFaqs,
  coworkingFaqs,
  meetingRoomFaqs,
} from "../lib/data/mock-data.ts";
import { googleReviews } from "../lib/data/google-reviews.ts";

const baseUrl = (process.env.CMS_URL ?? "https://easyoffice.co.id").replace(/\/$/, "");
const email = process.env.PAYLOAD_ADMIN_EMAIL ?? "admin@easyoffice.local";
const password = process.env.PAYLOAD_ADMIN_PASSWORD ?? "admin123";

console.log(`[Sync] Connecting to ${baseUrl} as ${email}...`);

async function jsonRequest(path, options = {}) {
  const url = `${baseUrl}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(options.headers ?? {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(`${options.method ?? "GET"} ${path} [${response.status}]: ${JSON.stringify(data)}`);
  }
  return data;
}

// 1. Authenticate
const authRes = await jsonRequest("/api/users/login", {
  method: "POST",
  body: JSON.stringify({ email, password }),
});
const token = authRes.token;
if (!token) throw new Error("No token returned on login");
const auth = { Authorization: `JWT ${token}` };
console.log("✓ Authenticated successfully with JWT token");

// Upsert helpers
async function upsertBy(collection, field, value, data) {
  const query = await jsonRequest(`/api/${collection}?where[${field}][equals]=${encodeURIComponent(value)}&limit=1`, {
    headers: auth,
  });
  const existing = query.docs?.[0];
  if (existing) {
    return jsonRequest(`/api/${collection}/${existing.id}`, {
      method: "PATCH",
      headers: auth,
      body: JSON.stringify(data),
    });
  }
  return jsonRequest(`/api/${collection}`, {
    method: "POST",
    headers: auth,
    body: JSON.stringify(data),
  });
}
const VALID_ICONS = new Set(["briefcase", "users", "door", "wifi", "bell", "map-pin", "printer", "coffee", "car", "clock", "laptop", "presentation", "video", "wallet", "headset", "award", "handshake", "star", "sparkles"]);
function safeIcon(icon) {
  if (icon === "building" || icon === "building-2") return "door";
  return VALID_ICONS.has(icon) ? icon : "sparkles";
}

function parsePriceNumber(raw) {
  if (typeof raw === "number") return raw;
  const cleaned = String(raw || "").toLowerCase().replace(/rp|\s/g, "").replace(/\./g, "").replace(",", ".");
  const multiplier = /\b(jt|juta)\b/.test(String(raw)) ? 1_000_000 : /\b(rb|ribu)\b/.test(String(raw)) ? 1_000 : 1;
  const parsed = Number.parseFloat(cleaned.replace(/[^0-9.]/g, ""));
  return Math.round((Number.isFinite(parsed) ? parsed : 0) * multiplier);
}

// 2. Sync Services
console.log("\n[1/8] Syncing Services (Virtual Office, Coworking Space, Meeting Room)...");
const serviceMap = new Map();
for (const service of services) {
  const payload = {
    title: service.title,
    slug: service.slug,
    shortTitle: service.shortTitle,
    description: service.description,
    intro: service.intro,
    benefitsTitle: `Keunggulan ${service.title}`,
    benefitsDescription: `Keunggulan utama layanan ${service.title}.`,
    keunggulanItems: (service.keunggulanItems ?? []).map((item) => ({
      icon: safeIcon(item.icon),
      title: item.title,
      description: item.description,
    })),
    manfaatTitle: `Manfaat ${service.title} Untuk Bisnis Anda`,
    manfaatDescription: `Pahami lebih lanjut tentang keuntungan memilih layanan ${service.title}.`,
    manfaatItems: (service.manfaatItems ?? []).map((item) => ({
      icon: safeIcon(item.icon),
      title: item.title,
      description: item.description,
    })),
    isActive: true,
  };
  const res = await upsertBy("services", "slug", service.slug, payload);
  const doc = res.doc ?? res;
  serviceMap.set(service.slug, doc.id);
  console.log(`  ✓ Service synced: ${service.title} (ID: ${doc.id})`);
}

// 3. Sync Kantor (Physical Locations)
console.log("\n[2/8] Syncing Kantor (Bandung, Jakarta, Bekasi)...");
const kantorMap = new Map();
for (const loc of locations) {
  const payload = {
    nama: loc.name,
    slug: loc.slug,
    kota: loc.name.replace(/^EasyOffice\s*/i, "").trim() || loc.slug,
    deskripsi: loc.shortDescription ?? loc.card?.description ?? "",
    alamat: loc.address ?? "",
    jamOperasional: loc.operatingHours ?? "Senin–Jumat, 08.00–17.00 WIB",
    email: loc.email ?? "id.easyoffice@gmail.com",
    telepon: loc.phoneDisplay ?? "0818 881 425",
    whatsapp: loc.whatsapp ?? "62818881425",
    whatsappNumbers: [
      { label: "Utama", number: loc.whatsapp ?? "62818881425", active: true, priority: 1 },
    ],
    linkGoogleMaps: loc.mapsUrl ?? "",
    latitude: loc.latitude,
    longitude: loc.longitude,
    altFoto: loc.card?.imageAlt ?? loc.name,
    aktif: true,
  };
  const res = await upsertBy("kantor", "slug", loc.slug, payload);
  const doc = res.doc ?? res;
  kantorMap.set(loc.slug, doc.id);
  console.log(`  ✓ Kantor synced: ${loc.name} (ID: ${doc.id})`);
}

// 4. Sync Layanan Kantor (9 Combinations)
console.log("\n[3/8] Syncing Layanan Kantor (Packages & Pricing)...");
for (const combo of serviceLocations) {
  const serviceId = serviceMap.get(combo.serviceSlug);
  const kantorId = kantorMap.get(combo.locationSlug);
  if (!serviceId || !kantorId) {
    console.warn(`  ⚠ Missing relation for ${combo.serviceSlug} + ${combo.locationSlug}`);
    continue;
  }
  const comboSlug = `${combo.serviceSlug}-${combo.locationSlug}`;
  const officeInfo = combo.offices?.[0];
  const payload = {
    kantor: kantorId,
    layanan: serviceId,
    slug: comboSlug,
    namaTampilan: `${combo.serviceSlug.replace(/-/g, " ")} ${combo.locationSlug}`.replace(/\b\w/g, (c) => c.toUpperCase()),
    tagline: combo.tagline,
    deskripsi: officeInfo?.description ?? combo.tagline,
    hargaMulai: combo.startingPrice,
    catatanLegalitas: combo.catatanLegalitas ?? "",
    paketHarga: combo.pricing.map((plan) => ({
      name: plan.name,
      description: plan.description ?? "",
      price: parsePriceNumber(plan.price),
      unit: plan.period ?? "/bulan",
      benefits: (plan.features ?? []).map((feat) => ({ value: feat })),
      discount: plan.discountPercent
        ? { active: true, percentage: plan.discountPercent }
        : { active: false },
    })),
    fasilitas: combo.facilities.map((fac) => ({
      icon: safeIcon(fac.icon),
      title: fac.title,
      description: fac.description ?? "",
    })),
    altFoto: combo.imageAlt ?? comboSlug,
    aktif: true,
  };
  await upsertBy("layanan-kantor", "slug", comboSlug, payload);
  console.log(`  ✓ Layanan Kantor synced: ${comboSlug}`);
}

// 5. Sync Promotions
console.log("\n[4/8] Syncing Promotions...");
for (const promo of promotions) {
  const serviceId = promo.serviceSlug ? serviceMap.get(promo.serviceSlug) : undefined;
  const payload = {
    title: promo.title,
    badge: (promo.badge === "trial" || promo.badge === "diskon") ? promo.badge : "promo",
    description: promo.description,
    period: promo.period,
    service: serviceId,
    isActive: true,
  };
  await upsertBy("promotions", "title", promo.title, payload);
  console.log(`  ✓ Promo synced: ${promo.title}`);
}

// 6. Sync Comparison Rows
console.log("\n[5/8] Syncing Comparison Rows...");
for (let i = 0; i < comparisonRows.length; i++) {
  const row = comparisonRows[i];
  const payload = {
    feature: row.feature,
    easyoffice: row.easyoffice ? "true" : "false",
    typical: row.typical === true ? "true" : row.typical === false ? "false" : "neutral",
    placement: "global",
    sortOrder: i + 1,
    isActive: true,
  };
  await upsertBy("comparison-rows", "feature", row.feature, payload);
}
console.log(`  ✓ Comparison rows synced (${comparisonRows.length} items)`);

// 7. Sync Homepage Facilities
console.log("\n[6/8] Syncing Homepage Facilities...");
for (let i = 0; i < homepageFacilities.length; i++) {
  const fac = homepageFacilities[i];
  const payload = {
    title: fac.title,
    description: fac.description,
    icon: safeIcon(fac.icon),
    sortOrder: i + 1,
    isActive: true,
  };
  await upsertBy("homepage-facilities", "title", fac.title, payload);
}
console.log(`  ✓ Homepage facilities synced (${homepageFacilities.length} items)`);

// 8. Sync Testimonials
console.log("\n[7/8] Syncing Testimonials...");
const allReviews = [...testimonials, ...googleReviews.slice(0, 5)];
for (const review of allReviews) {
  const payload = {
    name: review.name,
    company: review.company ?? "Klien EasyOffice",
    quote: review.quote,
    isActive: true,
  };
  await upsertBy("testimonials", "name", review.name, payload);
}
console.log(`  ✓ Testimonials synced (${allReviews.length} items)`);
// 9. Sync FAQs
console.log("\n[8/9] Syncing FAQs...");
const faqGroups = [
  { title: "FAQ Umum EasyOffice", placement: "global", items: generalFaqs },
  { title: "FAQ Virtual Office", placement: "service", serviceSlug: "virtual-office", items: virtualOfficeFaqs },
  { title: "FAQ Coworking Space", placement: "service", serviceSlug: "coworking-space", items: coworkingFaqs },
  { title: "FAQ Meeting Room", placement: "service", serviceSlug: "meeting-room", items: meetingRoomFaqs },
];
for (const group of faqGroups) {
  const serviceId = group.serviceSlug ? serviceMap.get(group.serviceSlug) : undefined;
  const payload = {
    title: group.title,
    placement: group.placement,
    service: serviceId,
    items: group.items.map((item, idx) => ({
      question: item.question,
      answer: item.answer,
      sortOrder: idx + 1,
    })),
    sortOrder: 1,
    isActive: true,
  };
  await upsertBy("faqs", "title", group.title, payload);
  console.log(`  ✓ FAQ synced: ${group.title}`);
}

// 10. Sync Site Settings & About Page Globals
console.log("\n[9/9] Syncing Global Site Settings & About Page...");
const siteSettingsPayload = {
  siteName: "EasyOffice",
  tagline: "Virtual Office, Coworking Space & Meeting Room Profesional",
  primaryWhatsapp: "62818881425",
  whatsappNumbers: [
    { label: "Bandung (Cihampelas)", number: "62818881425", active: true, priority: 1 },
    { label: "Jakarta (Sovereign Plaza)", number: "62818881425", active: true, priority: 2 },
    { label: "Bekasi (Summarecon)", number: "62818881425", active: true, priority: 3 },
  ],
  email: "id.easyoffice@gmail.com",
  phone: "0818 881 425",
  operatingHours: "Senin–Jumat, 08.00–17.00 WIB",
  headerCtaLabel: "Hubungi Kami",
  headerCtaMessage: "Halo EasyOffice, saya ingin bertanya tentang layanan Anda.",
  homepageHeroEyebrow: "EasyOffice",
  homepageHeroTitle: "Miliki Alamat Kantor Premium di Kota Besar Indonesia",
  homepageHeroDescription: "Virtual Office (VO) sudah disetujui pemerintah dan dapat digunakan untuk keperluan legal, seperti pendirian PT, CV, dan pendaftaran PKP. VO memudahkan Anda mengurus dokumen bisnis secara praktis dan efisien.",
  homepageHeroPrimaryCtaLabel: "Hubungi Kami",
  homepageHeroPrimaryCtaMessage: "Halo EasyOffice, saya ingin bertanya tentang layanan Anda.",
  homepageHeroSecondaryCtaLabel: "Lihat Layanan",
  homepageHeroSecondaryCtaHref: "/layanan/virtual-office",
  homepageHeroTrustItems: [
    { text: "Bisa PKP", sortOrder: 1 },
    { text: "Alamat Domisili Gedung Komersial", sortOrder: 2 },
    { text: "Free Meeting Room hingga 70 Jam/Tahun", sortOrder: 3 },
    { text: "Proses Cepat & Tanpa Ribet", sortOrder: 4 },
    { text: "Legalitas Lengkap (IMB & PBB)", sortOrder: 5 },
  ],
  homepageServicesTitle: "Layanan EasyOffice",
  homepageServicesDescription: "Berbagai layanan untuk mendukung operasional dan citra profesional bisnis Anda.",
  homepageFacilitiesTitle: "Keuntungan Sewa Virtual Office di Kami",
  homepageFacilitiesDescription: "Dapatkan alamat bisnis prestisius dengan biaya terjangkau! Virtual office kami menawarkan fasilitas lengkap, layanan profesional, serta fleksibilitas tinggi.",
  homepageComparisonTitle: "Perbandingan dengan Office Lain",
  homepageComparisonDescription: "Perbandingan fasilitas yang Anda dapatkan bersama EasyOffice.",
  homepagePromoTitle: "Penawaran Spesial untuk Anda",
  homepagePromoDescription: "Temukan penawaran EasyOffice untuk kebutuhan ruang kerja dan bisnis Anda.",
  homepageShopeeTitle: "Pesan Paket EasyOffice dengan Mudah",
  homepageShopeeDescription: "Pembayaran layanan EasyOffice tersedia melalui marketplace Shopee dengan transaksi yang aman dan terpercaya.",
  footerDescription: "EasyOffice adalah penyedia layanan kantor virtual di Bandung, Jakarta, dan Bekasi yang menawarkan alamat bisnis prestisius, ruang meeting eksklusif, layanan pengelolaan surat, dan resepsionis profesional. Member of EASY CORP.",
  copyrightText: `© ${new Date().getFullYear()} EasyOffice. Member of EASY CORP.`,
  defaultSeoTitle: "EasyOffice: Virtual Office Bisa PKP Murah dan Profesional",
  defaultSeoDescription: "Cari virtual office murah untuk bisnis Anda? EasyOffice menyediakan layanan sewa kantor virtual, Bisa PKP di Bandung, Jakarta, dan Bekasi. Konsultasi Gratis!",
  statsBanner: [
    { value: "13.000+", label: "Bisnis Terlayani", icon: "briefcase" },
    { value: "5 Menit", label: "Respon WhatsApp", icon: "message" },
    { value: "4.9 ★", label: "Rating Google (700+)", icon: "star" },
    { value: "100%", label: "Legal & Resmi", icon: "shield" },
  ],
  howItWorks: [
    { title: "Konsultasi & Pilih Paket", description: "Hubungi tim kami via WhatsApp untuk memilih paket dan lokasi kantor sesuai kebutuhan.", sortOrder: 1 },
    { title: "Verifikasi & Pembayaran", description: "Lengkapi data usaha Anda dan lakukan pembayaran yang aman via marketplace Shopee atau transfer resmi.", sortOrder: 2 },
    { title: "Kantor Siap Digunakan", description: "Surat perjanjian sewa dan domisili diterbitkan, kantor langsung siap digunakan untuk operasional dan PKP.", sortOrder: 3 },
  ],
};

await jsonRequest("/api/globals/site-settings", {
  method: "POST",
  headers: auth,
  body: JSON.stringify(siteSettingsPayload),
});
console.log("  ✓ Site Settings global updated");

const aboutPagePayload = {
  heroTitle: "Buat Bisnismu Terlihat Profesional & Terpercaya",
  heroDescription: "EasyOffice hadir sebagai solusi virtual office dengan layanan profesional, terpercaya, dan harga terjangkau di Bandung, Jakarta, dan Bekasi.",
  storyTitle: "Tentang EasyOffice",
  storyDescription: "EasyOffice adalah penyedia layanan virtual office di Bekasi, Jakarta, dan Bandung yang menyediakan alamat bisnis profesional, ruang meeting, layanan resepsionis, serta pengelolaan surat untuk mendukung pertumbuhan bisnis dengan biaya yang lebih hemat dan terjangkau.",
  storyHighlights: [
    { value: "Terdaftar resmi di Kemenkumham RI: CV EASYOFFICE KANTOR BERSAMA (AHU-0094982-AH.01.14 Tahun 2025)" },
    { value: "Alamat zonasi komersial gedung perkantoran resmi dan dapat digunakan untuk pendaftaran PKP" },
    { value: "Free pemakaian Meeting Room eksklusif hingga 70 jam/tahun" },
  ],
  stats: [
    { value: "13.000+", label: "Bisnis Terlayani" },
    { value: "5 Menit", label: "Respon WhatsApp" },
    { value: "4.9 ★", label: "Rating Google" },
    { value: "100%", label: "Legal & Resmi" },
  ],
};

await jsonRequest("/api/globals/about-page", {
  method: "POST",
  headers: auth,
  body: JSON.stringify(aboutPagePayload),
});
console.log("  ✓ About Page global updated");

console.log("\n=======================================================");
console.log("🎉 ALL CMS COLLECTIONS & GLOBALS SYNCHRONIZED 100%!");
console.log("=======================================================");
