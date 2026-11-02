import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { getCmsArticles } from "@/lib/data/cms-data";

export const metadata: Metadata = {
  title: "Blog & Wawasan Bisnis",
  description:
    "Temukan artikel, tips legalitas usaha, dan wawasan seputar Virtual Office, Coworking Space, dan efisiensi operasional bisnis dari EasyOffice.",
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export default async function BlogIndexPage() {
  const blogPosts = await getCmsArticles();
  return (
    <div className="bg-surface py-10 sm:py-14">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-navy">
            Beranda
          </Link>
          <span>&gt;</span>
          <strong className="text-navy">Blog</strong>
        </nav>

        <div className="mb-12 max-w-2xl">
          <p className="inline-flex items-center rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-navy shadow-xs">
            Blog & Wawasan
          </p>
          <h1 className="font-display mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Panduan & Wawasan Ruang Kerja Bisnis
          </h1>
          <p className="mt-3 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Pelajari strategi efisiensi biaya kantor, legalitas pendirian PT/CV, pengurusan PKP, dan tren cara kerja modern.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
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
                    4 menit baca
                  </span>
                </div>

                <h2 className="font-display mt-3 text-lg font-bold leading-snug text-navy group-hover:text-blue-700">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                  {post.excerpt}
                </p>

                <div className="mt-auto pt-6">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-navy group-hover:text-blue-700"
                  >
                    Baca Selengkapnya
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
