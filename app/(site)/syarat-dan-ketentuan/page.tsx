import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan (Terms & Conditions)",
  description:
    "Syarat dan Ketentuan penggunaan layanan Virtual Office, penyewaan ruang meeting, dan website resmi EasyOffice.",
};

export default function TermsPage() {
  return (
    <div className="bg-surface py-10 sm:py-14">
      <Container className="max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-navy">
            Beranda
          </Link>
          <span>&gt;</span>
          <strong className="text-navy">Syarat & Ketentuan</strong>
        </nav>

        <article className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-soft sm:p-12">
          <h1 className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Syarat & Ketentuan (Terms & Conditions)
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
            Selamat datang di <strong>EasyOffice</strong> (CV EASYOFFICE KANTOR BERSAMA). Syarat dan Ketentuan berikut mengatur penggunaan layanan Virtual Office, penyewaan ruang meeting, layanan pendukung bisnis, serta penggunaan website resmi EasyOffice. Dengan mendaftar, membayar, atau menggunakan layanan kami, Anda (selanjutnya disebut &ldquo;Klien&rdquo;) dianggap telah membaca, memahami, dan menyetujui seluruh ketentuan ini.
          </p>

          <hr className="my-8 border-neutral-100" />

          <div className="space-y-8 text-sm leading-relaxed text-neutral-700 sm:text-base">
            <section>
              <h2 className="font-display text-xl font-bold text-navy">1. Definisi Layanan</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600">
                <li>
                  <strong>EasyOffice:</strong> Penyedia layanan Virtual Office, domisili usaha, ruang meeting, pengelolaan surat, dan layanan resepsionis yang berlokasi di Bandung, Jakarta, dan Bekasi.
                </li>
                <li>
                  <strong>Layanan Virtual Office:</strong> Fasilitas penggunaan alamat bisnis resmi EasyOffice untuk keperluan legalitas, korespondensi, dan operasional bisnis Klien.
                </li>
                <li>
                  <strong>Masa Berlangganan:</strong> Jangka waktu sewa layanan yang disepakati oleh Klien dan EasyOffice (bulanan atau tahunan).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy">2. Penggunaan Alamat Bisnis & Legitimasi Usaha</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600">
                <li>
                  <strong>Penggunaan Sah:</strong> Klien wajib menggunakan alamat EasyOffice hanya untuk kegiatan bisnis yang sah dan tidak melanggar hukum yang berlaku di Republik Indonesia.
                </li>
                <li>
                  <strong>Kegiatan Terlarang:</strong> Klien dilarang keras menggunakan alamat, nama, atau fasilitas EasyOffice untuk kegiatan penipuan, judi online, pencucian uang, pemasaran berniat jahat, atau tindakan kriminal lainnya.
                </li>
                <li>
                  <strong>Penyalahgunaan:</strong> EasyOffice berhak memberikan data Klien kepada pihak berwajib jika terdapat indikasi pelanggaran hukum dan berhak menghentikan layanan secara sepihak tanpa pengembalian dana.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy">3. Ketentuan Pembayaran & Perpanjangan</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600">
                <li>
                  <strong>Pembayaran Dimuka:</strong> Seluruh biaya sewa dan layanan tambahan harus dilunasi sebelum masa layanan atau penggunaan fasilitas dimulai.
                </li>
                <li>
                  <strong>Perpanjangan Layanan:</strong> Tagihan perpanjangan (invoice renewal) akan dikirimkan sebelum masa berlaku berakhir. Jika Klien tidak melakukan pembayaran hingga tanggal jatuh tempo, EasyOffice berhak menonaktifkan layanan.
                </li>
                <li>
                  <strong>Kebijakan Pengembalian Dana (Refund):</strong> Seluruh pembayaran yang telah diterima oleh EasyOffice bersifat non-refundable (tidak dapat dikembalikan), kecuali dinyatakan lain dalam kesepakatan tertulis khusus.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy">4. Pengelolaan Surat & Paket</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600">
                <li>EasyOffice menerima surat dan paket atas nama Klien atau perusahaan Klien yang terdaftar pada jam operasional kerja.</li>
                <li>Tim EasyOffice akan memberitahu Klien melalui WhatsApp/Email saat ada surat atau paket yang masuk.</li>
                <li>Surat/paket yang tidak diambil dalam kurun waktu 30 (tiga puluh) hari kalender sejak notifikasi berada di luar tanggung jawab EasyOffice atas kerusakan atau kehilangan.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy">5. Penggunaan Ruang Meeting</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600">
                <li>Penggunaan ruang meeting harus dipesan terlebih dahulu melalui Customer Care EasyOffice dan tergantung ketersediaan tempat.</li>
                <li>Pembatalan jadwal ruang meeting wajib diinformasikan maksimal 24 jam sebelum jadwal penggunaan agar kuota jam tidak hangus.</li>
                <li>Klien dan tamu Klien wajib menjaga ketertiban, kebersihan, serta keutuhan fasilitas di area kantor EasyOffice.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <h2 className="font-display text-lg font-bold text-navy">6. Hubungi Kami</h2>
              <p className="mt-2 text-neutral-600">Untuk pertanyaan mengenai Syarat & Ketentuan ini, silakan hubungi kami:</p>
              <ul className="mt-3 space-y-1 text-sm text-neutral-700">
                <li><strong>Email:</strong> id.easyoffice@gmail.com</li>
                <li><strong>WhatsApp:</strong> 0818 881 425 / 0817 321 160</li>
                <li><strong>Telepon:</strong> (022) 3209 9037</li>
                <li><strong>Alamat:</strong> Jl. Cihampelas No.201A, RT 01/RW 02, Cipaganti, Kec. Coblong, Kota Bandung, Jawa Barat 40131</li>
              </ul>
            </section>
          </div>
        </article>
      </Container>
    </div>
  );
}
