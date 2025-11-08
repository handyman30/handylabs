import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HandyLabs | Enterprise Technology Solutions & Venture-Ready Startup Development",
    template: "%s | HandyLabs"
  },
  description: "HandyLabs is an elite technology studio building scalable enterprise solutions across Healthcare, Fintech, Commerce, Sports, and Wellness. Partner with us for investment-ready technology development, enterprise consulting, and venture-scale system architecture.",
  keywords: [
    "enterprise technology consulting",
    "venture capital ready startup development", 
    "scalable system architecture",
    "fintech development",
    "healthcare technology solutions",
    "enterprise software development",
    "technology consulting firm",
    "startup technology partner",
    "investment ready technology",
    "enterprise digital transformation",
    "venture scale development",
    "technology due diligence",
    "startup CTO services",
    "enterprise software consulting"
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
    canonical: "https://handyhasan.live"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://handyhasan.live",
    siteName: "HandyLabs",
    title: "HandyLabs | Enterprise Technology Solutions & Venture-Ready Development",
    description: "Elite technology studio building scalable enterprise solutions. Partner with HandyLabs for investment-ready development across Healthcare, Fintech, Commerce, Sports, and Wellness.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630&q=80",
        width: 1200,
        height: 630,
        alt: "HandyLabs - Enterprise Technology Solutions"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "HandyLabs | Enterprise Technology Solutions & Venture-Ready Development",
    description: "Elite technology studio building scalable enterprise solutions for VCs, entrepreneurs, and high-growth companies.",
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
    "@type": "Organization",
    "name": "HandyLabs",
    "description": "Elite technology studio building scalable enterprise solutions across Healthcare, Fintech, Commerce, Sports, and Wellness.",
    "url": "https://handyhasan.live",
    "logo": "https://handyhasan.live/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "handy.hasan@yahoo.com",
      "contactType": "Business",
      "areaServed": "Global"
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
        "@type": "Service",
        "name": "Enterprise Technology Consulting",
        "description": "Scalable technology solutions for high-growth companies and VCs"
      },
      {
        "@type": "Service", 
        "name": "Venture-Ready Development",
        "description": "Investment-ready technology development and architecture"
      },
      {
        "@type": "Service",
        "name": "Digital Transformation",
        "description": "Enterprise digital transformation and system modernization"
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
        <link rel="canonical" href="https://handyhasan.live" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
