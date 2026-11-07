"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  Zap,
  Coins,
  Gift,
  Users,
  ArrowLeft,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import "./lp-eo.css";

const marqueeWords = [
  "BANDUNG",
  "JAKARTA",
  "BEKASI",
  "BISA PKP",
  "LEGALITAS GEDUNG LENGKAP",
  "SERBA ONLINE 10 MENIT",
  "AKSES MEETING HINGGA 70 JAM/TAHUN",
  "MULAI RP 166.583/BULAN",
  "BONUS LOGAM MULIA 24K",
];

const facilities = [
  { name: "Company Signage", description: "Papan nama perusahaan resmi di lobi gedung" },
  { name: "Proyektor & Smart TV", description: "Tersedia di meeting room untuk presentasi profesional" },
  { name: "IMB & Legalitas Gedung", description: "Kelengkapan zonasi komersial terjamin resmi" },
  { name: "Alamat Domisili Gedung", description: "Alamat sah untuk keperluan akta, NIB, dan pajak" },
  { name: "Internet High Speed", description: "Koneksi cepat stabil untuk kebutuhan kerja & rapat" },
  { name: "Penerima Surat & Tamu", description: "Resepsionis profesional ramah menyambut tamu Anda" },
];

const offices = [
  {
    city: "Cilandak, Jakarta Selatan",
    name: "Jakarta",
    address: "Dewata Office, Sovereign Plaza, 12th Floor, Jl. TB Simatupang No. 36, Cilandak Barat, Jakarta Selatan 12430",
    facilities: ["Alamat komersial", "Dapat digunakan untuk PKP", "Legalitas gedung lengkap", "Meeting Room"],
    photo: "/images/lp-eo/location-jakarta.jpg",
  },
  {
    city: "Cihampelas, Bandung",
    name: "Bandung",
    address: "Jl. Cihampelas No.201A, RT/RW 01/02 Cipaganti, Kec. Coblong, Kota Bandung, Jawa Barat 40131",
    facilities: ["Alamat komersial", "Dapat digunakan untuk PKP", "LED Smart TV & WIFI", "Meeting Room"],
    photo: "/images/lp-eo/location-bandung.jpg",
  },
  {
    city: "Summarecon, Bekasi",
    name: "Bekasi",
    address: "Emerald Commercial Summarecon Bekasi Blok UF No. 10, Jl. Bulevar Selatan, Marga Mulya, Bekasi Utara 17142",
    facilities: ["Alamat komersial", "Dapat digunakan untuk PKP", "Meeting Room & Whiteboard"],
    photo: "/images/lp-eo/location-bekasi.jpg",
  },
];

const testimonials = [
  {
    quote: "Alamat kantor di Sovereign Plaza bikin bisnis saya jauh lebih kredibel di mata klien. Proses sewa cepat dan tim EasyOffice sangat responsif.",
    name: "Dimas Prasetyo",
    service: "Virtual Office Jakarta",
    initials: "DP",
  },
  {
    quote: "PKP perusahaan saya kelar tanpa ribet. Harga jauh lebih hemat dibanding sewa kantor fisik dan fasilitas meeting room-nya sangat nyaman.",
    name: "Rania Kusuma",
    service: "Virtual Office Bandung",
    initials: "RK",
  },
  {
    quote: "Meeting room-nya lengkap dan representatif untuk ketemu investor. Penanganan paket dan surat bisnis selalu tercatat rapi.",
    name: "Yoga Firmansyah",
    service: "Virtual Office Bekasi",
    initials: "YF",
  },
];

