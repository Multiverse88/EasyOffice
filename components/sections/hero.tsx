import Image from "next/image";
import type { ReactNode } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

interface HeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string; external?: boolean };
  secondaryCta?: { label: string; href: string };
  /** Custom hero image URL — overrides the default. */
  image?: string;
  imageAlt?: string;
  /** Label shown on the overlay badge (bottom of hero image). Defaults to service tagline. */
  imageLabel?: string;
  trustItems?: string[];
  visual?: ReactNode;
}

const defaultHeroImage =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80";

const defaultTrustItems = [
  "Lokasi Strategis",
  "Alamat legal untuk PT, CV dan PKP",
  "Dibantu Urus Pembukaan Rekening PT",
  "Proses Cepat dan Tanpa Ribet",
  "Harga Affordable",
];

export function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  image,
  imageAlt,
  imageLabel,
  trustItems,
  visual,
}: HeroProps) {
  return (
    <section className="bg-gradient-to-br from-navy via-[#0d2066] to-navy-950">
      <Container className="grid items-center gap-8 py-12 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div>
          {eyebrow ? (
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white/80">
              <span className="h-2 w-2 rounded-full bg-yellow-400" aria-hidden />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display mt-5 text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-[570px] text-base leading-relaxed text-white/70 sm:text-lg">
            {description}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              href={primaryCta.href}
              external={primaryCta.external}
              variant="white"
              size="lg"
              className="rounded-full px-9 shadow-soft transition-all duration-300 hover:bg-yellow-400 hover:text-navy"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {primaryCta.label}
            </Button>
            {secondaryCta ? (
              <Button
                href={secondaryCta.href}
                variant="outline-white"
                size="lg"
                className="rounded-full px-9 transition-all duration-300 hover:border-yellow-400 hover:text-yellow-300"
              >
                {secondaryCta.label}
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Button>
            ) : null}
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {(trustItems?.length ? trustItems : defaultTrustItems).map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-xs"
              >
                <CheckCircle2 className="h-4 w-4 text-yellow-400 shrink-0" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          {visual ?? (
            <div className="relative min-h-[420px] overflow-hidden rounded-3xl border border-white/10 shadow-card lg:min-h-[520px]">
              <Image
                src={image ?? defaultHeroImage}
                alt={imageAlt ?? "Ruang kerja EasyOffice"}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-2xl border border-white/20 bg-navy-950/90 px-5 py-4 text-white shadow-card backdrop-blur">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-400" aria-hidden />
                <div>
                  <p className="text-sm font-bold">EasyOffice</p>
                  <p className="text-xs text-white/60">
                    <span className="tracking-wide">
                      {imageLabel ?? "Virtual Office \u00a0•\u00a0 Coworking \u00a0•\u00a0 Meeting Room"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
