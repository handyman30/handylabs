'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import Link from 'next/link';
import { ArrowLeft, DollarSign, CreditCard, TrendingUp, Shield } from 'lucide-react';

export default function FintechPage() {
  const projects = [
    {
      title: "Enterprise Payment Processing Infrastructure",
      description: "Secure, scalable payment processing platform supporting multiple currencies, payment methods, and real-time transaction processing with enterprise-grade security and compliance",
      impact: "$100M+ processed securely",
      tech: ["Payment APIs", "Blockchain", "Fraud Detection", "Security Protocols", "Multi-currency"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Investment Platform Development",
      description: "Modern investment platform enabling automated trading, portfolio management, and real-time market analytics for retail and institutional investors with regulatory compliance",
      impact: "45% ROI improvement",
      tech: ["Trading APIs", "Market Data", "Portfolio Analytics", "Risk Management"],
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Financial Analytics & Intelligence",
      description: "Comprehensive financial analytics platform providing real-time insights, risk assessment, and predictive modeling for financial institutions and investment firms",
      impact: "60% faster decisions",
      tech: ["Machine Learning", "Financial Modeling", "Real-time Analytics", "Risk Assessment"],
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    }
  ];

  const metrics = [
    { icon: DollarSign, number: "$100M+", label: "Processed Securely" },
    { icon: CreditCard, number: "99.9%", label: "Payment Uptime" },
    { icon: TrendingUp, number: "45%", label: "ROI Improvement" },
    { icon: Shield, number: "100%", label: "Compliance Rate" }
  ];

  const techStack = [
    "Payment APIs", "Blockchain Technology", "Fraud Detection", "Security Protocols", 
    "Trading APIs", "Market Data Integration", "Portfolio Analytics", "Risk Management",
    "Machine Learning", "Financial Modeling", "Compliance Systems", "Cryptocurrency", "RegTech"
  ];

  // Structured data for fintech page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Fintech Development Solutions",
    "provider": {
      "@type": "Organization",
      "name": "HandyLabs"
    },
    "description": "Enterprise fintech development including payment processing platforms, investment systems, and financial analytics for VC-backed startups and financial institutions",
    "serviceType": "Financial Technology Development",
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Fintech Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Payment Processing Development",
            "description": "Secure, scalable payment processing platforms with multi-currency support and fraud detection"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Investment Platform Development",
            "description": "Complete investment platforms with trading APIs, portfolio management, and regulatory compliance"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Financial Analytics Systems",
            "description": "Real-time financial analytics, risk assessment, and predictive modeling platforms"
          }
        }
      ]
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Transaction Volume",
        "value": "$100M+ processed securely"
      },
      {
        "@type": "PropertyValue",
        "name": "System Uptime",
        "value": "99.9%"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
          <Link href="/" className="text-2xl font-bold text-black tracking-tight">
            HANDYLABS
          </Link>
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-black text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              FINTECH
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Investment-Ready Financial Technology Solutions for the Digital Economy
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Fintech Innovation Challenge</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Traditional financial systems struggle with outdated infrastructure, slow transaction processing, 
                  limited accessibility, and complex regulatory compliance requirements in the rapidly evolving digital economy.
                </p>
                <p>
                  Modern consumers and businesses demand real-time payments, seamless investment experiences, 
                  transparent fee structures, and secure access to financial services across multiple platforms and currencies.
                </p>
                <p>
                  The fintech revolution requires innovative solutions that combine security, scalability, 
                  and exceptional user experience while maintaining regulatory compliance and building investor confidence.
                </p>
              </div>
            </div>
            <div className="relative h-80">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                alt="Fintech Innovation Challenge"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solutions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Fintech Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge fintech solutions that democratize access to financial services and drive market innovation
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-500"
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className="mb-4">
                    <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      {project.impact}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900">Technology Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <span key={techIndex} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Financial Impact & Performance</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Proven results demonstrating the power, security, and scalability of our fintech solutions
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <metric.icon className="w-12 h-12 mx-auto mb-4 text-white" />
                <div className="text-3xl md:text-4xl font-bold mb-2">{metric.number}</div>
                <div className="text-gray-400 uppercase tracking-wide text-sm">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Fintech Technology Stack</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Enterprise-grade technologies powering the future of financial services with security, scalability, and compliance
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white px-4 py-2 rounded-full text-gray-700 font-medium border border-gray-200 hover:shadow-md transition-shadow"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Build Investment-Grade Fintech?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Partner with HandyLabs to build secure, scalable fintech solutions that attract investors and transform financial services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="mailto:handy.hasan@yahoo.com"
                className="bg-white text-black px-8 py-4 text-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Start Fintech Project
              </a>
              <Link 
                href="/business"
                className="border border-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-black transition-colors"
              >
                View All Sectors
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800 bg-black text-white">
        <div className="container mx-auto px-6 text-center text-gray-400 max-w-7xl">
          <p>&copy; 2024 HandyLabs Technology Studio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 