const faqs = [
  {
    question: "Apa itu Virtual Office?",
    answer: "Virtual Office adalah layanan kantor tanpa ruang fisik yang memberikan alamat bisnis prestisius di zona komersial resmi, layanan penerimaan surat dan paket, serta fasilitas meeting room untuk mendukung operasional bisnis Anda secara profesional.",
  },
  {
    question: "Apa saja keuntungan menggunakan Virtual Office EasyOffice?",
    answer: "Hemat biaya sewa hingga 90% dibandingkan sewa ruang kantor konvensional, meningkatkan kepercayaan klien dengan alamat prestisius di 3 kota besar, serta mendapatkan akses meeting room hingga 70 jam/tahun lengkap dengan proyektor dan internet cepat.",
  },
  {
    question: "Apakah Virtual Office EasyOffice bisa dipakai untuk PKP?",
    answer: "Ya, gedung yang digunakan EasyOffice memiliki zonasi komersial dan legalitas lengkap sehingga dapat diajukan untuk Pengukuhan Pengusaha Kena Pajak (PKP) sesuai regulasi perpajakan yang berlaku (khususnya bidang usaha jasa).",
  },
  {
    question: "Berapa lama proses aktivasi alamat kantor?",
    answer: "Proses aktivasi berlangsung serba online dan dapat selesai dalam waktu 10-15 menit setelah dokumen identitas dan pembayaran terkonfirmasi.",
  },
  {
    question: "Apakah saya bisa menggunakan meeting room di kota lain?",
    answer: "Ya! Dengan 1 kontrak alamat bisnis, Anda dapat mengakses fasilitas ruang rapat di lokasi-lokasi EasyOffice (Bandung, Bekasi, Jakarta) sesuai kuota paket yang Anda miliki.",
  },
];

const lokasiOptions = [
  "Virtual Office Jakarta (TB Simatupang)",
  "Virtual Office Bandung (Cihampelas)",
  "Virtual Office Bekasi (Summarecon)",
  "Belum yakin, ingin konsultasi lokasi terbaik",
];

