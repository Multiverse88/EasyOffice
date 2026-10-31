import { Container } from "@/components/ui/container";

const steps = [
  {
    step: "01",
    title: "Pilih Layanan & Lokasi",
    description:
      "Tentukan kebutuhan bisnis Anda — Virtual Office, Coworking Space, atau Meeting Room — di lokasi terdekat.",
  },
  {
    step: "02",
    title: "Hubungi via WhatsApp",
    description:
      "Tim kami membantu menjelaskan paket, harga, dan ketersediaan fasilitas sesuai kebutuhan Anda.",
  },
  {
    step: "03",
    title: "Konsultasi & Survei",
    description:
      "Jadwalkan kunjungan atau survei lokasi untuk memastikan fasilitas sesuai ekspektasi bisnis Anda.",
  },
  {
    step: "04",
    title: "Mulai Gunakan",
    description:
      "Proses selesai — alamat bisnis, ruang kerja, dan dukungan administrasi siap digunakan.",
  },
];

export function HowItWorks({ items = steps }: { items?: Array<{ title: string; description: string }> }) {
  return (
    <section className="bg-white py-8 sm:py-10 lg:py-12">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center rounded-full border border-navy/15 bg-navy/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-navy">
            Cara Sewa
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Cara Kerja EasyOffice
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Proses sederhana untuk mulai menggunakan layanan ruang kerja profesional kami.
          </p>
        </div>
        <div className="mt-8 grid gap-6 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, index) => (
            <div
              key={s.title}
              className="group relative flex flex-col justify-between rounded-3xl border border-neutral-200/80 bg-white p-7 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-navy/30 hover:shadow-card"
            >
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-navy/5 font-display text-sm font-bold text-navy group-hover:bg-navy group-hover:text-white transition-colors duration-300">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-5 text-lg font-bold text-navy">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-neutral-600">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
