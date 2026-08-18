import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://santabarbarapilates.com"
  ),
  title: {
    default: "Santa Barbara Pilates",
    template: "%s — Santa Barbara Pilates",
  },
  description:
    "A private Pilates studio in the Funk Zone, Santa Barbara. Contemporary training on the full apparatus — privates, duets, trios, and small groups.",
  openGraph: {
    title: "Santa Barbara Pilates",
    description:
      "Contemporary Pilates in Santa Barbara. Full apparatus. Privates, duets, trios, and small groups.",
    type: "website",
    url: "/",
    siteName: "Santa Barbara Pilates",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Inside the Santa Barbara Pilates studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Santa Barbara Pilates",
    description:
      "Contemporary Pilates in Santa Barbara. Full apparatus. Privates, duets, trios, and small groups.",
    images: ["/og-image.jpg"],
  },
};

// Structured data for Google local results. Keep in sync with the
// Google Business Profile: same name, address, and category.
// 123 Santa Barbara St is the studio's official address; the public
// entrance is through The Base at 122 Gray Ave (see /visit).
// Phone matches the Google Business Profile listing.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  "@id": "https://santabarbarapilates.com/#studio",
  name: "Santa Barbara Pilates",
  description:
    "A private Pilates studio in the Funk Zone, Santa Barbara. Contemporary training on the full apparatus — privates, duets, trios, and small groups.",
  url: "https://santabarbarapilates.com",
  telephone: "+1-805-635-8337",
  image: "https://santabarbarapilates.com/og-image.jpg",
  logo: "https://santabarbarapilates.com/sbp-logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Santa Barbara St",
    addressLocality: "Santa Barbara",
    addressRegion: "CA",
    postalCode: "93101",
    addressCountry: "US",
  },
  areaServed: "Santa Barbara, CA",
  priceRange: "$60–$165",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body className="min-h-screen bg-bg text-text antialiased">
        <Nav />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
