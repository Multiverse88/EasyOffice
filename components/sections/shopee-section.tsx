import Image from "next/image";
import { Container } from "@/components/ui/container";

export function ShopeeSection({ title, description, image, imageAlt }: { title?: string; description?: string; image?: string; imageAlt?: string }) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <div className="grid items-center gap-8 border-t border-navy/10 pt-10 sm:pt-12 lg:grid-cols-2 lg:gap-14 lg:pt-16">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-[34rem]">
            <Image
              src={image || "/images/marketplace/transaksi-shopee.webp"}
              alt={imageAlt ?? "Ilustrasi transaksi aman EasyOffice melalui Shopee"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-bold leading-tight text-navy sm:text-4xl">
              {title ?? "Transaksi Aman Via Marketplace"}
            </h2>
            <Image
              src="/images/marketplace/shopee.svg"
              alt="Shopee"
              width={126}
              height={40}
              className="mt-5 h-8 w-auto"
            />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-neutral-600">
              {description ?? "Pembayaran layanan EasyOffice tersedia melalui marketplace Shopee dengan transaksi yang aman dan terpercaya."}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
