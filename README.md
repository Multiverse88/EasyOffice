# EasyOffice Website

## Project

EasyOffice website rebuild.

## Current Phase

Phase 3 — Payload-backed public website and content management.

Payload CMS, PostgreSQL, and the Puck page editor are configured. Booking is not implemented.

## Technology

- Next.js (App Router)
- React
- TypeScript (strict mode)
- Tailwind CSS
- ESLint
- Poppins (`next/font/google`)
- Payload CMS with PostgreSQL
- Puck Editor for visual page editing

## Run locally

```bash
npm install
npm run dev
```

Additional scripts:

```bash
npm run lint
npm run build
```


Apply pending Payload schema migrations before deploying:

```bash
npm run migrate:payload
```

## Current scope

Public pages read content from Payload through `lib/data/cms-data.ts`; optional CMS sections may remain empty.

- Routes: `/`, `/layanan/[service]`,
  `/layanan/[service]/[location]` (VO × Bandung/Jakarta/Bekasi,
  Coworking × Bandung, Meeting Room × Bandung), `/promo`,
  `/tentang-kami`, `/kontak`, plus `not-found`
- Old `/virtual-office`, `/coworking-space/*`, `/meeting-room/*`
  redirect permanently to their `/layanan` equivalents
- Sections: header + Layanan dropdown + mobile nav, hero, breadcrumbs,
  location selector, services, location cards, pricing, facilities,
  comparison table, testimonials, FAQ accordion,
  promos, WhatsApp CTA, footer, floating WhatsApp button
- All CTAs link to WhatsApp via `lib/whatsapp.ts` with per-location
  sample numbers (Bandung `...7890`, Jakarta `...7891`,
  Bekasi `...7892` — replace before launch)

## Recent changes

- Added the office SEO slug migration; apply Payload migrations before deploying this code.
- Fixed empty CMS collections, missing service/partner images, contact submission status, and fallback contact links.
- Refined public spacing, service cards, hero styling, and section reveal motion.
- Updated the Shopee marketplace section with an EasyLegal-style responsive layout, local illustration fallback, and Shopee logo.
- Added a homepage Virtual Office location-card section without redundant city-filter tabs.

- Added Google Maps review fallbacks and comparison rows for empty homepage CMS sections, with reduced-motion support for the testimonial slider.
