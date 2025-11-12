import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HandyLabs | Websites & Google Ads for Small Businesses & Contractors",
    template: "%s | HandyLabs"
  },
  description: "Melbourne-based websites, SEO basics, and Google Ads that get small businesses and independent contractors more calls, quotes, and bookings.",
  keywords: [
    "small business website design",
    "contractor website design",
    "handyman website",
    "google ads for small business",
    "seo for contractors",
    "web design melbourne",
    "tradie marketing",
    "independent contractor leads"
  ],
  authors: [{ name: "HandyLabs Technology Studio" }],
  creator: "HandyLabs",
  publisher: "HandyLabs",
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
  alternates: {
    canonical: "https://handylabs.live"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://handylabs.live",
    siteName: "HandyLabs",
    title: "HandyLabs | Websites & Google Ads for Small Businesses & Contractors",
    description: "Websites, SEO basics, and Google Ads that grow calls and bookings for tradies, solo operators, and local services.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "HandyLabs - Small Business Websites & Ads"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HandyLabs | Websites & Google Ads for Small Businesses & Contractors",
    description: "Fast, affordable websites and Google Ads for small businesses and independent contractors.",
    images: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80"]
  },
  verification: {
    google: "your-google-verification-code",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HandyLabs",
    "description": "Websites, SEO, and Google Ads for small businesses and independent contractors.",
    "url": "https://handylabs.live",
    "logo": "https://handylabs.live/logo.png",
    "areaServed": "Melbourne",
    "telephone": "+61 400 403 294",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "handy.hasan@yahoo.com",
      "contactType": "Sales",
      "areaServed": "Melbourne"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "120 Spencer St",
      "addressLocality": "Melbourne",
      "addressRegion": "VIC",
      "postalCode": "3000",
      "addressCountry": "AU"
    },
    "sameAs": [
      "https://linkedin.com/company/handylabs",
      "https://github.com/handylabs"
    ],
    "offers": [
      {
        "@type": "Offer",
        "name": "Small Business Websites",
        "description": "Fixed-price websites built to drive calls and enquiries."
      },
      {
        "@type": "Offer",
        "name": "Google Ads Management",
        "description": "Managed Google Ads with weekly optimisation and call tracking."
      },
      {
        "@type": "Offer",
        "name": "SEO Basics",
        "description": "On-page optimisation, speed tuning, and tracking setup for local services."
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://handylabs.live" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="antialiased">
        {children}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17712597201"
        />
        <Script id="gtag-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17712597201');
          `}
        </Script>
        <Script id="gtag-report-conversion">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-17712597201/63WdCIXJir0bENGRg_5B',
                  'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
      </body>
    </html>
  );
}
