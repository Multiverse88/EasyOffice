"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Coffee,
  MapPin,
  MessageCircle,
  Printer,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { whatsappRotatorUrl } from "@/lib/whatsapp";

const galleryImages = [
  {
    src: "/images/offices/bekasi/summarecon-meeting-room-tv.png",
    alt: "Ruang meeting dan presentasi Smart TV EasyOffice Summarecon Bekasi",
    title: "Ruang Meeting & Presentasi",
  },
  {
    src: "/images/offices/bekasi/summarecon-meeting-table.png",
    alt: "Meja kerja kayu modern dan AC dingin Private Office Bekasi",
    title: "Meja Kerja & Kursi Ergonomis",
  },
  {
    src: "/images/offices/bekasi/summarecon-meeting-perspective.png",
    alt: "Area private office representatif Summarecon Bekasi",
    title: "Kapasitas Privat hingga 4 Orang",
  },
  {
    src: "/images/easyoffice/kantor-bekasi.jpg",
    alt: "Gedung Emerald Commercial Summarecon Bekasi",
    title: "Gedung Emerald Commercial Summarecon",
  },
];

const facilities = [
  {
    icon: Building2,
    title: "Free Domisili Perusahaan",
    desc: "Surat Keterangan Domisili resmi untuk legalitas pendirian PT, CV, dan pendaftaran izin usaha.",
  },
  {
    icon: Users,
    title: "Dedicated Receptionist",
    desc: "Penyambutan tamu profesional serta penanganan surat & paket dokumen secara aman dan real-time.",
  },
  {
    icon: Clock,
    title: "Akses Meeting Room Gratis",
    desc: "Fasilitas ruang rapat representatif lengkap dengan LED Smart TV, proyektor, dan whiteboard.",
  },
  {
    icon: Wifi,
    title: "High-Speed Wi-Fi Unlimited",
    desc: "Koneksi internet serat optik berkecepatan tinggi yang stabil untuk video conference dan kerja hybrid.",
  },
  {
    icon: Printer,
    title: "Free Printing & Scan Dokumen",
    desc: "Dukungan cetak dan pindai dokumen bisnis harian Anda secara mudah dan cepat.",
  },
  {
    icon: Coffee,
    title: "Free-flow Pantry & Minuman",
    desc: "Nikmati kopi, teh, dan air mineral gratis tanpa batas sepanjang hari kerja Anda.",
  },
];

const faqs = [
  {
    q: "Apakah biaya sewa Private Office sudah all-in?",
    a: "Ya, biaya sewa sudah mencakup ruangan fully furnished (meja, kursi, AC), internet Wi-Fi cepat, listrik, free-flow pantry (kopi/teh/air mineral), layanan kebersihan, resepsionis, dan jatah meeting room.",
  },
  {
    q: "Bisa sewa per bulan tanpa kontrak panjang?",
    a: "Bisa! Kami menyediakan opsi sewa bulanan fleksibel mulai Rp 3.299.000/bulan tanpa ikatan kontrak tahunan, serta paket hemat 6 bulan (Rp 2.299.000/bln) untuk penghematan maksimal.",
  },
  {
    q: "Bagaimana cara klaim Free Trial 1 Hari?",
    a: "Cukup hubungi tim kami melalui tombol WhatsApp di halaman ini. Pilih jadwal survey dan Anda bisa langsung mencoba bekerja di ruangan Private Office Summarecon Bekasi secara gratis tanpa syarat.",
  },
  {
    q: "Apakah alamat domisili ini bisa digunakan untuk pendirian PT/CV dan PKP?",
    a: "Sangat bisa! Gedung Emerald Commercial Summarecon Bekasi berada di kawasan zonasi komersial resmi perkantoran, sehingga sah digunakan untuk domisili legalitas akta PT/CV, NIB, hingga verifikasi PKP.",
  },
  {
    q: "Berapa lama proses serah terima ruangan?",
    a: "Ruangan siap pakai pada hari yang sama. Setelah konfirmasi dan verifikasi administrasi selesai, kunci ruangan langsung diserahkan dan tim Anda bisa langsung mulai bekerja.",
  },
];

export default function PrivateOfficeBekasiPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const waBookingUrl = whatsappRotatorUrl(
    "Halo EasyOffice, saya tertarik dengan promo Private Office di Summarecon Bekasi dan ingin klaim Free Trial. Boleh info jadwal survey?",
    "Bekasi",
  );

  const waPromo6BulanUrl = whatsappRotatorUrl(
    "Halo EasyOffice, saya ingin klaim Promo Sewa 6 Bulan Private Office Summarecon Bekasi (Hemat Rp 6 Juta). Boleh minta rincian lengkapnya?",
    "Bekasi",
  );

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800">
      {/* Top Banner Notice */}
      <div className="bg-navy-950 px-4 py-2.5 text-center text-xs font-semibold text-white/90 sm:text-sm">
        <span className="mr-2 inline-block rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-bold text-navy-950">
          PROMO TERBATAS
        </span>
        Private Office Summarecon Bekasi · Diskon hingga 50% + Free Trial 1 Hari!
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy to-navy-950 py-12 text-white sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl"
        />

        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-yellow-300">
                <Sparkles className="h-3.5 w-3.5" />
                Saatnya Upgrade Dari Rumahan Ke Profesional
              </div>

              <h1 className="font-display mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl sm:leading-[1.15]">
                Private Office <span className="text-yellow-400">Fully Furnished</span> di Summarecon Bekasi
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
                Lebih dari sekadar ruang kerja, kami siapkan fondasi legal bisnis Anda. Kantor privat ber-AC, meja kursi lengkap,
                alamat komersial bergengsi, dan harga tak tertandingi.
              </p>

              {/* Highlights Chips */}
              <div className="mt-6 flex flex-wrap gap-2.5 text-xs font-semibold sm:text-sm">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-xs">
                  <Zap className="h-4 w-4 text-yellow-400" /> Siap Pakai Hari Pertama
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-xs">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" /> Legalitas Domisili PT & CV
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 backdrop-blur-xs">
                  <Coffee className="h-4 w-4 text-amber-300" /> Free-flow Kopi & Wi-Fi
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
                <a
                  href={waBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-green-900/30 transition-all hover:brightness-110 hover:shadow-green-900/50 sm:text-base"
                >
                  <MessageCircle className="h-5 w-5" />
                  Booking Sekarang - Free Trial 1 Hari
                </a>
                <a
                  href="#harga"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xs transition hover:bg-white/15 sm:text-base"
                >
                  Lihat Paket Harga ↓
                </a>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 p-3 shadow-2xl backdrop-blur-md">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-navy-950">
                  <Image
                    src="/images/offices/bekasi/summarecon-meeting-room-tv.png"
                    alt="Private Office Summarecon Bekasi EasyOffice"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block rounded-md bg-yellow-400 px-2.5 py-1 text-xs font-bold text-navy-950">
                      HEMAT 50%
                    </span>
                    <p className="mt-1 font-display text-lg font-bold text-white">
                      Mulai Rp 2.299.000 <span className="text-xs font-normal text-white/80">/bulan</span>
                    </p>
                    <p className="text-xs text-white/70">📍 Emerald Commercial Summarecon Bekasi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro Callout Banner */}
      <section className="relative z-10 -mt-6">
        <Container>
          <div className="mx-auto max-w-4xl rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-lg sm:p-8">
            <p className="text-base font-semibold text-neutral-800 sm:text-lg">
              Jangan Biarkan <span className="text-red-600 underline">Alamat Rumah</span> Merusak Kepercayaan Klien.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 sm:text-base">
              Private Office EasyOffice hadir dengan <strong>legalitas resmi gedung perkantoran</strong>, ruangan premium fully
              furnished, dan lokasi prestisius Summarecon Bekasi — semua dalam satu harga transparan.
            </p>
          </div>
        </Container>
      </section>

      {/* Why EasyOffice Section */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Kenapa EasyOffice?</span>
            <h2 className="font-display mt-2 text-2xl font-bold text-navy sm:text-4xl">
              Bukan Cuma Ruangan, Ini Fondasi Bisnis Anda
            </h2>
            <p className="mt-3 text-sm text-neutral-600 sm:text-base">
              Kesan pertama sangat menentukan keberhasilan bisnis. Kami hadirkan kantor profesional, legal, dan terjangkau
              untuk Anda yang serius berkembang.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-navy hover:shadow-md">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <Zap className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-navy">Siap Pakai Hari Pertama</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                Meja, kursi, AC, Wi-Fi berkecepatan tinggi — semua sudah siap. Langsung kerja tanpa perlu biaya setup ruangan.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-navy hover:shadow-md">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <ShieldCheck className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-navy">Legalitas Resmi Terjamin</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                Surat Perjanjian Sewa dan Domisili resmi di kawasan komersial. Diakui secara hukum untuk pendirian PT, CV, dan PKP.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-navy hover:shadow-md">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <MapPin className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-navy">Lokasi Elit Summarecon</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                Kawasan bisnis modern paling berkembang di Bekasi, mudah diakses klien dari Tol Bekasi Barat dan Stasiun.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-navy hover:shadow-md">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                <Building2 className="h-6 w-6" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-navy">Harga All-In Tanpa Biaya Tersembunyi</h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">
                Termasuk listrik, air, internet, pantry, kebersihan, dan resepsionis dalam satu paket sewa transparan.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Facilities Grid */}
      <section id="fasilitas" className="border-y border-neutral-200 bg-white py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Fasilitas Termasuk</span>
            <h2 className="font-display mt-2 text-2xl font-bold text-navy sm:text-4xl">
              Fasilitas Lengkap, Semua Sudah Termasuk
            </h2>
            <p className="mt-3 text-sm text-neutral-600 sm:text-base">
              Fokus kembangkan bisnis Anda, seluruh operasional kantor kami yang kelola.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="flex gap-4 rounded-2xl border border-neutral-200 bg-neutral-50/70 p-5 shadow-xs">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-navy">{f.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-600">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Pricing Section */}
      <section id="harga" className="py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">Pilihan Paket Sewa</span>
            <h2 className="font-display mt-2 text-2xl font-bold text-navy sm:text-4xl">
              Investasi Kantor Cerdas &amp; Fleksibel
            </h2>
            <p className="mt-3 text-sm text-neutral-600 sm:text-base">
              Pilih paket yang paling sesuai dengan ritme pertumbuhan usaha Anda.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-2">
            {/* Opsi 1: Bulanan */}
            <div className="flex flex-col rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm transition hover:shadow-md">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Opsi Fleksibel</span>
              <h3 className="mt-2 font-display text-xl font-bold text-navy">Sewa Bulanan</h3>
              <p className="mt-1 text-xs text-neutral-500">Komitmen bulanan tanpa kontrak tahunan</p>

              <div className="mt-6 border-y border-neutral-100 py-5">
                <span className="text-xs text-neutral-400">Tarif Sewa:</span>
                <p className="font-display text-3xl font-extrabold text-navy">
                  Rp 3.299.000 <span className="text-xs font-normal text-neutral-500">/bulan</span>
                </p>
                <p className="mt-1 text-[11px] text-neutral-500">*Exclude PPN &amp; PPh</p>
              </div>

              <ul className="mt-6 flex-1 space-y-3 text-xs text-neutral-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> Private Office siap pakai hingga 4 orang
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> Free Domisili Perusahaan &amp; Surat Sewa
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> Resepsionis &amp; Pengelolaan Surat/Paket
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> Kuota Ruang Meeting 5 Jam / bulan
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> Wi-Fi Cepat Unlimited &amp; Pantry
                </li>
              </ul>

              <div className="mt-8">
                <a
                  href={waBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-navy bg-navy px-5 py-3 text-sm font-bold text-white transition hover:bg-navy/90"
                >
                  <MessageCircle className="h-4 w-4" />
                  Pilih Paket Bulanan
                </a>
              </div>
            </div>

            {/* Opsi 2: 6 Bulan (Best Deal) */}
            <div className="relative flex flex-col rounded-3xl border-2 border-emerald-500 bg-white p-7 shadow-xl">
              <div className="absolute -top-3.5 right-6 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-navy-950 shadow-sm">
                🔥 PALING HEMAT · DISKON 50%
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Penawaran Spesial 6 Bulan</span>
              <h3 className="mt-2 font-display text-xl font-bold text-navy">Sewa 6 Bulan</h3>
              <p className="mt-1 text-xs text-emerald-700 font-semibold">Total hemat Rp 6.000.000 (Bayar di awal)</p>

              <div className="mt-6 border-y border-neutral-100 py-5">
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-neutral-400 line-through">Rp 6.000.000</span>
                  <span className="rounded-md bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">HEMAT 50%</span>
                </div>
                <p className="font-display text-3xl font-extrabold text-navy">
                  Rp 2.299.000 <span className="text-xs font-normal text-neutral-500">/bulan</span>
                </p>
                <p className="mt-1 text-[11px] text-emerald-700 font-medium">
                  Total bayar di muka: <strong>Rp 13.794.000</strong> untuk 6 bulan penuh
                </p>
              </div>

              <ul className="mt-6 flex-1 space-y-3 text-xs text-neutral-700">
                <li className="flex items-start gap-2 font-medium text-navy">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> Semua fasilitas paket bulanan lengkap
                </li>
                <li className="flex items-start gap-2 font-medium text-navy">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> Hemat biaya sewa Rp 1.000.000 setiap bulannya
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> Free Trial 1 Hari Ruangan
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> Konsultasi Legalitas Bisnis Gratis bersama EasyLegal
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> Free Printing &amp; Scan dokumen hingga 50 lembar
                </li>
              </ul>

              <div className="mt-8">
                <a
                  href={waPromo6BulanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-green-900/30 transition hover:brightness-110"
                >
                  <MessageCircle className="h-4 w-4" />
                  Klaim Promo 6 Bulan Sekarang
                </a>
              </div>
            </div>
          </div>

          {/* Additional Options Info */}
          <div className="mx-auto mt-8 max-w-4xl rounded-xl border border-neutral-200 bg-neutral-100/70 p-4 text-center text-xs text-neutral-600">
            <strong>Opsi Tambahan:</strong> Extra Kursi Rp 500.000/bulan · Pasang Papan Nama Perusahaan Rp 250.000/bulan ·
            Kapasitas standar 1 ruangan hingga 4 orang.
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Foto Asli Lokasi</span>
            <h2 className="font-display mt-2 text-2xl font-bold text-navy sm:text-4xl">
              Galeri Private Office Summarecon Bekasi
            </h2>
            <p className="mt-3 text-sm text-neutral-600 sm:text-base">
              Kondisi asli ruangan kerja, meeting room, dan gedung kantor kami.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((img) => (
              <div key={img.title} className="group overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-sm">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3.5 text-center">
                  <p className="font-display text-xs font-bold text-navy">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Map & Neighborhood Location */}
      <section className="py-14 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Lokasi &amp; Aksesibilitas</span>
              <h2 className="font-display mt-2 text-2xl font-bold text-navy sm:text-3xl">
                Berada di Pusat Kawasan Bisnis Modern Bekasi
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-neutral-600">
                EasyOffice Bekasi berlokasi strategis di Emerald Commercial Summarecon Bekasi. Dikelilingi pusat perbelanjaan,
                hotel bintang empat, bank nasional, dan akses transportasi cepat.
              </p>

              <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                  <div className="text-xs text-neutral-700">
                    <strong className="block text-sm text-navy">EasyOffice Summarecon Bekasi</strong>
                    Emerald Commercial Summarecon Bekasi Blok UF No. 10, Jl. Bulevar Selatan, Marga Mulya, Bekasi Utara, Kota
                    Bekasi, Jawa Barat 17142
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-white p-3 border border-neutral-200">
                  <strong className="block text-navy">🛍️ Summarecon Mall</strong>
                  <span className="text-neutral-500">3 menit dari kantor</span>
                </div>
                <div className="rounded-xl bg-white p-3 border border-neutral-200">
                  <strong className="block text-navy">🏨 Harris Hotel</strong>
                  <span className="text-neutral-500">3 menit jalan santai</span>
                </div>
                <div className="rounded-xl bg-white p-3 border border-neutral-200">
                  <strong className="block text-navy">🚆 Stasiun Bekasi</strong>
                  <span className="text-neutral-500">7 menit berkendara</span>
                </div>
                <div className="rounded-xl bg-white p-3 border border-neutral-200">
                  <strong className="block text-navy">🛣️ Tol Bekasi Barat</strong>
                  <span className="text-neutral-500">10 menit via Bulevar</span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-neutral-200 shadow-md lg:col-span-7">
              <iframe
                title="Peta Lokasi EasyOffice Summarecon Bekasi"
                src="https://www.google.com/maps?q=Emerald+Commercial+Summarecon+Bekasi+Blok+UF+No.+10&output=embed"
                width="100%"
                height="420"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Special Bonuses Callout */}
      <section className="bg-gradient-to-r from-navy to-navy-950 py-14 text-white sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="rounded-full bg-yellow-400/20 px-3 py-1 text-xs font-bold uppercase text-yellow-300">
              Khusus Pendaftaran Bulan Ini
            </span>
            <h2 className="font-display mt-3 text-2xl font-bold sm:text-4xl">
              Bonus Eksklusif yang Sayang Dilewatkan
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xs">
              <span className="text-3xl">🏢</span>
              <h3 className="mt-3 font-display text-lg font-bold text-yellow-400">Gratis Trial Ruangan 1 Hari</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/80">
                Rasakan langsung kenyamanan ruangan, AC dingin, dan koneksi internet cepat sebelum memutuskan berlangganan.
              </p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xs">
              <span className="text-3xl">⚖️</span>
              <h3 className="mt-3 font-display text-lg font-bold text-yellow-400">Konsultasi Legalitas Bisnis Gratis</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/80">
                Didampingi Personal Legal Assistant dari EasyLegal untuk konsultasi pendirian PT, CV, Merek, dan izin operasional usaha.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href={waBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-yellow-400 px-8 py-3.5 text-sm font-bold text-navy-950 transition hover:bg-yellow-300 sm:text-base"
            >
              <MessageCircle className="h-5 w-5" />
              Klaim Promo &amp; Free Trial Sekarang
            </a>
            <p className="mt-2.5 text-xs text-white/60">⏳ Kuota ruangan terbatas — hubungi kami sebelum terisi penuh</p>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-14 sm:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Testimoni Klien</span>
            <h2 className="font-display mt-2 text-2xl font-bold text-navy sm:text-4xl">
              Dipercaya Ratusan Pebisnis &amp; Startup
            </h2>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-xs">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-neutral-600">
                &ldquo;Bonus konsultasi legalnya sangat membantu! Tim EasyLegal langsung bantu proses pendirian PT kami.
                Semuanya di satu tempat, sangat efisien dan hemat waktu.&rdquo;
              </p>
              <div className="mt-5 border-t border-neutral-200 pt-3">
                <strong className="block text-xs font-bold text-navy">Dina Nurmala</strong>
                <span className="text-[11px] text-neutral-500">Owner Startup Tech</span>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-xs">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-neutral-600">
                &ldquo;Awalnya coba trial, eh langsung cocok. Ruangannya bersih, fasilitas lengkap, dan stafnya ramah. Sekarang
                sudah 3 bulan di sini dan sangat nyaman untuk meeting bersama klien.&rdquo;
              </p>
              <div className="mt-5 border-t border-neutral-200 pt-3">
                <strong className="block text-xs font-bold text-navy">Bagas Wicaksono</strong>
                <span className="text-[11px] text-neutral-500">Direktur Agency Digital</span>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 shadow-xs">
              <div className="flex gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400" />
                ))}
              </div>
              <p className="mt-4 text-xs leading-relaxed text-neutral-600">
                &ldquo;Sebelumnya saya ragu antara sewa ruko atau kantor privat. Akhirnya pilih private office EasyOffice dan
                tidak menyesal. Klien jadi lebih percaya ketika meeting di sini.&rdquo;
              </p>
              <div className="mt-5 border-t border-neutral-200 pt-3">
                <strong className="block text-xs font-bold text-navy">Rizky Adi</strong>
                <span className="text-[11px] text-neutral-500">Konsultan Bisnis</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-700">FAQ</span>
            <h2 className="font-display mt-2 text-2xl font-bold text-navy sm:text-4xl">Pertanyaan yang Sering Diajukan</h2>
          </div>

          <div className="mt-10 space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs transition"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-navy hover:bg-neutral-50"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen ? (
                    <div className="border-t border-neutral-100 p-5 pt-3 text-xs leading-relaxed text-neutral-600">
                      {faq.a}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Bottom Sticky Action Floating Button */}
      <div className="fixed bottom-5 right-5 z-40">
        <a
          href={waBookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full bg-emerald-600 px-5 py-3.5 text-sm font-bold text-white shadow-xl transition hover:bg-emerald-500 hover:scale-105"
        >
          <MessageCircle className="h-5 w-5" />
          <span>Chat WhatsApp CS</span>
        </a>
      </div>
    </div>
  );
}
