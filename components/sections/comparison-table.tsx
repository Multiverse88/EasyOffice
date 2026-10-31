import { Check, X } from "lucide-react";
import type { ComparisonRow } from "@/types";
import { Section } from "@/components/ui/section";

export function ComparisonTable({
  title = "Mengapa EasyOffice?",
  description = "Perbandingan fasilitas yang Anda dapatkan bersama EasyOffice.",
  rows = [],
  showPkpNote = false,
  className,
}: {
  title?: string;
  description?: string;
  rows?: ComparisonRow[];
  showPkpNote?: boolean;
  className?: string;
}) {
  const comparisonRows = rows ?? [];
  return (
    <Section eyebrow="Perbandingan" title={title} description={description} tone="gray" className={className}>
      <div className="mx-auto w-full min-w-0 max-w-4xl">
        <div className="overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
          <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-navy text-white">
              <th scope="col" className="px-5 py-4 font-semibold">Fitur</th>
              <th scope="col" className="px-5 py-4 text-center font-semibold">EasyOffice</th>
              <th scope="col" className="px-5 py-4 text-center font-semibold">
                Penyedia Lain (Umumnya)
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row, i) => (
              <tr key={row.feature} className={i % 2 === 1 ? "bg-surface" : "bg-white"}>
                <td className="px-5 py-3.5 font-medium text-neutral-800">{row.feature}</td>
                <td className="px-5 py-3.5 text-center">
                  {row.easyoffice === "true" || row.easyoffice === true ? (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-600" aria-label="Tersedia">
                      <Check className="h-4 w-4 stroke-[2.5]" />
                    </span>
                  ) : row.easyoffice === "false" || row.easyoffice === false ? (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-50 text-red-500" aria-label="Tidak tersedia">
                      <X className="h-4 w-4 stroke-[2.5]" />
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-neutral-500">Belum tentu</span>
                  )}
                </td>
                <td className="px-5 py-3.5 text-center">
                  {row.typical === "true" || row.typical === true ? (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-neutral-500" aria-label="Tersedia">
                      <Check className="h-4 w-4 stroke-[2]" />
                    </span>
                  ) : row.typical === "false" || row.typical === false ? (
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-50/60 text-red-400" aria-label="Tidak tersedia">
                      <X className="h-4 w-4 stroke-[2]" />
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-neutral-500">Belum tentu</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-neutral-400 lg:hidden">Geser tabel ke samping untuk melihat semua kolom.</p>
        {showPkpNote ? <p className="mt-3 text-xs text-neutral-400">* Pengajuan PKP mengikuti ketentuan perpajakan dan hasil verifikasi KPP.</p> : null}
      </div>
    </Section>
  );
}
