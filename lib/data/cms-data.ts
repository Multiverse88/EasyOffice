import type { ComparisonRow, ComparisonStatus, Faq, Facility, Location, Office, Promotion, Service, ServiceLocation, Testimonial } from "@/types";
import { routedWhatsappNumber } from "@/lib/whatsapp";
import { cache } from "react";
import crypto from "node:crypto";
import { normalizeMediaUrl } from "@/lib/media";
import {
  allFacilities,
  comparisonRows,
  coworkingFaqs,
  generalFaqs,
  locations as mockLocations,
  meetingRoomFaqs,
  promotions as mockPromotions,
  services as mockServices,
  serviceLocations as mockServiceLocations,
  virtualOfficeFaqs,
} from "./mock-data";
import { googleReviews } from "./google-reviews";
import { clientLogos } from "./client-logos";

import { blogPosts, type BlogPost } from "./blog-data";
type PayloadList<T> = { docs?: T[] };

const apiBase = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";
const cmsCache = { next: { revalidate: 60 } } as const;
function mediaUrl(value: unknown): string | undefined {
  if (typeof value === "string") return normalizeMediaUrl(value);
  if (value && typeof value === "object" && typeof (value as { url?: unknown }).url === "string") return normalizeMediaUrl((value as { url: string }).url);
  return undefined;
}
const serviceImages: Record<string, string> = {
  "virtual-office": "/images/easyoffice/kantor-bandung.jpg",
  "coworking-space": "/images/offices/jakarta/sovereign-meeting-room.png",
  "meeting-room": "/images/offices/jakarta/sovereign-boardroom-wide.png",
};

export type HomepageLayoutData = { content?: Array<{ type?: string; props?: Record<string, unknown> }>; root?: Record<string, unknown> };
export type PublishedPuckPage = { id?: string | number; name?: string; route?: string; seoTitle?: string; seoDescription?: string; layout?: HomepageLayoutData };

function normalizeLayout(value: unknown): unknown {
  if (typeof value === "string") return normalizeMediaUrl(value);
  if (Array.isArray(value)) return value.map(normalizeLayout);
  if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalizeLayout(item)]));
  return value;
}

async function payloadList<T>(collection: string): Promise<T[]> {
  try {
    const response = await fetch(`${apiBase}/api/${collection}?limit=100&where[isActive][equals]=true`, {
      headers: { Accept: "application/json" },
      ...cmsCache,
    });
    if (!response.ok) return [];
    const data = (await response.json()) as PayloadList<T>;
    if (!Array.isArray(data.docs)) return [];
    return data.docs;
  } catch {
    return [];
  }
}

export const getCmsServices = cache(async function getCmsServices(): Promise<Service[]> {
  const docs = await payloadList<Partial<Service>>("services");
  if (!docs.length) return mockServices;
  const preferredOrder = ["virtual-office", "coworking-space", "meeting-room", "private-office"];
  return docs.map((doc) => {
    const mock = mockServices.find((s) => s.slug === doc.slug);
    const manfaatTitles = Array.isArray(doc.manfaatItems)
      ? doc.manfaatItems.map((item: { title?: string }) => item.title ?? "").filter(Boolean)
      : [];
    const keunggulanTitles = Array.isArray(doc.keunggulanItems)
      ? doc.keunggulanItems.map((item: { title?: string }) => item.title ?? "").filter(Boolean)
      : [];
    const features = doc.features && doc.features.length
      ? doc.features
      : (manfaatTitles.length ? manfaatTitles : (keunggulanTitles.length ? keunggulanTitles : (mock?.features ?? [])));
    return {
      ...doc,
      slug: doc.slug ?? mock?.slug ?? "",
      title: doc.title ?? mock?.title ?? "",
      shortTitle: doc.shortTitle ?? doc.title ?? mock?.shortTitle ?? "",
      description: doc.description ?? mock?.description ?? "",
      intro: doc.intro ?? mock?.intro ?? "",
      benefits: manfaatTitles.length ? manfaatTitles : (mock?.benefits ?? []),
      benefitsTitle: doc.manfaatTitle ?? mock?.benefitsTitle ?? "",
      benefitsDescription: doc.manfaatDescription ?? mock?.benefitsDescription ?? "",
      keunggulanItems: Array.isArray(doc.keunggulanItems) && doc.keunggulanItems.length
        ? doc.keunggulanItems.map((item: { icon?: string; title?: string; description?: string; image?: unknown }) => ({
            icon: item.icon ?? "sparkles",
            title: item.title ?? "",
            description: item.description ?? "",
            image: mediaUrl(item.image) ?? (mock?.keunggulanItems?.find((m) => m.title.toLowerCase() === (item.title ?? "").toLowerCase())?.image),
          }))
        : (mock?.keunggulanItems ?? []),
      manfaatItems: Array.isArray(doc.manfaatItems) && doc.manfaatItems.length
        ? doc.manfaatItems.map((item: { icon?: string; title?: string; description?: string }) => ({ icon: item.icon ?? "sparkles", title: item.title ?? "", description: item.description ?? "" }))
        : (mock?.manfaatItems ?? []),
      features,
      icon: doc.icon ?? mock?.icon ?? "briefcase",
      href: `/layanan/${doc.slug ?? ""}`,
      image: mediaUrl(doc.image) ?? serviceImages[doc.slug ?? ""] ?? mock?.image ?? "/images/unsplash/office-01.webp",
      imageAlt: doc.imageAlt ?? doc.title ?? mock?.imageAlt ?? "",
      seo: doc.seo ? { ...(doc.seo as Record<string, unknown>), ogImage: mediaUrl((doc.seo as Record<string, unknown>).ogImage) } : undefined,
    };
  }).sort((a, b) => {
    const aPreferred = preferredOrder.indexOf(a.slug);
    const bPreferred = preferredOrder.indexOf(b.slug);
    if (aPreferred !== -1 || bPreferred !== -1) return (aPreferred === -1 ? 1000 : aPreferred) - (bPreferred === -1 ? 1000 : bPreferred);
    return ((a as Service & { sortOrder?: number }).sortOrder ?? 9999) - ((b as Service & { sortOrder?: number }).sortOrder ?? 9999);
  });
});

