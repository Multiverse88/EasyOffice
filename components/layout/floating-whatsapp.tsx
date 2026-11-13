"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { whatsappRotatorUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const cleanPath = (pathname || "").replace(/\/$/, "");
  const isPrivateOfficeBekasi =
    cleanPath === "/privat-office-bekasi" || cleanPath === "/private-office-bekasi";

  const message = isPrivateOfficeBekasi
    ? "Halo EasyOffice, saya tertarik & ingin bertanya Private Office di Summarecon Bekasi"
    : "Halo EasyOffice, saya ingin bertanya tentang layanan Anda.";

  const city = isPrivateOfficeBekasi ? "Bekasi" : undefined;

  return (
    <a
      href={whatsappRotatorUrl(message, city)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi EasyOffice via WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-15 w-15 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-200 hover:scale-105 hover:bg-[#1ea655] active:scale-95"
    >
      <WhatsAppIcon className="h-8 w-8" />
    </a>
  );
}
