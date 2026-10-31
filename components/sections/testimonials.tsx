import { Star } from "lucide-react";
import type { Testimonial } from "@/types";
import { Section } from "@/components/ui/section";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function MarqueeRow({
  items,
  reverse,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) {
  return (
    <div className="overflow-hidden py-2">
      <div className={reverse ? "marquee-track-reverse" : "marquee-track"}>
        {[...items, ...items].map((t, i) => (
          <article
            aria-hidden={i >= items.length}
            key={`${t.id ?? `${t.name}-${i % Math.max(items.length, 1)}`}-${i < items.length ? "a" : "b"}`}
            className="flex w-[380px] shrink-0 flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-navy/30 hover:shadow-card"
          >
            <div>
              <div className="mb-3.5 flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" aria-hidden />
                ))}
              </div>
              <p className="text-[0.95rem] font-medium leading-relaxed text-navy">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-bold text-white">
                {initials(t.name)}
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-navy">
                  {t.name}
                </h4>
                <p className="text-xs text-neutral-500">{t.company}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function Testimonials({
  title = "Apa Kata Mereka",
  description = "Cerita dari pengguna layanan ruang kerja profesional.",
  items = [],
  className = "pt-5 sm:pt-6 lg:pt-8",
  sourceUrl,
}: {
  title?: string;
  description?: string;
  items?: Testimonial[];
  className?: string;
  sourceUrl?: string;
}) {
  const testimonials = items ?? [];
  const middle = Math.ceil(testimonials.length / 2);
  const firstRow = testimonials.slice(0, middle);
  const secondRow = testimonials.slice(middle);
  return (
    <Section eyebrow="Testimoni" title={title} description={description} tone="gray" className={className}>
      <div className="-mx-5 flex flex-col gap-4">
        {firstRow.length ? <MarqueeRow items={firstRow} /> : null}
        {secondRow.length ? <MarqueeRow items={secondRow} reverse /> : null}
      </div>
      {sourceUrl ? (
        <p className="mt-5 text-center text-sm">
          <a href={sourceUrl} target="_blank" rel="noreferrer" className="font-semibold text-navy underline underline-offset-4 hover:text-blue-700">
            Lihat ulasan di Google Maps
          </a>
        </p>
      ) : null}
    </Section>
  );
}
