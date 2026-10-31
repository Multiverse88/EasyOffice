import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Kebijakan Privasi (Privacy Policy)",
  description:
    "Kebijakan Privasi ini menjelaskan bagaimana EasyOffice mengumpulkan, menggunakan, mengelola, dan melindungi informasi pribadi Anda.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-surface py-10 sm:py-14">
      <Container className="max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-navy">
            Beranda
          </Link>
          <span>&gt;</span>
          <strong className="text-navy">Kebijakan Privasi</strong>
        </nav>

        <article className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-soft sm:p-12">
          <h1 className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Kebijakan Privasi (Privacy Policy)
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-neutral-600 sm:text-base">
            Di <strong>EasyOffice</strong> (CV EASYOFFICE KANTOR BERSAMA), privasi dan keamanan data pribadi Anda adalah prioritas utama kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengelola, dan melindungi informasi pribadi Anda saat menggunakan layanan Virtual Office, ruang meeting, maupun saat mengakses website kami.
          </p>

          <hr className="my-8 border-neutral-100" />

          <div className="space-y-8 text-sm leading-relaxed text-neutral-700 sm:text-base">
            <section>
              <h2 className="font-display text-xl font-bold text-navy">1. Informasi yang Kami Kumpulkan</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-600">
                <li>
                  <strong>Informasi Pribadi & Kontak:</strong> Nama, alamat email, nomor telepon/WhatsApp, alamat surat-menyurat, serta identitas resmi (KTP/Paspor) yang dibutuhkan untuk proses legalitas dan registrasi alamat bisnis.
                </li>
                <li>
                  <strong>Informasi Perusahaan:</strong> Nama perusahaan, dokumen legalitas usaha (NIB, NPWP, Akta Pendirian), dan detail kebutuhan operasional bisnis Anda.
                </li>
                <li>
                  <strong>Data Penggunaan Website:</strong> Alamat IP, jenis perangkat, jenis peramban (browser), serta aktivitas navigasi Anda di website kami melalui cookies dan teknologi pelacakan standar.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy">2. Penggunaan Informasi Anda</h2>
              <p className="mt-3 text-neutral-600">Informasi yang kami kumpulkan digunakan untuk tujuan berikut:</p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-neutral-600">
                <li>Menyediakan dan mengelola layanan Virtual Office, pengelolaan surat/paket, dan pemesanan ruang meeting.</li>
                <li>Verifikasi identitas dan legalitas pengajuan alamat bisnis sesuai dengan peraturan perundang-undangan yang berlaku di Indonesia.</li>
                <li>Memproses transaksi, pembayaran, dan konfirmasi pemesanan.</li>
                <li>Layanan pelanggan (Customer Care), termasuk merespons pertanyaan, masukan, atau kendala operasional Anda.</li>
                <li>Mengirimkan informasi pembaruan layanan, dokumen bisnis, tagihan, serta penawaran promosi resmi.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy">3. Keamanan Data</h2>
              <p className="mt-3 text-neutral-600">
                Kami menerapkan langkah-langkah teknis dan organisasional yang ketat untuk menjaga keamanan data Anda dari akses, perubahan, pengungkapan, atau penghancuran yang tidak sah. Akses terhadap informasi pribadi Anda dibatasi hanya kepada staf authorized EasyOffice yang membutuhkan informasi tersebut untuk menjalankan tugas operasional.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy">4. Pengungkapan Informasi Kepada Pihak Ketiga</h2>
              <p className="mt-3 text-neutral-600">
                EasyOffice tidak akan pernah menjual, menyewakan, atau memperdagangkan data pribadi Anda kepada pihak ketiga. Kami hanya membagikan informasi dalam kondisi kepatuhan hukum resmi atau penyedia layanan pendukung operasional (seperti perbankan/pembayaran dan infrastruktur TI) yang terikat perjanjian kerahasiaan.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-bold text-navy">5. Hak-Hak Anda</h2>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-neutral-600">
                <li>Mengakses dan meminta salinan data pribadi yang kami simpan tentang Anda.</li>
                <li>Meminta pembaruan atau koreksi jika terdapat kekeliruan data.</li>
                <li>Meminta penghapusan data pribadi Anda, sepanjang tidak bertentangan dengan kewajiban retensi data hukum/perpajakan yang berlaku.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6">
              <h2 className="font-display text-lg font-bold text-navy">6. Hubungi Kami</h2>
              <p className="mt-2 text-neutral-600">Jika Anda memiliki pertanyaan terkait Kebijakan Privasi ini, silakan hubungi tim kami:</p>
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
