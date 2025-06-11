'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

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

      {/* Trusted Brands Carousel */}
      <section className="py-12 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <p className="text-sm text-gray-500 uppercase tracking-wide font-medium">
              Trusted by marketing leaders at modern consumer brands
            </p>
          </motion.div>
          
          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex space-x-12 items-center"
              animate={{
                x: [0, -100 * 12] // Move left by total width
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
              style={{ width: "200%" }} // Double width for seamless loop
            >
              {/* First set of brands */}
              {[
                { name: "The Good Guys", logo: "https://logos-world.net/wp-content/uploads/2023/04/The-Good-Guys-Logo.png" },
                { name: "4DMedical", logo: "https://media.licdn.com/dms/image/v2/C560BAQGjYxM_-qXCYw/company-logo_200_200/company-logo_200_200/0/1631351043571?e=2147483647&v=beta&t=8_UKcKiOxEHN5GkHZxL2i7wQGOMd3jV_kgOhVH0sLnQ" },
                { name: "JB Hi-Fi", logo: "https://logos-world.net/wp-content/uploads/2023/04/JB-Hi-Fi-Logo.png" },
                { name: "Airwallex", logo: "https://assets-global.website-files.com/5f7fd4139c0b39b92a5a9c7c/5f7fd4139c0b3975395a9dc3_airwallex-logo.svg" },
                { name: "Canva", logo: "https://logos-world.net/wp-content/uploads/2021/02/Canva-Logo.png" },
                { name: "Culture Amp", logo: "https://media.licdn.com/dms/image/v2/C560BAQFNJsrNp8WGiA/company-logo_200_200/company-logo_200_200/0/1652411950191?e=2147483647&v=beta&t=gG7K7qbVZT7QzqI7DZ1gAk1CjGrWpZPwMzVxqzJ0_M8" },
                { name: "SafetyCulture", logo: "https://media.licdn.com/dms/image/v2/C4E0BAQGo8G5z1p0Kug/company-logo_200_200/company-logo_200_200/0/1631320434866?e=2147483647&v=beta&t=HQx_5rLwU1uA8EKh_kHc5GkVq1gU2BPuL3sQKqFyqWo" },
                { name: "Deputy", logo: "https://media.licdn.com/dms/image/v2/C560BAQHKz6gvKF3_1w/company-logo_200_200/company-logo_200_200/0/1631341092285?e=2147483647&v=beta&t=r4Y0QdJ5JkFHJ8h_0Xk7G3Q2vKqLqmGQrRQ7_VkHzV8" },
                { name: "Koala", logo: "https://media.licdn.com/dms/image/v2/C560BAQHJ8vJ6Js4wbQ/company-logo_200_200/company-logo_200_200/0/1679965354301?e=2147483647&v=beta&t=kGzL8mJ5qHzQtGpJ8_2WqLzHgKpFJ5CkQ9BgT_5J2gM" },
                { name: "Seek", logo: "https://logos-world.net/wp-content/uploads/2023/04/Seek-Logo.png" },
                { name: "Menulog", logo: "https://logos-world.net/wp-content/uploads/2023/04/Menulog-Logo.png" },
                { name: "Xero", logo: "https://logos-world.net/wp-content/uploads/2020/12/Xero-Logo.png" }
              ].map((brand, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="max-h-12 max-w-28 object-contain opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
              
              {/* Duplicate set for seamless loop */}
              {[
                { name: "The Good Guys", logo: "https://logos-world.net/wp-content/uploads/2023/04/The-Good-Guys-Logo.png" },
                { name: "4DMedical", logo: "https://media.licdn.com/dms/image/v2/C560BAQGjYxM_-qXCYw/company-logo_200_200/company-logo_200_200/0/1631351043571?e=2147483647&v=beta&t=8_UKcKiOxEHN5GkHZxL2i7wQGOMd3jV_kgOhVH0sLnQ" },
                { name: "JB Hi-Fi", logo: "https://logos-world.net/wp-content/uploads/2023/04/JB-Hi-Fi-Logo.png" },
                { name: "Airwallex", logo: "https://assets-global.website-files.com/5f7fd4139c0b39b92a5a9c7c/5f7fd4139c0b3975395a9dc3_airwallex-logo.svg" },
                { name: "Canva", logo: "https://logos-world.net/wp-content/uploads/2021/02/Canva-Logo.png" },
                { name: "Culture Amp", logo: "https://media.licdn.com/dms/image/v2/C560BAQFNJsrNp8WGiA/company-logo_200_200/company-logo_200_200/0/1652411950191?e=2147483647&v=beta&t=gG7K7qbVZT7QzqI7DZ1gAk1CjGrWpZPwMzVxqzJ0_M8" },
                { name: "SafetyCulture", logo: "https://media.licdn.com/dms/image/v2/C4E0BAQGo8G5z1p0Kug/company-logo_200_200/company-logo_200_200/0/1631320434866?e=2147483647&v=beta&t=HQx_5rLwU1uA8EKh_kHc5GkVq1gU2BPuL3sQKqFyqWo" },
                { name: "Deputy", logo: "https://media.licdn.com/dms/image/v2/C560BAQHKz6gvKF3_1w/company-logo_200_200/company-logo_200_200/0/1631341092285?e=2147483647&v=beta&t=r4Y0QdJ5JkFHJ8h_0Xk7G3Q2vKqLqmGQrRQ7_VkHzV8" },
                { name: "Koala", logo: "https://media.licdn.com/dms/image/v2/C560BAQHJ8vJ6Js4wbQ/company-logo_200_200/company-logo_200_200/0/1679965354301?e=2147483647&v=beta&t=kGzL8mJ5qHzQtGpJ8_2WqLzHgKpFJ5CkQ9BgT_5J2gM" },
                { name: "Seek", logo: "https://logos-world.net/wp-content/uploads/2023/04/Seek-Logo.png" },
                { name: "Menulog", logo: "https://logos-world.net/wp-content/uploads/2023/04/Menulog-Logo.png" },
                { name: "Xero", logo: "https://logos-world.net/wp-content/uploads/2020/12/Xero-Logo.png" }
              ].map((brand, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="max-h-12 max-w-28 object-contain opacity-60 hover:opacity-100 transition-opacity"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid - Click-to-Reveal on Mobile */}
      <section className="min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-h-screen">
          {portfolioSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="relative h-80 md:h-96 group overflow-hidden cursor-pointer"
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
            >
              <Image
                src={section.image}
                alt={`${section.title} Technology Solutions`}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className={`absolute inset-0 transition-all duration-700 z-10 ${
                activeSection === section.id 
                  ? 'bg-black/80' 
                  : 'bg-black/50 group-hover:bg-black/70'
              }`}></div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-6">
                <motion.div
                  className="text-center w-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-[0.2em] mb-6 drop-shadow-2xl">
                    {section.title}
                  </h2>
                  
                  {/* Mobile: Click indicator when buttons hidden */}
                  {activeSection !== section.id && (
                    <div className="md:hidden">
                      <p className="text-sm text-gray-300 opacity-75 animate-pulse">
                        Tap to explore options
                      </p>
                    </div>
                  )}
                  
                  {/* Buttons: Show on mobile when clicked, show on desktop hover */}
                  <div className={`space-y-3 transition-all duration-500 ${
                    activeSection === section.id 
                      ? 'block opacity-100' 
                      : 'hidden md:opacity-0 md:group-hover:opacity-100 md:block'
                  }`}>
                    <div className="flex flex-col gap-3 justify-center max-w-sm mx-auto">
                      <Link 
                        href={section.href}
                        className="bg-white text-black px-6 py-3 text-sm font-medium hover:bg-gray-200 transition-colors rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Learn More
                      </Link>
                      {section.id === 'property' && (
                        <Link 
                          href="/demos/property-dashboard"
                          className="bg-purple-600 text-white px-6 py-3 text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center rounded-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Try Demo
                        </Link>
                      )}
                      {section.id === 'healthcare' && (
                        <Link 
                          href="/demos/healthcare-imaging"
                          className="bg-purple-600 text-white px-6 py-3 text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center rounded-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Try AI Demo
                        </Link>
                      )}
                      {section.id === 'commerce' && (
                        <Link 
                          href="/demos/commerce-discovery"
                          className="bg-purple-600 text-white px-6 py-3 text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center rounded-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Try Search Demo
                        </Link>
                      )}
                      {section.id === 'sports' && (
                        <Link 
                          href="/demos/sports-performance"
                          className="bg-purple-600 text-white px-6 py-3 text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center rounded-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Try AI Coach Demo
                        </Link>
                      )}
                      {section.id === 'fintech' && (
                        <Link 
                          href="/demos/fintech-optimizer"
                          className="bg-purple-600 text-white px-6 py-3 text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center rounded-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Try SaaS Demo
                        </Link>
                      )}
                      {section.id === 'wellbeing' && (
                        <Link 
                          href="/demos/wellness-hub"
                          className="bg-purple-600 text-white px-6 py-3 text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center rounded-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Try Wellness Demo
                        </Link>
                      )}
                      {(section.id !== 'property' && section.id !== 'fintech' && section.id !== 'healthcare' && section.id !== 'commerce' && section.id !== 'sports' && section.id !== 'wellbeing') && (
                        <button 
                          className="bg-gray-600 text-white px-6 py-3 text-sm font-medium opacity-75 cursor-not-allowed rounded-lg"
                          disabled
                          onClick={(e) => e.stopPropagation()}
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
