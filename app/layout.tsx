import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://easyoffice.co.id");
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000"}/api/globals/site-settings`, { next: { revalidate: 30 } });
    const site = response.ok ? await response.json() : {};
    return {
      metadataBase,
      title: { default: site.defaultSeoTitle ?? "EasyOffice: Virtual Office Bisa PKP Murah dan Profesional", template: "%s | EasyOffice" },
      description: site.defaultSeoDescription ?? "EasyOffice menyediakan Virtual Office, Coworking Space, dan Meeting Room profesional di Bandung, Jakarta, dan Bekasi.",
      icons: {
        icon: [
          { url: "/favicon.ico" },
          { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
          { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
        ],
        apple: [
          { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
      },
    };
  } catch {
    return {
      metadataBase,
      title: { default: "EasyOffice: Virtual Office Bisa PKP Murah dan Profesional", template: "%s | EasyOffice" },
      description: "EasyOffice menyediakan Virtual Office, Coworking Space, dan Meeting Room profesional di Bandung, Jakarta, dan Bekasi.",
      icons: {
        icon: [
          { url: "/favicon.ico" },
          { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
          { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
        ],
        apple: [
          { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
        ],
      },
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full antialiased">
      <body>{children}</body>
    </html>
  );
}
