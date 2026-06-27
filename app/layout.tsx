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
      </head>
      <body className="min-h-screen bg-bg text-text antialiased">
        <Nav />
        <main className="min-h-[calc(100vh-200px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
