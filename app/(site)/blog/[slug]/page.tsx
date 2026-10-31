import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { blogPosts, getBlogPost } from "@/lib/data/blog-data";
import { getCmsSite } from "@/lib/data/cms-data";
import { whatsappFor } from "@/lib/whatsapp";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Artikel Tidak Ditemukan" };

  return {
    title: `${post.title} | Blog EasyOffice`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const site = await getCmsSite();
  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <article className="bg-surface py-10 sm:py-14">
      <Container className="max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
          <Link href="/" className="hover:text-navy">
            Beranda
          </Link>
          <span>&gt;</span>
          <Link href="/blog" className="hover:text-navy">
            Blog
          </Link>
          <span>&gt;</span>
          <span className="line-clamp-1 text-navy font-medium">{post.title}</span>
        </nav>

        <header className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-soft sm:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-navy px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
              {post.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500">
              <Calendar className="h-3.5 w-3.5" aria-hidden />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-500">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              4 menit baca
            </span>
          </div>

          <h1 className="font-display mt-5 text-2xl font-bold leading-tight text-navy sm:text-4xl">
            {post.title}
          </h1>

          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-100 shadow-sm">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>

          <div
            className="mt-8 text-neutral-700 leading-relaxed space-y-5 text-base sm:text-lg [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:font-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-navy [&_h3]:mt-6 [&_h3]:mb-2 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_img]:rounded-xl [&_img]:my-6 [&_img]:w-full [&_img]:h-auto [&_a]:text-blue-700 [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          <div className="mt-12 rounded-2xl border border-navy/15 bg-gradient-to-br from-navy to-navy-950 p-6 text-white sm:p-8">
            <h3 className="font-display text-xl font-bold">
              Tertarik memiliki Virtual Office profesional?
            </h3>
            <p className="mt-2 text-sm text-white/80 sm:text-base">
              Konsultasikan kebutuhan alamat bisnis komersial, meeting room, dan legalitas PKP bersama tim EasyOffice.
            </p>
            <div className="mt-5">
              <a
                href={whatsappFor(post.title, undefined, site.whatsappNumber)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-navy transition hover:bg-yellow-400"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Konsultasi via WhatsApp
              </a>
            </div>
          </div>
        </header>

        {relatedPosts.length ? (
          <aside className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-bold text-navy">Artikel Terkait</h2>
              <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-bold text-navy hover:text-blue-700">
                <ArrowLeft className="h-4 w-4" /> Lihat Semua
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-card"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    {formatDate(related.date)}
                  </span>
                  <h3 className="font-display mt-2 line-clamp-2 text-sm font-bold leading-snug text-navy group-hover:text-blue-700">
                    {related.title}
                  </h3>
                </Link>
              ))}
            </div>
          </aside>
        ) : null}
      </Container>
    </article>
  );
}