export const getCmsLocations = cache(async function getCmsLocations(): Promise<Location[]> {
  try {
    const response = await fetch(`${apiBase}/api/kantor?limit=100&where[aktif][equals]=true`, { headers: { Accept: "application/json" }, ...cmsCache });
    if (!response.ok) return mockLocations;
    const data = (await response.json()) as PayloadList<Record<string, unknown>>;
    const docs = data.docs ?? [];
    if (!docs.length) return mockLocations;
    return docs.map((doc) => ({
      slug: String(doc.slug ?? "").replace(/^easyoffice-/, ""),
      name: String(doc.kota ?? doc.nama ?? ""),
      card: { title: String(doc.nama ?? ""), description: String(doc.deskripsi ?? ""), image: mediaUrl(doc.foto), imageAlt: String(doc.altFoto ?? doc.nama ?? "") },
      address: String(doc.alamat ?? ""), operatingHours: String(doc.jamOperasional ?? ""), email: String(doc.email ?? ""), phoneDisplay: String(doc.telepon ?? ""), whatsappNumbers: Array.isArray(doc.whatsappNumbers) ? doc.whatsappNumbers as Office["whatsappNumbers"] : undefined, mapsUrl: String(doc.linkGoogleMaps ?? ""), latitude: typeof doc.latitude === "number" ? doc.latitude : undefined, longitude: typeof doc.longitude === "number" ? doc.longitude : undefined,
    }));
  } catch {
    return mockLocations;
  }
});

export const getCmsPromotions = cache(async function getCmsPromotions(): Promise<Promotion[]> {
  const docs = await payloadList<Partial<Promotion> & { service?: unknown }>("promotions");
  if (!docs.length) return mockPromotions;
  return docs.map((doc) => {
    const service = doc.service && typeof doc.service === "object" ? doc.service as Record<string, unknown> : undefined;
    const title = String(doc.title ?? "");
    const inferredService = service?.slug ? String(service.slug) : /coworking/i.test(title) ? "coworking-space" : /meeting room/i.test(title) ? "meeting-room" : /virtual office/i.test(title) ? "virtual-office" : undefined;
    const badge = String(doc.badge ?? "promo").toLowerCase();
    return { badge: badge === "trial" || badge === "diskon" ? badge : "promo", title, description: doc.description ?? "", period: doc.period ?? "", image: mediaUrl(doc.image), serviceSlug: inferredService };
  });
});

export const getCmsTestimonials = cache(async function getCmsTestimonials(): Promise<Testimonial[]> {
  const docs = await payloadList<Partial<Testimonial>>("testimonials");
  if (!docs.length) return googleReviews;
  return docs.map((doc) => ({ id: doc.id, name: doc.name ?? "", company: doc.company ?? "", quote: doc.quote ?? "" }));
});

export type CmsPartner = { id?: string | number; name: string; logoUrl?: string; logoAlt?: string; href?: string; sortOrder?: number };

const defaultPartners: CmsPartner[] = clientLogos;

