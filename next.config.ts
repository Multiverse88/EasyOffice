import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const supabaseHost = new URL(process.env.SUPABASE_URL ?? "https://qbfgapkitvhlylyrbivs.supabase.co").hostname;
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/media/**" },
    ],
  },
  async redirects() {
    return [
      // Short vanity URLs (e.g. /virtualofficebandung -> /layanan/virtual-office/bandung)
      // WhatsApp Rotator Direct URLs
      {
        source: "/wa",
        destination: "/api/wa",
        permanent: false,
      },
      {
        source: "/whatsapp",
        destination: "/api/wa",
        permanent: false,
      },
      {
        source: "/rotator",
        destination: "/api/wa",
        permanent: false,
      },
      // Private Office Bekasi Landing Page Redirects
      {
        source: "/private-office-bekasi",
        destination: "/privat-office-bekasi",
        permanent: true,
      },
      {
        source: "/privateofficebekasi",
        destination: "/privat-office-bekasi",
        permanent: true,
      },
      {
        source: "/privatofficebekasi",
        destination: "/privat-office-bekasi",
        permanent: true,
      },
      {
        source: "/virtualofficebandung",
        destination: "/layanan/virtual-office/bandung",
        permanent: true,
      },
      {
        source: "/virtualofficejakarta",
        destination: "/layanan/virtual-office/jakarta",
        permanent: true,
      },
      {
        source: "/virtualofficebekasi",
        destination: "/layanan/virtual-office/bekasi",
        permanent: true,
      },
      {
        source: "/virtualoffice",
        destination: "/layanan/virtual-office",
        permanent: true,
      },
      {
        source: "/virtual-office-bandung",
        destination: "/layanan/virtual-office/bandung",
        permanent: true,
      },
      {
        source: "/virtual-office-jakarta",
        destination: "/layanan/virtual-office/jakarta",
        permanent: true,
      },
      {
        source: "/virtual-office-bekasi",
        destination: "/layanan/virtual-office/bekasi",
        permanent: true,
      },

      // Coworking vanity URLs
      {
        source: "/coworkingspacebandung",
        destination: "/layanan/coworking-space/bandung",
        permanent: true,
      },
      {
        source: "/coworkingspacejakarta",
        destination: "/layanan/coworking-space/jakarta",
        permanent: true,
      },
      {
        source: "/coworkingspacebekasi",
        destination: "/layanan/coworking-space/bekasi",
        permanent: true,
      },
      {
        source: "/coworkingbandung",
        destination: "/layanan/coworking-space/bandung",
        permanent: true,
      },
      {
        source: "/coworkingjakarta",
        destination: "/layanan/coworking-space/jakarta",
        permanent: true,
      },
      {
        source: "/coworkingbekasi",
        destination: "/layanan/coworking-space/bekasi",
        permanent: true,
      },
      {
        source: "/coworkingspace",
        destination: "/layanan/coworking-space",
        permanent: true,
      },
      {
        source: "/coworking",
        destination: "/layanan/coworking-space",
        permanent: true,
      },
      {
        source: "/coworking-space-bandung",
        destination: "/layanan/coworking-space/bandung",
        permanent: true,
      },
      {
        source: "/coworking-space-jakarta",
        destination: "/layanan/coworking-space/jakarta",
        permanent: true,
      },
      {
        source: "/coworking-space-bekasi",
        destination: "/layanan/coworking-space/bekasi",
        permanent: true,
      },

      // Meeting Room vanity URLs
      {
        source: "/meetingroombandung",
        destination: "/layanan/meeting-room/bandung",
        permanent: true,
      },
      {
        source: "/meetingroomjakarta",
        destination: "/layanan/meeting-room/jakarta",
        permanent: true,
      },
      {
        source: "/meetingroombekasi",
        destination: "/layanan/meeting-room/bekasi",
        permanent: true,
      },
      {
        source: "/meetingroom",
        destination: "/layanan/meeting-room",
        permanent: true,
      },
      {
        source: "/meeting-room-bandung",
        destination: "/layanan/meeting-room/bandung",
        permanent: true,
      },
      {
        source: "/meeting-room-jakarta",
        destination: "/layanan/meeting-room/jakarta",
        permanent: true,
      },
      {
        source: "/meeting-room-bekasi",
        destination: "/layanan/meeting-room/bekasi",
        permanent: true,
      },
      // Legacy Phase 2 routes → canonical /layanan architecture.
      {
        source: "/virtual-office",
        destination: "/layanan/virtual-office",
        permanent: true,
      },
      {
        source: "/virtual-office/:slug",
        destination: "/layanan/virtual-office/:slug",
        permanent: true,
      },
      {
        source: "/coworking-space/:slug",
        destination: "/layanan/coworking-space/:slug",
        permanent: true,
      },
      {
        source: "/meeting-room/:slug",
        destination: "/layanan/meeting-room/:slug",
        permanent: true,
      },
      // Direct hyphen slug redirects (e.g. /layanan/virtual-office-bekasi -> /layanan/virtual-office/bekasi)
      {
        source: "/layanan/virtual-office-bandung",
        destination: "/layanan/virtual-office/bandung",
        permanent: true,
      },
      {
        source: "/layanan/virtual-office-bekasi",
        destination: "/layanan/virtual-office/bekasi",
        permanent: true,
      },
      {
        source: "/layanan/virtual-office-jakarta",
        destination: "/layanan/virtual-office/jakarta",
        permanent: true,
      },
      {
        source: "/layanan/coworking-space-bandung",
        destination: "/layanan/coworking-space/bandung",
        permanent: true,
      },
      {
        source: "/layanan/coworking-space-bekasi",
        destination: "/layanan/coworking-space/bekasi",
        permanent: true,
      },
      {
        source: "/layanan/coworking-space-jakarta",
        destination: "/layanan/coworking-space/jakarta",
        permanent: true,
      },
      {
        source: "/layanan/meeting-room-bandung",
        destination: "/layanan/meeting-room/bandung",
        permanent: true,
      },
      {
        source: "/layanan/meeting-room-bekasi",
        destination: "/layanan/meeting-room/bekasi",
        permanent: true,
      },
      {
        source: "/layanan/meeting-room-jakarta",
        destination: "/layanan/meeting-room/jakarta",
        permanent: true,
      },
      // Legacy office-service slugs → canonical office-service slugs.
      {
        source: "/layanan/virtual-office/easyoffice-bandung",
        destination: "/layanan/virtual-office/bandung",
        permanent: true,
      },
      {
        source: "/layanan/virtual-office/bandung-bandung",
        destination: "/layanan/virtual-office/bandung",
        permanent: true,
      },
      {
        source: "/layanan/virtual-office/bekasi-bekasi",
        destination: "/layanan/virtual-office/bekasi",
        permanent: true,
      },
      {
        source: "/layanan/virtual-office/jakarta-jakarta",
        destination: "/layanan/virtual-office/jakarta",
        permanent: true,
      },
      {
        source: "/layanan/coworking-space/bandung-bandung",
        destination: "/layanan/coworking-space/bandung",
        permanent: true,
      },
      {
        source: "/layanan/coworking-space/bekasi-bekasi",
        destination: "/layanan/coworking-space/bekasi",
        permanent: true,
      },
      {
        source: "/layanan/coworking-space/jakarta-jakarta",
        destination: "/layanan/coworking-space/jakarta",
        permanent: true,
      },
      {
        source: "/layanan/meeting-room/bandung-bandung",
        destination: "/layanan/meeting-room/bandung",
        permanent: true,
      },
      {
        source: "/layanan/meeting-room/bekasi-bekasi",
        destination: "/layanan/meeting-room/bekasi",
        permanent: true,
      },
      {
        source: "/layanan/meeting-room/jakarta-jakarta",
        destination: "/layanan/meeting-room/jakarta",
        permanent: true,
      },
      {
        source: "/cv-easyoffice-kantor-bersama",
        destination: "/verifikasi-rekening",
        permanent: true,
      },
      {
        source: "/promo-easyoffice",
        destination: "/promo",
        permanent: true,
      },
      {
        source: "/kontak-kami",
        destination: "/kontak",
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
