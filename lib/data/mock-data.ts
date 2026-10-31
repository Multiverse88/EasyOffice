import type {
  ComparisonRow,
  Facility,
  Faq,
  Location,
  PricingPlan,
  Promotion,
  Service,
  ServiceLocation,
  Testimonial,
} from "@/types";
import { locationWhatsappNumber } from "@/lib/whatsapp";

/* ------------------------------------------------------------------ */
/* Site                                                                */
/* ------------------------------------------------------------------ */

export const site = {
  name: "EasyOffice",
  tagline: "Miliki Alamat Kantor Premium di Kota Besar Indonesia",
  email: "id.easyoffice@gmail.com",
  phoneDisplay: "0818 881 425",
  whatsapp: "62818881425",
};

/* ------------------------------------------------------------------ */
/* Locations                                                           */
/* ------------------------------------------------------------------ */

export const locations: Location[] = [
  {
    slug: "bandung",
    name: "Bandung",
    shortDescription:
      "Lokasi utama EasyOffice di Cihampelas Bandung — alamat bisnis komersial prestisius, legalitas lengkap, dan bisa PKP.",
    address:
      "Jl. Cihampelas No.201A, RT/RW 01/02 Cipaganti, Kec. Coblong, Kota Bandung, Jawa Barat 40131",
    operatingHours: "Senin–Jumat, 08.00–17.00 WIB",
    email: "id.easyoffice@gmail.com",
    phoneDisplay: "022 3209 9037",
    whatsapp: "62818881425",
  },
  {
    slug: "jakarta",
    name: "Jakarta",
    shortDescription:
      "Kantor representatif di Sovereign Plaza TB Simatupang Jakarta Selatan untuk meningkatkan kredibilitas bisnis Anda.",
    address:
      "Dewata Office, Sovereign Plaza, 12th Floor, Jl. TB Simatupang No. 36, Cilandak Barat, Cilandak, Jakarta Selatan 12430",
    operatingHours: "Senin–Jumat, 08.00–17.00 WIB",
    email: "id.easyoffice@gmail.com",
    phoneDisplay: "021 2940 0153",
    whatsapp: "62818881425",
  },
  {
    slug: "bekasi",
    name: "Bekasi",
    shortDescription:
      "Alternatif strategis dan hemat di Emerald Commercial Summarecon Bekasi dengan legalitas gedung lengkap dan siap PKP.",
    address:
      "Emerald Commercial Summarecon Bekasi Blok UF No. 10, Jl. Bulevar Selatan, Marga Mulya, Bekasi Utara, Kota Bekasi, Jawa Barat 17142",
    operatingHours: "Senin–Jumat, 08.00–17.00 WIB",
    email: "id.easyoffice@gmail.com",
    phoneDisplay: "0818 881 425",
    whatsapp: "62818881425",
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export const services: Service[] = [
  {
    slug: "virtual-office",
    title: "Virtual Office",
    shortTitle: "Virtual Office",
    description:
      "Alamat bisnis profesional, layanan surat, dan resepsionis tanpa perlu sewa kantor fisik. Bisa untuk pengurusan legalitas PT, CV, dan pendaftaran PKP.",
    intro:
      "Virtual Office sudah disetujui pemerintah dan dapat digunakan untuk keperluan legalitas seperti pendirian PT, CV, dan pendaftaran PKP praktis dan efisien.",
    benefits: [
      "Alamat Prestisius — tingkatkan citra dan kepercayaan klien dengan alamat bisnis komersial di lokasi strategis.",
      "Hemat Biaya — nikmati fasilitas kantor tanpa biaya sewa ruang fisik dan operasional gedung.",
      "Layanan Resepsionis — tim profesional menyambut tamu dan mengelola surat dokumen atas nama perusahaan Anda.",
      "Bisa PKP — berlokasi di gedung komersial resmi dengan IMB dan PBB yang sah untuk pendaftaran PKP.",
    ],
    keunggulanItems: [
      { icon: "map-pin", title: "Lokasi Prestisius", description: "Tingkatkan citra profesional bisnis Anda dengan lokasi strategis di area bergengsi kota besar.", image: "/images/easyoffice/keuntungan-lokasi-prestisius.png" },
      { icon: "wallet", title: "Transaksi Aman", description: "Kami memastikan setiap transaksi aman dan terpercaya melalui marketplace resmi Shopee.", image: "/images/easyoffice/keuntungan-transaksi-aman.png" },
      { icon: "wifi", title: "Fasilitas Lengkap", description: "Internet cepat, LED Smart TV/proyektor, dan ruang kerja nyaman untuk produktivitas maksimal.", image: "/images/easyoffice/keuntungan-fasilitas-lengkap.png" },
      { icon: "building", title: "Harga Terjangkau", description: "Dapatkan pengalaman bekerja yang nyaman dan legalitas resmi tanpa menguras kantong.", image: "/images/easyoffice/keuntungan-harga-terjangkau.png" },
      { icon: "presentation", title: "Meeting Room", description: "Ruang rapat yang nyaman dan profesional dilengkapi fasilitas presentasi lengkap.", image: "/images/easyoffice/keuntungan-meeting-room.png" },
      { icon: "headset", title: "Layanan Surat Menyurat", description: "Kemudahan kelola dokumen bisnis lewat layanan penerimaan surat dan notifikasi resepsionis.", image: "/images/easyoffice/keuntungan-layanan-surat.png" },
    ],
    manfaatItems: [
      { icon: "wallet", title: "Hemat Biaya", description: "Menghemat biaya signifikan karena tidak perlu menyewa kantor fisik atau membayar utilitas dan pemeliharaan.", image: "/images/easyoffice/benefit-hemat-biaya.jpg" },
      { icon: "laptop", title: "Fleksibilitas Kerja", description: "Virtual office memungkinkan Anda dan tim bekerja dari mana saja dengan fleksibilitas tinggi.", image: "/images/easyoffice/benefit-fleksibilitas.jpg" },
      { icon: "building", title: "Naikkan Citra Perusahaan", description: "EasyOffice memberikan alamat di lokasi strategis yang meningkatkan citra profesional perusahaan Anda.", image: "/images/easyoffice/benefit-citra-perusahaan.jpg" },
      { icon: "headset", title: "Layanan Pendukung Bisnis", description: "Menyediakan layanan pengelolaan surat, panggilan telepon, dan resepsionis profesional untuk efisiensi operasional.", image: "/images/easyoffice/benefit-layanan-pendukung.jpg" },
      { icon: "presentation", title: "Fasilitas Meeting Room", description: "Akses fasilitas meeting room modern untuk pertemuan dengan klien atau sesi brainstorming dengan tim.", image: "/images/easyoffice/benefit-meeting-room.jpg" },
      { icon: "briefcase", title: "Bisa Untuk PKP", description: "Memudahkan proses pendaftaran legalitas bisnis, termasuk pengajuan status Pengusaha Kena Pajak (PKP).", image: "/images/easyoffice/benefit-bisa-pkp.jpg" },
    ],
    manfaatTitle: "Manfaat Virtual Office Untuk Bisnis Anda",
    manfaatDescription: "Pahami lebih lanjut tentang pentingnya virtual office untuk keperluan operasional dan legalitas bisnis Anda.",
    features: [
      "Alamat bisnis komersial prestisius",
      "Dapat digunakan untuk PKP & legalitas PT/CV",
      "Penanganan surat dan paket dokumen",
      "Layanan resepsionis profesional",
      "Akses ruang meeting hingga 70 jam/tahun",
    ],
    icon: "briefcase",
    href: "/layanan/virtual-office",
    image: "/images/easyoffice/office-bandung.png",
    imageAlt: "Gedung dan kantor EasyOffice di Bandung",
  },
  {
    slug: "coworking-space",
    title: "Coworking Space",
    shortTitle: "Coworking",
    description:
      "Ruang kerja fleksibel untuk individu dan tim, harian hingga bulanan.",
    intro:
      "Pilih hot desk untuk fleksibilitas maksimal atau dedicated desk untuk tim yang membutuhkan ruang tetap — didukung komunitas profesional.",
    benefits: [
      "Hot Desk Fleksibel — Hot desk untuk kerja harian dengan suasana produktif dan nyaman.",
      "Dedicated Desk — Dedicated desk permanen untuk tim yang butuh ruang kerja tetap.",
      "Internet Cepat — Koneksi internet cepat dan area kolaborasi untuk tim yang dinamis.",
      "Komunitas Profesional — Berkenalan dengan profesional lintas industri untuk kolaborasi bisnis.",
      "Jatah Meeting Room — Termasuk jatah jam meeting room tiap bulan untuk rapat penting.",
      "Lounge & Pantry — Lounge, pantry, dan area fokus yang nyaman sepanjang hari.",
    ],
    features: [
      "Hot desk dan dedicated desk",
      "Internet cepat",
      "Ruang kolaborasi",
      "Komunitas profesional",
    ],
    icon: "users",
    href: "/layanan/coworking-space",
    image: "/images/easyoffice/office-workspace.png",
    imageAlt: "Area coworking space EasyOffice yang nyaman dan produktif",
  },
  {
    slug: "meeting-room",
    title: "Meeting Room",
    shortTitle: "Meeting Room",
    description:
      "Ruang meeting profesional untuk presentasi, diskusi, dan kebutuhan bisnis.",
    intro:
      "Tersedia ruangan Small (hingga 6 orang), Medium (hingga 12 orang), dan Large (hingga 20 orang) dengan whiteboard, proyektor, dan layanan konsumsi.",
    benefits: [
      "Kapasitas Fleksibel — Tiga pilihan kapasitas hingga 20 orang untuk berbagai kebutuhan rapat.",
      "Peralatan Lengkap — Proyektor, whiteboard, dan audio-video siap pakai untuk presentasi profesional.",
      "Konsumsi Tersedia — Snack, minuman, dan opsi catering untuk menemani acara Anda.",
      "Reservasi Fleksibel — Reservasi fleksibel per jam via WhatsApp tanpa ribet.",
      "Dukungan Teknis — Tim teknis siap membantu selama acara berlangsung.",
      "Lokasi Strategis — Alamat mudah dijangkau di pusat kota untuk memudahkan tamu Anda.",
    ],
    features: [
      "Kapasitas 4–20 orang",
      "Proyektor dan whiteboard",
      "Minuman dan layanan rapat",
      "Reservasi fleksibel",
    ],
    icon: "door",
    href: "/layanan/meeting-room",
    image: "/images/easyoffice/office-meeting.png",
    imageAlt: "Ruang meeting profesional EasyOffice dengan fasilitas presentasi lengkap",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/* ------------------------------------------------------------------ */
/* Facilities (shared pool — combos pick their subset)                 */
/* ------------------------------------------------------------------ */

const facilityPool: Record<string, Facility> = {
  "lokasi-prestisius": {
    icon: "map-pin",
    title: "Lokasi Prestisius",
    description: "Tingkatkan citra profesional bisnis Anda dengan lokasi strategis di area bergengsi kota besar.",
    image: "/images/easyoffice/keuntungan-lokasi-prestisius.png",
  },
  "transaksi-aman": {
    icon: "wallet",
    title: "Transaksi Aman",
    description: "Kami memastikan setiap transaksi di kantor kami aman dan terpercaya melalui marketplace resmi Shopee.",
    image: "/images/easyoffice/keuntungan-transaksi-aman.png",
  },
  "fasilitas-lengkap": {
    icon: "wifi",
    title: "Fasilitas Lengkap",
    description: "Internet cepat, LED Smart TV/proyektor, dan ruang kerja nyaman untuk produktivitas maksimal.",
    image: "/images/easyoffice/keuntungan-fasilitas-lengkap.png",
  },
  "harga-terjangkau": {
    icon: "building",
    title: "Harga Terjangkau",
    description: "Dapatkan pengalaman bekerja yang nyaman dan legalitas resmi tanpa menguras kantong.",
    image: "/images/easyoffice/keuntungan-harga-terjangkau.png",
  },
  "meeting-room": {
    icon: "door",
    title: "Meeting Room",
    description: "Ruang rapat yang nyaman dan profesional dilengkapi fasilitas presentasi lengkap.",
    image: "/images/easyoffice/keuntungan-meeting-room.png",
  },
  "layanan-surat": {
    icon: "bell",
    title: "Layanan Surat Menyurat",
    description: "Nikmati kemudahan kelola dokumen bisnis lewat layanan surat-menyurat dan resepsionis kami.",
    image: "/images/easyoffice/keuntungan-layanan-surat.png",
  },
  wifi: {
    icon: "wifi",
    title: "WiFi Cepat",
    description: "Internet stabil untuk kerja dan meeting online.",
  },
  door: {
    icon: "door",
    title: "Meeting Room",
    description: "Ruang meeting profesional dengan peralatan lengkap.",
  },
  bell: {
    icon: "bell",
    title: "Resepsionis",
    description: "Sambutan profesional untuk tamu dan klien Anda.",
  },
  "map-pin": {
    icon: "map-pin",
    title: "Alamat Bisnis",
    description: "Alamat prestisius untuk legalitas dan citra usaha.",
  },
  printer: {
    icon: "printer",
    title: "Print & Scan",
    description: "Fasilitas cetak dan pemindaian dokumen.",
  },
  coffee: {
    icon: "coffee",
    title: "Lounge & Pantry",
    description: "Area santai dengan kopi, teh, dan air minum.",
  },
  car: {
    icon: "car",
    title: "Parkir",
    description: "Area parkir yang aman dan mudah diakses.",
  },
  clock: {
    icon: "clock",
    title: "Akses Fleksibel",
    description: "Jam operasional yang menyesuaikan kebutuhan tim.",
  },
};

function pickFacilities(...keys: string[]): Facility[] {
  return keys.map((k) => facilityPool[k]);
}

export const allFacilities: Facility[] = Object.values(facilityPool);

/* ------------------------------------------------------------------ */
/* FAQs                                                               */
/* ------------------------------------------------------------------ */

export const generalFaqs: Faq[] = [
  {
    question: "Apa itu Virtual Office?",
    answer:
      "Virtual Office adalah layanan kantor tanpa ruang fisik yang memberikan alamat bisnis prestisius, layanan penerimaan surat, dan fasilitas lainnya untuk mendukung operasional bisnis Anda.",
  },
  {
    question: "Apa saja keuntungan menggunakan Virtual Office?",
    answer:
      "Alamat bisnis profesional untuk meningkatkan kredibilitas usaha, biaya lebih hemat dibandingkan kantor fisik, fleksibilitas kerja dari mana saja tanpa perlu menyewa ruang kantor, dan layanan tambahan seperti penerimaan surat, nomor telepon bisnis, serta meeting room.",
  },
  {
    question: "Siapa yang cocok menggunakan Virtual Office?",
    answer:
      "Startup dan bisnis kecil yang ingin mengurangi biaya operasional, freelancer dan pekerja remote yang membutuhkan alamat bisnis profesional, serta perusahaan yang ingin memperluas jangkauan bisnis tanpa membuka kantor fisik baru.",
  },
  {
    question: "Apakah alamat Virtual Office EasyOffice bisa untuk PKP dan legalitas?",
    answer:
      "Ya, Virtual Office EasyOffice sudah disetujui pemerintah dan berlokasi di gedung komersial dengan legalitas lengkap (IMB, PBB, Perjanjian Sewa) sehingga dapat digunakan untuk pendaftaran PKP serta pendirian PT atau CV.",
  },
  {
    question: "Bagaimana cara konsultasi dan pemesanan layanan?",
    answer:
      "Klik tombol WhatsApp di situs ini — tim Customer Care kami siap membantu konsultasi gratis pemilihan lokasi dan paket yang paling sesuai dengan kebutuhan usaha Anda.",
  },
];

export const virtualOfficeFaqs: Faq[] = [
  {
    question: "Apakah alamat Virtual Office bisa untuk legalitas usaha dan PKP?",
    answer:
      "Bisa. Alamat Virtual Office EasyOffice berada di zonasi komersial gedung perkantoran resmi dengan dokumen IMB dan PBB yang sah, sehingga memenuhi syarat untuk domisili legalitas PT, CV, serta pendaftaran PKP.",
  },
  {
    question: "Bagaimana sistem penerimaan surat dan paket?",
    answer:
      "Resepsionis kami akan menerima, mencatat, dan mengamankan setiap surat atau paket masuk atas nama perusahaan Anda, kemudian memberikan notifikasi langsung melalui WhatsApp.",
  },
  {
    question: "Apakah saya bisa menggunakan meeting room?",
    answer:
      "Ya. Setiap paket Virtual Office dilengkapi akses meeting room eksklusif (hingga 70 jam/tahun pada paket tertentu) yang dilengkapi LED Smart TV, proyektor, dan koneksi internet cepat.",
  },
  {
    question: "Berapa lama minimal berlangganan?",
    answer:
      "Paket sewa tersedia dengan komitmen fleksibel mulai dari bulanan hingga tahunan, dengan penawaran khusus hemat hingga gratis sewa 3 bulan untuk paket tahunan.",
  },
];

export const coworkingFaqs: Faq[] = [
  {
    question: "Apa perbedaan hot desk dan dedicated desk?",
    answer:
      "Hot desk adalah meja fleksibel yang dipakai bergantian, sedangkan dedicated desk adalah meja khusus permanen untuk Anda.",
  },
  {
    question: "Apakah bisa bayar harian?",
    answer: "Ya. Tersedia tarif harian, bulanan, dan dedicated desk.",
  },
  {
    question: "Apakah tersedia akses meeting room?",
    answer:
      "Paket bulanan dan dedicated sudah termasuk jatah jam meeting room per bulan.",
  },
  {
    question: "Jam berapa coworking beroperasi?",
    answer:
      "Senin–Jumat, 08.00–17.00 WIB. Kebutuhan di luar jam tersebut dapat didiskusikan dengan tim kami.",
  },
];

export const meetingRoomFaqs: Faq[] = [
  {
    question: "Berapa kapasitas meeting room yang tersedia?",
    answer:
      "Tersedia ruangan Small (hingga 6 orang), Medium (hingga 12 orang), dan Large (hingga 20 orang).",
  },
  {
    question: "Bagaimana cara memesan meeting room?",
    answer:
      "Pemesanan dilakukan melalui WhatsApp — pilih tanggal, jam, dan kapasitas ruangan yang dibutuhkan.",
  },
  {
    question: "Apakah tersedia proyektor dan konsumsi?",
    answer:
      "Ruangan Medium dan Large dilengkapi proyektor. Snack, minuman, dan catering tersedia sesuai paket.",
  },
  {
    question: "Apakah bisa dibatalkan atau dijadwalkan ulang?",
    answer:
      "Ya, dengan pemberitahuan sebelumnya sesuai ketentuan yang akan dijelaskan tim kami saat pemesanan.",
  },
];

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

export const PRICE_NOTE =
  "Harga dapat berubah sewaktu-waktu. Hubungi kami untuk penawaran terbaru.";

function plan(
  name: string,
  price: string,
  period: string,
  features: string[],
): PricingPlan {
  return {
    name,
    price,
    period,
    features,
    ctaLabel: "Hubungi via WhatsApp",
  };
}

/* ------------------------------------------------------------------ */
/* Service + Location combinations                                     */
/* ------------------------------------------------------------------ */

export const serviceLocations: ServiceLocation[] = [
  {
    serviceSlug: "virtual-office",
    locationSlug: "bandung",
    tagline: "Kehadiran bisnis kredibel di pusat kota Bandung.",
    startingPrice: "Rp 350 rb",
    image: "/images/easyoffice/office-bandung.png",
    imageAlt: "Kantor virtual office EasyOffice Cihampelas di Bandung",
    gallery: [
      {
        src: "/images/easyoffice/office-bandung.png",
        alt: "Gedung dan kantor EasyOffice Cihampelas Bandung",
      },
      {
        src: "/images/easyoffice/office-hero.jpg",
        alt: "Area resepsionis profesional EasyOffice Cihampelas",
      },
      {
        src: "/images/easyoffice/office-meeting.png",
        alt: "Ruang meeting eksklusif EasyOffice Bandung",
      },
    ],
    pricing: [
      plan("Basic", "Rp 350 rb", "/bulan", [
        "Alamat bisnis",
        "Penanganan surat",
        "Pemberitahuan via email",
      ]),
      {
        ...plan("Business", "Rp 550.000", "/bulan", [
          "Semua fitur Basic",
          "Layanan resepsionis",
          "2 jam meeting room / bulan",
          "Nomor telepon khusus",
        ]),
        description: "Paket kantor virtual untuk bisnis yang membutuhkan alamat dan layanan administrasi profesional.",
        discountPercent: 20,
      },
      plan("Premium", "Rp 1,2 jt", "/bulan", [
        "Semua fitur Business",
        "8 jam meeting room / bulan",
        "Akses coworking 4 hari / bulan",
        "Prioritas dukungan",
      ]),
    ],
    facilities: pickFacilities("map-pin", "bell", "printer", "wifi", "door", "coffee"),
    offices: [
      {
        slug: "cihampelas",
        name: "EasyOffice Cihampelas",
        description:
          "Kantor virtual di kawasan Cihampelas, Bandung, dengan alamat bisnis komersial strategis, legalitas gedung lengkap (IMB, PBB), LED Smart TV, dan siap PKP.",
        address:
          "Jl. Cihampelas No.201A, RT/RW 01/02 Cipaganti, Kec. Coblong, Kota Bandung, Jawa Barat 40131",
        operatingHours: "Senin–Jumat, 08.00–17.00 WIB",
        phoneDisplay: "022 3209 9037",
        whatsapp: "62818881425",
      },
    ],
  },
  {
    serviceSlug: "virtual-office",
    locationSlug: "jakarta",
    tagline: "Alamat prestisius ibu kota untuk jangkauan bisnis nasional.",
    startingPrice: "Rp 450 rb",
    image: "/images/easyoffice/office-meeting.png",
    imageAlt: "Kantor virtual office EasyOffice di Sovereign Plaza Jakarta",
    gallery: [
      {
        src: "/images/easyoffice/office-meeting.png",
        alt: "Meeting room proyektor Sovereign Plaza Jakarta",
      },
      {
        src: "/images/easyoffice/office-workspace.png",
        alt: "Ruang kerja dan kantor modern Dewata Office",
      },
      {
        src: "/images/easyoffice/office-hero.jpg",
        alt: "Area resepsionis dan front office representatif",
      },
    ],
    pricing: [
      plan("Basic", "Rp 450 rb", "/bulan", [
        "Alamat bisnis Jakarta Selatan",
        "Penanganan surat",
        "Pemberitahuan via email",
      ]),
      plan("Business", "Rp 850 rb", "/bulan", [
        "Semua fitur Basic",
        "Layanan resepsionis",
        "4 jam meeting room / bulan",
        "Nomor telepon khusus",
      ]),
      plan("Premium", "Rp 1,6 jt", "/bulan", [
        "Semua fitur Business",
        "12 jam meeting room / bulan",
        "Akses coworking 8 hari / bulan",
        "Prioritas dukungan",
      ]),
    ],
    facilities: pickFacilities("map-pin", "bell", "printer", "wifi", "door", "coffee", "car", "clock"),
    offices: [
      {
        slug: "sovereign-plaza",
        name: "EasyOffice Sovereign Plaza",
        description:
          "Kantor virtual di Sovereign Plaza TB Simatupang, Jakarta Selatan. Alamat bisnis komersial prestisius, fasilitas meeting room proyektor, dan bisa PKP.",
        address:
          "Dewata Office, Sovereign Plaza, 12th Floor, Jl. TB Simatupang No. 36, Cilandak Barat, Cilandak, Jakarta Selatan 12430",
        operatingHours: "Senin–Jumat, 08.00–17.00 WIB",
        phoneDisplay: "021 2940 0153",
        whatsapp: "62818881425",
      },
    ],
  },
  {
    serviceSlug: "virtual-office",
    locationSlug: "bekasi",
    tagline: "Solusi hemat di kawasan penyangga Jakarta.",
    startingPrice: "Rp 300 rb",
    image: "/images/easyoffice/office-lounge.png",
    imageAlt: "Kantor virtual office EasyOffice di Summarecon Bekasi",
    gallery: [
      {
        src: "/images/easyoffice/office-lounge.png",
        alt: "Lounge dan resepsionis EasyOffice Summarecon Bekasi",
      },
      {
        src: "/images/easyoffice/office-workspace.png",
        alt: "Ruang kerja dan fasilitas kantor Summarecon Bekasi",
      },
      {
        src: "/images/easyoffice/office-meeting.png",
        alt: "Fasilitas Smart TV dan ruang rapat EasyOffice Bekasi",
      },
    ],
    pricing: [
      plan("Basic", "Rp 300 rb", "/bulan", [
        "Alamat bisnis",
        "Penanganan surat",
        "Pemberitahuan via email",
      ]),
      plan("Business", "Rp 550 rb", "/bulan", [
        "Semua fitur Basic",
        "Layanan resepsionis",
        "2 jam meeting room / bulan",
        "Nomor telepon khusus",
      ]),
      plan("Premium", "Rp 1 jt", "/bulan", [
        "Semua fitur Business",
        "6 jam meeting room / bulan",
        "Akses coworking 4 hari / bulan",
        "Prioritas dukungan",
      ]),
    ],
    facilities: pickFacilities("map-pin", "bell", "printer", "wifi", "door"),
    offices: [
      {
        slug: "summarecon",
        name: "EasyOffice Summarecon Bekasi",
        description:
          "Kantor virtual di Emerald Commercial Summarecon Bekasi. Alamat komersial strategis, fasilitas Smart TV, Whiteboard, dan bisa PKP.",
        address:
          "Emerald Commercial Summarecon Bekasi Blok UF No. 10, Jl. Bulevar Selatan, Marga Mulya, Bekasi Utara, Kota Bekasi, Jawa Barat 17142",
        operatingHours: "Senin–Jumat, 08.00–17.00 WIB",
        phoneDisplay: "0818 881 425",
        whatsapp: "62818881425",
      },
    ],
  },
  {
    serviceSlug: "virtual-office",
    locationSlug: "jakarta",
    tagline: "Alamat prestisius ibu kota untuk jangkauan bisnis nasional.",
    startingPrice: "Rp 450 rb",
    image:
      "/images/unsplash/office-08.webp",
    imageAlt: "Kantor virtual office EasyOffice di Jakarta",
    gallery: [
      {
        src: "/images/unsplash/office-09.webp",
        alt: "Area resepsionis dan front office representatif",
      },
      {
        src: "/images/unsplash/office-10.webp",
        alt: "Sudut fasilitas cetak dan mesin fotokopi kantor",
      },
      {
        src: "/images/unsplash/office-11.webp",
        alt: "Area lounge santai untuk istirahat dan diskusi",
      },
    ],
    pricing: [
      plan("Basic", "Rp 450 rb", "/bulan", [
        "Alamat bisnis Jakarta Selatan",
        "Penanganan surat",
        "Pemberitahuan via email",
      ]),
      plan("Business", "Rp 850 rb", "/bulan", [
        "Semua fitur Basic",
        "Layanan resepsionis",
        "4 jam meeting room / bulan",
        "Nomor telepon khusus",
      ]),
      plan("Premium", "Rp 1,6 jt", "/bulan", [
        "Semua fitur Business",
        "12 jam meeting room / bulan",
        "Akses coworking 8 hari / bulan",
        "Prioritas dukungan",
      ]),
    ],
    facilities: pickFacilities("map-pin", "bell", "printer", "wifi", "door", "coffee", "car", "clock"),
  },
  {
    serviceSlug: "virtual-office",
    locationSlug: "bekasi",
    tagline: "Solusi hemat di kawasan penyangga Jakarta.",
    startingPrice: "Rp 300 rb",
    image:
      "/images/unsplash/office-12.webp",
    imageAlt: "Kantor virtual office EasyOffice di Bekasi",
    gallery: [
      {
        src: "/images/unsplash/office-13.webp",
        alt: "Meja resepsionis dan penyambutan tamu profesional",
      },
      {
        src: "/images/unsplash/office-14.webp",
        alt: "Fasilitas loker surat dan penanganan paket",
      },
      {
        src: "/images/unsplash/office-15.webp",
        alt: "Area pantry dengan perlengkapan kopi dan teh",
      },
    ],
    pricing: [
      plan("Basic", "Rp 300 rb", "/bulan", [
        "Alamat bisnis",
        "Penanganan surat",
        "Pemberitahuan via email",
      ]),
      plan("Business", "Rp 550 rb", "/bulan", [
        "Semua fitur Basic",
        "Layanan resepsionis",
        "2 jam meeting room / bulan",
        "Nomor telepon khusus",
      ]),
      plan("Premium", "Rp 1 jt", "/bulan", [
        "Semua fitur Business",
        "6 jam meeting room / bulan",
        "Akses coworking 4 hari / bulan",
        "Prioritas dukungan",
      ]),
    ],
    facilities: pickFacilities("map-pin", "bell", "printer", "wifi", "door"),
  },
  {
    serviceSlug: "coworking-space",
    locationSlug: "bandung",
    tagline: "Ruang kerja fleksibel di jantung kota Bandung.",
    startingPrice: "Rp 75 rb",
    image:
      "/images/unsplash/office-16.webp",
    imageAlt: "Coworking space EasyOffice di Bandung",
    gallery: [
      {
        src: "/images/unsplash/office-17.webp",
        alt: "Area hot desk kerja bersama yang terang dan luas",
      },
      {
        src: "/images/unsplash/office-18.webp",
        alt: "Meja kerja dedicated dan fasilitas stopkontak individual",
      },
      {
        src: "/images/unsplash/office-19.webp",
        alt: "Fasilitas mesin cetak dan scanner dokumen cepat",
      },
    ],
    pricing: [
      plan("Harian", "Rp 75 rb", "/hari", [
        "Hot desk",
        "WiFi cepat",
        "Air minum",
        "Akses lounge",
      ]),
      plan("Bulanan", "Rp 850 rb", "/bulan", [
        "Hot desk fleksibel",
        "WiFi cepat",
        "2 jam meeting room / bulan",
        "Akses komunitas",
      ]),
      plan("Dedicated", "Rp 1,5 jt", "/bulan", [
        "Meja khusus permanen",
        "Locker pribadi",
        "8 jam meeting room / bulan",
        "Alamat surat",
      ]),
    ],
    facilities: pickFacilities("wifi", "coffee", "printer", "door", "clock", "car"),
  },
  {
    serviceSlug: "coworking-space",
    locationSlug: "jakarta",
    tagline: "Ruang kerja fleksibel di jantung bisnis Jakarta.",
    startingPrice: "Rp 95 rb",
    image:
      "/images/unsplash/office-20.webp",
    imageAlt: "Coworking space EasyOffice di Jakarta",
    gallery: [
      {
        src: "/images/unsplash/office-21.webp",
        alt: "Area hot desk modern dengan koneksi Wi-Fi super cepat",
      },
      {
        src: "/images/unsplash/office-22.webp",
        alt: "Sudut diskusi santai dan area kolaborasi terbuka",
      },
      {
        src: "/images/unsplash/office-07.webp",
        alt: "Pantry lengkap dengan mesin espresso dan air minum",
      },
    ],
    pricing: [
      plan("Harian", "Rp 95 rb", "/hari", [
        "Hot desk",
        "WiFi cepat",
        "Air minum",
        "Akses lounge",
      ]),
      plan("Bulanan", "Rp 1,1 jt", "/bulan", [
        "Hot desk fleksibel",
        "WiFi cepat",
        "2 jam meeting room / bulan",
        "Akses komunitas",
      ]),
      plan("Dedicated", "Rp 1,9 jt", "/bulan", [
        "Meja khusus permanen",
        "Locker pribadi",
        "8 jam meeting room / bulan",
        "Alamat surat",
      ]),
    ],
    facilities: pickFacilities("wifi", "coffee", "printer", "door", "clock", "car"),
  },
  {
    serviceSlug: "coworking-space",
    locationSlug: "bekasi",
    tagline: "Ruang kerja hemat di kawasan penyangga Jakarta.",
    startingPrice: "Rp 60 rb",
    image:
      "/images/unsplash/office-23.webp",
    imageAlt: "Coworking space EasyOffice di Bekasi",
    gallery: [
      {
        src: "/images/unsplash/office-24.webp",
        alt: "Ruang kerja bersama yang ergonomis dan nyaman",
      },
      {
        src: "/images/unsplash/office-25.webp",
        alt: "Area diskusi tim dan pojok santai",
      },
      {
        src: "/images/unsplash/office-09.webp",
        alt: "Fasilitas loker pribadi dan area cetak dokumen",
      },
    ],
    pricing: [
      plan("Harian", "Rp 60 rb", "/hari", [
        "Hot desk",
        "WiFi cepat",
        "Air minum",
        "Akses lounge",
      ]),
      plan("Bulanan", "Rp 700 rb", "/bulan", [
        "Hot desk fleksibel",
        "WiFi cepat",
        "2 jam meeting room / bulan",
        "Akses komunitas",
      ]),
      plan("Dedicated", "Rp 1,2 jt", "/bulan", [
        "Meja khusus permanen",
        "Locker pribadi",
        "8 jam meeting room / bulan",
        "Alamat surat",
      ]),
    ],
    facilities: pickFacilities("wifi", "coffee", "printer", "door"),
  },
  {
    serviceSlug: "meeting-room",
    locationSlug: "bandung",
    tagline: "Ruang meeting profesional dan lengkap di Bandung.",
    startingPrice: "Rp 150 rb",
    image:
      "/images/unsplash/office-26.webp",
    imageAlt: "Meeting room EasyOffice di Bandung",
    gallery: [
      {
        src: "/images/unsplash/office-27.webp",
        alt: "Ruang rapat dilengkapi layar proyektor dan white board",
      },
      {
        src: "/images/unsplash/office-28.webp",
        alt: "Meja rapat besar dengan stopkontak di setiap kursi",
      },
      {
        src: "/images/unsplash/office-29.webp",
        alt: "Peralatan audio video konferensi online siap pakai",
      },
    ],
    pricing: [
      plan("Small", "Rp 150 rb", "/jam", [
        "Kapasitas hingga 6 orang",
        "Whiteboard",
        "Air minum",
        "WiFi cepat",
      ]),
      plan("Medium", "Rp 250 rb", "/jam", [
        "Kapasitas hingga 12 orang",
        "Proyektor dan whiteboard",
        "Snack dan minuman",
        "Dukungan teknis",
      ]),
      plan("Large", "Rp 450 rb", "/jam", [
        "Kapasitas hingga 20 orang",
        "Sistem audio-video",
        "Catering tersedia",
        "Asisten acara",
      ]),
    ],
    facilities: pickFacilities("door", "wifi", "coffee", "printer", "car", "clock"),
  },
  {
    serviceSlug: "meeting-room",
    locationSlug: "jakarta",
    tagline: "Ruang meeting profesional dan lengkap di Jakarta.",
    startingPrice: "Rp 200 rb",
    image:
      "/images/unsplash/office-30.webp",
    imageAlt: "Meeting room EasyOffice di Jakarta",
    gallery: [
      {
        src: "/images/unsplash/office-31.webp",
        alt: "Ruang meeting berkapasitas besar dengan pencahayaan optimal",
      },
      {
        src: "/images/unsplash/office-32.webp",
        alt: "Fasilitas proyektor high-definition dan flipchart",
      },
      {
        src: "/images/unsplash/office-33.webp",
        alt: "Layanan penyajian konsumsi dan snack rapat",
      },
    ],
    pricing: [
      plan("Small", "Rp 200 rb", "/jam", [
        "Kapasitas hingga 6 orang",
        "Whiteboard",
        "Air minum",
        "WiFi cepat",
      ]),
      plan("Medium", "Rp 350 rb", "/jam", [
        "Kapasitas hingga 12 orang",
        "Proyektor dan whiteboard",
        "Snack dan minuman",
        "Dukungan teknis",
      ]),
      plan("Large", "Rp 600 rb", "/jam", [
        "Kapasitas hingga 20 orang",
        "Sistem audio-video",
        "Catering tersedia",
        "Asisten acara",
      ]),
    ],
    facilities: pickFacilities("door", "wifi", "coffee", "printer", "car", "clock"),
  },
  {
    serviceSlug: "meeting-room",
    locationSlug: "bekasi",
    tagline: "Ruang meeting profesional dan lengkap di Bekasi.",
    startingPrice: "Rp 120 rb",
    image:
      "/images/unsplash/office-34.webp",
    imageAlt: "Meeting room EasyOffice di Bekasi",
    gallery: [
      {
        src: "/images/unsplash/office-35.webp",
        alt: "Ruang rapat eksekutif dengan peredam suara",
      },
      {
        src: "/images/unsplash/office-36.webp",
        alt: "Peralatan presentasi dan koneksi internet stabil",
      },
      {
        src: "/images/unsplash/office-37.webp",
        alt: "Area penyambutan tamu khusus ruang meeting",
      },
    ],
    pricing: [
      plan("Small", "Rp 120 rb", "/jam", [
        "Kapasitas hingga 6 orang",
        "Whiteboard",
        "Air minum",
        "WiFi cepat",
      ]),
      plan("Medium", "Rp 200 rb", "/jam", [
        "Kapasitas hingga 12 orang",
        "Proyektor dan whiteboard",
        "Snack dan minuman",
        "Dukungan teknis",
      ]),
      plan("Large", "Rp 350 rb", "/jam", [
        "Kapasitas hingga 20 orang",
        "Sistem audio-video",
        "Catering tersedia",
        "Asisten acara",
      ]),
    ],
    facilities: pickFacilities("door", "wifi", "coffee", "car"),
  },
];

export function getServiceLocation(
  serviceSlug: string,
  locationSlug: string,
): ServiceLocation | undefined {
  return serviceLocations.find(
    (s) => s.serviceSlug === serviceSlug && s.locationSlug === locationSlug,
  );
}

/** Locations where a service is available — drives location grids. */
export function locationsForService(serviceSlug: string): Location[] {
  const slugs = new Set(
    serviceLocations
      .filter((s) => s.serviceSlug === serviceSlug)
      .map((s) => s.locationSlug),
  );
  return locations.filter((l) => slugs.has(l.slug));
}

/** Resolve the WhatsApp number for a combination (override → location). */
export function whatsappForCombination(combo: ServiceLocation): string {
  return combo.whatsapp ?? locationWhatsappNumber(combo.locationSlug);
}

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export const testimonials: Testimonial[] = [
  {
    name: "Rina Prasetyo",
    company: "Founder, Konsultan Pajak Rina & Partners",
    quote:
      "Sejak pakai Virtual Office EasyOffice, klien langsung percaya di telepon pertama — alamat Sudirman-nya bikin kami terlihat jauh lebih matang dari modal sebenarnya.",
  },
  {
    name: "Andi Wijaya",
    company: "CTO, Startup Logistik Nusantara",
    quote:
      "Tim engineering kami sewa dedicated desk di sini. Internetnya kencang, rapat cepat beres di meeting room, dan biaya sewa kantor penuh yang kami hemat bisa dipakai untuk iterasi produk.",
  },
  {
    name: "Dewi Lestari",
    company: "Marketing Manager, Brand F&B Lokal",
    quote:
      "Sering booking meeting room untuk presentasi klien. Prosesnya tinggal chat WhatsApp, dan resepsionisnya sigap menyambut tamu kami — profesional sekali.",
  },
  {
    name: "Budi Hartono",
    company: "Direktur, Konsultan Sipil Bumi Karya",
    quote:
      "Kantor virtual di Bandung ini bikin legalitas usaha kami langsung beres. Surat dan paket selalu diberitahukan, jadi tidak ada yang terlewat walau kami jarang ke lokasi.",
  },
  {
    name: "Sinta Dewi",
    company: "Freelance Designer",
    quote:
      "Hot desk coworking-nya nyaman untuk kerja seharian. Ada kopi gratis, rapat pun tidak perlu cari tempat lagi — cocok banget untuk profesional solo seperti saya.",
  },
  {
    name: "Hendra Gunawan",
    company: "Procurement Lead, Distributor Elektronik",
    quote:
      "Kami rutin pakai meeting room untuk review supplier. Kapasitas pas, proyektor dan whiteboard siap pakai, dan tim teknisnya responsif kalau butuh bantuan.",
  },
];

/* ------------------------------------------------------------------ */
/* Promotions                                                          */
/* ------------------------------------------------------------------ */

export const promotions: Promotion[] = [
  {
    badge: "Promo",
    title: "Gratis 3 Bulan Sewa Virtual Office",
    description:
      "Nikmati keuntungan sewa Virtual Office di EasyOffice dengan gratis sewa selama 3 bulan untuk komitmen tahunan. Hemat operasional perusahaanmu!",
    period: "Penawaran Terbatas",
  },
  {
    badge: "Promo",
    title: "Free Room Meeting hingga 70 Jam/Tahun",
    description:
      "Dapatkan akses gratis pemakaian ruang meeting eksklusif hingga 70 jam per tahun untuk pertemuan bisnis Anda.",
    period: "Termasuk di Paket Tertentu",
  },
  {
    badge: "Diskon",
    title: "Diskon Paket Pendirian PT + Virtual Office",
    description:
      "Miliki legalitas badan usaha PT atau CV lengkap sekaligus domisili kantor virtual komersial resmi siap pakai.",
    period: "Selama Kuota Tersedia",
  },
];

export const comparisonRows: ComparisonRow[] = [
  { feature: "Alamat bisnis profesional", easyoffice: true, typical: false },
  { feature: "Ruang meeting di lokasi", easyoffice: true, typical: false },
  { feature: "Layanan resepsionis", easyoffice: true, typical: false },
  { feature: "Penanganan surat dan paket", easyoffice: true, typical: true },
  { feature: "Akses coworking", easyoffice: true, typical: false },
  { feature: "Paket fleksibel bulanan", easyoffice: true, typical: true },
];