export const getCmsPartners = cache(async function getCmsPartners(): Promise<CmsPartner[]> {
  try {
    const response = await fetch(`${apiBase}/api/partners?limit=100&where[isActive][equals]=true`, {
      headers: { Accept: "application/json" },
      ...cmsCache,
    }).catch(() => null);
    if (!response?.ok) return defaultPartners;
    const result = await response.json() as PayloadList<{
      id?: string | number;
      name?: string;
      logo?: unknown;
      logoAlt?: string;
      href?: string;
      sortOrder?: number;
    }>;
    const docs = result.docs ?? [];
    if (!docs.length) return defaultPartners;
    const valid = docs
      .filter((doc) => doc.name && mediaUrl(doc.logo))
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
      .map((doc) => ({
        id: doc.id,
        name: doc.name!,
        logoUrl: mediaUrl(doc.logo),
        logoAlt: doc.logoAlt || doc.name,
        href: doc.href || undefined,
        sortOrder: doc.sortOrder ?? 0,
      }));
    return valid.length ? valid : defaultPartners;
  } catch {
    return defaultPartners;
  }
});

export const getCmsServiceLocations = cache(async function getCmsServiceLocations(): Promise<ServiceLocation[]> {
  try {
    const response = await fetch(`${apiBase}/api/layanan-kantor?limit=100&depth=2&where[aktif][equals]=true`, { headers: { Accept: "application/json" }, ...cmsCache });
    if (!response.ok) return mockServiceLocations;
    const data = (await response.json()) as PayloadList<Record<string, unknown>>;
    const docs = data.docs ?? [];
    if (!docs.length) return mockServiceLocations;
    return docs.map((doc) => {
      const service = doc.layanan && typeof doc.layanan === "object" ? doc.layanan as Record<string, unknown> : {};
      const office = doc.kantor && typeof doc.kantor === "object" ? doc.kantor as Record<string, unknown> : {};
      const serviceSlug = String(service.slug ?? "");
      const locationSlug = String(office.slug ?? "").replace(/^easyoffice-/, "") || String(office.kota ?? "").toLowerCase();
      const mockCombo = mockServiceLocations.find((c) => c.serviceSlug === serviceSlug && c.locationSlug === locationSlug);
      const packages = Array.isArray(doc.paketHarga) && doc.paketHarga.length ? doc.paketHarga.map((plan: Record<string, unknown>) => ({
        name: String(plan.name ?? ""),
        description: typeof plan.description === "string" ? plan.description : undefined,
        price: typeof plan.price === "number" ? `Rp ${new Intl.NumberFormat("id-ID").format(plan.price)}` : (String(plan.price ?? "").startsWith("Rp") ? String(plan.price) : `Rp ${String(plan.price ?? "")}`),
        period: String(plan.unit ?? "/bulan"),
        features: Array.isArray(plan.benefits) ? plan.benefits.map((benefit: string | { value?: string }) => typeof benefit === "string" ? benefit : String(benefit.value ?? "")) : [],
        discountPercent: typeof (plan.discount as Record<string, unknown> | undefined)?.percentage === "number" ? (plan.discount as Record<string, number>).percentage : undefined,
        discountedPrice: mockCombo?.pricing.find((mp) => mp.name === String(plan.name ?? ""))?.discountedPrice,
        ctaLabel: "Hubungi via WhatsApp",
      })) : (mockCombo?.pricing ?? []);
      const numbers = Array.isArray(office.whatsappNumbers) ? office.whatsappNumbers as Office["whatsappNumbers"] : mockCombo?.whatsappNumbers;
      const offices = [{ slug: locationSlug, name: String(office.nama ?? office.kota ?? mockCombo?.offices?.[0]?.name ?? ""), description: String(office.deskripsi ?? mockCombo?.offices?.[0]?.description ?? ""), address: String(office.alamat ?? mockCombo?.offices?.[0]?.address ?? ""), operatingHours: String(office.jamOperasional ?? mockCombo?.offices?.[0]?.operatingHours ?? ""), email: String(office.email ?? mockCombo?.offices?.[0]?.email ?? ""), phoneDisplay: String(office.telepon ?? mockCombo?.offices?.[0]?.phoneDisplay ?? ""), whatsappNumbers: numbers, mapsUrl: String(office.linkGoogleMaps ?? mockCombo?.offices?.[0]?.mapsUrl ?? ""), latitude: typeof office.latitude === "number" ? office.latitude : mockCombo?.offices?.[0]?.latitude, longitude: typeof office.longitude === "number" ? office.longitude : mockCombo?.offices?.[0]?.longitude }] as Office[];
      const gallery = Array.isArray(doc.galeri) && doc.galeri.length ? doc.galeri.map((item: { src?: unknown; alt?: string }) => ({ src: mediaUrl(item.src) ?? "", alt: String(item.alt ?? "") })).filter((item) => item.src) : (mockCombo?.gallery ?? []);
      const facilities = Array.isArray(doc.fasilitas) && doc.fasilitas.length ? doc.fasilitas.map((item: { icon?: string; title?: string; description?: string; image?: unknown; imageAlt?: string }) => ({ icon: String(item.icon ?? "sparkles"), title: String(item.title ?? ""), description: String(item.description ?? ""), image: mediaUrl(item.image), imageAlt: item.imageAlt ?? item.title })) : (mockCombo?.facilities ?? []);
      return { serviceSlug, locationSlug, tagline: String(doc.tagline ?? mockCombo?.tagline ?? ""), headline: mockCombo?.headline, headlineSub: mockCombo?.headlineSub, startingPrice: String(doc.hargaMulai ?? mockCombo?.startingPrice ?? ""), pricing: packages as ServiceLocation["pricing"], image: mediaUrl(doc.foto) ?? mockCombo?.image ?? "", imageAlt: String(doc.altFoto ?? doc.namaTampilan ?? mockCombo?.imageAlt ?? ""), gallery, facilities, whatsappNumbers: numbers, mapsUrl: String(office.linkGoogleMaps ?? mockCombo?.mapsUrl ?? ""), latitude: typeof office.latitude === "number" ? office.latitude : mockCombo?.latitude, longitude: typeof office.longitude === "number" ? office.longitude : mockCombo?.longitude, offices, catatanLegalitas: String(doc.catatanLegalitas ?? mockCombo?.catatanLegalitas ?? ""), seo: doc.seo ? { ...(doc.seo as Record<string, unknown>), ogImage: mediaUrl((doc.seo as Record<string, unknown>).ogImage) } : undefined };
    });
  } catch {
    return mockServiceLocations;
  }
});

