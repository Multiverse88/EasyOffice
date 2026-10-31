import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Section } from "@/components/ui/section";
import { blogPosts } from "@/lib/data/blog-data";

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function BlogPreviewSection() {
  const latestPosts = blogPosts.slice(0, 3);
  if (!latestPosts.length) return null;

  return (
    <Section
      eyebrow="Blog & Wawasan"
      title="Temukan Konten & Wawasan Ruang Kerja"
      description="Artikel dan panduan praktis seputar Virtual Office, efisiensi operasional, dan legalitas usaha di Indonesia."
      tone="white"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latestPosts.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card"
          >
            <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-navy/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                {post.category}
              </span>
            </Link>

            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="flex items-center gap-4 text-xs font-medium text-neutral-400">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden />
                  {formatDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  4 menit
                </span>
              </div>

              <h3 className="font-display mt-3 text-lg font-bold leading-snug text-navy group-hover:text-blue-700">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>

              <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-neutral-600">
                {post.excerpt}
              </p>

              <div className="mt-auto pt-5">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-navy group-hover:text-blue-700"
                >
                  Baca Artikel
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-7 py-3 text-sm font-bold text-navy shadow-xs transition hover:border-navy hover:bg-neutral-50"
        >
          Lihat Semua Artikel Blog
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Section>
  );
}
