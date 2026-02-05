import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bharat Vista 3D - Immersive Indian Heritage Experience",
  description: "Explore India's magnificent monuments through immersive 3D models, 360° panoramas, and VR experiences. Discover the Taj Mahal, Red Fort, and more iconic landmarks.",
  keywords: "Indian monuments, 3D heritage, virtual tour, VR experience, Taj Mahal, Indian tourism, 360 panorama, cultural heritage",
  authors: [{ name: "Bharat Vista 3D" }],
  openGraph: {
    title: "Bharat Vista 3D - Immersive Indian Heritage",
    description: "Experience India's heritage in 3D, 360°, and VR",
    type: "website",
    locale: "en_IN",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased">
        <Script
          src="https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js"
          strategy="afterInteractive"
        />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

