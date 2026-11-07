-- Full Production DB Synchronization for EasyOffice
BEGIN;

-- Clean existing partial content
TRUNCATE TABLE 
  kantor_whatsapp_numbers,
  layanan_kantor_paket_harga_benefits,
  layanan_kantor_paket_harga,
  layanan_kantor_fasilitas,
  layanan_kantor,
  kantor,
  services_keunggulan_items,
  services_manfaat_items,
  promotions,
  comparison_rows,
  homepage_facilities,
  testimonials,
  faqs_items,
  faqs,
  site_settings_whatsapp_numbers,
  site_settings_stats_banner,
  site_settings_how_it_works,
  site_settings_homepage_hero_trust_items,
  site_settings,
  about_page_story_highlights,
  about_page_stats,
  about_page
CASCADE;

-- 1. Kantor
INSERT INTO kantor (id, nama, slug, kota, deskripsi, alamat, jam_operasional, email, telepon, whatsapp, link_google_maps, latitude, longitude, alt_foto, seo_title, seo_description, seo_canonical_url, seo_no_index, aktif, created_at, updated_at, seo_slug)
VALUES (
  1,
  'Bandung',
  'bandung',
  'Bandung',
  'Lokasi utama EasyOffice di Cihampelas Bandung — alamat bisnis komersial prestisius, legalitas lengkap, dan bisa PKP.',
  'Jl. Cihampelas No.201A, RT/RW 01/02 Cipaganti, Kec. Coblong, Kota Bandung, Jawa Barat 40131',
  'Senin–Jumat, 08.00–17.00 WIB',
  'id.easyoffice@gmail.com',
  '022 3209 9037',
  '62818881425',
  '',
  NULL,
  NULL,
  'Kantor EasyOffice Cihampelas Bandung',
  'Bandung - Kantor Sewa Virtual Office & Meeting Room',
  'Lokasi utama EasyOffice di Cihampelas Bandung — alamat bisnis komersial prestisius, legalitas lengkap, dan bisa PKP.',
  '/kantor/bandung',
  false,
  true,
  now(),
  now(),
  'bandung'
);
INSERT INTO kantor_whatsapp_numbers (_order, _parent_id, id, label, number, active, priority)
VALUES (1, 1, 'bandung-wa-1', 'Utama', '62818881425', true, 1);
INSERT INTO kantor (id, nama, slug, kota, deskripsi, alamat, jam_operasional, email, telepon, whatsapp, link_google_maps, latitude, longitude, alt_foto, seo_title, seo_description, seo_canonical_url, seo_no_index, aktif, created_at, updated_at, seo_slug)
VALUES (
  2,
  'Jakarta',
  'jakarta',
  'Jakarta',
  'Kantor representatif di Sovereign Plaza TB Simatupang Jakarta Selatan untuk meningkatkan kredibilitas bisnis Anda.',
  'Dewata Office, Sovereign Plaza, 12th Floor, Jl. TB Simatupang No. 36, Cilandak Barat, Cilandak, Jakarta Selatan 12430',
  'Senin–Jumat, 08.00–17.00 WIB',
  'id.easyoffice@gmail.com',
  '021 2940 0153',
  '62818881425',
  '',
  NULL,
  NULL,
  'Kantor representatif EasyOffice di Sovereign Plaza Jakarta',
  'Jakarta - Kantor Sewa Virtual Office & Meeting Room',
  'Kantor representatif di Sovereign Plaza TB Simatupang Jakarta Selatan untuk meningkatkan kredibilitas bisnis Anda.',
  '/kantor/jakarta',
  false,
  true,
  now(),
  now(),
  'jakarta'
);
INSERT INTO kantor_whatsapp_numbers (_order, _parent_id, id, label, number, active, priority)
VALUES (1, 2, 'jakarta-wa-1', 'Utama', '62818881425', true, 1);
INSERT INTO kantor (id, nama, slug, kota, deskripsi, alamat, jam_operasional, email, telepon, whatsapp, link_google_maps, latitude, longitude, alt_foto, seo_title, seo_description, seo_canonical_url, seo_no_index, aktif, created_at, updated_at, seo_slug)
VALUES (
  3,
  'Bekasi',
  'bekasi',
  'Bekasi',
  'Alternatif strategis dan hemat di Emerald Commercial Summarecon Bekasi dengan legalitas gedung lengkap dan siap PKP.',
  'Emerald Commercial Summarecon Bekasi Blok UF No. 10, Jl. Bulevar Selatan, Marga Mulya, Bekasi Utara, Kota Bekasi, Jawa Barat 17142',
  'Senin–Jumat, 08.00–17.00 WIB',
  'id.easyoffice@gmail.com',
  '0818 881 425',
  '62818881425',
  '',
  NULL,
  NULL,
  'Kantor EasyOffice Bekasi',
  'Bekasi - Kantor Sewa Virtual Office & Meeting Room',
  'Alternatif strategis dan hemat di Emerald Commercial Summarecon Bekasi dengan legalitas gedung lengkap dan siap PKP.',
  '/kantor/bekasi',
  false,
  true,
  now(),
  now(),
  'bekasi'
);
INSERT INTO kantor_whatsapp_numbers (_order, _parent_id, id, label, number, active, priority)
VALUES (1, 3, 'bekasi-wa-1', 'Utama', '62818881425', true, 1);
SELECT setval('kantor_id_seq', 4);

-- 2. Services Keunggulan & Manfaat
UPDATE services SET
  title = 'Virtual Office',
  short_title = 'Virtual Office',
  description = 'Alamat bisnis profesional, layanan surat, dan resepsionis tanpa perlu sewa kantor fisik. Bisa untuk pengurusan legalitas PT, CV, dan pendaftaran PKP.',
  intro = 'Virtual Office sudah disetujui pemerintah dan dapat digunakan untuk keperluan legalitas seperti pendirian PT, CV, dan pendaftaran PKP praktis dan efisien.',
  benefits_title = 'Keunggulan Virtual Office',
  benefits_description = 'Keunggulan utama layanan Virtual Office.',
  manfaat_title = 'Manfaat Virtual Office Untuk Bisnis Anda',
  manfaat_description = 'Pahami lebih lanjut tentang keuntungan memilih layanan Virtual Office.',
  is_active = true,
  updated_at = now()
