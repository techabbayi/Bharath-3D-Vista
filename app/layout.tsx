import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastProvider } from "@/components/Toast";
import { AccessibilityProvider } from "@/contexts/AccessibilityContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { PageLoadingBar, ScrollProgress } from "@/components/Loading";

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
  metadataBase: new URL('https://bharatvista3d.com'),
  title: "Bharat Vista 3D - Immersive Indian Heritage Experience",
  description: "Explore India's magnificent monuments through immersive 3D models, 360° panoramas, and VR experiences. Discover the Taj Mahal, Red Fort, and more iconic landmarks.",
  keywords: "Indian monuments, 3D heritage, virtual tour, VR experience, Taj Mahal, Indian tourism, 360 panorama, cultural heritage, digital preservation, photogrammetry",
  authors: [{ name: "Bharat Vista 3D" }],
  creator: "Bharat Vista 3D Team",
  publisher: "Bharat Vista 3D",
  category: "Education, Culture, Tourism",
  classification: "Heritage & Culture",
  openGraph: {
    title: "Bharat Vista 3D - Immersive Indian Heritage",
    description: "Experience India's heritage in cutting-edge 3D, 360°, and VR technology",
    type: "website",
    locale: "en_IN",
    url: "https://bharatvista3d.com",
    siteName: "Bharat Vista 3D",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bharat Vista 3D - Indian Heritage Experience",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Vista 3D - Immersive Indian Heritage",
    description: "Experience India's heritage in 3D, 360°, and VR",
    images: ["/og-image.jpg"],
    creator: "@bharatvista3d",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: "/manifest.json",
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  alternates: {
    canonical: "https://bharatvista3d.com",
    languages: {
      'en-IN': 'https://bharatvista3d.com',
      'hi-IN': 'https://bharatvista3d.com/hi',
    },
  },
  other: {
    'msapplication-TileColor': '#FF6B35',
    'msapplication-config': '/browserconfig.xml',
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FF6B35" },
    { media: "(prefers-color-scheme: dark)", color: "#004E89" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Bharat Vista 3D",
              "description": "Immersive Indian Heritage Experience through 3D technology",
              "url": "https://bharatvista3d.com",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://bharatvista3d.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Bharat Vista 3D",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://bharatvista3d.com/logo.png"
                }
              }
            })
          }}
        />
      </head>
      <body className="antialiased">
        <AccessibilityProvider>
          <LanguageProvider>
            <ThemeProvider>
              <ToastProvider>
                {/* Skip to main content link for accessibility */}
                <a
                  href="#main-content"
                  className="skip-to-content sr-only focus:not-sr-only"
                >
                  Skip to main content
                </a>

                <PageLoadingBar />
                <ScrollProgress />

                <Script
                  src="https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js"
                  strategy="afterInteractive"
                />

                <Header />

                <main id="main-content" className="min-h-screen" role="main">
                  {children}
                </main>

                <Footer />
              </ToastProvider>
            </ThemeProvider>
          </LanguageProvider>
        </AccessibilityProvider>

        {/* Service Worker Registration for PWA */}
        <Script id="sw-registration" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                  .then(function(registration) {
                    console.log('SW registered: ', registration);
                  })
                  .catch(function(registrationError) {
                    console.log('SW registration failed: ', registrationError);
                  });
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}