export type CmsSiteData = {
  siteName: string;
  headerCtaLabel: string;
  headerCtaMessage: string;
  homepageHeroEyebrow: string;
  homepageHeroTitle: string;
  homepageHeroDescription: string;
  homepageHeroImage: string;
  homepageHeroImageLabel: string;
  homepageHeroPrimaryCtaLabel: string;
  homepageHeroPrimaryCtaMessage: string;
  homepageHeroSecondaryCtaLabel: string;
  homepageHeroSecondaryCtaHref: string;
  homepageHeroTrustItems?: Array<{ text?: string; sortOrder?: number }>;
  homepageServicesTitle: string;
  homepageServicesDescription: string;
  homepageFacilitiesTitle: string;
  homepageFacilitiesDescription: string;
  homepageComparisonTitle: string;
  homepageComparisonDescription: string;
  homepagePromoTitle: string;
  homepagePromoDescription: string;
  homepageShopeeTitle: string;
  homepageShopeeDescription: string;
  homepageShopeeImage?: string;
  homepageShopeeImageAlt?: string;
  homepageCtaTitle: string;
  homepageCtaDescription: string;
  homepageCtaButtonLabel: string;
  homepageCtaSecondaryButtonLabel: string;
  footerDescription: string;
  footerServicesTitle?: string;
  footerCompanyTitle?: string;
  footerContactTitle?: string;
  copyrightText: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  primaryWhatsapp: string;
  whatsappNumbers?: Office["whatsappNumbers"];
  whatsappNumber?: string;
  navigation?: Array<{ label: string; href?: string; children?: Array<{ label: string; href: string; description?: string }> }>;
  howItWorks?: Array<{ title: string; description: string }>;
  gtmContainerId?: string;
  logoUrl?: string;
  statsBanner: Array<{ value: string; label: string; icon?: string }>;
  socialLinks: unknown[];
};

