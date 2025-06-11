'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";

export default function Home() {
  const portfolioSections = [
    {
      id: 'healthcare',
      title: 'HEALTHCARE',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      href: '/healthcare'
    },
    {
      id: 'commerce',
      title: 'COMMERCE',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      href: '/commerce'
    },
    {
      id: 'sports',
      title: 'SPORTS',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      href: '/sports'
    },
    {
      id: 'wellbeing',
      title: 'WELLBEING',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2320&q=80',
      href: '/wellbeing'
    },
    {
      id: 'fintech',
      title: 'FINTECH',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      href: '/fintech'
    },
    {
      id: 'property',
      title: 'PROPERTY & HOSPITALITY',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      href: '/property'
    }
  ];

  // Structured data for homepage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HandyLabs Technology Studio",
    "description": "Elite technology studio building scalable enterprise solutions for VCs, entrepreneurs, and high-growth companies",
    "url": "https://handyhasan.live",
    "serviceType": "Enterprise Technology Consulting",
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Technology Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Healthcare Technology Solutions",
            "description": "AI-powered diagnostics, telemedicine, and healthcare platforms"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Fintech Development",
            "description": "Payment processing, investment platforms, and financial analytics"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Enterprise Commerce Solutions",
            "description": "E-commerce platforms, payment systems, and retail technology"
          }
        }
      ]
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "handy.hasan@yahoo.com",
      "contactType": "Business Development"
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-gray-800">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
          <div className="text-2xl font-bold text-white tracking-tight">
            HANDYLABS
          </div>
          <div className="flex space-x-8">
            <Link href="/business" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Portfolio
            </Link>
            <Link href="/demos/property-dashboard" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Demos
            </Link>
            <a href="mailto:handy.hasan@yahoo.com" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90"></div>
        <div className="container mx-auto px-6 relative z-10 max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-8">
              HANDYLABS
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Elite Technology Studio for VCs, Entrepreneurs & High-Growth Companies
            </p>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              We build investment-ready technology solutions, provide due diligence support, 
              and scale enterprise systems across Healthcare, Fintech, Commerce, Sports, Wellness, and Property & Hospitality
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                href="/business"
                className="bg-white text-black px-8 py-4 text-lg font-medium hover:bg-gray-200 transition-colors"
              >
                View Portfolio
              </Link>
              <a 
                href="mailto:handy.hasan@yahoo.com"
                className="border border-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-black transition-colors"
              >
                Partner With Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition for Target Audience */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Why VCs & Entrepreneurs Choose HandyLabs
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              We understand the unique challenges of building venture-scale technology. 
              Our enterprise-grade solutions are designed for rapid scaling, investor confidence, and market dominance.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-white mb-4">$500M+</div>
              <h3 className="text-xl font-semibold mb-3">Transaction Volume</h3>
              <p className="text-gray-400">Processed securely across our fintech and commerce platforms</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-white mb-4">10M+</div>
              <h3 className="text-xl font-semibold mb-3">Users Impacted</h3>
              <p className="text-gray-400">Across healthcare, sports, and wellness platforms</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-white mb-4">99.9%</div>
              <h3 className="text-xl font-semibold mb-3">System Uptime</h3>
              <p className="text-gray-400">Enterprise-grade reliability and performance</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid - Prince Group Style */}
      <section className="min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-screen">
          {portfolioSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="relative h-80 md:h-96 group overflow-hidden"
            >
              <Image
                src={section.image}
                alt={`${section.title} Technology Solutions`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/70 transition-all duration-700 z-10"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                <motion.div
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-[0.2em] mb-4 drop-shadow-2xl">
                    {section.title}
                  </h2>
                  {/* Action Buttons - Only show on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link 
                        href={section.href}
                        className="bg-white text-black px-6 py-3 text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        Learn More
                      </Link>
                      {section.id === 'property' && (
                        <Link 
                          href="/demos/property-dashboard"
                          className="bg-purple-600 text-white px-6 py-3 text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Try Demo
                        </Link>
                      )}
                      {section.id !== 'property' && (
                        <button 
                          className="bg-gray-600 text-white px-6 py-3 text-sm font-medium opacity-75 cursor-not-allowed"
                          disabled
                        >
                          Demo Coming Soon
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-black border-t border-gray-800">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              READY TO SCALE YOUR VISION?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Whether you&apos;re a VC evaluating tech due diligence, an entrepreneur building your next venture, 
              or a business leader seeking enterprise solutions, we&apos;re here to accelerate your success.
            </p>
            <div className="grid md:grid-cols-2 gap-8 text-center">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Business Inquiries</h3>
                <p className="text-gray-400">handy.hasan@yahoo.com</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Melbourne Office</h3>
                <p className="text-gray-400">120 Spencer St, Melbourne VIC 3000</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center text-gray-400 max-w-7xl">
          <p>&copy; 2024 HandyLabs Technology Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
