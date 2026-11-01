"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const rawNama = searchParams.get("nama") ?? "";
  const rawLokasi = searchParams.get("lokasi") ?? "Virtual Office EasyOffice";
  const rawPaket = searchParams.get("paket") ?? "Virtual Office EasyOffice";

  const nama = rawNama.replace(/[<>\u0000-\u001F\u007F]/g, "").trim().slice(0, 80);
  const lokasi = rawLokasi.replace(/[<>\u0000-\u001F\u007F]/g, "").trim().slice(0, 100);
  const paket = rawPaket.replace(/[<>\u0000-\u001F\u007F]/g, "").trim().slice(0, 100);

  const whatsappMessage = useMemo(() => {
    const namePart = nama ? `saya ${nama} ` : "saya ";
    return `Halo EasyOffice, ${namePart}sudah submit form pendaftaran Meta untuk ${paket} di ${lokasi}.\n\nMohon bantuannya untuk konsultasi selanjutnya ya, terima kasih! 🙏`;
  }, [nama, lokasi, paket]);

  const whatsappUrl = `https://wa.me/62818881425?text=${encodeURIComponent(whatsappMessage)}`;
  const [count, setCount] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = whatsappUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [whatsappUrl]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#111827] px-5 py-8 font-sans text-white">
      <div className="w-full max-w-[420px] rounded-3xl bg-[#1f2937] p-8 text-center shadow-2xl sm:p-10">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <svg width="32" height="32" viewBox="0 0 52 52" fill="none">
            <polyline
              points="12,26 22,36 40,18"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Terima Kasih!
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Menghubungkan ke WhatsApp Customer Care...
        </p>

        <div className="my-6 rounded-2xl bg-black/20 p-5 border border-white/5">
          <p className="text-xs text-neutral-400">
            Mengalihkan ke WhatsApp dalam
          </p>
          <div className="my-3 h-1.5 w-full overflow-hidden rounded-full bg-neutral-700">
            <div
              className="h-full bg-emerald-500 transition-all duration-1000 ease-linear"
              style={{ width: `${(count / 3) * 100}%` }}
            />
          </div>
          <span className="font-display text-4xl font-extrabold text-amber-400">
            {count}
          </span>
          <span className="ml-1 text-xs text-neutral-400">detik...</span>
        </div>

        <a
          href={whatsappUrl}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-emerald-500 hover:shadow-emerald-500/25"
        >
          💬 Chat WhatsApp Sekarang
        </a>

        <p className="mt-3 text-xs text-neutral-500">
          Tidak mau tunggu? Klik tombol di atas.
        </p>

        <hr className="my-6 border-neutral-700/60" />

        <div className="flex flex-col gap-2 text-left text-xs text-neutral-300">
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>Legalitas Terjamin untuk PT, CV & PKP</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>Gedung Komersial Resmi (IMB & PBB Lengkap)</span>
          </div>
          <div className="flex items-center gap-2">
            <span>✅</span>
            <span>Dipercaya 13.000+ Pengusaha di Indonesia</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[#111827] text-white">Memuat...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