export const getCmsSite = cache(async function getCmsSite(): Promise<CmsSiteData> {
  const data: Record<string, unknown> = {};
  try {
    const response = await fetch(`${apiBase}/api/globals/site-settings?depth=1`, cmsCache);
    if (response.ok) {
      const json = await response.json();
      if (json && typeof json === "object") Object.assign(data, json);
    }
  } catch {
    // Safe fallback to siteDefaults
  }
  // whose stored fields are null. These are content defaults, not guessed data.
  const siteDefaults = {
    siteName: "EasyOffice",
    headerCtaLabel: "Hubungi Kami",
    homepageHeroEyebrow: "EasyOffice",
    homepageHeroTitle: "Miliki Alamat Kantor Premium di Kota Besar Indonesia",
    homepageHeroDescription: "Virtual Office (VO) sudah disetujui pemerintah dan dapat digunakan untuk keperluan legal, seperti pendirian PT, CV, dan pendaftaran PKP. VO memudahkan Anda mengurus dokumen bisnis secara praktis dan efisien.",
    homepageHeroImage: "/images/easyoffice/office-hero.jpg",
    homepageHeroImageLabel: "Virtual Office • Coworking Space • Meeting Room • Private Office",
    homepageHeroPrimaryCtaLabel: "Hubungi Kami",
    homepageHeroPrimaryCtaMessage: "Halo EasyOffice, saya ingin bertanya tentang layanan Anda.",
    homepageHeroSecondaryCtaLabel: "Lihat Layanan",
    homepageHeroSecondaryCtaHref: "/layanan/virtual-office",
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
    homepageCtaTitle: "Siap Menemukan Ruang Kerja yang Tepat?",
    homepageCtaDescription: "Hubungi EasyOffice melalui WhatsApp — tim kami siap membantu memilih layanan dan lokasi yang sesuai dengan kebutuhan bisnis Anda.",
    homepageCtaButtonLabel: "Hubungi via WhatsApp",
    homepageCtaSecondaryButtonLabel: "Lihat Info Kontak",
    footerDescription: "EasyOffice adalah penyedia layanan kantor virtual di Bandung, Jakarta, dan Bekasi yang menawarkan alamat bisnis prestisius, ruang meeting eksklusif, layanan pengelolaan surat, dan resepsionis profesional. Member of EASY CORP.",
    copyrightText: `© ${new Date().getFullYear()} EasyOffice. Member of EASY CORP.`,
    defaultSeoTitle: "EasyOffice: Virtual Office Bisa PKP Murah dan Profesional",
    defaultSeoDescription: "Cari virtual office murah untuk bisnis Anda? EasyOffice menyediakan layanan sewa kantor virtual, Bisa PKP di Bandung, Jakarta, dan Bekasi. Konsultasi Gratis!",
    email: "id.easyoffice@gmail.com",
    phone: "0818 881 425",
    primaryWhatsapp: "62818881425",
    headerCtaMessage: "Halo EasyOffice, saya ingin bertanya tentang layanan Anda.",
    homepageShopeeImageAlt: "Transaksi aman via marketplace Shopee",
    navigation: undefined as CmsSiteData["navigation"],
    gtmContainerId: undefined as string | undefined,
    howItWorks: undefined as CmsSiteData["howItWorks"],
    homepageHeroTrustItems: [
      { text: "Bisa PKP", sortOrder: 1 },
      { text: "Alamat Domisili Gedung Komersial", sortOrder: 2 },
      { text: "Free Meeting Room hingga 70 Jam/Tahun", sortOrder: 3 },
      { text: "Proses Cepat & Tanpa Ribet", sortOrder: 4 },
      { text: "Legalitas Lengkap (IMB & PBB)", sortOrder: 5 },
    ],
  };
  for (const [key, fallback] of Object.entries(siteDefaults)) {
    if (data[key] == null || data[key] === "") data[key] = fallback;
  }
  // Retired from Site Settings; old deployments / globals can still return it.
  delete data.homepageHeroImageAlt;
  const whatsappNumbers = Array.isArray(data.whatsappNumbers) ? data.whatsappNumbers : [];
  const primaryWhatsapp = String(data.primaryWhatsapp ?? data.phone ?? "");
  const defaultStats = [
    { value: "13.000+", label: "Bisnis Terlayani", icon: "users" },
    { value: "5 Menit", label: "Respon WhatsApp", icon: "check" },
    { value: "4.9 ★", label: "Rating Google (700+)", icon: "star" },
    { value: "100%", label: "Legal & Resmi", icon: "shield" },
  ];
  const statsBanner = Array.isArray(data.statsBanner) && data.statsBanner.length ? data.statsBanner : defaultStats;
  return { ...siteDefaults, ...data, phoneDisplay: String(data.phone ?? data.phoneDisplay ?? "0818 881 425"), logoUrl: mediaUrl(data.logo), homepageHeroImage: mediaUrl(data.homepageHeroImage) || "/images/easyoffice/office-hero.jpg", homepageShopeeImage: mediaUrl(data.homepageShopeeImage), statsBanner, socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [], primaryWhatsapp, whatsappNumbers, whatsappNumber: routedWhatsappNumber(whatsappNumbers, primaryWhatsapp) } as CmsSiteData;
});

