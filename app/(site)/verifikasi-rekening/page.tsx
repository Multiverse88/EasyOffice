"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Copy, AlertTriangle, ShieldCheck, ExternalLink, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";

export default function VerificationPage() {
  const [copied, setCopied] = useState(false);
  const accountNumber = "7332617936";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-surface py-10 sm:py-14">
      <Container className="max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-navy">
            Beranda
          </Link>
          <span>&gt;</span>
          <strong className="text-navy">Verifikasi Rekening & Legalitas</strong>
        </nav>

        <article className="overflow-hidden rounded-3xl border border-neutral-200 bg-white p-8 shadow-soft sm:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <ShieldCheck className="h-4 w-4" />
            Halaman Verifikasi Resmi
          </div>

          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Verifikasi Rekening Resmi EasyOffice
          </h1>
          <p className="mt-3 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Pastikan transaksi dan pembayaran invoice Anda hanya ditujukan ke rekening resmi atas nama badan usaha sah kami untuk menjamin keamanan transaksi.
          </p>

          <hr className="my-8 border-neutral-100" />

          {/* Rekening Card */}
          <div className="rounded-2xl border-2 border-navy/20 bg-gradient-to-br from-navy/5 via-white to-blue-50/40 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Rekening Resmi Pembayaran
            </p>
            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <strong className="block font-display text-sm font-bold text-navy uppercase tracking-wide">
                  Bank Syariah Indonesia (BSI)
                </strong>
                <p className="font-display mt-1 text-3xl font-bold tracking-wider text-navy sm:text-4xl">
                  {accountNumber}
                </p>
                <p className="mt-1 text-sm font-semibold text-neutral-600">
                  a.n <span className="text-navy font-bold">CV EASYOFFICE KANTOR BERSAMA</span>
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                  copied
                    ? "bg-emerald-600 text-white"
                    : "bg-navy text-white hover:bg-navy/90 shadow-sm"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Berhasil Disalin!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Salin No. Rekening
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Warning box */}
          <div className="mt-6 flex items-start gap-4 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-sm text-amber-900">
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <strong className="font-bold">Perhatian Penting:</strong>
              <p className="mt-1 leading-relaxed">
                Jika nomor rekening pada invoice Anda berbeda dengan yang tercantum di halaman ini, segera hubungi Customer Care kami sebelum melakukan transfer. Kami tidak pernah menggunakan rekening atas nama pribadi perorangan.
              </p>
            </div>
          </div>

          {/* Kemenkumham AHU section */}
          <section className="mt-10 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy text-white">
                🏛️
              </span>
              <div>
                <h2 className="font-display text-lg font-bold text-navy">
                  Terdaftar Resmi di Kemenkumham RI
                </h2>
                <p className="text-xs text-neutral-500">
                  Legalitas badan usaha sah dan dapat diverifikasi di sistem pemerintah.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-[1.2fr_0.8fr] items-center">
              <div className="space-y-3 text-sm text-neutral-700">
                <div>
                  <span className="block text-xs font-semibold uppercase text-neutral-400">Nama Badan Usaha</span>
                  <strong className="text-navy font-bold text-base">CV EASYOFFICE KANTOR BERSAMA</strong>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase text-neutral-400">Surat Keterangan Terdaftar AHU</span>
                  <p className="font-mono font-semibold text-navy">AHU-0094982-AH.01.14 Tahun 2025</p>
                </div>
                <div>
                  <span className="block text-xs font-semibold uppercase text-neutral-400">Status Keanggotaan</span>
                  <p className="font-medium text-neutral-600">Member of EASY CORP</p>
                </div>
                <div className="pt-2">
                  <a
                    href="https://sab.ahu.go.id/cv/pendaftaran/info/no/AHU-0094982-AH.01.14+Tahun+2025/id/2683645"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 underline underline-offset-4 hover:text-blue-900"
                  >
                    Cek di Sistem AHU Kemenkumham RI
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              <div className="relative aspect-[3/4] w-full max-w-[200px] mx-auto overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-xs">
                <Image
                  src="/images/easyoffice/legalitas-ahu.jpg"
                  alt="Sertifikat AHU CV EasyOffice Kantor Bersama"
                  fill
                  sizes="200px"
                  className="object-contain p-2"
                />
              </div>
            </div>
          </section>

          {/* Help Contact */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-surface p-6">
            <div>
              <h3 className="font-display font-bold text-navy">Ada keraguan mengenai invoice Anda?</h3>
              <p className="text-xs text-neutral-600 mt-1">
                Tim Customer Care kami siap membantu memverifikasi nomor rekening dan invoice Anda kapan saja.
              </p>
            </div>
            <a
              href="https://wa.me/62818881425?text=Halo%20EasyOffice%2C%20saya%20ingin%20verifikasi%20rekening%20dan%20invoice."
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-xs font-bold text-white transition hover:bg-navy/90"
            >
              <MessageCircle className="h-4 w-4" />
              Verifikasi via WhatsApp
            </a>
          </div>
        </article>
      </Container>
    </div>
  );
}
