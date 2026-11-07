import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getCmsServices, getCmsSite } from "@/lib/data/cms-data";
import { routedWhatsappNumber } from "@/lib/whatsapp";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import "../globals.css";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const site = await getCmsSite();
  return {
    title: { default: site.defaultSeoTitle || "EasyOffice — Virtual Office, Coworking Space & Meeting Room", template: "%s | EasyOffice" },
    description: site.defaultSeoDescription || "EasyOffice menyediakan Virtual Office, Coworking Space, dan Meeting Room profesional di Bandung, Jakarta, dan Bekasi.",
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      ],
    },
  };
}
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [site, services] = await Promise.all([getCmsSite(), getCmsServices()]);
  const whatsappNumber = routedWhatsappNumber(site.whatsappNumbers, site.primaryWhatsapp);
  return (
    <div className="flex min-h-screen flex-col bg-white">
       <Header whatsappNumber={whatsappNumber} ctaLabel={site.headerCtaLabel} ctaMessage={site.headerCtaMessage} logoUrl={site.logoUrl} navItems={site.navigation} />
      <main className="flex-1"><ScrollReveal>{children}</ScrollReveal></main>
       <Footer site={site} services={services} navItems={site.navigation} />
      <a
        href="/api/wa?pesan=Halo%20EasyOffice%2C%20saya%20ingin%20bertanya%20tentang%20layanan%20Anda."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi EasyOffice via WhatsApp"
        className="fixed bottom-6 right-6 z-50 inline-flex h-15 w-15 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-all duration-200 hover:scale-105 hover:bg-[#1ea655] active:scale-95"
      >
        <WhatsAppIcon className="h-8 w-8" />
      </a>
    </div>
  );
}
