import Image from "next/image";
import type { CmsPartner } from "@/lib/data/cms-data";


function PartnerSet({ partners, copy }: { partners: CmsPartner[]; copy: number }) {
  return partners.map((partner, index) => {
    const key = `${copy}-${partner.id ?? partner.name}-${index}`;
    const image = (
      <Image
        src={partner.logoUrl!}
        alt={copy === 0 ? partner.logoAlt ?? partner.name : ""}
        aria-hidden={copy !== 0}
        width={220}
        height={88}
        loading="lazy"
        className="max-h-full max-w-full object-contain"
      />
    );
    return (
      <div key={key} className="flex h-[76px] w-36 shrink-0 items-center justify-center rounded-2xl border border-neutral-100 bg-white px-5 py-3 shadow-sm sm:h-[88px] sm:w-44 sm:px-7">
        {copy === 0 && partner.href ? <a href={partner.href} target="_blank" rel="noopener noreferrer" aria-label={`Kunjungi ${partner.name}`}>{image}</a> : image}
      </div>
    );
  });
}

export function PartnersCarousel({ partners = [] }: { partners?: CmsPartner[] }) {
  const items = partners;
  if (!items.length) return null;
  return (
    <section aria-label="Mitra EasyOffice" className="overflow-hidden bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-7 text-center text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 sm:mb-9">Dipercaya oleh berbagai bisnis</p>
        <div className="partners-marquee group relative" aria-label="Logo mitra EasyOffice">
          <div className="partners-marquee-track group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]">
            <PartnerSet partners={items} copy={0} />
            <PartnerSet partners={items} copy={1} />
          </div>
        </div>
      </div>
      <style>{`
        .partners-marquee { mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent); }
        .partners-marquee-track { display: flex; width: max-content; gap: 1rem; animation: partners-scroll 62s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .partners-marquee { overflow-x: auto; mask-image: none; }
          .partners-marquee-track { animation: none; }
          .partners-marquee-track > div:nth-child(n + ${items.length + 1}) { display: none; }
        }
        @keyframes partners-scroll { to { transform: translateX(calc(-50% - .5rem)); } }
      `}</style>
    </section>
  );
}
