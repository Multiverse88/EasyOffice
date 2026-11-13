import type { Metadata } from "next";
import {
  Building2,
  Check,
  Clock,
  Coffee,
  MapPin,
  Printer,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { Section } from "@/components/ui/section";
import { Hero } from "@/components/sections/hero";
import { StatsBand } from "@/components/sections/stats-band";
import { Gallery } from "@/components/sections/gallery";
import { FaqSection } from "@/components/sections/faq";
import { WhatsappCta } from "@/components/sections/whatsapp-cta";
import { whatsappRotatorUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Private Office Fully Furnished di Summarecon Bekasi",
  description:
    "Sewa Private Office siap pakai di Emerald Commercial Summarecon Bekasi. Termasuk domisili resmi PT/CV, resepsionis, Wi-Fi cepat, meeting room, dan free trial 1 hari.",
  alternates: { canonical: "/privat-office-bekasi" },
};

const galleryImages = [
  {
    src: "/images/offices/bekasi/summarecon-meeting-room-tv.png",
    alt: "Ruang meeting dan presentasi Smart TV EasyOffice Summarecon Bekasi",
  },
  {
    src: "/images/offices/bekasi/summarecon-meeting-table.png",
    alt: "Meja kerja kayu modern dan AC dingin Private Office Bekasi",
  },
  {
    src: "/images/offices/bekasi/summarecon-meeting-perspective.png",
    alt: "Area private office representatif Summarecon Bekasi",
  },
  {
    src: "/images/easyoffice/kantor-bekasi.jpg",
    alt: "Gedung Emerald Commercial Summarecon Bekasi",
  },
];

const valueProps = [
  {
    icon: Zap,
    title: "Siap pakai hari pertama",
    desc: "Meja, kursi ergonomis, AC, dan Wi-Fi serat optik sudah terpasang. Tim Anda langsung bekerja tanpa biaya setup ruangan.",
  },
  {
    icon: ShieldCheck,
    title: "Legalitas domisili terjamin",
    desc: "Surat Perjanjian Sewa dan Domisili resmi gedung komersial — sah untuk pendirian PT, CV, NIB, hingga verifikasi PKP.",
  },
  {
    icon: MapPin,
    title: "Kawasan elit Summarecon",
    desc: "Berada di jantung komersial Bekasi Utara, selangkah dari Summarecon Mall, Hotel Harris, Stasiun Bekasi, dan Gerbang Tol.",
  },
  {
    icon: Building2,
    title: "Biaya all-in transparan",
    desc: "Satu harga sudah mencakup listrik, air, internet, layanan kebersihan, pantry, dan resepsionis tanpa biaya tersembunyi.",
  },
];

const facilities = [
  {
    icon: Building2,
    title: "Free domisili perusahaan",
    desc: "Surat Keterangan Domisili resmi untuk legalitas pendirian PT, CV, dan pendaftaran izin usaha.",
  },
  {
    icon: Users,
    title: "Dedicated receptionist",
    desc: "Penyambutan tamu profesional serta penanganan surat & paket dokumen secara aman dan real-time.",
  },
  {
    icon: Clock,
    title: "Kuota meeting room gratis",
    desc: "Akses ruang rapat representatif lengkap dengan LED Smart TV, proyektor, dan papan tulis kaca.",
  },
  {
    icon: Wifi,
    title: "High-speed Wi-Fi unlimited",
    desc: "Koneksi internet bisnis yang stabil untuk kebutuhan video conference dan kerja tim harian.",
  },
  {
    icon: Printer,
    title: "Free printing & scan dokumen",
    desc: "Dukungan cetak dan pindai dokumen operasional bisnis Anda hingga 50 lembar setiap bulan.",
  },
  {
    icon: Coffee,
    title: "Free-flow pantry & minuman",
    desc: "Nikmati kopi, teh, dan air mineral gratis sepanjang jam operasional kantor.",
  },
];

const testimonials = [
  {
    name: "Dina Nurmala",
    role: "Owner Startup Teknologi",
    quote:
      "Bonus konsultasi legalnya sangat membantu. Tim EasyLegal langsung mengurus pendirian PT kami sementara tim langsung bisa kerja di ruangan.",
  },
  {
    name: "Bagas Wicaksono",
    role: "Direktur Agency Digital",
    quote:
      "Awalnya coba free trial sehari, langsung cocok. Ruangannya tenang, AC dingin, dan staf resepsionis sangat sigap menyambut tamu klien kami.",
  },
  {
    name: "Rizky Adi",
    role: "Konsultan Bisnis",
    quote:
      "Jauh lebih efisien dibanding sewa ruko sendiri. Klien jauh lebih percaya saat meeting di kawasan Summarecon Bekasi.",
  },
];

const faqs = [
  {
    question: "Apakah biaya sewa Private Office sudah all-in?",
    answer:
      "Ya. Biaya sewa sudah mencakup ruangan fully furnished (meja, kursi, AC), internet Wi-Fi cepat, listrik, free-flow pantry (kopi, teh, air mineral), layanan kebersihan, resepsionis, dan kuota meeting room.",
  },
  {
    question: "Apakah bisa sewa bulanan tanpa kontrak tahunan?",
    answer:
      "Bisa. Tersedia paket sewa bulanan fleksibel Rp 3.299.000/bulan tanpa komitmen tahunan, maupun paket hemat 6 bulan (Rp 2.299.000/bulan) untuk penghematan Rp 6.000.000.",
  },
  {
    question: "Bagaimana cara klaim Free Trial 1 Hari?",
    answer:
      "Klik tombol WhatsApp di halaman ini dan tentukan jadwal kunjungan Anda. Tim kami akan menyiapkan ruangan Private Office di Summarecon Bekasi untuk Anda coba secara gratis tanpa syarat.",
  },
  {
    question: "Apakah alamat ini bisa digunakan untuk pendirian PT/CV dan PKP?",
    answer:
      "Sangat bisa. Gedung Emerald Commercial Summarecon Bekasi berada di zonasi komersial resmi, sehingga sah digunakan untuk domisili akta PT/CV, penerbitan NIB OSS, hingga pengajuan PKP.",
  },
  {
    question: "Berapa kapasitas ruangan dan kapan bisa mulai digunakan?",
    answer:
      "Kapasitas standar ruangan nyaman untuk hingga 4 orang (tersedia opsi tambahan kursi bila diperlukan). Ruangan siap digunakan di hari yang sama setelah administrasi selesai.",
  },
];

export default function PrivateOfficeBekasiPage() {
  const waAutotext =
    "Halo EasyOffice, saya tertarik & ingin bertanya Private Office di Summarecon Bekasi";

  const waBookingUrl = whatsappRotatorUrl(waAutotext, "Bekasi");

  const waPromo6BulanUrl = whatsappRotatorUrl(
    "Halo EasyOffice, saya ingin mengambil Promo Sewa 6 Bulan Private Office Summarecon Bekasi (Rp 2.299.000/bulan). Mohon info rinciannya.",
    "Bekasi",
  );

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Beranda", href: "/" },
          { label: "Layanan", href: "/layanan/virtual-office" },
          { label: "Private Office Summarecon Bekasi" },
        ]}
      />

      <Hero
        eyebrow="Private Office · Summarecon Bekasi"
        title="Private Office Fully Furnished di Kawasan Strategis Summarecon Bekasi"
        description="Saatnya upgrade dari rumahan ke kantor profesional. Ruangan privat siap pakai untuk tim hingga 4 orang — lengkap dengan domisili resmi PT/CV, resepsionis, dan fasilitas ruang rapat."
        image="/images/offices/bekasi/summarecon-meeting-room-tv.png"
        imageAlt="Ruangan Private Office dan Meeting Room EasyOffice Summarecon Bekasi"
        imageLabel="EasyOffice Summarecon Bekasi · Mulai Rp 2,29 Jt/Bulan"
        trustItems={[
          "Free Trial 1 Hari",
          "Kapasitas hingga 4 Orang",
          "Zonasi Komersial Resmi (Bisa PKP)",
          "Gratis Meeting Room & Wi-Fi Cepat",
          "Hemat Rp 6 Juta (Paket 6 Bulan)",
        ]}
        primaryCta={{
          label: "Klaim Free Trial 1 Hari",
          href: waBookingUrl,
          external: true,
        }}
        secondaryCta={{
          label: "Lihat Paket Harga",
          href: "#harga",
        }}
      />

      <StatsBand
        items={[
          { value: "1.000+", label: "Klien Terlayani", icon: "users" },
          { value: "5 Menit", label: "Respon WhatsApp", icon: "message" },
          { value: "5.0 ★", label: "Rating Google", icon: "star" },
          { value: "100%", label: "Legal & Resmi", icon: "shield" },
        ]}
      />

      {/* Value Proposition — Asymmetric 2-col Editorial Layout */}
      <Section
        eyebrow="Kenapa EasyOffice?"
        title="Bukan sekadar ruangan, ini fondasi kredibilitas bisnis Anda"
        description="Kesan pertama menentukan kepercayaan klien. Jangan biarkan alamat rumah menghambat pertumbuhan usaha Anda."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-navy/30 hover:shadow-card sm:p-7"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-white shadow-soft">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-navy">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* All-In Facilities */}
      <Section
        eyebrow="Fasilitas All-In"
        title="Fasilitas lengkap, semua sudah termasuk"
        description="Fokus penuh pada pengembangan bisnis Anda — seluruh kebutuhan operasional ruangan sudah kami siapkan."
        tone="gray"
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {facilities.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="flex items-start gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-navy/30 hover:shadow-card"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy/8 text-navy">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Interactive Office Gallery — Ruangan & Fasilitas */}
      <Gallery
        title="Ruangan & Fasilitas EasyOffice Summarecon Bekasi"
        description="Dokumentasi asli ruang rapat, meja kerja privat, dan gedung Emerald Commercial Summarecon Bekasi."
        images={galleryImages}
      />

      {/* Pricing Section — Aligned Baselines & Tabular Figures */}
      <div id="harga">
        <Section
          eyebrow="Pilihan Paket Sewa"
          title="Investasi kantor privat yang transparan"
          description="Pilih fleksibilitas bulanan atau kunci penghematan Rp 6.000.000 dengan paket 6 bulan."
        >
          <div className="mx-auto grid max-w-4xl items-stretch gap-8 lg:grid-cols-2">
            {/* Tier 1: Monthly */}
            <div className="flex flex-col rounded-3xl border border-neutral-200 bg-white p-7 shadow-soft sm:p-9">
              <div className="min-h-[4.5rem]">
                <span className="inline-flex rounded-full border border-neutral-200 bg-surface px-3 py-1 text-xs font-semibold text-neutral-600">
                  Fleksibel Tanpa Kontrak Panjang
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-navy">
                  Sewa Bulanan
                </h3>
              </div>

              <div className="mt-4 min-h-[6.5rem] border-y border-neutral-200/80 py-5">
                <p className="text-xs font-medium text-neutral-400 line-through tabular-nums">
                  Rp 6.598.000 /bulan
                </p>
                <p className="mt-1 flex items-baseline gap-1.5 font-display text-3xl font-extrabold tracking-tight text-navy tabular-nums sm:text-4xl">
                  Rp 3.299.000
                  <span className="text-sm font-medium text-neutral-500">/bulan</span>
                </p>
                <p className="mt-1.5 text-xs text-neutral-500">
                  Pembayaran per bulan · Belum termasuk PPN &amp; PPh
                </p>
              </div>

              <ul className="mt-6 flex-1 space-y-3.5 text-sm text-neutral-700">
                {[
                  "Private office siap pakai (kapasitas s/d 4 orang)",
                  "Meja kerja, kursi ergonomis, AC & internet cepat",
                  "Alamat bisnis resmi & surat domisili gedung",
                  "Kuota penggunaan ruang meeting 10 jam/bulan",
                  "Free printing & scan dokumen 50 lembar/bulan",
                  "Free refreshment (kopi, teh & air mineral)",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-2">
                <Button href={waBookingUrl} external variant="outline" fullWidth size="lg">
                  <WhatsAppIcon className="h-4 w-4" />
                  Pilih Paket Bulanan
                </Button>
              </div>
            </div>

            {/* Tier 2: 6 Months (Recommended) */}
            <div className="relative flex flex-col rounded-3xl border-2 border-navy bg-white p-7 shadow-card sm:p-9">
              <div className="min-h-[4.5rem]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex rounded-full bg-navy px-3.5 py-1 text-xs font-bold text-white">
                    Paling Hemat · Rekomendasi
                  </span>
                  <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 tabular-nums">
                    Hemat Rp 6.000.000
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold text-navy">
                  Paket Hemat 6 Bulan
                </h3>
              </div>

              <div className="mt-4 min-h-[6.5rem] border-y border-neutral-200/80 py-5">
                <p className="text-xs font-medium text-neutral-400 line-through tabular-nums">
                  Rp 3.299.000 /bulan
                </p>
                <p className="mt-1 flex items-baseline gap-1.5 font-display text-3xl font-extrabold tracking-tight text-navy tabular-nums sm:text-4xl">
                  Rp 2.299.000
                  <span className="text-sm font-medium text-neutral-500">/bulan</span>
                </p>
                <p className="mt-1.5 text-xs font-medium text-emerald-700 tabular-nums">
                  Total bayar di muka Rp 13.794.000 untuk 6 bulan penuh
                </p>
              </div>

              <ul className="mt-6 flex-1 space-y-3.5 text-sm text-neutral-700">
                {[
                  "Seluruh fasilitas Paket Bulanan lengkap",
                  "Lebih hemat Rp 1.000.000 setiap bulannya",
                  "Prioritas klaim Free Trial 1 Hari ruangan",
                  "Gratis konsultasi legalitas PT/CV bersama EasyLegal",
                  "Bebas biaya setup & siap digunakan tanpa jeda",
                  "Dukungan penuh administrasi domisili & PKP",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden />
                    <span className="font-medium text-navy">{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-2">
                <Button href={waPromo6BulanUrl} external variant="primary" fullWidth size="lg">
                  <WhatsAppIcon className="h-4 w-4" />
                  Ambil Promo 6 Bulan
                </Button>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-neutral-500 tabular-nums">
            Opsi tambahan bila dibutuhkan: Extra kursi Rp 500.000/bulan · Papan nama perusahaan Rp 250.000/bulan. Harga belum termasuk PPN &amp; PPh.
          </p>
        </Section>
      </div>

      {/* Special Registration Bonuses */}
      <Section
        eyebrow="Bonus Pendaftaran"
        title="Keuntungan ekstra khusus pendaftaran bulan ini"
        tone="gray"
      >
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          <div className="flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-7 shadow-soft">
            <div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-white">
                <Sparkles className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-navy">
                Gratis Trial Private Office 1 Hari
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Coba dan rasakan langsung kenyamanan ruang kerja, kecepatan internet, serta suasana profesional di Summarecon Bekasi sebelum memutuskan menyewa.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100">
              <a
                href={waBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:underline"
              >
                Jadwalkan Free Trial via WhatsApp →
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-7 shadow-soft">
            <div>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-navy text-white">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-navy">
                Konsultasi Legalitas Bisnis Gratis
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                Didampingi langsung oleh Personal Legal Assistant dari EasyLegal untuk konsultasi pendirian PT/CV, pengurusan NIB, pendaftaran Merek HAKI, dan perpajakan.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-100">
              <a
                href={waBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:underline"
              >
                Konsultasi Gratis Sekarang →
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* Location & Neighborhood */}
      <Section
        eyebrow="Lokasi & Kawasan"
        title="Berada di pusat komersial Summarecon Bekasi"
        description="Akses mudah dari gerbang tol maupun transportasi publik, dikelilingi fasilitas penunjang bisnis kelas atas."
      >
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl border border-neutral-200 bg-surface p-6">
              <div className="flex items-start gap-3.5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                  <MapPin className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-navy">
                    EasyOffice Summarecon Bekasi
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    Emerald Commercial Summarecon Bekasi Blok UF No. 10, Jl. Bulevar Selatan, Marga Mulya, Bekasi Utara, Kota Bekasi, Jawa Barat 17142
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {[
                { label: "Summarecon Mall", time: "3 menit berkendara" },
                { label: "Hotel Harris Bekasi", time: "3 menit jalan kaki" },
                { label: "Stasiun Bekasi", time: "7 menit berkendara" },
                { label: "Tol Bekasi Barat", time: "10 menit via Bulevar" },
              ].map((spot) => (
                <div
                  key={spot.label}
                  className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-soft"
                >
                  <p className="font-display text-sm font-bold text-navy">
                    {spot.label}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-500">{spot.time}</p>
                </div>
              ))}
            </div>

            <Button href={waBookingUrl} external variant="primary" fullWidth size="lg">
              <WhatsAppIcon className="h-4 w-4" />
              Jadwalkan Survey Lokasi
            </Button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-soft lg:col-span-7">
            <iframe
              title="Peta Lokasi EasyOffice Summarecon Bekasi"
              src="https://www.google.com/maps?q=Emerald+Commercial+Summarecon+Bekasi+Blok+UF+No.+10&output=embed"
              className="h-[380px] w-full border-0 sm:h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section
        eyebrow="Testimoni"
        title="Dipercaya pelaku usaha dan tim profesional"
        tone="gray"
      >
        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t) => (
            <article
              key={t.name}
              className="flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-soft sm:p-7"
            >
              <div>
                <div className="flex gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" aria-hidden />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-700">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="mt-6 border-t border-neutral-100 pt-4">
                <p className="font-display text-sm font-bold text-navy">{t.name}</p>
                <p className="text-xs text-neutral-500">{t.role}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Shared FAQ Section */}
      <FaqSection
        title="Pertanyaan Seputar Private Office Bekasi"
        description="Informasi lengkap mengenai fasilitas, kontrak sewa, dan legalitas domisili."
        faqs={faqs}
      />

      {/* Shared Bottom WhatsApp CTA */}
      <WhatsappCta
        title="Siap Mencoba Private Office Summarecon Bekasi?"
        description="Hubungi tim kami untuk klaim Free Trial 1 Hari atau amankan kuota promo sewa 6 bulan hemat Rp 6.000.000."
        topic="Private Office Summarecon Bekasi"
        locationName="Bekasi"
      />
    </>
  );
}
