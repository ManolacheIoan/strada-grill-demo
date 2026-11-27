import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import Reveal from "@/components/Reveal";
import { site } from "@/content/site";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin", "latin-ext"], weight: ["500", "600", "700"], display: "swap", variable: "--font-poppins" });
const inter = Inter({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(`${site.siteUrl}/`),
  title: { default: site.seo.title, template: `%s | ${site.name}` },
  description: site.seo.description,
  applicationName: site.name,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    siteName: site.name,
    locale: "ro_RO",
    type: "website",
    images: [{ url: "og.jpg", width: 1200, height: 630, alt: `${site.name} — fast food în ${site.city}` }],
  },
  twitter: { card: "summary_large_image", title: site.seo.title, description: site.seo.description, images: ["og.jpg"] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#16212e", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FastFoodRestaurant",
  name: site.name,
  url: `${site.siteUrl}/`,
  image: `${site.siteUrl}/og.jpg`,
  telephone: site.phoneE164,
  servesCuisine: ["Fast food", "Shaorma", "Burgeri", "Pizza"],
  acceptsReservations: false,
  hasMenu: `${site.siteUrl}/#meniu`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  ...(site.facebook.url ? { sameAs: [site.facebook.url] } : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Reveal />
      </body>
    </html>
  );
}