export const getCmsAbout = cache(async function getCmsAbout() {
  try {
    const response = await fetch(`${apiBase}/api/globals/about-page?depth=1`, cmsCache);
    if (!response.ok) throw new Error();
    const data = await response.json();
    return {
      ...data,
      heroTitle: data.heroTitle || "Buat Bisnismu Terlihat Profesional & Terpercaya",
      heroDescription: data.heroDescription || "EasyOffice hadir sebagai solusi virtual office dengan layanan profesional, terpercaya, dan harga terjangkau di Bandung, Jakarta, dan Bekasi.",
      storyTitle: data.storyTitle || "Tentang EasyOffice",
      storyDescription: data.storyDescription || "EasyOffice adalah penyedia layanan virtual office di Bekasi, Jakarta, dan Bandung yang menyediakan alamat bisnis profesional, ruang meeting, layanan resepsionis, serta pengelolaan surat untuk mendukung pertumbuhan bisnis dengan biaya yang lebih hemat dan terjangkau.",
      heroImage: mediaUrl(data.heroImage) || "/images/easyoffice/office-hero.jpg",
      storyImage: mediaUrl(data.storyImage) || "/images/easyoffice/kantor-bandung.jpg",
      heroHighlights: Array.isArray(data.heroHighlights) ? data.heroHighlights.map((item: { value?: string }) => item.value ?? "") : [],
      storyHighlights: Array.isArray(data.storyHighlights) && data.storyHighlights.length ? data.storyHighlights.map((item: { value?: string }) => item.value ?? "") : [
        "Terdaftar resmi di Kemenkumham RI: CV EASYOFFICE KANTOR BERSAMA (AHU-0094982-AH.01.14 Tahun 2025)",
        "Alamat zonasi komersial gedung perkantoran resmi dan dapat digunakan untuk pendaftaran PKP",
        "Free pemakaian Meeting Room eksklusif hingga 70 jam/tahun",
      ],
      stats: Array.isArray(data.stats) && data.stats.length ? data.stats.map((item: { value?: string; label?: string }) => ({ value: item.value ?? "", label: item.label ?? "" })) : [
        { value: "13.000+", label: "Bisnis Terlayani" },
        { value: "5 Menit", label: "Respon WhatsApp" },
        { value: "4.9 ★", label: "Rating Google" },
        { value: "100%", label: "Legal & Resmi" },
      ],
      values: Array.isArray(data.values) && data.values.length ? data.values.map((item: { icon?: string; title?: string; description?: string }) => ({ icon: item.icon ?? "award", title: item.title ?? "", description: item.description ?? "" })) : [],
    };
  } catch {
    return {
      heroTitle: "Buat Bisnismu Terlihat Profesional & Terpercaya",
      heroDescription: "EasyOffice hadir sebagai solusi virtual office dengan layanan profesional, terpercaya, dan harga terjangkau di Bandung, Jakarta, dan Bekasi.",
      storyTitle: "Tentang EasyOffice",
      storyDescription: "EasyOffice adalah penyedia layanan virtual office di Bekasi, Jakarta, dan Bandung yang menyediakan alamat bisnis profesional, ruang meeting, layanan resepsionis, serta pengelolaan surat untuk mendukung pertumbuhan bisnis dengan biaya yang lebih hemat dan terjangkau.",
      heroImage: "/images/easyoffice/office-hero.jpg",
      storyImage: "/images/easyoffice/kantor-bandung.jpg",
      heroHighlights: [],
      storyHighlights: [
        "Terdaftar resmi di Kemenkumham RI: CV EASYOFFICE KANTOR BERSAMA (AHU-0094982-AH.01.14 Tahun 2025)",
        "Alamat zonasi komersial gedung perkantoran resmi dan dapat digunakan untuk pendaftaran PKP",
        "Free pemakaian Meeting Room eksklusif hingga 70 jam/tahun",
      ],
      stats: [
        { value: "13.000+", label: "Bisnis Terlayani" },
        { value: "5 Menit", label: "Respon WhatsApp" },
        { value: "4.9 ★", label: "Rating Google" },
        { value: "100%", label: "Legal & Resmi" },
      ],
      values: [],
    };
  }
});

export const getCmsFaqs = cache(async function getCmsFaqs(serviceSlug?: string) {
  const fallbackFaqs = serviceSlug === "virtual-office"
    ? virtualOfficeFaqs
    : serviceSlug === "coworking-space"
      ? coworkingFaqs
      : serviceSlug === "meeting-room"
        ? meetingRoomFaqs
        : generalFaqs;
  const docs = await payloadList<Partial<Faq> & { placement?: string; service?: unknown; items?: Array<{ question?: string; answer?: string; sortOrder?: number }> }>("faqs");
  if (!docs.length) return fallbackFaqs;
  const filtered = docs.filter((doc) => {
    const service = doc.service && typeof doc.service === "object" ? doc.service as Record<string, unknown> : undefined;
    return serviceSlug ? doc.placement === "service" && !!service && service.slug === serviceSlug : doc.placement === "global";
  }).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).flatMap((doc) => Array.isArray(doc.items) ? [...doc.items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).map((item) => ({ question: item.question ?? "", answer: item.answer ?? "" })) : []);
  return filtered.length ? filtered : fallbackFaqs;
});

