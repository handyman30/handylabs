'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import Link from 'next/link';
import { ArrowLeft, Heart, Brain, Users, Shield } from 'lucide-react';

export default function HealthcarePage() {
  const projects = [
    {
      title: "4DMedical - Advanced Lung Diagnostics",
      description: "Revolutionary lung imaging technology providing real-time respiratory analysis and early disease detection for medical professionals worldwide",
      impact: "10M+ patients impacted",
      tech: ["Medical Imaging", "AI Diagnostics", "Real-time Analysis", "Clinical Integration", "Regulatory Compliance"],
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "AI-Powered Diagnostic Platform",
      description: "Machine learning platform that analyzes medical imaging and patient data to provide faster, more accurate diagnoses across multiple specialties",
      impact: "40% faster diagnosis",
      tech: ["Machine Learning", "Medical AI", "Image Recognition", "Clinical Decision Support"],
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Telemedicine & Patient Management",
      description: "Comprehensive telehealth platform enabling remote consultations, patient monitoring, and integrated healthcare delivery systems",
      impact: "95% patient satisfaction",
      tech: ["Telemedicine", "Patient Portals", "Remote Monitoring", "Healthcare APIs"],
      image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    }
  ];

  const metrics = [
    { icon: Heart, number: "10M+", label: "Patients Impacted" },
    { icon: Brain, number: "40%", label: "Faster Diagnosis" },
    { icon: Users, number: "95%", label: "Patient Satisfaction" },
    { icon: Shield, number: "100%", label: "HIPAA Compliant" }
  ];

  const techStack = [
    "Medical AI", "Machine Learning", "Medical Imaging", "Clinical Decision Support",
    "Telemedicine", "Patient Portals", "Healthcare APIs", "FHIR Integration",
    "Medical Devices", "Regulatory Compliance", "HIPAA Security", "Clinical Workflows"
  ];

  // Structured data for healthcare page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Healthcare Technology Solutions",
    "provider": {
      "@type": "Organization",
      "name": "HandyLabs"
    },
    "description": "Enterprise healthcare technology solutions including AI diagnostics, telemedicine platforms, and healthcare management systems",
    "serviceType": "Healthcare Technology Consulting",
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Healthcare Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Diagnostic Systems",
            "description": "Machine learning powered diagnostic platforms for medical imaging and clinical decision support"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Telemedicine Development",
            "description": "Complete telehealth platform development with patient portals and remote monitoring"
          }
        }
      ]
    }
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
              HEALTHCARE
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Enterprise Healthcare Technology Solutions for Better Patient Outcomes
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6">The Healthcare Technology Challenge</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Healthcare systems worldwide face critical challenges: slow diagnostic processes, 
                  fragmented patient data, limited access to specialists, and rising costs that impact patient care quality.
                </p>
                <p>
                  Traditional healthcare technology often lacks integration, real-time analytics, and the scalability 
                  needed to serve millions of patients while maintaining compliance with strict regulatory requirements.
                </p>
                <p>
                  Medical professionals need intelligent systems that enhance decision-making, improve patient outcomes, 
                  and streamline healthcare delivery across multiple touchpoints.
                </p>
              </div>
            </div>
            <div className="relative h-80">
              <Image
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                alt="Healthcare Technology Challenge"
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
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Healthcare Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI-powered healthcare technology that transforms patient care and medical decision-making
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Healthcare Impact Metrics</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Quantifiable results demonstrating the effectiveness of our healthcare technology solutions
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Healthcare Technology Stack</h2>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Specialized technologies for medical applications, regulatory compliance, and patient care excellence
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
              Ready to Transform Healthcare Technology?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Partner with HandyLabs to build next-generation healthcare solutions that improve patient outcomes and revolutionize medical care delivery.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="mailto:handy.hasan@yahoo.com"
                className="bg-white text-black px-8 py-4 text-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Start Healthcare Project
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