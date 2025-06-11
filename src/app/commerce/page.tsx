'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, TrendingUp, Globe, DollarSign } from 'lucide-react';
import Head from "next/head";

export default function CommercePage() {
  const projects = [
    {
      title: "The Good Guys - Enterprise E-commerce",
      description: "Architected enterprise-scale e-commerce platform serving millions of customers with high-performance transaction processing",
      impact: "1M+ users served",
      tech: ["Node.js", "React", "Microservices", "Payment Gateways", "Cloud Infrastructure"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "EssentialsDash - Product Discovery",
      description: "AI-powered product discovery engine that enhances customer experience and drives conversion rates",
      impact: "35% increase in conversions",
      tech: ["Machine Learning", "Search Optimization", "Personalization", "Analytics"],
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Payment Gateway Solutions",
      description: "Secure, scalable payment processing infrastructure supporting multiple currencies and payment methods",
      impact: "5M+ API calls processed",
      tech: ["Payment APIs", "Security Protocols", "Fraud Detection", "Compliance"],
      image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    }
  ];

  const metrics = [
    { icon: ShoppingCart, number: "1M+", label: "Users Served" },
    { icon: TrendingUp, number: "35%", label: "Conversion Increase" },
    { icon: DollarSign, number: "5M+", label: "API Calls Daily" },
    { icon: Globe, number: "99.9%", label: "Platform Uptime" }
  ];

  const techStack = [
    "Node.js", "React", "Next.js", "Microservices Architecture", 
    "Payment Gateways", "Cloud Infrastructure", "Machine Learning",
    "Search Optimization", "Analytics", "Security Protocols", "API Development"
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      <Head>
        <title>Commerce Solutions - HandyLabs Technology Studio</title>
        <meta name="description" content="Enterprise e-commerce platforms and payment solutions. 1M+ users served, 35% conversion increase, 5M+ API calls daily. Built for VCs and high-growth companies." />
        <meta property="og:title" content="Commerce Solutions - HandyLabs Technology Studio" />
        <meta property="og:description" content="Enterprise e-commerce platforms and payment solutions. 1M+ users served, 35% conversion increase, 5M+ API calls daily. Built for VCs and high-growth companies." />
        <meta property="og:image" content="https://handyhasan.live/og-commerce.jpg" />
        <meta property="og:url" content="https://handyhasan.live/commerce" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

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
              COMMERCE
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Building Next-Generation E-commerce Platforms That Drive Growth
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Challenge</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Modern e-commerce demands lightning-fast performance, personalized experiences, and seamless 
                  integration across multiple channels while handling millions of transactions securely.
                </p>
                <p>
                  Traditional retail systems struggle with scalability, real-time inventory management, 
                  complex payment processing, and delivering the personalized shopping experiences customers expect.
                </p>
                <p>
                  The need for intelligent, scalable, and customer-centric commerce solutions has never been more critical.
                </p>
              </div>
            </div>
            <div className="relative h-80">
              <Image
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                alt="Commerce Challenge"
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-grade e-commerce solutions that optimize customer experience and drive business growth
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
                    <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Business Impact</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Measurable results that demonstrate the power of our e-commerce technology solutions
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Technology Stack</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Modern technologies and frameworks powering scalable e-commerce solutions
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
              Ready to Scale Your E-commerce Platform?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can build or optimize your e-commerce solution for maximum growth and performance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/demos/commerce-discovery"
                className="bg-orange-600 text-white px-8 py-4 text-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Try AI Search Demo
              </Link>
              <a 
                href="mailto:handy.hasan@yahoo.com"
                className="bg-white text-black px-8 py-4 text-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Start a Project
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
          <p>&copy; 2024 HandyLabs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 