export const getCmsHomepageFacilities = cache(async function getCmsHomepageFacilities(): Promise<Facility[]> {
  const docs = await payloadList<Partial<Facility>>("homepage-facilities");
  if (!docs.length) return allFacilities.slice(0, 6);
  return [...docs]
    .sort((a, b) => ((a as Partial<Facility> & { sortOrder?: number }).sortOrder ?? 0) - ((b as Partial<Facility> & { sortOrder?: number }).sortOrder ?? 0))
    .map((doc) => ({ icon: doc.icon ?? "sparkles", title: doc.title ?? "", description: doc.description ?? "" }));
});

export const getCmsComparisonRows = cache(async function getCmsComparisonRows(serviceSlug?: string): Promise<ComparisonRow[]> {
  const docs = await payloadList<Partial<ComparisonRow> & { placement?: string; sortOrder?: number; service?: unknown; items?: Array<{ feature?: string; easyoffice?: string | boolean; typical?: string | boolean; sortOrder?: number }> }>("comparison-rows");
  if (!docs.length) return comparisonRows;
  const seen = new Set<string>();
  const rows = docs
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .filter((doc) => { const service = doc.service && typeof doc.service === "object" ? doc.service as Record<string, unknown> : undefined; return serviceSlug ? doc.placement === "service" && !!service && service.slug === serviceSlug : doc.placement === "global"; })
    .flatMap((doc) => Array.isArray(doc.items) && doc.items.length ? [...doc.items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)).map((item) => ({ feature: item.feature ?? "", easyoffice: normalizeComparisonStatus(item.easyoffice), typical: normalizeComparisonStatus(item.typical), serviceSlug })) : [{ feature: doc.feature ?? "", easyoffice: normalizeComparisonStatus(doc.easyoffice), typical: normalizeComparisonStatus(doc.typical), serviceSlug }])
    .filter((row) => { if (seen.has(row.feature)) return false; seen.add(row.feature); return true; });
  return rows.length ? rows : comparisonRows;
});

function normalizeComparisonStatus(value: string | boolean | undefined): ComparisonStatus {
  if (value === true || value === "true") return "true";
  if (value === false || value === "false") return "false";
  return "neutral";
}

export async function getCmsHomepageLayout(): Promise<HomepageLayoutData | null> {
  const response = await fetch(`${apiBase}/api/page-layout?limit=1&where[isActive][equals]=true&where[status][equals]=published`, cmsCache);
  if (!response.ok) return null;
  const data = (await response.json()) as { docs?: Array<{ layout?: HomepageLayoutData }> };
  const docs = data.docs;
  return (normalizeLayout(docs?.[0]?.layout) as HomepageLayoutData | undefined) ?? null;
}

export async function getCmsHomepageLayoutById(id: string): Promise<HomepageLayoutData | null> {
  const response = await fetch(`${apiBase}/api/page-layout/${encodeURIComponent(id)}`, cmsCache);
  if (!response.ok) return null;
  const data = (await response.json()) as { layout?: HomepageLayoutData };
  return (normalizeLayout(data.layout) as HomepageLayoutData | undefined) ?? null;
}

export async function getCmsPublishedPuckPage(route: string, previewToken?: string): Promise<PublishedPuckPage | null> {
  const normalizedRoute = route.startsWith("/") ? route : `/${route}`;
  const tokenParts = previewToken?.split(".");
  const tokenPayload = tokenParts?.length === 3 ? `${tokenParts[0]}.${tokenParts[1]}` : "";
  const expected = tokenPayload ? crypto.createHmac("sha256", process.env.PAYLOAD_SECRET ?? "preview").update(tokenPayload).digest("hex") : "";
  const validPreview = Boolean(tokenParts?.length === 3 && Number(tokenParts[1]) > Math.floor(Date.now() / 1000) && expected && tokenParts[2] && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(tokenParts[2])));
  if (validPreview) {
    const draftResponse = await fetch(`${apiBase}/api/page-layout/${encodeURIComponent(tokenParts![0])}`, { cache: "no-store" });
    if (!draftResponse.ok) return null;
    const draft = await draftResponse.json() as PublishedPuckPage;
    return draft.route === normalizedRoute ? { ...draft, layout: normalizeLayout(draft.layout) as HomepageLayoutData } : null;
  }
  const where = encodeURIComponent(JSON.stringify({ and: [{ route: { equals: normalizedRoute } }, ...(validPreview ? [] : [{ status: { equals: "published" } }, { isActive: { equals: true } }])] }));
  const response = await fetch(`${apiBase}/api/page-layout?limit=1&where=${where}`, cmsCache);
  if (!response.ok) return null;
  const data = (await response.json()) as { docs?: PublishedPuckPage[] };
  const page = data.docs?.[0];
  return page ? { ...page, layout: normalizeLayout(page.layout) as HomepageLayoutData } : null;
}