WHERE id = 1;
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (1, 1, 'virtual-office-keunggulan-1', 'map-pin', 'Lokasi Prestisius', 'Tingkatkan citra profesional bisnis Anda dengan lokasi strategis di area bergengsi kota besar.');
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (2, 1, 'virtual-office-keunggulan-2', 'wallet', 'Transaksi Aman', 'Kami memastikan setiap transaksi aman dan terpercaya melalui marketplace resmi Shopee.');
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (3, 1, 'virtual-office-keunggulan-3', 'wifi', 'Fasilitas Lengkap', 'Internet cepat, LED Smart TV/proyektor, dan ruang kerja nyaman untuk produktivitas maksimal.');
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (4, 1, 'virtual-office-keunggulan-4', 'door', 'Harga Terjangkau', 'Dapatkan pengalaman bekerja yang nyaman dan legalitas resmi tanpa menguras kantong.');
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (5, 1, 'virtual-office-keunggulan-5', 'presentation', 'Meeting Room', 'Ruang rapat yang nyaman dan profesional dilengkapi fasilitas presentasi lengkap.');
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (6, 1, 'virtual-office-keunggulan-6', 'headset', 'Layanan Surat Menyurat', 'Kemudahan kelola dokumen bisnis lewat layanan penerimaan surat dan notifikasi resepsionis.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (1, 1, 'virtual-office-manfaat-1', 'wallet', 'Hemat Biaya', 'Menghemat biaya signifikan karena tidak perlu menyewa kantor fisik atau membayar utilitas dan pemeliharaan.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (2, 1, 'virtual-office-manfaat-2', 'laptop', 'Fleksibilitas Kerja', 'Virtual office memungkinkan Anda dan tim bekerja dari mana saja dengan fleksibilitas tinggi.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (3, 1, 'virtual-office-manfaat-3', 'door', 'Naikkan Citra Perusahaan', 'EasyOffice memberikan alamat di lokasi strategis yang meningkatkan citra profesional perusahaan Anda.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (4, 1, 'virtual-office-manfaat-4', 'headset', 'Layanan Pendukung Bisnis', 'Menyediakan layanan pengelolaan surat, panggilan telepon, dan resepsionis profesional untuk efisiensi operasional.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (5, 1, 'virtual-office-manfaat-5', 'presentation', 'Fasilitas Meeting Room', 'Akses fasilitas meeting room modern untuk pertemuan dengan klien atau sesi brainstorming dengan tim.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (6, 1, 'virtual-office-manfaat-6', 'briefcase', 'Bisa Untuk PKP', 'Memudahkan proses pendaftaran legalitas bisnis, termasuk pengajuan status Pengusaha Kena Pajak (PKP).');
UPDATE services SET
  title = 'Coworking Space',
  short_title = 'Coworking',
  description = 'Meja siap pakai, kerja jadi lebih fokus. Sewa harian cukup Rp 150.000/hari.',
  intro = 'Susah fokus kerja di rumah? Coba kerja Coworking di EasyOffice — meja siap pakai, ruangan nyaman ber-AC, Wi-Fi cepat, dan colokan listrik di setiap meja.',
  benefits_title = 'Keunggulan Coworking Space',
  benefits_description = 'Keunggulan utama layanan Coworking Space.',
  manfaat_title = 'Manfaat Coworking Space Untuk Bisnis Anda',
  manfaat_description = 'Pahami lebih lanjut tentang keuntungan memilih layanan Coworking Space.',
  is_active = true,
  updated_at = now()
WHERE id = 2;
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (1, 2, 'coworking-space-keunggulan-1', 'map-pin', 'Lokasi Prestisius', 'Tingkatkan citra profesional bisnis anda dengan lokasi strategis di area bergengsi.');
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (2, 2, 'coworking-space-keunggulan-2', 'wallet', 'Transaksi Aman', 'Kami memastikan setiap transaksi di coworking space kami aman dan terpercaya via marketplace.');
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (3, 2, 'coworking-space-keunggulan-3', 'wifi', 'Fasilitas Lengkap', 'Internet cepat dan ruang kerja nyaman untuk produktivitas maksimal.');
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (4, 2, 'coworking-space-keunggulan-4', 'door', 'Harga Terjangkau', 'Dapatkan pengalaman bekerja yang nyaman dan produktif tanpa harus menguras kantong!');
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (5, 2, 'coworking-space-keunggulan-5', 'presentation', 'Meeting Room', 'Ruang rapat yang nyaman dan profesional, dilengkapi dengan fasilitas lengkap.');
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (6, 2, 'coworking-space-keunggulan-6', 'headset', 'Layanan Surat Menyurat', 'Nikmati kemudahan kelola dokumen bisnis lewat layanan surat menyurat kami.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (1, 2, 'coworking-space-manfaat-1', 'wallet', 'Biaya Fleksibel', 'Bayar sesuai kebutuhan harian atau bulanan tanpa komitmen sewa kantor jangka panjang.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (2, 2, 'coworking-space-manfaat-2', 'wifi', 'Fasilitas Siap Pakai', 'Langsung kerja dengan internet cepat, meja nyaman, listrik stabil, dan pantry bersih.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (3, 2, 'coworking-space-manfaat-3', 'users', 'Komunitas Profesional', 'Bekerja berdampingan dan bangun jaringan kolaborasi dengan sesama entrepreneur.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (4, 2, 'coworking-space-manfaat-4', 'clock', 'Jam Fleksibel', 'Akses ruang kerja fleksibel yang menyesuaikan ritme dan mobilitas tim Anda.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (5, 2, 'coworking-space-manfaat-5', 'map-pin', 'Pusat Bisnis Strategis', 'Akses mudah di pusat kota memudahkan mobilitas dan pertemuan bisnis.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (6, 2, 'coworking-space-manfaat-6', 'presentation', 'Akses Meeting Room', 'Tersedia jatah meeting room bulanan untuk presentasi dan diskusi penting bersama klien.');
UPDATE services SET
  title = 'Meeting Room',
  short_title = 'Meeting Room',
  description = 'Ruang meeting profesional Rp 250.000/jam. Promo Spesial Bandung & Bekasi: Sewa 2 Jam, Gratis 1 Jam!',
  intro = 'Tersedia ruang meeting ber-AC dilengkapi Smart TV/proyektor, Wi-Fi cepat, kopi/teh & air mineral, serta tampilan logo perusahaan Anda saat meeting.',
  benefits_title = 'Keunggulan Meeting Room',
  benefits_description = 'Keunggulan utama layanan Meeting Room.',
  manfaat_title = 'Manfaat Meeting Room Untuk Bisnis Anda',
  manfaat_description = 'Pahami lebih lanjut tentang keuntungan memilih layanan Meeting Room.',
  is_active = true,
  updated_at = now()
WHERE id = 3;
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (1, 3, 'meeting-room-keunggulan-1', 'map-pin', 'Lokasi Prestisius', 'Tingkatkan citra profesional bisnis anda dengan lokasi strategis di area bergengsi.');
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (2, 3, 'meeting-room-keunggulan-2', 'wallet', 'Transaksi Aman', 'Kami memastikan setiap transaksi di meeting room kami aman dan terpercaya via marketplace.');
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (3, 3, 'meeting-room-keunggulan-3', 'wifi', 'Fasilitas Lengkap', 'Internet cepat, proyektor/LED Smart TV, whiteboard, dan sound system siap pakai.');
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (4, 3, 'meeting-room-keunggulan-4', 'door', 'Harga Terjangkau', 'Sewa fleksibel per jam dengan tarif terjangkau tanpa beban biaya pemeliharaan ruangan.');
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (5, 3, 'meeting-room-keunggulan-5', 'presentation', 'Ruang Profesional', 'Ruang rapat yang nyaman, ber-AC, dan representatif untuk berbagai kapasitas peserta.');
INSERT INTO services_keunggulan_items (_order, _parent_id, id, icon, title, description)
VALUES (6, 3, 'meeting-room-keunggulan-6', 'headset', 'Resepsionis & Konsumsi', 'Tim resepsionis menyambut tamu Anda, dengan opsi snack dan minuman kopi/teh.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (1, 3, 'meeting-room-manfaat-1', 'presentation', 'Ruang Representatif', 'Meningkatkan kepercayaan klien dan investor saat presentasi atau penandatanganan kontrak.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (2, 3, 'meeting-room-manfaat-2', 'video', 'Presentasi Lancar', 'Perangkat presentasi modern LED TV/proyektor siap pakai tanpa kendala teknis.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (3, 3, 'meeting-room-manfaat-3', 'clock', 'Sewa Per Jam Fleksibel', 'Pesan ruangan sesuai durasi rapat yang Anda butuhkan tanpa biaya tersembunyi.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (4, 3, 'meeting-room-manfaat-4', 'wallet', 'Efisiensi Biaya', 'Jauh lebih hemat dibandingkan menyewa atau merawat ruang meeting pribadi.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (5, 3, 'meeting-room-manfaat-5', 'map-pin', 'Lokasi Pusat Kota', 'Gedung perkantoran resmi di lokasi prima memudahkan kedatangan seluruh peserta rapat.');
INSERT INTO services_manfaat_items (_order, _parent_id, id, icon, title, description)
VALUES (6, 3, 'meeting-room-manfaat-6', 'laptop', 'Koneksi Stabil', 'Koneksi internet berkecepatan tinggi menjamin kelancaran video conference dan hybrid meeting.');

-- 3. Layanan Kantor (9 Offerings)
INSERT INTO layanan_kantor (id, kantor_id, layanan_id, slug, nama_tampilan, deskripsi, tagline, harga_mulai, catatan_legalitas, aktif, created_at, updated_at, alt_foto, seo_title, seo_description, seo_canonical_url, seo_no_index, seo_slug)
VALUES (
  1,
  1,
  1,
  'virtual-office-bandung',
  'Virtual Office Bandung',
  'Kantor virtual di kawasan Cihampelas, Bandung, dengan alamat bisnis komersial strategis, legalitas gedung lengkap (IMB, PBB), LED Smart TV, dan siap PKP.',
  'Alamat bisnis komersial & bergengsi di Cihampelas Bandung. Promo 50% UMKM Festival.',
  'Rp 166.583',
  '',
  true,
  now(),
  now(),
  'Fasilitas meeting room dan kantor virtual EasyOffice Cihampelas Bandung',
  'virtual office bandung | EasyOffice',
  'Alamat bisnis komersial & bergengsi di Cihampelas Bandung. Promo 50% UMKM Festival.',
  '/layanan/virtual-office/bandung',
  false,
  'virtual-office-bandung'
);
INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (1, 1, 'virtual-office-bandung-plan-1', 'Paket Ekonomi', 'Hanya Rp 166.583/Bulan (Diskon 50% dari Rp 4.000.000)', 4000000, '/tahun', true, 50);
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (1, 'virtual-office-bandung-plan-1', 'virtual-office-bandung-plan-1-feat-1', 'Virtual Office 12 Bulan');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (2, 'virtual-office-bandung-plan-1', 'virtual-office-bandung-plan-1-feat-2', 'Alamat Bisnis Komersial & Bergengsi');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (3, 'virtual-office-bandung-plan-1', 'virtual-office-bandung-plan-1-feat-3', 'Surat Perjanjian Sewa & Domisili');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (4, 'virtual-office-bandung-plan-1', 'virtual-office-bandung-plan-1-feat-4', 'Resepsionis Profesional');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (5, 'virtual-office-bandung-plan-1', 'virtual-office-bandung-plan-1-feat-5', 'Mail Handling & Notifikasi Real-time');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (6, 'virtual-office-bandung-plan-1', 'virtual-office-bandung-plan-1-feat-6', 'Bonus: 1 pcs Logam Mulia Emas 24K');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (7, 'virtual-office-bandung-plan-1', 'virtual-office-bandung-plan-1-feat-7', 'Bonus: Voucher EasyLegal & EasyTax Rp 100.000');
INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (2, 1, 'virtual-office-bandung-plan-2', 'Paket Bisnis', 'Hanya Rp 199.923/Bulan (Diskon dari Rp 5.000.000)', 5000000, '/tahun', true, 48);
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (1, 'virtual-office-bandung-plan-2', 'virtual-office-bandung-plan-2-feat-1', 'Virtual Office 12 Bulan + 1 Bulan');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (2, 'virtual-office-bandung-plan-2', 'virtual-office-bandung-plan-2-feat-2', 'Alamat Bisnis Komersial & Bergengsi');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (3, 'virtual-office-bandung-plan-2', 'virtual-office-bandung-plan-2-feat-3', 'Surat Perjanjian Sewa & Domisili');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (4, 'virtual-office-bandung-plan-2', 'virtual-office-bandung-plan-2-feat-4', 'Resepsionis Profesional & Mail Handling');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (5, 'virtual-office-bandung-plan-2', 'virtual-office-bandung-plan-2-feat-5', 'High Speed Internet, Smart TV & Whiteboard');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (6, 'virtual-office-bandung-plan-2', 'virtual-office-bandung-plan-2-feat-6', 'Gratis Air Mineral, Kopi & Teh');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (7, 'virtual-office-bandung-plan-2', 'virtual-office-bandung-plan-2-feat-7', 'Akses Penggunaan Ruang Meeting Total 72 Jam');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (8, 'virtual-office-bandung-plan-2', 'virtual-office-bandung-plan-2-feat-8', 'Akses Meeting Room di Bandung, Bekasi & Jakarta');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (9, 'virtual-office-bandung-plan-2', 'virtual-office-bandung-plan-2-feat-9', 'Penggunaan Virtual Office untuk PKP');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (10, 'virtual-office-bandung-plan-2', 'virtual-office-bandung-plan-2-feat-10', 'Nama & Logo di Meeting Room');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (11, 'virtual-office-bandung-plan-2', 'virtual-office-bandung-plan-2-feat-11', 'Bonus: 1 pcs Logam Mulia Emas 24K');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (12, 'virtual-office-bandung-plan-2', 'virtual-office-bandung-plan-2-feat-12', 'Bonus: Voucher EasyLegal & EasyTax Rp 200.000');
INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (3, 1, 'virtual-office-bandung-plan-3', 'Paket Eksekutif', 'Hanya Rp 266.600/Bulan (Diskon 50% dari Rp 8.000.000)', 8000000, '/tahun', true, 50);
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (1, 'virtual-office-bandung-plan-3', 'virtual-office-bandung-plan-3-feat-1', 'Virtual Office 12 Bulan + 3 Bulan');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (2, 'virtual-office-bandung-plan-3', 'virtual-office-bandung-plan-3-feat-2', 'Alamat Bisnis Komersial & Bergengsi');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (3, 'virtual-office-bandung-plan-3', 'virtual-office-bandung-plan-3-feat-3', 'Surat Perjanjian Sewa & Domisili');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (4, 'virtual-office-bandung-plan-3', 'virtual-office-bandung-plan-3-feat-4', 'Resepsionis Profesional & Mail Handling');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (5, 'virtual-office-bandung-plan-3', 'virtual-office-bandung-plan-3-feat-5', 'High Speed Internet, Smart TV & Whiteboard');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (6, 'virtual-office-bandung-plan-3', 'virtual-office-bandung-plan-3-feat-6', 'Gratis Air Mineral, Kopi & Teh');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (7, 'virtual-office-bandung-plan-3', 'virtual-office-bandung-plan-3-feat-7', 'Akses Penggunaan Ruang Meeting Total 144 Jam');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (8, 'virtual-office-bandung-plan-3', 'virtual-office-bandung-plan-3-feat-8', 'Akses Meeting Room di Bandung, Bekasi & Jakarta');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (9, 'virtual-office-bandung-plan-3', 'virtual-office-bandung-plan-3-feat-9', 'Penggunaan Virtual Office untuk PKP');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (10, 'virtual-office-bandung-plan-3', 'virtual-office-bandung-plan-3-feat-10', 'Nama & Logo di Meeting Room & Lobi');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (11, 'virtual-office-bandung-plan-3', 'virtual-office-bandung-plan-3-feat-11', 'Bonus: 2 pcs Logam Mulia Emas 24K');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (12, 'virtual-office-bandung-plan-3', 'virtual-office-bandung-plan-3-feat-12', 'Bonus: Voucher EasyLegal & EasyTax Rp 300.000');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (1, 1, 'virtual-office-bandung-fac-1', 'map-pin', 'Alamat Bisnis', 'Alamat prestisius untuk legalitas dan citra usaha.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (2, 1, 'virtual-office-bandung-fac-2', 'bell', 'Resepsionis', 'Sambutan profesional untuk tamu dan klien Anda.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (3, 1, 'virtual-office-bandung-fac-3', 'printer', 'Print & Scan', 'Fasilitas cetak dan pemindaian dokumen.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (4, 1, 'virtual-office-bandung-fac-4', 'wifi', 'WiFi Cepat', 'Internet stabil untuk kerja dan meeting online.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (5, 1, 'virtual-office-bandung-fac-5', 'door', 'Meeting Room', 'Ruang meeting profesional dengan peralatan lengkap.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (6, 1, 'virtual-office-bandung-fac-6', 'coffee', 'Lounge & Pantry', 'Area santai dengan kopi, teh, dan air minum.');
INSERT INTO layanan_kantor (id, kantor_id, layanan_id, slug, nama_tampilan, deskripsi, tagline, harga_mulai, catatan_legalitas, aktif, created_at, updated_at, alt_foto, seo_title, seo_description, seo_canonical_url, seo_no_index, seo_slug)
VALUES (
  2,
  2,
  1,
  'virtual-office-jakarta',
  'Virtual Office Jakarta',
  'Kantor virtual di Sovereign Plaza TB Simatupang, Jakarta Selatan. Alamat bisnis komersial prestisius, fasilitas meeting room proyektor, dan bisa PKP.',
  'Alamat prestisius Sovereign Plaza TB Simatupang Jakarta Selatan (Dewata Office by EasyOffice).',
  'Rp 216.583',
  '',
  true,
  now(),
  now(),
  'Ruang meeting dan kantor virtual EasyOffice di Sovereign Plaza Jakarta',
  'virtual office jakarta | EasyOffice',
  'Alamat prestisius Sovereign Plaza TB Simatupang Jakarta Selatan (Dewata Office by EasyOffice).',
  '/layanan/virtual-office/jakarta',
  false,
  'virtual-office-jakarta'
);
INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (1, 2, 'virtual-office-jakarta-plan-1', 'Paket Ekonomi', 'Hanya Rp 216.583/Bulan', 2599000, '/tahun', false, NULL);
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (1, 'virtual-office-jakarta-plan-1', 'virtual-office-jakarta-plan-1-feat-1', 'Virtual Office 1 Tahun');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (2, 'virtual-office-jakarta-plan-1', 'virtual-office-jakarta-plan-1-feat-2', 'Alamat Bisnis Komersial & Bergengsi');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (3, 'virtual-office-jakarta-plan-1', 'virtual-office-jakarta-plan-1-feat-3', 'Surat Perjanjian Sewa & Domisili');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (4, 'virtual-office-jakarta-plan-1', 'virtual-office-jakarta-plan-1-feat-4', 'Resepsionis Profesional');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (5, 'virtual-office-jakarta-plan-1', 'virtual-office-jakarta-plan-1-feat-5', 'Mail Handling & Notifikasi Real-Time');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (6, 'virtual-office-jakarta-plan-1', 'virtual-office-jakarta-plan-1-feat-6', 'Bonus: 1 pcs Logam Mulia Emas 24K');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (7, 'virtual-office-jakarta-plan-1', 'virtual-office-jakarta-plan-1-feat-7', 'Bonus: 100+ E-Course Digital Marketing');
INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (2, 2, 'virtual-office-jakarta-plan-2', 'Paket Eksekutif', 'Hanya Rp 249.916/Bulan', 2999000, '/tahun', false, NULL);
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (1, 'virtual-office-jakarta-plan-2', 'virtual-office-jakarta-plan-2-feat-1', 'Virtual Office 1 Tahun');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (2, 'virtual-office-jakarta-plan-2', 'virtual-office-jakarta-plan-2-feat-2', 'Alamat Bisnis Komersial & Bergengsi');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (3, 'virtual-office-jakarta-plan-2', 'virtual-office-jakarta-plan-2-feat-3', 'Surat Perjanjian Sewa & Domisili');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (4, 'virtual-office-jakarta-plan-2', 'virtual-office-jakarta-plan-2-feat-4', 'Resepsionis Profesional & Mail Handling');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (5, 'virtual-office-jakarta-plan-2', 'virtual-office-jakarta-plan-2-feat-5', 'High Speed Internet, Projector & Whiteboard');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (6, 'virtual-office-jakarta-plan-2', 'virtual-office-jakarta-plan-2-feat-6', 'Gratis Air Mineral, Kopi & Teh');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (7, 'virtual-office-jakarta-plan-2', 'virtual-office-jakarta-plan-2-feat-7', 'Akses Penggunaan Ruang Meeting 8 Jam/Bulan');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (8, 'virtual-office-jakarta-plan-2', 'virtual-office-jakarta-plan-2-feat-8', 'Company Signage');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (9, 'virtual-office-jakarta-plan-2', 'virtual-office-jakarta-plan-2-feat-9', 'Penggunaan Meeting Room di Jakarta, Bandung & Bekasi');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (10, 'virtual-office-jakarta-plan-2', 'virtual-office-jakarta-plan-2-feat-10', 'Penggunaan Virtual Office untuk PKP');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (11, 'virtual-office-jakarta-plan-2', 'virtual-office-jakarta-plan-2-feat-11', 'Bonus: 2 pcs Logam Mulia Emas 24K');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (12, 'virtual-office-jakarta-plan-2', 'virtual-office-jakarta-plan-2-feat-12', 'Bonus: 100+ E-Course Digital Marketing');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (13, 'virtual-office-jakarta-plan-2', 'virtual-office-jakarta-plan-2-feat-13', 'Bonus: 2.500+ Template Konten Digital & Kalender Konten');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (1, 2, 'virtual-office-jakarta-fac-1', 'map-pin', 'Alamat Bisnis', 'Alamat prestisius untuk legalitas dan citra usaha.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (2, 2, 'virtual-office-jakarta-fac-2', 'bell', 'Resepsionis', 'Sambutan profesional untuk tamu dan klien Anda.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (3, 2, 'virtual-office-jakarta-fac-3', 'printer', 'Print & Scan', 'Fasilitas cetak dan pemindaian dokumen.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (4, 2, 'virtual-office-jakarta-fac-4', 'wifi', 'WiFi Cepat', 'Internet stabil untuk kerja dan meeting online.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (5, 2, 'virtual-office-jakarta-fac-5', 'door', 'Meeting Room', 'Ruang meeting profesional dengan peralatan lengkap.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (6, 2, 'virtual-office-jakarta-fac-6', 'coffee', 'Lounge & Pantry', 'Area santai dengan kopi, teh, dan air minum.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (7, 2, 'virtual-office-jakarta-fac-7', 'car', 'Parkir', 'Area parkir yang aman dan mudah diakses.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (8, 2, 'virtual-office-jakarta-fac-8', 'clock', 'Akses Fleksibel', 'Jam operasional yang menyesuaikan kebutuhan tim.');
INSERT INTO layanan_kantor (id, kantor_id, layanan_id, slug, nama_tampilan, deskripsi, tagline, harga_mulai, catatan_legalitas, aktif, created_at, updated_at, alt_foto, seo_title, seo_description, seo_canonical_url, seo_no_index, seo_slug)
VALUES (
  3,
  3,
  1,
  'virtual-office-bekasi',
  'Virtual Office Bekasi',
  'Kantor virtual di Emerald Commercial Summarecon Bekasi. Alamat komersial strategis, fasilitas Smart TV, Whiteboard, dan bisa PKP.',
  'Alamat bisnis komersial & bergengsi di Summarecon Bekasi. Promo 50% UMKM Festival.',
  'Rp 166.583',
  '',
  true,
  now(),
  now(),
  'Fasilitas meeting room dan kantor virtual EasyOffice Summarecon Bekasi',
  'virtual office bekasi | EasyOffice',
  'Alamat bisnis komersial & bergengsi di Summarecon Bekasi. Promo 50% UMKM Festival.',
  '/layanan/virtual-office/bekasi',
  false,
  'virtual-office-bekasi'
);
INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (1, 3, 'virtual-office-bekasi-plan-1', 'Paket Ekonomi', 'Hanya Rp 166.583/Bulan (Diskon 50% dari Rp 4.000.000)', 4000000, '/tahun', true, 50);
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (1, 'virtual-office-bekasi-plan-1', 'virtual-office-bekasi-plan-1-feat-1', 'Virtual Office 12 Bulan');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (2, 'virtual-office-bekasi-plan-1', 'virtual-office-bekasi-plan-1-feat-2', 'Alamat Bisnis Komersial & Bergengsi');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (3, 'virtual-office-bekasi-plan-1', 'virtual-office-bekasi-plan-1-feat-3', 'Surat Perjanjian Sewa & Domisili');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (4, 'virtual-office-bekasi-plan-1', 'virtual-office-bekasi-plan-1-feat-4', 'Resepsionis Profesional');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (5, 'virtual-office-bekasi-plan-1', 'virtual-office-bekasi-plan-1-feat-5', 'Mail Handling & Notifikasi Real-time');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (6, 'virtual-office-bekasi-plan-1', 'virtual-office-bekasi-plan-1-feat-6', 'Bonus: 1 pcs Logam Mulia Emas 24K');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (7, 'virtual-office-bekasi-plan-1', 'virtual-office-bekasi-plan-1-feat-7', 'Bonus: Voucher EasyLegal & EasyTax Rp 100.000');
INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (2, 3, 'virtual-office-bekasi-plan-2', 'Paket Bisnis', 'Hanya Rp 199.923/Bulan (Diskon dari Rp 5.000.000)', 5000000, '/tahun', true, 48);
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (1, 'virtual-office-bekasi-plan-2', 'virtual-office-bekasi-plan-2-feat-1', 'Virtual Office 12 Bulan + 1 Bulan');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (2, 'virtual-office-bekasi-plan-2', 'virtual-office-bekasi-plan-2-feat-2', 'Alamat Bisnis Komersial & Bergengsi');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (3, 'virtual-office-bekasi-plan-2', 'virtual-office-bekasi-plan-2-feat-3', 'Surat Perjanjian Sewa & Domisili');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (4, 'virtual-office-bekasi-plan-2', 'virtual-office-bekasi-plan-2-feat-4', 'Resepsionis Profesional & Mail Handling');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (5, 'virtual-office-bekasi-plan-2', 'virtual-office-bekasi-plan-2-feat-5', 'High Speed Internet, Smart TV & Whiteboard');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (6, 'virtual-office-bekasi-plan-2', 'virtual-office-bekasi-plan-2-feat-6', 'Gratis Air Mineral, Kopi & Teh');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (7, 'virtual-office-bekasi-plan-2', 'virtual-office-bekasi-plan-2-feat-7', 'Akses Penggunaan Ruang Meeting Total 72 Jam');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (8, 'virtual-office-bekasi-plan-2', 'virtual-office-bekasi-plan-2-feat-8', 'Akses Meeting Room di Bandung, Bekasi & Jakarta');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (9, 'virtual-office-bekasi-plan-2', 'virtual-office-bekasi-plan-2-feat-9', 'Penggunaan Virtual Office untuk PKP');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (10, 'virtual-office-bekasi-plan-2', 'virtual-office-bekasi-plan-2-feat-10', 'Nama & Logo di Meeting Room');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (11, 'virtual-office-bekasi-plan-2', 'virtual-office-bekasi-plan-2-feat-11', 'Bonus: 1 pcs Logam Mulia Emas 24K');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (12, 'virtual-office-bekasi-plan-2', 'virtual-office-bekasi-plan-2-feat-12', 'Bonus: Voucher EasyLegal & EasyTax Rp 200.000');
INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (3, 3, 'virtual-office-bekasi-plan-3', 'Paket Eksekutif', 'Hanya Rp 266.600/Bulan (Diskon 50% dari Rp 8.000.000)', 8000000, '/tahun', true, 50);
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (1, 'virtual-office-bekasi-plan-3', 'virtual-office-bekasi-plan-3-feat-1', 'Virtual Office 12 Bulan + 3 Bulan');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (2, 'virtual-office-bekasi-plan-3', 'virtual-office-bekasi-plan-3-feat-2', 'Alamat Bisnis Komersial & Bergengsi');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (3, 'virtual-office-bekasi-plan-3', 'virtual-office-bekasi-plan-3-feat-3', 'Surat Perjanjian Sewa & Domisili');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (4, 'virtual-office-bekasi-plan-3', 'virtual-office-bekasi-plan-3-feat-4', 'Resepsionis Profesional & Mail Handling');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (5, 'virtual-office-bekasi-plan-3', 'virtual-office-bekasi-plan-3-feat-5', 'High Speed Internet, Smart TV & Whiteboard');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (6, 'virtual-office-bekasi-plan-3', 'virtual-office-bekasi-plan-3-feat-6', 'Gratis Air Mineral, Kopi & Teh');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (7, 'virtual-office-bekasi-plan-3', 'virtual-office-bekasi-plan-3-feat-7', 'Akses Penggunaan Ruang Meeting Total 144 Jam');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (8, 'virtual-office-bekasi-plan-3', 'virtual-office-bekasi-plan-3-feat-8', 'Akses Meeting Room di Bandung, Bekasi & Jakarta');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (9, 'virtual-office-bekasi-plan-3', 'virtual-office-bekasi-plan-3-feat-9', 'Penggunaan Virtual Office untuk PKP');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (10, 'virtual-office-bekasi-plan-3', 'virtual-office-bekasi-plan-3-feat-10', 'Nama & Logo di Meeting Room & Lobi');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (11, 'virtual-office-bekasi-plan-3', 'virtual-office-bekasi-plan-3-feat-11', 'Bonus: 2 pcs Logam Mulia Emas 24K');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (12, 'virtual-office-bekasi-plan-3', 'virtual-office-bekasi-plan-3-feat-12', 'Bonus: Voucher EasyLegal & EasyTax Rp 300.000');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (1, 3, 'virtual-office-bekasi-fac-1', 'map-pin', 'Alamat Bisnis', 'Alamat prestisius untuk legalitas dan citra usaha.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (2, 3, 'virtual-office-bekasi-fac-2', 'bell', 'Resepsionis', 'Sambutan profesional untuk tamu dan klien Anda.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (3, 3, 'virtual-office-bekasi-fac-3', 'printer', 'Print & Scan', 'Fasilitas cetak dan pemindaian dokumen.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (4, 3, 'virtual-office-bekasi-fac-4', 'wifi', 'WiFi Cepat', 'Internet stabil untuk kerja dan meeting online.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (5, 3, 'virtual-office-bekasi-fac-5', 'door', 'Meeting Room', 'Ruang meeting profesional dengan peralatan lengkap.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (6, 3, 'virtual-office-bekasi-fac-6', 'coffee', 'Lounge & Pantry', 'Area santai dengan kopi, teh, dan air minum.');
INSERT INTO layanan_kantor (id, kantor_id, layanan_id, slug, nama_tampilan, deskripsi, tagline, harga_mulai, catatan_legalitas, aktif, created_at, updated_at, alt_foto, seo_title, seo_description, seo_canonical_url, seo_no_index, seo_slug)
VALUES (
  4,
  1,
  2,
  'coworking-space-bandung',
  'Coworking Space Bandung',
  'Area kerja bersama yang nyaman dan fleksibel di kawasan Cihampelas Bandung, dilengkapi internet cepat dan fasilitas lengkap.',
  'Meja siap pakai, kerja jadi lebih fokus di jantung kota Bandung.',
  'Rp 150.000',
  '',
  true,
  now(),
  now(),
  'Coworking space dan ruang meeting EasyOffice di Bandung',
  'coworking space bandung | EasyOffice',
  'Meja siap pakai, kerja jadi lebih fokus di jantung kota Bandung.',
  '/layanan/coworking-space/bandung',
  false,
  'coworking-space-bandung'
);
INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (1, 4, 'coworking-space-bandung-plan-1', 'Sewa Harian', 'Meja siap pakai, kerja jadi lebih fokus tanpa kontrak bulanan.', 150000, '/hari', false, NULL);
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (1, 'coworking-space-bandung-plan-1', 'coworking-space-bandung-plan-1-feat-1', '1 Meja & Kursi siap pakai');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (2, 'coworking-space-bandung-plan-1', 'coworking-space-bandung-plan-1-feat-2', 'High-Speed Internet (WiFi)');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (3, 'coworking-space-bandung-plan-1', 'coworking-space-bandung-plan-1-feat-3', 'Ruangan Nyaman Ber-AC');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (4, 'coworking-space-bandung-plan-1', 'coworking-space-bandung-plan-1-feat-4', 'Colokan Listrik di setiap meja');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (5, 'coworking-space-bandung-plan-1', 'coworking-space-bandung-plan-1-feat-5', 'Free Air Mineral, Kopi & Teh');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (1, 4, 'coworking-space-bandung-fac-1', 'wifi', 'WiFi Cepat', 'Internet stabil untuk kerja dan meeting online.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (2, 4, 'coworking-space-bandung-fac-2', 'coffee', 'Lounge & Pantry', 'Area santai dengan kopi, teh, dan air minum.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (3, 4, 'coworking-space-bandung-fac-3', 'printer', 'Print & Scan', 'Fasilitas cetak dan pemindaian dokumen.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (4, 4, 'coworking-space-bandung-fac-4', 'door', 'Meeting Room', 'Ruang meeting profesional dengan peralatan lengkap.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (5, 4, 'coworking-space-bandung-fac-5', 'clock', 'Akses Fleksibel', 'Jam operasional yang menyesuaikan kebutuhan tim.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (6, 4, 'coworking-space-bandung-fac-6', 'car', 'Parkir', 'Area parkir yang aman dan mudah diakses.');
INSERT INTO layanan_kantor (id, kantor_id, layanan_id, slug, nama_tampilan, deskripsi, tagline, harga_mulai, catatan_legalitas, aktif, created_at, updated_at, alt_foto, seo_title, seo_description, seo_canonical_url, seo_no_index, seo_slug)
VALUES (
  5,
  2,
  2,
  'coworking-space-jakarta',
  'Coworking Space Jakarta',
  'Coworking space modern dan representatif di Sovereign Plaza TB Simatupang, Cilandak, Jakarta Selatan untuk produktivitas maksimal.',
  'Meja siap pakai, kerja jadi lebih fokus di jantung bisnis Jakarta Selatan.',
  'Rp 150.000',
  '',
  true,
  now(),
  now(),
  'Ruang kerja dan coworking space EasyOffice di Jakarta',
  'coworking space jakarta | EasyOffice',
  'Meja siap pakai, kerja jadi lebih fokus di jantung bisnis Jakarta Selatan.',
  '/layanan/coworking-space/jakarta',
  false,
  'coworking-space-jakarta'
);
INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (1, 5, 'coworking-space-jakarta-plan-1', 'Sewa Harian', 'Meja siap pakai, kerja jadi lebih fokus tanpa kontrak bulanan.', 150000, '/hari', false, NULL);
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (1, 'coworking-space-jakarta-plan-1', 'coworking-space-jakarta-plan-1-feat-1', '1 Meja & Kursi siap pakai');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (2, 'coworking-space-jakarta-plan-1', 'coworking-space-jakarta-plan-1-feat-2', 'High-Speed Internet (WiFi)');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (3, 'coworking-space-jakarta-plan-1', 'coworking-space-jakarta-plan-1-feat-3', 'Ruangan Nyaman Ber-AC');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (4, 'coworking-space-jakarta-plan-1', 'coworking-space-jakarta-plan-1-feat-4', 'Colokan Listrik di setiap meja');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (5, 'coworking-space-jakarta-plan-1', 'coworking-space-jakarta-plan-1-feat-5', 'Free Air Mineral, Kopi & Teh');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (1, 5, 'coworking-space-jakarta-fac-1', 'wifi', 'WiFi Cepat', 'Internet stabil untuk kerja dan meeting online.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (2, 5, 'coworking-space-jakarta-fac-2', 'coffee', 'Lounge & Pantry', 'Area santai dengan kopi, teh, dan air minum.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (3, 5, 'coworking-space-jakarta-fac-3', 'printer', 'Print & Scan', 'Fasilitas cetak dan pemindaian dokumen.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (4, 5, 'coworking-space-jakarta-fac-4', 'door', 'Meeting Room', 'Ruang meeting profesional dengan peralatan lengkap.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (5, 5, 'coworking-space-jakarta-fac-5', 'clock', 'Akses Fleksibel', 'Jam operasional yang menyesuaikan kebutuhan tim.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (6, 5, 'coworking-space-jakarta-fac-6', 'car', 'Parkir', 'Area parkir yang aman dan mudah diakses.');
INSERT INTO layanan_kantor (id, kantor_id, layanan_id, slug, nama_tampilan, deskripsi, tagline, harga_mulai, catatan_legalitas, aktif, created_at, updated_at, alt_foto, seo_title, seo_description, seo_canonical_url, seo_no_index, seo_slug)
VALUES (
  6,
  3,
  2,
  'coworking-space-bekasi',
  'Coworking Space Bekasi',
  'Ruang kerja bersama fleksibel dan hemat di Emerald Commercial Summarecon Bekasi dengan suasana kerja profesional.',
  'Meja siap pakai, kerja jadi lebih fokus di Summarecon Bekasi.',
  'Rp 150.000',
  '',
  true,
  now(),
  now(),
  'Coworking space dan fasilitas kantor EasyOffice di Bekasi',
  'coworking space bekasi | EasyOffice',
  'Meja siap pakai, kerja jadi lebih fokus di Summarecon Bekasi.',
  '/layanan/coworking-space/bekasi',
  false,
  'coworking-space-bekasi'
);
INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (1, 6, 'coworking-space-bekasi-plan-1', 'Sewa Harian', 'Meja siap pakai, kerja jadi lebih fokus tanpa kontrak bulanan.', 150000, '/hari', false, NULL);
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (1, 'coworking-space-bekasi-plan-1', 'coworking-space-bekasi-plan-1-feat-1', '1 Meja & Kursi siap pakai');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (2, 'coworking-space-bekasi-plan-1', 'coworking-space-bekasi-plan-1-feat-2', 'High-Speed Internet (WiFi)');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (3, 'coworking-space-bekasi-plan-1', 'coworking-space-bekasi-plan-1-feat-3', 'Ruangan Nyaman Ber-AC');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (4, 'coworking-space-bekasi-plan-1', 'coworking-space-bekasi-plan-1-feat-4', 'Colokan Listrik di setiap meja');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (5, 'coworking-space-bekasi-plan-1', 'coworking-space-bekasi-plan-1-feat-5', 'Free Air Mineral, Kopi & Teh');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (1, 6, 'coworking-space-bekasi-fac-1', 'wifi', 'WiFi Cepat', 'Internet stabil untuk kerja dan meeting online.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (2, 6, 'coworking-space-bekasi-fac-2', 'coffee', 'Lounge & Pantry', 'Area santai dengan kopi, teh, dan air minum.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (3, 6, 'coworking-space-bekasi-fac-3', 'printer', 'Print & Scan', 'Fasilitas cetak dan pemindaian dokumen.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (4, 6, 'coworking-space-bekasi-fac-4', 'door', 'Meeting Room', 'Ruang meeting profesional dengan peralatan lengkap.');
INSERT INTO layanan_kantor (id, kantor_id, layanan_id, slug, nama_tampilan, deskripsi, tagline, harga_mulai, catatan_legalitas, aktif, created_at, updated_at, alt_foto, seo_title, seo_description, seo_canonical_url, seo_no_index, seo_slug)
VALUES (
  7,
  1,
  3,
  'meeting-room-bandung',
  'Meeting Room Bandung',
  'Ruang meeting eksklusif di Cihampelas Bandung, dilengkapi LED Smart TV, whiteboard, dan koneksi internet cepat.',
  'Promo Spesial Bandung: Sewa 2 Jam, Gratis 1 Jam (Bayar 2 Jam Nikmati 3 Jam Meeting!).',
  'Rp 250.000',
  '',
  true,
  now(),
  now(),
  'Meeting room EasyOffice Cihampelas di Bandung',
  'meeting room bandung | EasyOffice',
  'Promo Spesial Bandung: Sewa 2 Jam, Gratis 1 Jam (Bayar 2 Jam Nikmati 3 Jam Meeting!).',
  '/layanan/meeting-room/bandung',
  false,
  'meeting-room-bandung'
);
INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (1, 7, 'meeting-room-bandung-plan-1', 'Meeting Room (Maks. 8 Orang)', 'Promo Spesial Bandung — Bayar 2 Jam Nikmati 3 Jam Meeting! (Belum termasuk PPN)', 500000, '/jam', true, 50);
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (1, 'meeting-room-bandung-plan-1', 'meeting-room-bandung-plan-1-feat-1', 'Kapasitas maksimal 8 orang');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (2, 'meeting-room-bandung-plan-1', 'meeting-room-bandung-plan-1-feat-2', 'Promo Sewa 2 Jam, Gratis 1 Jam (Nikmati 3 Jam Meeting!)');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (3, 'meeting-room-bandung-plan-1', 'meeting-room-bandung-plan-1-feat-3', 'Smart TV / Proyektor & Whiteboard');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (4, 'meeting-room-bandung-plan-1', 'meeting-room-bandung-plan-1-feat-4', 'Kopi, Teh & Air Mineral');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (5, 'meeting-room-bandung-plan-1', 'meeting-room-bandung-plan-1-feat-5', 'High-Speed Internet (WiFi)');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (6, 'meeting-room-bandung-plan-1', 'meeting-room-bandung-plan-1-feat-6', 'Ruangan Nyaman Ber-AC');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (7, 'meeting-room-bandung-plan-1', 'meeting-room-bandung-plan-1-feat-7', 'Tampilan Logo Perusahaan Saat Meeting');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (1, 7, 'meeting-room-bandung-fac-1', 'door', 'Meeting Room', 'Ruang meeting profesional dengan peralatan lengkap.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (2, 7, 'meeting-room-bandung-fac-2', 'wifi', 'WiFi Cepat', 'Internet stabil untuk kerja dan meeting online.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (3, 7, 'meeting-room-bandung-fac-3', 'coffee', 'Lounge & Pantry', 'Area santai dengan kopi, teh, dan air minum.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (4, 7, 'meeting-room-bandung-fac-4', 'printer', 'Print & Scan', 'Fasilitas cetak dan pemindaian dokumen.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (5, 7, 'meeting-room-bandung-fac-5', 'car', 'Parkir', 'Area parkir yang aman dan mudah diakses.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (6, 7, 'meeting-room-bandung-fac-6', 'clock', 'Akses Fleksibel', 'Jam operasional yang menyesuaikan kebutuhan tim.');
INSERT INTO layanan_kantor (id, kantor_id, layanan_id, slug, nama_tampilan, deskripsi, tagline, harga_mulai, catatan_legalitas, aktif, created_at, updated_at, alt_foto, seo_title, seo_description, seo_canonical_url, seo_no_index, seo_slug)
VALUES (
  8,
  2,
  3,
  'meeting-room-jakarta',
  'Meeting Room Jakarta',
  'Ruang meeting profesional di Sovereign Plaza TB Simatupang Jakarta Selatan dengan proyektor dan perlengkapan presentasi.',
  'Meeting Room representatif di lokasi strategis Sovereign Plaza Jakarta Selatan.',
  'Rp 250.000',
  '',
  true,
  now(),
  now(),
  'Meeting room representatif EasyOffice di Sovereign Plaza Jakarta',
  'meeting room jakarta | EasyOffice',
  'Meeting Room representatif di lokasi strategis Sovereign Plaza Jakarta Selatan.',
  '/layanan/meeting-room/jakarta',
  false,
  'meeting-room-jakarta'
);
INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (1, 8, 'meeting-room-jakarta-plan-1', 'Meeting Room Kapasitas 7 Orang', 'Lokasi strategis di Sovereign Plaza Jakarta Selatan (Belum termasuk PPN)', 250000, '/jam', false, NULL);
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (1, 'meeting-room-jakarta-plan-1', 'meeting-room-jakarta-plan-1-feat-1', 'Kapasitas hingga 7 orang');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (2, 'meeting-room-jakarta-plan-1', 'meeting-room-jakarta-plan-1-feat-2', 'Smart TV / Proyektor & Whiteboard');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (3, 'meeting-room-jakarta-plan-1', 'meeting-room-jakarta-plan-1-feat-3', 'Kopi, Teh & Air Mineral');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (4, 'meeting-room-jakarta-plan-1', 'meeting-room-jakarta-plan-1-feat-4', 'High-Speed Internet (WiFi)');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (5, 'meeting-room-jakarta-plan-1', 'meeting-room-jakarta-plan-1-feat-5', 'Ruangan Nyaman Ber-AC');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (6, 'meeting-room-jakarta-plan-1', 'meeting-room-jakarta-plan-1-feat-6', 'Tampilan Logo Perusahaan Saat Meeting');
INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (2, 8, 'meeting-room-jakarta-plan-2', 'Meeting Room Kapasitas Besar (15 Orang)', 'Ruang boardroom kapasitas besar di Jakarta Selatan (Belum termasuk PPN)', 400000, '/jam', false, NULL);
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (1, 'meeting-room-jakarta-plan-2', 'meeting-room-jakarta-plan-2-feat-1', 'Kapasitas besar hingga 15 orang');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (2, 'meeting-room-jakarta-plan-2', 'meeting-room-jakarta-plan-2-feat-2', 'Smart TV / Proyektor & Whiteboard');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (3, 'meeting-room-jakarta-plan-2', 'meeting-room-jakarta-plan-2-feat-3', 'Kopi, Teh & Air Mineral');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (4, 'meeting-room-jakarta-plan-2', 'meeting-room-jakarta-plan-2-feat-4', 'High-Speed Internet (WiFi)');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (5, 'meeting-room-jakarta-plan-2', 'meeting-room-jakarta-plan-2-feat-5', 'Ruangan Nyaman Ber-AC');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (6, 'meeting-room-jakarta-plan-2', 'meeting-room-jakarta-plan-2-feat-6', 'Tampilan Logo Perusahaan Saat Meeting');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (1, 8, 'meeting-room-jakarta-fac-1', 'door', 'Meeting Room', 'Ruang meeting profesional dengan peralatan lengkap.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (2, 8, 'meeting-room-jakarta-fac-2', 'wifi', 'WiFi Cepat', 'Internet stabil untuk kerja dan meeting online.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (3, 8, 'meeting-room-jakarta-fac-3', 'coffee', 'Lounge & Pantry', 'Area santai dengan kopi, teh, dan air minum.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (4, 8, 'meeting-room-jakarta-fac-4', 'printer', 'Print & Scan', 'Fasilitas cetak dan pemindaian dokumen.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (5, 8, 'meeting-room-jakarta-fac-5', 'car', 'Parkir', 'Area parkir yang aman dan mudah diakses.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (6, 8, 'meeting-room-jakarta-fac-6', 'clock', 'Akses Fleksibel', 'Jam operasional yang menyesuaikan kebutuhan tim.');
INSERT INTO layanan_kantor (id, kantor_id, layanan_id, slug, nama_tampilan, deskripsi, tagline, harga_mulai, catatan_legalitas, aktif, created_at, updated_at, alt_foto, seo_title, seo_description, seo_canonical_url, seo_no_index, seo_slug)
VALUES (
  9,
  3,
  3,
  'meeting-room-bekasi',
  'Meeting Room Bekasi',
  'Ruang meeting representatif di Emerald Commercial Summarecon Bekasi dengan fasilitas LED Smart TV dan Whiteboard.',
  'Promo Spesial Bekasi: Sewa 2 Jam, Gratis 1 Jam (Bayar 2 Jam Nikmati 3 Jam Meeting!).',
  'Rp 250.000',
  '',
  true,
  now(),
  now(),
  'Meeting room representatif EasyOffice di Summarecon Bekasi',
  'meeting room bekasi | EasyOffice',
  'Promo Spesial Bekasi: Sewa 2 Jam, Gratis 1 Jam (Bayar 2 Jam Nikmati 3 Jam Meeting!).',
  '/layanan/meeting-room/bekasi',
  false,
  'meeting-room-bekasi'
);
INSERT INTO layanan_kantor_paket_harga (_order, _parent_id, id, name, description, price, unit, discount_active, discount_percentage)
VALUES (1, 9, 'meeting-room-bekasi-plan-1', 'Meeting Room (Maks. 8 Orang)', 'Promo Spesial Bekasi — Bayar 2 Jam Nikmati 3 Jam Meeting! (Belum termasuk PPN)', 500000, '/jam', true, 50);
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (1, 'meeting-room-bekasi-plan-1', 'meeting-room-bekasi-plan-1-feat-1', 'Kapasitas maksimal 8 orang');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (2, 'meeting-room-bekasi-plan-1', 'meeting-room-bekasi-plan-1-feat-2', 'Promo Sewa 2 Jam, Gratis 1 Jam (Nikmati 3 Jam Meeting!)');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (3, 'meeting-room-bekasi-plan-1', 'meeting-room-bekasi-plan-1-feat-3', 'Smart TV / Proyektor & Whiteboard');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (4, 'meeting-room-bekasi-plan-1', 'meeting-room-bekasi-plan-1-feat-4', 'Kopi, Teh & Air Mineral');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (5, 'meeting-room-bekasi-plan-1', 'meeting-room-bekasi-plan-1-feat-5', 'High-Speed Internet (WiFi)');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (6, 'meeting-room-bekasi-plan-1', 'meeting-room-bekasi-plan-1-feat-6', 'Ruangan Nyaman Ber-AC');
INSERT INTO layanan_kantor_paket_harga_benefits (_order, _parent_id, id, value)
VALUES (7, 'meeting-room-bekasi-plan-1', 'meeting-room-bekasi-plan-1-feat-7', 'Tampilan Logo Perusahaan Saat Meeting');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (1, 9, 'meeting-room-bekasi-fac-1', 'door', 'Meeting Room', 'Ruang meeting profesional dengan peralatan lengkap.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (2, 9, 'meeting-room-bekasi-fac-2', 'wifi', 'WiFi Cepat', 'Internet stabil untuk kerja dan meeting online.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (3, 9, 'meeting-room-bekasi-fac-3', 'coffee', 'Lounge & Pantry', 'Area santai dengan kopi, teh, dan air minum.');
INSERT INTO layanan_kantor_fasilitas (_order, _parent_id, id, icon, title, description)
VALUES (4, 9, 'meeting-room-bekasi-fac-4', 'car', 'Parkir', 'Area parkir yang aman dan mudah diakses.');
SELECT setval('layanan_kantor_id_seq', 10);

-- 4. Promotions
INSERT INTO promotions (id, badge, title, description, period, service_id, is_active, created_at, updated_at, cta_label)
VALUES (1, 'promo', 'Gratis 3 Bulan Sewa Virtual Office', 'Nikmati keuntungan sewa Virtual Office di EasyOffice dengan gratis sewa selama 3 bulan untuk komitmen tahunan. Hemat operasional perusahaanmu!', 'Penawaran Terbatas', NULL, true, now(), now(), 'Ambil Promo');
INSERT INTO promotions (id, badge, title, description, period, service_id, is_active, created_at, updated_at, cta_label)
VALUES (2, 'promo', 'Free Room Meeting hingga 70 Jam/Tahun', 'Dapatkan akses gratis pemakaian ruang meeting eksklusif hingga 70 jam per tahun untuk pertemuan bisnis Anda.', 'Termasuk di Paket Tertentu', NULL, true, now(), now(), 'Ambil Promo');
INSERT INTO promotions (id, badge, title, description, period, service_id, is_active, created_at, updated_at, cta_label)
VALUES (3, 'promo', 'Diskon Paket Pendirian PT + Virtual Office', 'Miliki legalitas badan usaha PT atau CV lengkap sekaligus domisili kantor virtual komersial resmi siap pakai.', 'Selama Kuota Tersedia', NULL, true, now(), now(), 'Ambil Promo');
SELECT setval('promotions_id_seq', 4);

-- 5. Comparison Rows
INSERT INTO comparison_rows (id, feature, easyoffice, typical, placement, sort_order, is_active, created_at, updated_at)
VALUES (1, 'Alamat bisnis profesional', 'true', 'false', 'global', 1, true, now(), now());
INSERT INTO comparison_rows (id, feature, easyoffice, typical, placement, sort_order, is_active, created_at, updated_at)
VALUES (2, 'Ruang meeting di lokasi', 'true', 'false', 'global', 2, true, now(), now());
INSERT INTO comparison_rows (id, feature, easyoffice, typical, placement, sort_order, is_active, created_at, updated_at)
VALUES (3, 'Layanan resepsionis', 'true', 'false', 'global', 3, true, now(), now());
INSERT INTO comparison_rows (id, feature, easyoffice, typical, placement, sort_order, is_active, created_at, updated_at)
VALUES (4, 'Penanganan surat dan paket', 'true', 'true', 'global', 4, true, now(), now());
INSERT INTO comparison_rows (id, feature, easyoffice, typical, placement, sort_order, is_active, created_at, updated_at)
VALUES (5, 'Akses coworking', 'true', 'false', 'global', 5, true, now(), now());
INSERT INTO comparison_rows (id, feature, easyoffice, typical, placement, sort_order, is_active, created_at, updated_at)
VALUES (6, 'Paket fleksibel bulanan', 'true', 'true', 'global', 6, true, now(), now());
SELECT setval('comparison_rows_id_seq', 7);

-- 6. Homepage Facilities
INSERT INTO homepage_facilities (id, title, description, icon, sort_order, is_active, created_at, updated_at)
VALUES (1, 'Lokasi Prestisius', 'Tingkatkan citra profesional bisnis Anda dengan lokasi strategis di area bergengsi kota besar.', 'map-pin', 1, true, now(), now());
INSERT INTO homepage_facilities (id, title, description, icon, sort_order, is_active, created_at, updated_at)
VALUES (2, 'Transaksi Aman', 'Kami memastikan setiap transaksi di kantor kami aman dan terpercaya melalui marketplace resmi Shopee.', 'wallet', 2, true, now(), now());
INSERT INTO homepage_facilities (id, title, description, icon, sort_order, is_active, created_at, updated_at)
VALUES (3, 'Fasilitas Lengkap', 'Internet cepat, LED Smart TV/proyektor, dan ruang kerja nyaman untuk produktivitas maksimal.', 'wifi', 3, true, now(), now());
INSERT INTO homepage_facilities (id, title, description, icon, sort_order, is_active, created_at, updated_at)
VALUES (4, 'Harga Terjangkau', 'Dapatkan pengalaman bekerja yang nyaman dan legalitas resmi tanpa menguras kantong.', 'door', 4, true, now(), now());
INSERT INTO homepage_facilities (id, title, description, icon, sort_order, is_active, created_at, updated_at)
VALUES (5, 'Meeting Room', 'Ruang rapat yang nyaman dan profesional dilengkapi fasilitas presentasi lengkap.', 'door', 5, true, now(), now());
INSERT INTO homepage_facilities (id, title, description, icon, sort_order, is_active, created_at, updated_at)
VALUES (6, 'Layanan Surat Menyurat', 'Nikmati kemudahan kelola dokumen bisnis lewat layanan surat-menyurat dan resepsionis kami.', 'bell', 6, true, now(), now());
INSERT INTO homepage_facilities (id, title, description, icon, sort_order, is_active, created_at, updated_at)
VALUES (7, 'WiFi Cepat', 'Internet stabil untuk kerja dan meeting online.', 'wifi', 7, true, now(), now());
INSERT INTO homepage_facilities (id, title, description, icon, sort_order, is_active, created_at, updated_at)
VALUES (8, 'Meeting Room', 'Ruang meeting profesional dengan peralatan lengkap.', 'door', 8, true, now(), now());
INSERT INTO homepage_facilities (id, title, description, icon, sort_order, is_active, created_at, updated_at)
VALUES (9, 'Resepsionis', 'Sambutan profesional untuk tamu dan klien Anda.', 'bell', 9, true, now(), now());
INSERT INTO homepage_facilities (id, title, description, icon, sort_order, is_active, created_at, updated_at)
VALUES (10, 'Alamat Bisnis', 'Alamat prestisius untuk legalitas dan citra usaha.', 'map-pin', 10, true, now(), now());
INSERT INTO homepage_facilities (id, title, description, icon, sort_order, is_active, created_at, updated_at)
VALUES (11, 'Print & Scan', 'Fasilitas cetak dan pemindaian dokumen.', 'printer', 11, true, now(), now());
INSERT INTO homepage_facilities (id, title, description, icon, sort_order, is_active, created_at, updated_at)
VALUES (12, 'Lounge & Pantry', 'Area santai dengan kopi, teh, dan air minum.', 'coffee', 12, true, now(), now());
INSERT INTO homepage_facilities (id, title, description, icon, sort_order, is_active, created_at, updated_at)
VALUES (13, 'Parkir', 'Area parkir yang aman dan mudah diakses.', 'car', 13, true, now(), now());
INSERT INTO homepage_facilities (id, title, description, icon, sort_order, is_active, created_at, updated_at)
VALUES (14, 'Akses Fleksibel', 'Jam operasional yang menyesuaikan kebutuhan tim.', 'clock', 14, true, now(), now());
SELECT setval('homepage_facilities_id_seq', 15);

-- 7. Testimonials
INSERT INTO testimonials (id, name, company, quote, is_active, created_at, updated_at)
VALUES (1, 'Rina Prasetyo', 'Founder, Konsultan Pajak Rina & Partners', 'Sejak pakai Virtual Office EasyOffice, klien langsung percaya di telepon pertama — alamat Sudirman-nya bikin kami terlihat jauh lebih matang dari modal sebenarnya.', true, now(), now());
INSERT INTO testimonials (id, name, company, quote, is_active, created_at, updated_at)
VALUES (2, 'Andi Wijaya', 'CTO, Startup Logistik Nusantara', 'Tim engineering kami sewa dedicated desk di sini. Internetnya kencang, rapat cepat beres di meeting room, dan biaya sewa kantor penuh yang kami hemat bisa dipakai untuk iterasi produk.', true, now(), now());
INSERT INTO testimonials (id, name, company, quote, is_active, created_at, updated_at)
VALUES (3, 'Dewi Lestari', 'Marketing Manager, Brand F&B Lokal', 'Sering booking meeting room untuk presentasi klien. Prosesnya tinggal chat WhatsApp, dan resepsionisnya sigap menyambut tamu kami — profesional sekali.', true, now(), now());
INSERT INTO testimonials (id, name, company, quote, is_active, created_at, updated_at)
VALUES (4, 'Budi Hartono', 'Direktur, Konsultan Sipil Bumi Karya', 'Kantor virtual di Bandung ini bikin legalitas usaha kami langsung beres. Surat dan paket selalu diberitahukan, jadi tidak ada yang terlewat walau kami jarang ke lokasi.', true, now(), now());
INSERT INTO testimonials (id, name, company, quote, is_active, created_at, updated_at)
VALUES (5, 'Sinta Dewi', 'Freelance Designer', 'Hot desk coworking-nya nyaman untuk kerja seharian. Ada kopi gratis, rapat pun tidak perlu cari tempat lagi — cocok banget untuk profesional solo seperti saya.', true, now(), now());
INSERT INTO testimonials (id, name, company, quote, is_active, created_at, updated_at)
VALUES (6, 'Hendra Gunawan', 'Procurement Lead, Distributor Elektronik', 'Kami rutin pakai meeting room untuk review supplier. Kapasitas pas, proyektor dan whiteboard siap pakai, dan tim teknisnya responsif kalau butuh bantuan.', true, now(), now());
INSERT INTO testimonials (id, name, company, quote, is_active, created_at, updated_at)
VALUES (7, 'Lukman Purnama', 'Google Maps', 'Recommended', true, now(), now());
INSERT INTO testimonials (id, name, company, quote, is_active, created_at, updated_at)
VALUES (8, 'Arya Prakasa', 'Google Maps · Terjemahan Google · Kutipan dipotong', 'The lowest price, but not cheap quality. Recommended for young, handsome, and humble entrepreneurs 😎 …', true, now(), now());
INSERT INTO testimonials (id, name, company, quote, is_active, created_at, updated_at)
VALUES (9, 'Arifin Herlambang', 'Google Maps · Terjemahan Google', 'The office is good, the service is excellent, very satisfying', true, now(), now());
INSERT INTO testimonials (id, name, company, quote, is_active, created_at, updated_at)
VALUES (10, 'Reza Katerin', 'Google Maps · Terjemahan Google · Kutipan dipotong', 'The location is easily accessible and very strategic, the service and facilities are good, suitable for entrepreneurs who want to have an office address in Bandung City because the price is very friendly and affordable...', true, now(), now());
INSERT INTO testimonials (id, name, company, quote, is_active, created_at, updated_at)
VALUES (11, 'Muhammad Mega Nurhakiim', 'Google Maps · Terjemahan Google', 'Amazing, the office is comfortable and the prices are affordable. Perfect for me, who likes comfort. I hope EasyOffice continues to improve.', true, now(), now());
SELECT setval('testimonials_id_seq', 12);

-- 8. FAQs
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (1, 'Apa itu Virtual Office?', 'Virtual Office adalah layanan kantor tanpa ruang fisik yang memberikan alamat bisnis prestisius, layanan penerimaan surat, dan fasilitas lainnya untuk mendukung operasional bisnis Anda.', 'Umum', NULL, 'global', 'FAQ Umum EasyOffice', 1, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (1, 1, 'faq-1-item-1', 'Apa itu Virtual Office?', 'Virtual Office adalah layanan kantor tanpa ruang fisik yang memberikan alamat bisnis prestisius, layanan penerimaan surat, dan fasilitas lainnya untuk mendukung operasional bisnis Anda.', 1);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (2, 'Apa saja keuntungan menggunakan Virtual Office?', 'Alamat bisnis profesional untuk meningkatkan kredibilitas usaha, biaya lebih hemat dibandingkan kantor fisik, fleksibilitas kerja dari mana saja tanpa perlu menyewa ruang kantor, dan layanan tambahan seperti penerimaan surat, nomor telepon bisnis, serta meeting room.', 'Umum', NULL, 'global', 'FAQ Umum EasyOffice', 2, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (2, 2, 'faq-2-item-2', 'Apa saja keuntungan menggunakan Virtual Office?', 'Alamat bisnis profesional untuk meningkatkan kredibilitas usaha, biaya lebih hemat dibandingkan kantor fisik, fleksibilitas kerja dari mana saja tanpa perlu menyewa ruang kantor, dan layanan tambahan seperti penerimaan surat, nomor telepon bisnis, serta meeting room.', 2);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (3, 'Siapa yang cocok menggunakan Virtual Office?', 'Startup dan bisnis kecil yang ingin mengurangi biaya operasional, freelancer dan pekerja remote yang membutuhkan alamat bisnis profesional, serta perusahaan yang ingin memperluas jangkauan bisnis tanpa membuka kantor fisik baru.', 'Umum', NULL, 'global', 'FAQ Umum EasyOffice', 3, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (3, 3, 'faq-3-item-3', 'Siapa yang cocok menggunakan Virtual Office?', 'Startup dan bisnis kecil yang ingin mengurangi biaya operasional, freelancer dan pekerja remote yang membutuhkan alamat bisnis profesional, serta perusahaan yang ingin memperluas jangkauan bisnis tanpa membuka kantor fisik baru.', 3);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (4, 'Apakah alamat Virtual Office EasyOffice bisa untuk PKP dan legalitas?', 'Ya, Virtual Office EasyOffice sudah disetujui pemerintah dan berlokasi di gedung komersial dengan legalitas lengkap (IMB, PBB, Perjanjian Sewa) sehingga dapat digunakan untuk pendaftaran PKP serta pendirian PT atau CV.', 'Umum', NULL, 'global', 'FAQ Umum EasyOffice', 4, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (4, 4, 'faq-4-item-4', 'Apakah alamat Virtual Office EasyOffice bisa untuk PKP dan legalitas?', 'Ya, Virtual Office EasyOffice sudah disetujui pemerintah dan berlokasi di gedung komersial dengan legalitas lengkap (IMB, PBB, Perjanjian Sewa) sehingga dapat digunakan untuk pendaftaran PKP serta pendirian PT atau CV.', 4);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (5, 'Bagaimana cara konsultasi dan pemesanan layanan?', 'Klik tombol WhatsApp di situs ini — tim Customer Care kami siap membantu konsultasi gratis pemilihan lokasi dan paket yang paling sesuai dengan kebutuhan usaha Anda.', 'Umum', NULL, 'global', 'FAQ Umum EasyOffice', 5, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (5, 5, 'faq-5-item-5', 'Bagaimana cara konsultasi dan pemesanan layanan?', 'Klik tombol WhatsApp di situs ini — tim Customer Care kami siap membantu konsultasi gratis pemilihan lokasi dan paket yang paling sesuai dengan kebutuhan usaha Anda.', 5);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (6, 'Apakah alamat Virtual Office bisa untuk legalitas usaha dan PKP?', 'Bisa. Alamat Virtual Office EasyOffice berada di zonasi komersial gedung perkantoran resmi dengan dokumen IMB dan PBB yang sah, sehingga memenuhi syarat untuk domisili legalitas PT, CV, serta pendaftaran PKP.', 'Virtual Office', 1, 'service', 'FAQ Virtual Office', 1, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (1, 6, 'faq-6-item-1', 'Apakah alamat Virtual Office bisa untuk legalitas usaha dan PKP?', 'Bisa. Alamat Virtual Office EasyOffice berada di zonasi komersial gedung perkantoran resmi dengan dokumen IMB dan PBB yang sah, sehingga memenuhi syarat untuk domisili legalitas PT, CV, serta pendaftaran PKP.', 1);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (7, 'Bagaimana sistem penerimaan surat dan paket?', 'Resepsionis kami akan menerima, mencatat, dan mengamankan setiap surat atau paket masuk atas nama perusahaan Anda, kemudian memberikan notifikasi langsung melalui WhatsApp.', 'Virtual Office', 1, 'service', 'FAQ Virtual Office', 2, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (2, 7, 'faq-7-item-2', 'Bagaimana sistem penerimaan surat dan paket?', 'Resepsionis kami akan menerima, mencatat, dan mengamankan setiap surat atau paket masuk atas nama perusahaan Anda, kemudian memberikan notifikasi langsung melalui WhatsApp.', 2);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (8, 'Apakah saya bisa menggunakan meeting room?', 'Ya. Setiap paket Virtual Office dilengkapi akses meeting room eksklusif (hingga 70 jam/tahun pada paket tertentu) yang dilengkapi LED Smart TV, proyektor, dan koneksi internet cepat.', 'Virtual Office', 1, 'service', 'FAQ Virtual Office', 3, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (3, 8, 'faq-8-item-3', 'Apakah saya bisa menggunakan meeting room?', 'Ya. Setiap paket Virtual Office dilengkapi akses meeting room eksklusif (hingga 70 jam/tahun pada paket tertentu) yang dilengkapi LED Smart TV, proyektor, dan koneksi internet cepat.', 3);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (9, 'Berapa lama minimal berlangganan?', 'Paket sewa tersedia dengan komitmen fleksibel mulai dari bulanan hingga tahunan, dengan penawaran khusus hemat hingga gratis sewa 3 bulan untuk paket tahunan.', 'Virtual Office', 1, 'service', 'FAQ Virtual Office', 4, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (4, 9, 'faq-9-item-4', 'Berapa lama minimal berlangganan?', 'Paket sewa tersedia dengan komitmen fleksibel mulai dari bulanan hingga tahunan, dengan penawaran khusus hemat hingga gratis sewa 3 bulan untuk paket tahunan.', 4);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (10, 'Apa perbedaan hot desk dan dedicated desk?', 'Hot desk adalah meja fleksibel yang dipakai bergantian, sedangkan dedicated desk adalah meja khusus permanen untuk Anda.', 'Coworking Space', 2, 'service', 'FAQ Coworking Space', 1, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (1, 10, 'faq-10-item-1', 'Apa perbedaan hot desk dan dedicated desk?', 'Hot desk adalah meja fleksibel yang dipakai bergantian, sedangkan dedicated desk adalah meja khusus permanen untuk Anda.', 1);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (11, 'Apakah bisa bayar harian?', 'Ya. Tersedia tarif harian, bulanan, dan dedicated desk.', 'Coworking Space', 2, 'service', 'FAQ Coworking Space', 2, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (2, 11, 'faq-11-item-2', 'Apakah bisa bayar harian?', 'Ya. Tersedia tarif harian, bulanan, dan dedicated desk.', 2);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (12, 'Apakah tersedia akses meeting room?', 'Paket bulanan dan dedicated sudah termasuk jatah jam meeting room per bulan.', 'Coworking Space', 2, 'service', 'FAQ Coworking Space', 3, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (3, 12, 'faq-12-item-3', 'Apakah tersedia akses meeting room?', 'Paket bulanan dan dedicated sudah termasuk jatah jam meeting room per bulan.', 3);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (13, 'Jam berapa coworking beroperasi?', 'Senin–Jumat, 08.00–17.00 WIB. Kebutuhan di luar jam tersebut dapat didiskusikan dengan tim kami.', 'Coworking Space', 2, 'service', 'FAQ Coworking Space', 4, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (4, 13, 'faq-13-item-4', 'Jam berapa coworking beroperasi?', 'Senin–Jumat, 08.00–17.00 WIB. Kebutuhan di luar jam tersebut dapat didiskusikan dengan tim kami.', 4);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (14, 'Berapa kapasitas meeting room yang tersedia?', 'Tersedia ruangan Small (hingga 6 orang), Medium (hingga 12 orang), dan Large (hingga 20 orang).', 'Meeting Room', 3, 'service', 'FAQ Meeting Room', 1, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (1, 14, 'faq-14-item-1', 'Berapa kapasitas meeting room yang tersedia?', 'Tersedia ruangan Small (hingga 6 orang), Medium (hingga 12 orang), dan Large (hingga 20 orang).', 1);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (15, 'Bagaimana cara memesan meeting room?', 'Pemesanan dilakukan melalui WhatsApp — pilih tanggal, jam, dan kapasitas ruangan yang dibutuhkan.', 'Meeting Room', 3, 'service', 'FAQ Meeting Room', 2, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (2, 15, 'faq-15-item-2', 'Bagaimana cara memesan meeting room?', 'Pemesanan dilakukan melalui WhatsApp — pilih tanggal, jam, dan kapasitas ruangan yang dibutuhkan.', 2);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (16, 'Apakah tersedia proyektor dan konsumsi?', 'Ruangan Medium dan Large dilengkapi proyektor. Snack, minuman, dan catering tersedia sesuai paket.', 'Meeting Room', 3, 'service', 'FAQ Meeting Room', 3, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (3, 16, 'faq-16-item-3', 'Apakah tersedia proyektor dan konsumsi?', 'Ruangan Medium dan Large dilengkapi proyektor. Snack, minuman, dan catering tersedia sesuai paket.', 3);
INSERT INTO faqs (id, question, answer, category, service_id, placement, title, sort_order, is_active, created_at, updated_at)
VALUES (17, 'Apakah bisa dibatalkan atau dijadwalkan ulang?', 'Ya, dengan pemberitahuan sebelumnya sesuai ketentuan yang akan dijelaskan tim kami saat pemesanan.', 'Meeting Room', 3, 'service', 'FAQ Meeting Room', 4, true, now(), now());
INSERT INTO faqs_items (_order, _parent_id, id, question, answer, sort_order)
VALUES (4, 17, 'faq-17-item-4', 'Apakah bisa dibatalkan atau dijadwalkan ulang?', 'Ya, dengan pemberitahuan sebelumnya sesuai ketentuan yang akan dijelaskan tim kami saat pemesanan.', 4);
SELECT setval('faqs_id_seq', 18);

-- 9. Site Settings Global
INSERT INTO site_settings (
  id, site_name, tagline, primary_whatsapp, email, phone, operating_hours,
  header_cta_label, header_cta_message,
  homepage_hero_eyebrow, homepage_hero_title, homepage_hero_description,
  homepage_hero_primary_cta_label, homepage_hero_primary_cta_message,
  homepage_hero_secondary_cta_label, homepage_hero_secondary_cta_href,
  homepage_services_title, homepage_services_description,
  homepage_facilities_title, homepage_facilities_description,
  homepage_comparison_title, homepage_comparison_description,
  homepage_promo_title, homepage_promo_description,
  homepage_shopee_title, homepage_shopee_description,
  footer_description, copyright_text, default_seo_title, default_seo_description,
  created_at, updated_at
) VALUES (
  1,
  'EasyOffice',
  'Virtual Office, Coworking Space & Meeting Room Profesional',
  '62818881425',
  'id.easyoffice@gmail.com',
  '0818 881 425',
  'Senin–Jumat, 08.00–17.00 WIB',
  'Hubungi Kami',
  'Halo EasyOffice, saya ingin bertanya tentang layanan Anda.',
  'EasyOffice',
  'Miliki Alamat Kantor Premium di Kota Besar Indonesia',
  'Virtual Office (VO) sudah disetujui pemerintah dan dapat digunakan untuk keperluan legal, seperti pendirian PT, CV, dan pendaftaran PKP. VO memudahkan Anda mengurus dokumen bisnis secara praktis dan efisien.',
  'Hubungi Kami',
  'Halo EasyOffice, saya ingin bertanya tentang layanan Anda.',
  'Lihat Layanan',
  '/layanan/virtual-office',
  'Layanan EasyOffice',
  'Berbagai layanan untuk mendukung operasional dan citra profesional bisnis Anda.',
  'Keuntungan Sewa Virtual Office di Kami',
  'Dapatkan alamat bisnis prestisius dengan biaya terjangkau! Virtual office kami menawarkan fasilitas lengkap, layanan profesional, serta fleksibilitas tinggi.',
  'Perbandingan dengan Office Lain',
  'Perbandingan fasilitas yang Anda dapatkan bersama EasyOffice.',
  'Penawaran Spesial untuk Anda',
  'Temukan penawaran EasyOffice untuk kebutuhan ruang kerja dan bisnis Anda.',
  'Pesan Paket EasyOffice dengan Mudah',
  'Pembayaran layanan EasyOffice tersedia melalui marketplace Shopee dengan transaksi yang aman dan terpercaya.',
  'EasyOffice adalah penyedia layanan kantor virtual di Bandung, Jakarta, dan Bekasi yang menawarkan alamat bisnis prestisius, ruang meeting eksklusif, layanan pengelolaan surat, dan resepsionis profesional. Member of EASY CORP.',
  '© 2026 EasyOffice. Member of EASY CORP.',
  'EasyOffice: Virtual Office Bisa PKP Murah dan Profesional',
  'Cari virtual office murah untuk bisnis Anda? EasyOffice menyediakan layanan sewa kantor virtual, Bisa PKP di Bandung, Jakarta, dan Bekasi. Konsultasi Gratis!',
  now(),
  now()
);
INSERT INTO site_settings_whatsapp_numbers (_order, _parent_id, id, label, number, active, priority) VALUES
(1, 1, 'ss-wa-1', 'Bandung (Cihampelas)', '62818881425', true, 1),
(2, 1, 'ss-wa-2', 'Jakarta (Sovereign Plaza)', '62818881425', true, 2),
(3, 1, 'ss-wa-3', 'Bekasi (Summarecon)', '62818881425', true, 3);
INSERT INTO site_settings_stats_banner (_order, _parent_id, id, value, label, icon) VALUES
(1, 1, 'ss-stat-1', '13.000+', 'Bisnis Terlayani', 'briefcase'),
(2, 1, 'ss-stat-2', '5 Menit', 'Respon WhatsApp', 'message'),
(3, 1, 'ss-stat-3', '4.9 ★', 'Rating Google (700+)', 'star'),
(4, 1, 'ss-stat-4', '100%', 'Legal & Resmi', 'shield');
INSERT INTO site_settings_homepage_hero_trust_items (_order, _parent_id, id, text, sort_order) VALUES
(1, 1, 'ss-trust-1', 'Bisa PKP', 1),
(2, 1, 'ss-trust-2', 'Alamat Domisili Gedung Komersial', 2),
(3, 1, 'ss-trust-3', 'Free Meeting Room hingga 70 Jam/Tahun', 3),
(4, 1, 'ss-trust-4', 'Proses Cepat & Tanpa Ribet', 4),
(5, 1, 'ss-trust-5', 'Legalitas Lengkap (IMB & PBB)', 5);
INSERT INTO site_settings_how_it_works (_order, _parent_id, id, title, description, sort_order) VALUES
(1, 1, 'ss-hiw-1', 'Konsultasi & Pilih Paket', 'Hubungi tim kami via WhatsApp untuk memilih paket dan lokasi kantor sesuai kebutuhan.', 1),
(2, 1, 'ss-hiw-2', 'Verifikasi & Pembayaran', 'Lengkapi data usaha Anda dan lakukan pembayaran yang aman via marketplace Shopee atau transfer resmi.', 2),
(3, 1, 'ss-hiw-3', 'Kantor Siap Digunakan', 'Surat perjanjian sewa dan domisili diterbitkan, kantor langsung siap digunakan untuk operasional dan PKP.', 3);
-- 10. About Page Global
INSERT INTO about_page (
  id, eyebrow, hero_title, hero_description, story_eyebrow, story_title, story_description,
  created_at, updated_at
) VALUES (
  1,
  'Tentang Kami',
  'Buat Bisnismu Terlihat Profesional & Terpercaya',
  'EasyOffice hadir sebagai solusi virtual office dengan layanan profesional, terpercaya, dan harga terjangkau di Bandung, Jakarta, dan Bekasi.',
  'Cerita Kami',
  'Tentang EasyOffice',
  'EasyOffice adalah penyedia layanan virtual office di Bekasi, Jakarta, dan Bandung yang menyediakan alamat bisnis profesional, ruang meeting, layanan resepsionis, serta pengelolaan surat untuk mendukung pertumbuhan bisnis dengan biaya yang lebih hemat dan terjangkau.',
  now(),
  now()
);
INSERT INTO about_page_story_highlights (_order, _parent_id, id, value) VALUES
(1, 1, 'ab-hl-1', 'Terdaftar resmi di Kemenkumham RI: CV EASYOFFICE KANTOR BERSAMA (AHU-0094982-AH.01.14 Tahun 2025)'),
(2, 1, 'ab-hl-2', 'Alamat zonasi komersial gedung perkantoran resmi dan dapat digunakan untuk pendaftaran PKP'),
(3, 1, 'ab-hl-3', 'Free pemakaian Meeting Room eksklusif hingga 70 jam/tahun');
INSERT INTO about_page_stats (_order, _parent_id, id, value, label) VALUES
(1, 1, 'ab-st-1', '13.000+', 'Bisnis Terlayani'),
(2, 1, 'ab-st-2', '5 Menit', 'Respon WhatsApp'),
(3, 1, 'ab-st-3', '4.9 ★', 'Rating Google'),
(4, 1, 'ab-st-4', '100%', 'Legal & Resmi');

COMMIT;
