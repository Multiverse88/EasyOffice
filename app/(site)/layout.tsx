import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
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
      <FloatingWhatsApp />
    </div>
  );
}
