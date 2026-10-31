import Image from "next/image";
import { ArrowRight, MapPin, Clock, ImageIcon } from "lucide-react";
import type { Location, Office, Service, ServiceLocation } from "@/types";
import { Button } from "@/components/ui/button";
interface LocationCardProps {
  location: Location;
  service: Service;
  combo: ServiceLocation;
  office: Office;
}

function parsePrice(raw: string | number | undefined): number {
  if (typeof raw === "number") return raw;
  if (!raw) return 0;
  const str = String(raw).toLowerCase().trim();
  const isJt = /\b(jt|juta)\b/i.test(str);
  const isRb = /\b(rb|ribu)\b/i.test(str);
  const clean = str.replace(/rp|\s/g, "").replace(/\./g, "").replace(",", ".");
  const parsed = Number.parseFloat(clean.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(parsed)) return 0;
  if (isJt) return Math.round(parsed * 1_000_000);
  if (isRb) return Math.round(parsed * 1_000);
  return Math.round(parsed);
}

export function LocationCard({ location, service, combo, office }: LocationCardProps) {
  const locTitle = location.name.charAt(0).toUpperCase() + location.name.slice(1);
  const officeName = office.name || `EasyOffice ${locTitle}`;
  const officeDesc = office.description || location.shortDescription || combo.tagline;
  const officeAddr = office.address || location.address;
  const isHeadOffice = location.slug === "bandung" || office.slug === "cihampelas";
  const firstPlan = combo.pricing[0];
  const firstRegular = firstPlan ? parsePrice(firstPlan.price) : parsePrice(combo.startingPrice);
  const firstSale = firstPlan?.discountedPrice
    ? parsePrice(firstPlan.discountedPrice)
    : firstPlan?.discountPercent
      ? Math.round(firstRegular * (1 - firstPlan.discountPercent / 100))
      : firstRegular;
  const finalPrice = firstSale || firstRegular || parsePrice(combo.startingPrice);

  return (
    <article className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-1.5 hover:border-navy/30 hover:shadow-[0_12px_30px_rgba(13,32,102,0.08)]">
      <div>
        <div className="relative aspect-[1.5] w-full overflow-hidden bg-neutral-100 border-b border-neutral-100">
          {combo.image ? (
            <Image
              src={combo.image}
              alt={combo.imageAlt || officeName}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-navy/30">
              <ImageIcon className="h-10 w-10" aria-hidden />
            </div>
          )}
          <div className="absolute top-4 left-4">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm border ${
                isHeadOffice
                  ? "bg-navy text-white border-navy/20"
                  : "bg-white/95 text-navy border-neutral-200/60 backdrop-blur-xs"
              }`}
            >
              {isHeadOffice ? "Kantor Pusat" : "Branch Office"}
            </span>
          </div>
        </div>

        <div className="p-6 pb-2 sm:p-7 sm:pb-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4.5 w-4.5 shrink-0 text-navy" strokeWidth={2.5} />
            <h3 className="font-display text-lg font-bold leading-snug text-navy transition-colors group-hover:text-blue-700" title={officeName}>
              {officeName}
            </h3>
          </div>

          <p className="mt-2.5 min-h-[3rem] text-sm leading-relaxed text-neutral-600 line-clamp-2">
            {officeDesc}
          </p>

          {officeAddr ? (
            <p className="mt-2 text-xs leading-relaxed text-neutral-400 line-clamp-1">
              {officeAddr}
            </p>
          ) : null}
        </div>
      </div>

      <div className="border-t border-neutral-100 p-6 pt-4 sm:p-7 sm:pt-4">
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-500">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-navy" strokeWidth={2.5} />
            <span>{office.operatingHours || location.operatingHours || "Sen–Jum · 08–17"}</span>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-medium text-neutral-400">Mulai dari </span>
            <span className="font-display text-base font-bold text-navy">
              {finalPrice ? `Rp ${finalPrice.toLocaleString("id-ID")}` : combo.startingPrice}
            </span>
            <span className="text-[11px] text-neutral-500">
              {firstPlan?.period ?? "/bulan"}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <Button href={`/layanan/${service.slug}/${office.slug}`} fullWidth className="rounded-full font-bold shadow-xs transition hover:shadow-md">
            Lihat Detail
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
      </div>
    </article>
  );
}