export type CmsArticle = BlogPost;

function lexicalToHtml(blok: unknown): string {
  if (!blok || typeof blok !== "object") return "";
  const root = (blok as { root?: { children?: unknown[] } }).root;
  if (!root || !Array.isArray(root.children)) return "";

  return root.children
    .map((node: unknown) => {
      if (!node || typeof node !== "object") return "";
      const n = node as { type?: string; tag?: string; children?: unknown[] };
      const textContent = Array.isArray(n.children)
        ? n.children
            .map((c) => (c && typeof c === "object" && "text" in c ? String((c as { text: unknown }).text ?? "") : ""))
            .join("")
        : "";
      if (n.type === "heading") {
        const tag = n.tag || "h2";
        return `<${tag}>${textContent}</${tag}>`;
      }
      if (n.type === "list") {
        const tag = n.tag || "ul";
        const items = Array.isArray(n.children)
          ? n.children
              .map((item) => {
                const subChildren = (item as { children?: unknown[] })?.children;
                const itemText = Array.isArray(subChildren)
                  ? subChildren.map((c) => (c && typeof c === "object" && "text" in c ? String((c as { text: unknown }).text ?? "") : "")).join("")
                  : "";
                return `<li>${itemText}</li>`;
              })
              .join("")
          : "";
        return `<${tag}>${items}</${tag}>`;
      }
      return `<p>${textContent}</p>`;
    })
    .join("\n");
}
export const getCmsArticles = cache(async function getCmsArticles(): Promise<CmsArticle[]> {
  try {
    const response = await fetch(`${apiBase}/api/artikel?limit=100&sort=-tanggalTerbit`, {
      headers: { Accept: "application/json" },
      ...cmsCache,
    });
    if (!response.ok) return blogPosts;
    const data = await response.json();
    const docs = data.docs ?? [];
    if (!docs.length) return blogPosts;
    return docs.map((doc: Record<string, unknown>) => ({
      id: Number(doc.id) || 1,
      title: String(doc.judul ?? ""),
      slug: String(doc.slug ?? ""),
      date: String(doc.tanggalTerbit ?? doc.createdAt ?? new Date().toISOString()),
      excerpt: String(doc.ringkasan ?? ""),
      image: mediaUrl(doc.sampul) || String(doc.sampulUrl ?? "/images/easyoffice/office-hero.jpg"),
      contentHtml: lexicalToHtml(doc.blok) || String(doc.konten ?? ""),
      category: String((doc.kategori as Record<string, unknown>)?.nama ?? doc.kategoriTeks ?? "Virtual Office"),
      author: String(doc.penulis ?? "EasyOffice Team"),
    }));
  } catch {
    return blogPosts;
  }
});

export const getCmsArticleBySlug = cache(async function getCmsArticleBySlug(slug: string): Promise<CmsArticle | undefined> {
  try {
    const response = await fetch(`${apiBase}/api/artikel?where[slug][equals]=${encodeURIComponent(slug)}&limit=1`, {
      headers: { Accept: "application/json" },
      ...cmsCache,
    });
    if (response.ok) {
      const data = await response.json();
      const doc = data.docs?.[0];
      if (doc) {
        return {
          id: Number(doc.id) || 1,
          title: String(doc.judul ?? ""),
          slug: String(doc.slug ?? ""),
          date: String(doc.tanggalTerbit ?? doc.createdAt ?? new Date().toISOString()),
          excerpt: String(doc.ringkasan ?? ""),
          image: mediaUrl(doc.sampul) || String(doc.sampulUrl ?? "/images/easyoffice/office-hero.jpg"),
          contentHtml: lexicalToHtml(doc.blok) || String(doc.konten ?? ""),
          category: String((doc.kategori as Record<string, unknown>)?.nama ?? doc.kategoriTeks ?? "Virtual Office"),
          author: String(doc.penulis ?? "EasyOffice Team"),
        };
      }
    }
  } catch {
    // fallback
  }
  return blogPosts.find((p) => p.slug === slug);
});