export default function LandingPageMetaAds() {
  const router = useRouter();
  const [activeOffice, setActiveOffice] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Countdown timer: 24-hour cycle
  const [countdown, setCountdown] = useState({ hours: "23", minutes: "59", seconds: "59" });
  useEffect(() => {
    const deadline = Date.now() + 24 * 60 * 60 * 1000;
    const interval = setInterval(() => {
      const diff = Math.max(0, deadline - Date.now());
      const h = Math.floor(diff / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);
      setCountdown({
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    nama: "",
    whatsapp: "",
    lokasi: "Virtual Office Jakarta (TB Simatupang)",
    kebutuhan: "Paket Bisnis",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"" | "success" | "error">("");

  const selectPaketAndScroll = (paketName: string) => {
    setFormData((prev) => ({ ...prev, kebutuhan: paketName }));
    document.getElementById("konsultasi")?.scrollIntoView({ behavior: "smooth" });
  };

  const selectLokasiAndScroll = (lokasiName: string) => {
    setFormData((prev) => ({ ...prev, lokasi: lokasiName }));
    document.getElementById("konsultasi")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitStatus("");
    const submissionId = `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    try {
      const leadEndpoint = process.env.NEXT_PUBLIC_LEAD_ENDPOINT;
      if (leadEndpoint) {
        await fetch(leadEndpoint, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify({
            submissionId,
            nama: formData.nama,
            whatsapp: formData.whatsapp,
            lokasi: formData.lokasi,
            kebutuhan: formData.kebutuhan,
            source: "easyoffice-metaads",
          }),
        });
      }

      // Call server Meta CAPI
      fetch("/api/fb-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: submissionId, nama: formData.nama, whatsapp: formData.whatsapp }),
      }).catch((err) => console.info("Meta CAPI lead error:", err));

      setSubmitStatus("success");
      const params = new URLSearchParams({
        nama: formData.nama,
        lokasi: formData.lokasi,
        paket: formData.kebutuhan,
      });
      router.push(`/thankyoupage-sewa-virtualoffice-easyoffice-metaads/?${params.toString()}`);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="easyoffice-page">
      {/* FLOATING GLASS NAV */}
      <nav className="pill-nav">
        <a href="#beranda" className="pill-brand" aria-label="EasyOffice">
          <Image src="/images/lp-eo/easyoffice-logo.png" alt="EasyOffice" width={28} height={28} className="pill-logo" />
          <span>Easy<b>Office</b></span>
        </a>
        <div className="pill-nav-right">
          <a href="#perbandingan" className="pill-nav-link">Keunggulan</a>
          <a href="#paket" className="pill-nav-link">Pilihan Paket</a>
          <a href="#lokasi" className="pill-nav-link">Lokasi</a>
          <a href="#konsultasi" className="pill-cta">KONSULTASI SEKARANG</a>
        </div>
      </nav>

      {/* SECTION 1: HERO */}
      <section id="beranda" className="section-hero">
        <div className="hero-mesh" aria-hidden="true" />
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="pulse-dot" />
              <span>Virtual Office Legal • Bandung • Bekasi • Jakarta</span>
            </div>

            <h1>
              Hemat 90% Tanpa Harus<br />
              Sewa Kantor Fisik Mahal<br />
              <em>Dengan Alamat Bisnis</em>
            </h1>

            <p className="hero-lead">
              Jadikan bisnis lebih kredibel dan terpercaya di mata mitra dan klien tanpa menghabiskan banyak uang. Selesaikan legalitas dengan sewa alamat kantor dari EasyOffice yang sudah tersebar di 3 kota besar: Bandung, Bekasi, dan Jakarta.
            </p>

            <div className="hero-actions">
              <a href="#konsultasi" className="btn btn-primary btn-cta">
                KONSULTASI SEKARANG <span>→</span>
              </a>
              <a href="https://wa.me/62818881425?text=Halo%20EasyOffice%2C%20saya%20tertarik%20sewa%20Virtual%20Office" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-wa">
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                <span>Chat WhatsApp</span>
              </a>
            </div>

            <div className="hero-trust-bar">
              <div className="trust-item">
                <ShieldCheck className="h-4.5 w-4.5 text-amber-500" />
                <span>100% Legal PT & CV</span>
              </div>
              <div className="trust-item">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
                <span>Bisa Pengajuan PKP</span>
              </div>
              <div className="trust-item">
                <Zap className="h-4.5 w-4.5 text-blue-500" />
                <span>Proses 10 Menit</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-image">
              <Image
                src="/images/lp-eo/office-building.jpg"
                alt="Gedung representatif EasyOffice lokasi virtual office"
                width={600}
                height={500}
                priority
                className="hero-main-img"
              />
              <div className="hero-badge hero-badge-top">
                <ShieldCheck className="h-4.5 w-4.5 text-amber-500" />
                <div>
                  <b>Legalitas Gedung Resmi</b>
                  <small>Memenuhi syarat domisili & zonasi</small>
                </div>
              </div>
              <div className="hero-badge hero-badge-bottom">
                <div className="badge-accent-tag">3 KOTA</div>
                <div>
                  <b>Bandung • Bekasi • Jakarta</b>
                  <small>Akses meeting room strategis</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INFINITE MARQUEE */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...Array(2)].map((_, n) => (
            <span key={n} className="marquee-group">
              {marqueeWords.map((word) => (
                <span key={word + n}>
                  <span className="marquee-word">{word}</span>
                  <span className="marquee-dot">&middot;</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* SECTION 2: PROBLEM-SOLUTION & PROOF */}
      <section className="section section-solution">
        <div className="container">
          <div className="solution-grid">
            <div className="solution-visual">
              <div className="solution-img-card">
                <Image
                  src="/images/lp-eo/meeting-room-real.jpg"
                  alt="Fasilitas meeting room representatif EasyOffice"
                  width={540}
                  height={420}
                  className="solution-img"
                />
                <div className="solution-pill-tag">
                  <Clock className="h-4.5 w-4.5" />
                  <span>Akses Meeting Hingga 70 Jam/Tahun</span>
                </div>
              </div>
            </div>

            <div className="solution-copy">
              <div className="badge-pill">FASILITAS PREMIUM</div>
              <h2>
                Layanan Sewa Alamat Kantor<br />
                <em>dengan biaya yang terjangkau namun fasilitas premium</em>
              </h2>

              <p className="solution-lead">
                EasyOffice adalah jawaban atas keresahan Anda yang bingung soal alamat kantor. Tidak perlu repot lagi mencari kantor fisik yang mahal. Sewa alamat bisnis di EasyOffice bisa dapat akses meeting hingga 70 jam/tahun.
              </p>

              <div className="solution-proof-grid">
                <div className="proof-card">
                  <div className="proof-icon">
                    <Users className="h-6 w-6 text-navy" />
                  </div>
                  <div className="proof-text">
                    <h3>Dipercaya 13.000+ klien</h3>
                    <p>Startup, profesional, dan ratusan badan usaha aktif menggunakan domisili EasyOffice.</p>
                  </div>
                </div>

                <div className="proof-card">
                  <div className="proof-icon">
                    <Building2 className="h-6 w-6 text-navy" />
                  </div>
                  <div className="proof-text">
                    <h3>Lokasi di 3 Kota Besar</h3>
                    <p>Gedung perkantoran prestisius di Jakarta Selatan, Bandung, dan Bekasi siap digunakan.</p>
                  </div>
                </div>

                <div className="proof-card">
                  <div className="proof-icon">
                    <ShieldCheck className="h-6 w-6 text-navy" />
                  </div>
                  <div className="proof-text">
                    <h3>Bisa untuk PKP</h3>
                    <p>Memudahkan proses pendaftaran legalitas bisnis, termasuk verifikasi status PKP.</p>
                  </div>
                </div>

                <div
                  className="proof-card proof-card--image"
                  style={{
                    backgroundImage: "linear-gradient(180deg, rgba(10, 14, 39, 0.1), rgba(10, 14, 39, 0.88)), url('/images/lp-eo/benefit-citra.jpg')",
                    backgroundSize: "cover",
                  }}
                >
                  <div className="proof-icon">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="proof-text">
                    <h3>Naikkan Citra Perusahaan</h3>
                    <p className="text-white/80">Alamat strategis yang meningkatkan citra profesional perusahaan Anda.</p>
                  </div>
                </div>
              </div>

              <div className="solution-actions">
                <a href="#konsultasi" className="btn btn-primary btn-cta">
                  KONSULTASI SEKARANG <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: COMPARISON TABLE */}
      <section id="perbandingan" className="section section-comparison">
        <div className="container">
          <div className="section-heading">
            <div className="badge-pill">PERBANDINGAN DETAIL</div>
            <h2>Kenapa Harus EasyOffice?<br /><em>Bukan yang lain</em></h2>
            <p>Bandingkan sebelum memilih. Lihat langsung bagaimana EasyOffice memberikan solusi kantor bisnis paling hemat, transparan, dan lengkap.</p>
          </div>

          <div className="table-container-card">
            <div className="table-scroll-note">
              <span>← Geser tabel untuk melihat perbandingan (Kolom kriteria terkunci) →</span>
            </div>

            <div className="comparison-scroll-wrapper">
              <table className="comparison-matrix">
                <thead>
                  <tr>
                    <th className="col-kriteria">KRITERIA</th>
                    <th className="col-easyoffice">
                      <div className="eo-header-badge">REKOMENDASI TERBAIK</div>
                      <div className="eo-header-title">EASYOFFICE</div>
                    </th>
                    <th className="col-other">JASA VO LAIN</th>
                    <th className="col-physical">SEWA KANTOR FISIK</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="col-kriteria">
                      <div className="kriteria-header-cell">
                        <Coins className="h-5 w-5" />
                        <span>BIAYA</span>
                      </div>
                    </td>
                    <td className="col-easyoffice">
                      <div className="eo-content-box">
                        <div className="eo-price-tag">Setara Mulai Rp166.583/bulan</div>
                        <div className="eo-sub-note">tanpa biaya tambahan apapun</div>
                      </div>
                    </td>
                    <td className="col-other">Rata-rata 24-30% lebih mahal, tidak mencantumkan harga di awal</td>
                    <td className="col-physical">Puluhan juta rupiah per bulan untuk jangka waktu pendek</td>
                  </tr>

                  <tr>
                    <td className="col-kriteria">
                      <div className="kriteria-header-cell">
                        <Zap className="h-5 w-5" />
                        <span>PROSES</span>
                      </div>
                    </td>
                    <td className="col-easyoffice">
                      <div className="eo-content-box">
                        <strong>Serba online</strong>
                        <span className="eo-accent-text">10 menit langsung beres</span>
                      </div>
                    </td>
                    <td className="col-other">1-3 hari kerja dengan birokrasi berbelit</td>
                    <td className="col-physical">Berminggu-minggu survei, negosiasi, dan notaris</td>
                  </tr>

                  <tr>
                    <td className="col-kriteria">
                      <div className="kriteria-header-cell">
                        <ShieldCheck className="h-5 w-5" />
                        <span>LEGALITAS & PKP</span>
                      </div>
                    </td>
                    <td className="col-easyoffice">
                      <div className="eo-content-box">
                        <strong>100% Legal & Sah</strong>
                        <span className="eo-accent-text">Bisa pengajuan PKP & zonasi komersial</span>
                      </div>
                    </td>
                    <td className="col-other">Zonasi belum tentu komersial, berisiko ditolak KPP</td>
                    <td className="col-physical">Legal, tetapi biaya survei dan administrasi mahal</td>
                  </tr>

                  <tr>
                    <td className="col-kriteria">
                      <div className="kriteria-header-cell">
                        <Building2 className="h-5 w-5" />
                        <span>MEETING ROOM</span>
                      </div>
                    </td>
                    <td className="col-easyoffice">
                      <div className="eo-content-box">
                        <strong>Free hingga 70 jam/tahun</strong>
                        <span className="eo-sub-note">Lengkap Smart TV, proyektor & wifi</span>
                      </div>
                    </td>
                    <td className="col-other">Dikenakan biaya tambahan per jam yang mahal</td>
                    <td className="col-physical">Harus beli perabot dan proyektor sendiri</td>
                  </tr>

                  <tr>
                    <td className="col-kriteria">
                      <div className="kriteria-header-cell">
                        <MapPin className="h-5 w-5" />
                        <span>LOKASI</span>
                      </div>
                    </td>
                    <td className="col-easyoffice">
                      <div className="eo-content-box">
                        <strong>3 Kota Besar Indonesia</strong>
                        <span className="eo-sub-note">Jakarta, Bandung, dan Bekasi</span>
                      </div>
                    </td>
                    <td className="col-other">Hanya 1 titik lokasi terbatas</td>
                    <td className="col-physical">Terikat kontrak sewa gedung 2–5 tahun</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: MACAM-MACAM PAKET (PRICING TIERS) */}
      <section id="paket" className="section section-pricing">
        <div className="container">
          <div className="section-heading">
            <div className="badge-pill">PILIHAN HARGA TERBAIK</div>
            <h2>Macam-Macam Paket<br /><em>yang Kami Sediakan</em></h2>
            <p>Pilih sesuai kebutuhan Anda. Semua paket sudah termasuk alamat kantor prestisius di zona komersial resmi.</p>
          </div>

          <div className="pricing-grid">
            {/* TIER 1: EKONOMI */}
            <article className="pricing-card">
              <div className="pricing-header">
                <h3 className="tier-name">PAKET EKONOMI</h3>
                <p className="tier-desc">Cocok untuk startup & freelancer yang membutuhkan legalitas domisili hemat.</p>
                <div className="price-box">
                  <span className="old-price">Rp 4.000.000</span>
                  <div className="main-price">
                    <span className="currency">Rp</span>
                    <span className="amount">1.999.000<span className="amount-period">/1Tahun</span></span>
                  </div>
                  <div className="installment-badge">
                    Setara: <b>Hanya Rp 166.583/Bulan</b>
                  </div>
                </div>
              </div>

              <div className="pricing-body">
                <h4 className="features-title">Layanan:</h4>
                <ul className="feature-checklist">
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Virtual Office 1 Tahun</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Alamat Bisnis Komersial & Bergengsi</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Surat Perjanjian Sewa & Domisili</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Resepsionis Profesional</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Mail Handling & Notifikasi Real-Time</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>High Speed Internet</span></li>
                  <li className="check-no"><XCircle className="h-4 w-4 text-neutral-300" /><span>Smart TV & Whiteboard</span></li>
                  <li className="check-no"><XCircle className="h-4 w-4 text-neutral-300" /><span>Akses Ruang Meeting Bulanan</span></li>
                  <li className="check-no"><XCircle className="h-4 w-4 text-neutral-300" /><span>Penggunaan Virtual Office untuk PKP</span></li>
                </ul>

                <div className="bonus-divider" />
                <h4 className="features-title bonus-heading">BONUS:</h4>
                <ul className="feature-checklist bonus-checklist">
                  <li className="check-bonus"><Gift className="h-4 w-4 text-amber-500" /><span><b>1 pcs Logam Mulia Emas 24K</b></span></li>
                </ul>
              </div>

              <div className="pricing-footer">
                <button type="button" className="btn btn-secondary btn-tier" onClick={() => selectPaketAndScroll("Paket Ekonomi")}>
                  KONSULTASI SEKARANG <span>→</span>
                </button>
              </div>
            </article>

            {/* TIER 2: BISNIS (POPULAR) */}
            <article className="pricing-card pricing-featured">
              <div className="featured-badge">PALING POPULER & REKOMENDASI</div>
              <div className="pricing-header">
                <h3 className="tier-name">PAKET BISNIS</h3>
                <p className="tier-desc">Pilihan terbaik untuk PT/CV aktif yang membutuhkan akses ruang rapat & PKP.</p>
                <div className="price-box">
                  <span className="old-price">Rp 5.000.000</span>
                  <div className="main-price">
                    <span className="currency">Rp</span>
                    <span className="amount">2.599.000<span className="amount-period">/1Tahun</span></span>
                  </div>
                  <div className="installment-badge installment-badge-gold">
                    Setara: <b>Hanya Rp 199.923/Bulan</b>
                  </div>
                </div>
              </div>

              <div className="pricing-body">
                <h4 className="features-title">Layanan:</h4>
                <ul className="feature-checklist">
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Virtual Office 1 Tahun</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Alamat Bisnis Komersial & Bergengsi</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Surat Perjanjian Sewa & Domisili</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Resepsionis Profesional</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Mail Handling & Notifikasi Real-Time</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>High Speed Internet</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Smart TV & Whiteboard</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span><b>Akses Ruang Meeting 6 Jam/Bulan</b></span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span><b>Penggunaan Virtual Office untuk PKP</b></span></li>
                </ul>

                <div className="bonus-divider" />
                <h4 className="features-title bonus-heading">BONUS:</h4>
                <ul className="feature-checklist bonus-checklist">
                  <li className="check-bonus"><Gift className="h-4 w-4 text-amber-500" /><span><b>1 pcs Logam Mulia Emas 24K</b></span></li>
                  <li className="check-bonus"><Gift className="h-4 w-4 text-amber-500" /><span><b>100+ E-Course digital marketing</b></span></li>
                </ul>
              </div>

              <div className="pricing-footer">
                <button type="button" className="btn btn-primary btn-tier" onClick={() => selectPaketAndScroll("Paket Bisnis")}>
                  KONSULTASI SEKARANG <span>→</span>
                </button>
              </div>
            </article>

            {/* TIER 3: EKSEKUTIF */}
            <article className="pricing-card">
              <div className="pricing-header">
                <h3 className="tier-name">PAKET EKSEKUTIF</h3>
                <p className="tier-desc">Fasilitas VIP terlengkap dengan kuota meeting 12 jam & logo resmi di lobi gedung.</p>
                <div className="price-box">
                  <span className="old-price">Rp 8.000.000</span>
                  <div className="main-price">
                    <span className="currency">Rp</span>
                    <span className="amount">3.999.000<span className="amount-period">/1Tahun</span></span>
                  </div>
                  <div className="installment-badge">
                    Setara: <b>Hanya Rp 266.600/Bulan</b>
                  </div>
                </div>
              </div>

              <div className="pricing-body">
                <h4 className="features-title">Layanan:</h4>
                <ul className="feature-checklist">
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Virtual Office 1 Tahun</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Alamat Bisnis Komersial & Bergengsi</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Surat Perjanjian Sewa & Domisili</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Resepsionis Profesional</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span>Mail Handling & Notifikasi Real-Time</span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span><b>Akses Ruang Meeting 12 Jam/Bulan</b></span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span><b>Penggunaan Virtual Office untuk PKP</b></span></li>
                  <li className="check-yes"><CheckCircle2 className="h-4 w-4 text-emerald-600" /><span><b>Papan Nama & Logo di Lobi Gedung</b></span></li>
                </ul>

                <div className="bonus-divider" />
                <h4 className="features-title bonus-heading">BONUS:</h4>
                <ul className="feature-checklist bonus-checklist">
                  <li className="check-bonus"><Gift className="h-4 w-4 text-amber-500" /><span><b>2 pcs Logam Mulia Emas 24K</b></span></li>
                  <li className="check-bonus"><Gift className="h-4 w-4 text-amber-500" /><span><b>100+ E-Course + 2.500+ Template</b></span></li>
                </ul>
              </div>

              <div className="pricing-footer">
                <button type="button" className="btn btn-secondary btn-tier" onClick={() => selectPaketAndScroll("Paket Eksekutif")}>
                  KONSULTASI SEKARANG <span>→</span>
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* LOCATIONS SLIDER */}
      <section id="lokasi" className="section location-section">
        <div className="container">
          <div className="section-heading">
            <h2>Pilihan lokasi,<br /><em>tanpa biaya tersembunyi.</em></h2>
            <p>Pilih alamat kantor representatif di pusat bisnis kota idaman Anda.</p>
          </div>
        </div>

        <div className="location-slider">
          <button type="button" className="slider-arrow slider-arrow--prev" aria-label="Lokasi sebelumnya" onClick={() => setActiveOffice((prev) => (prev === 0 ? offices.length - 1 : prev - 1))}>
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div className="location-track">
            {offices.map((office, idx) => (
              <article
                key={office.city}
                className={`location-slide ${activeOffice === idx ? "active" : ""}`}
                style={{ backgroundImage: `url(${office.photo})` }}
              >
                <div className="accordion-veil" />
                <div className="accordion-detail">
                  <span className="accordion-city">{office.city}</span>
                  <h3>EasyOffice {office.name}</h3>
                  <p>{office.address}</p>
                  <div className="accordion-facilities">
                    {office.facilities.map((item) => (
                      <span key={item}>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {item}
                      </span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => selectLokasiAndScroll(`Virtual Office ${office.name}`)}
                  >
                    KONSULTASI SEKARANG <span>→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          <button type="button" className="slider-arrow slider-arrow--next" aria-label="Lokasi berikutnya" onClick={() => setActiveOffice((prev) => (prev + 1) % offices.length)}>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        <div className="location-dots">
          {offices.map((office, idx) => (
            <button
              key={office.city}
              type="button"
              className={`location-dot ${activeOffice === idx ? "active" : ""}`}
              onClick={() => setActiveOffice(idx)}
              aria-label={`Pilih ${office.name}`}
            />
          ))}
        </div>
      </section>

      {/* SECTION 5: PROMO URGENCY BANNER */}
      <section className="section section-promo-urgency">
        <div className="container">
          <div className="promo-card">
            <div className="promo-content">
              <div className="promo-badge-tag">
                <span className="pulse-dot" />
                <span>PENAWARAN SPESIAL TERBATAS</span>
              </div>

              <h2 className="promo-title">
                Dapatkan Promo Menarik<br />
                <span className="promo-deadline-date">Hanya 1x24 Jam!</span>
              </h2>

              <p className="promo-sub">
                Segera hubungi tim kami agar tidak kehilangan kesempatan Virtual Office dengan harga terbaik.
              </p>

              <div className="countdown-row">
                <div className="countdown-unit">
                  <span className="countdown-val">{countdown.hours}</span>
                  <span className="countdown-lbl">JAM</span>
                </div>
                <span className="countdown-sep">:</span>
                <div className="countdown-unit">
                  <span className="countdown-val">{countdown.minutes}</span>
                  <span className="countdown-lbl">MENIT</span>
                </div>
                <span className="countdown-sep">:</span>
                <div className="countdown-unit">
                  <span className="countdown-val">{countdown.seconds}</span>
                  <span className="countdown-lbl">DETIK</span>
                </div>
              </div>

              <div className="promo-action">
                <a href="#konsultasi" className="btn btn-primary btn-cta btn-promo-cta">
                  KONSULTASI SEKARANG <span>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: DAFTAR SEGERA FORM */}
      <section id="konsultasi" className="section section-register-form">
        <div className="container register-container">
          <div className="register-header">
            <div className="badge-pill">FORMULIR KONSULTASI GRATIS</div>
            <h2>Daftar Segera</h2>
            <p className="register-lead">
              Isi data di bawah ini dan langsung konsultasi dengan tim kami secara <b>GRATIS!</b>
            </p>
          </div>

          <form className="lead-form register-form-box" onSubmit={handleSubmit}>
            <div className="form-grid-fields">
              <label className="form-field">
                <span className="field-label">NAMA LENGKAP:</span>
                <input
                  type="text"
                  name="nama"
                  placeholder="Masukkan nama lengkap Anda"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  required
                />
              </label>

              <label className="form-field">
                <span className="field-label">NOMOR WHATSAPP:</span>
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="Contoh: 0812 3456 7890"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  required
                />
              </label>

              <label className="form-field">
                <span className="field-label">PILIHAN PAKET:</span>
                <select
                  value={formData.kebutuhan}
                  onChange={(e) => setFormData({ ...formData, kebutuhan: e.target.value })}
                  required
                >
                  <optgroup label="Paket Virtual Office Utama">
                    <option value="Paket Ekonomi">Paket Ekonomi — Rp 1.999.000</option>
                    <option value="Paket Bisnis">Paket Bisnis — Rp 2.599.000 [Rekomendasi]</option>
                    <option value="Paket Eksekutif">Paket Eksekutif — Rp 3.999.000</option>
                  </optgroup>
                  <optgroup label="Produk Lainnya">
                    <option value="Virtual Office + Pendaftaran PKP">Virtual Office + Pendaftaran PKP</option>
                    <option value="Virtual Office + Pendirian PT/CV">Virtual Office + Pendirian PT/CV</option>
                    <option value="Sewa Meeting Room Saja">Sewa Meeting Room Saja</option>
                    <option value="Konsultasi Paket Kustom">Konsultasi Paket Kustom</option>
                  </optgroup>
                </select>
              </label>

              <label className="form-field">
                <span className="field-label">LOKASI KANTOR YANG DIMINATI:</span>
                <select
                  value={formData.lokasi}
                  onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                  required
                >
                  {lokasiOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </label>
            </div>

            <button type="submit" className="btn btn-primary submit-btn btn-cta" disabled={isSubmitting}>
              {isSubmitting ? "Mengirim Data..." : "KONSULTASI SEKARANG"} <span>→</span>
            </button>

            {submitStatus === "error" && (
              <p className="form-feedback form-error" role="alert">
                Form belum berhasil dikirim. Silakan coba kembali atau klik WhatsApp langsung.
              </p>
            )}

            <div className="form-trust-checklist">
              <div className="form-trust-check-item">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>Garansi Aman 100%</span>
              </div>
              <div className="form-trust-check-item">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>Dipercaya 13.000+ Klien</span>
              </div>
              <div className="form-trust-check-item">
                <CheckCircle2 className="h-5 w-5 text-amber-500" />
                <span>Bonus Emas 24K Hari Ini</span>
              </div>
            </div>

            <div className="form-trust-notes">
              <span>🔒 Data privasi Anda 100% aman dan terenkripsi</span>
              <span>⚡ Respon cepat melalui WhatsApp resmi EasyOffice</span>
            </div>
          </form>
        </div>
      </section>

      {/* SECTION 8: STACK CARD FASILITAS */}
      <section className="section stack-section">
        <div className="container">
          <div className="section-heading">
            <h2>Satu alamat untuk<br /><em>semua kebutuhan bisnis.</em></h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((fac, idx) => (
              <article key={fac.name} className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
                <span className="font-display text-3xl font-extrabold text-navy/20">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-3 text-lg font-bold text-navy">{fac.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{fac.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9: TESTIMONI CAROUSEL */}
      <section className="section carousel-section">
        <div className="container">
          <div className="section-heading">
            <h2>Ungkapan Klien<br /><em>Tentang Pelayanan Kami.</em></h2>
          </div>

          <div className="carousel">
            <div className="carousel-avatars">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  className={`carousel-avatar ${activeTestimonial === i ? "active" : ""}`}
                  onClick={() => setActiveTestimonial(i)}
                >
                  {t.initials}
                </button>
              ))}
            </div>

            <div className="carousel-body">
              <div className="stars">★★★★★</div>
              <blockquote>&ldquo;{testimonials[activeTestimonial].quote}&rdquo;</blockquote>
              <footer>
                <b>{testimonials[activeTestimonial].name}</b>
                <span>{testimonials[activeTestimonial].service}</span>
              </footer>
            </div>

            <div className="carousel-arrows">
              <button
                type="button"
                aria-label="Testimoni sebelumnya"
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Testimoni berikutnya"
                onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: FAQ */}
      <section className="section faq-section">
        <div className="container">
          <div className="section-heading">
            <h2>Pertanyaan yang<br /><em>sering ditanyakan.</em></h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <article key={faq.question} className={`faq-item ${openFaqIndex === idx ? "open" : ""}`}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                >
                  <span>{faq.question}</span>
                  <span className="faq-toggle">{openFaqIndex === idx ? "−" : "+"}</span>
                </button>
                {openFaqIndex === idx && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
