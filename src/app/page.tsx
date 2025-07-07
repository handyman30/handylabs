'use client';

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const caseStudies = {
    'api-calls': {
      title: '5M+ API Calls Daily - Payment Processing Infrastructure',
      company: 'Fintech Platform Client',
      challenge: 'Legacy payment system couldn&apos;t handle rapid user growth, experiencing 23% failure rates during peak hours.',
      solution: 'Rebuilt API infrastructure with microservices architecture, implemented auto-scaling and Redis caching.',
      results: [
        'Scaled from 500K to 5.2M daily API calls',
        'Reduced response time from 2.3s to 180ms',
        'Achieved 99.97% uptime vs previous 94%',
        'Cut infrastructure costs by 40%'
      ],
      metrics: {
        'API Throughput': '5.2M calls/day',
        'Response Time': '180ms average',
        'Error Rate': '0.03%',
        'Cost Savings': '40% reduction'
      },
      technologies: ['Node.js', 'Redis', 'Kubernetes', 'AWS Lambda', 'PostgreSQL'],
      timeline: '12 weeks',
      roi: '+250% platform efficiency'
    },
    'users-impacted': {
      title: '1M+ Users Served - Healthcare Platform Scale',
      company: '4DMedical Lung Imaging',
      challenge: 'Medical imaging platform needed to scale from research tool to enterprise healthcare solution.',
      solution: 'Architected cloud-native platform with HIPAA compliance and real-time image processing.',
      results: [
        'Scaled to 1.2M+ patient interactions',
        'Deployed across 15+ hospital networks',
        'Reduced diagnosis time by 60%',
        'Maintained 100% HIPAA compliance'
      ],
      metrics: {
        'Patient Interactions': '1.2M+ served',
        'Hospital Networks': '15+ active deployments',
        'Diagnosis Speed': '60% faster',
        'Compliance Score': '100% HIPAA'
      },
      technologies: ['React', 'Python', 'TensorFlow', 'AWS', 'Docker'],
      timeline: '18 months',
      roi: 'Series A: $2.3M → $32M valuation'
    },
    'system-uptime': {
      title: '99.9% Uptime - Enterprise E-commerce Platform',
      company: 'The Good Guys Australia',
      challenge: 'E-commerce platform experiencing frequent outages during peak sales periods, losing $50K+ per hour.',
      solution: 'Implemented zero-downtime deployment, load balancing, and comprehensive monitoring.',
      results: [
        'Achieved 99.96% uptime (vs 92% previous)',
        'Eliminated peak-hour outages completely',
        'Increased conversion rate by 35%',
        'Saved $2.1M in lost revenue annually'
      ],
      metrics: {
        'System Uptime': '99.96%',
        'Peak Performance': '100% availability',
        'Conversion Lift': '+35%',
        'Revenue Protected': '$2.1M annually'
      },
      technologies: ['Node.js', 'React', 'Microservices', 'Kubernetes', 'CloudFlare'],
      timeline: '16 weeks',
      roi: '$2.1M revenue protection + 35% conversion boost'
    }
  };

  const openCaseStudy = (studyKey: string) => {
    setSelectedCaseStudy(studyKey);
  };

  const closeCaseStudy = () => {
    setSelectedCaseStudy(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create FormData for Formspree
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('projectType', formData.projectType);
      formDataToSend.append('message', formData.message);

      // Send to Formspree
      const response = await fetch('https://formspree.io/f/xgvyzvwk', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          message: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus('idle');
        }, 5000);
        
        console.log('Form submitted successfully to Formspree');
      } else {
        throw new Error('Failed to submit form');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Structured data for homepage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HandyLabs Technology Studio",
    "description": "Custom technology solutions for small businesses, agencies, and growing companies",
    "url": "https://handyhasan.live",
    "serviceType": "Technology Consulting & Development",
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Technology Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Small Business Websites",
            "description": "Custom websites and digital presence for small businesses"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Agency Management Tools",
            "description": "Custom software and tools for agency operations"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Digital Transformation",
            "description": "Technology consulting and implementation for business growth"
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
      <Head>
        <title>HandyLabs Technology Studio - Custom Tech Solutions for Small Businesses & Agencies</title>
        <meta name="description" content="Custom technology solutions for small businesses, agencies, and growing companies. 5M+ API calls, 1M+ users impacted, 99.9% uptime." />
        <meta property="og:title" content="HandyLabs Technology Studio - Custom Tech Solutions for Small Businesses & Agencies" />
        <meta property="og:description" content="Custom technology solutions for small businesses, agencies, and growing companies. 5M+ API calls, 1M+ users impacted, 99.9% uptime." />
        <meta property="og:image" content="https://handyhasan.live/og-image.jpg" />
        <meta property="og:url" content="https://handyhasan.live" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HandyLabs Technology Studio - Custom Tech Solutions for Small Businesses & Agencies" />
        <meta name="twitter:description" content="Custom technology solutions for small businesses, agencies, and growing companies. 5M+ API calls, 1M+ users impacted, 99.9% uptime." />
        <meta name="twitter:image" content="https://handyhasan.live/og-image.jpg" />
      </Head>

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
              Technology Studio for Small Businesses, Agencies & Growing Companies
            </p>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              We build custom technology solutions, provide digital transformation consulting, 
              and scale systems across Healthcare, Fintech, Commerce, Sports, Wellness, and Property & Hospitality
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link 
                href="/business"
                className="bg-white text-black px-8 py-4 text-lg font-medium hover:bg-gray-200 transition-colors rounded-lg"
              >
                View Portfolio
              </Link>
              <a 
                href="mailto:handy.hasan@yahoo.com"
                className="border border-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-black transition-colors rounded-lg"
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
              Why Small Businesses & Agencies Choose HandyLabs
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              We understand the unique challenges of growing businesses. 
              Our custom solutions are designed for rapid implementation, cost-effectiveness, and measurable ROI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center group cursor-pointer"
              onClick={() => openCaseStudy('api-calls')}
            >
              <div className="text-5xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">5M+</div>
              <h3 className="text-xl font-semibold mb-3">API Calls Processed</h3>
              <p className="text-gray-400 mb-4">Daily API requests across our platform ecosystem</p>
              <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors opacity-0 group-hover:opacity-100">
                → View Case Study
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center group cursor-pointer"
              onClick={() => openCaseStudy('users-impacted')}
            >
              <div className="text-5xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">1M+</div>
              <h3 className="text-xl font-semibold mb-3">Users Impacted</h3>
              <p className="text-gray-400 mb-4">Across healthcare, sports, and wellness platforms</p>
              <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors opacity-0 group-hover:opacity-100">
                → View Case Study
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center group cursor-pointer"
              onClick={() => openCaseStudy('system-uptime')}
            >
              <div className="text-5xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">99.9%</div>
              <h3 className="text-xl font-semibold mb-3">System Uptime</h3>
              <p className="text-gray-400 mb-4">Enterprise-grade reliability and performance</p>
              <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors opacity-0 group-hover:opacity-100">
                → View Case Study
              </button>
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
                          Launch Demo
                        </Link>
                      )}
                      {section.id === 'healthcare' && (
                        <Link 
                          href="/demos/healthcare-imaging"
                          className="bg-purple-600 text-white px-6 py-3 text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center rounded-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Launch Demo
                        </Link>
                      )}
                      {section.id === 'commerce' && (
                        <Link 
                          href="/demos/commerce-discovery"
                          className="bg-purple-600 text-white px-6 py-3 text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center rounded-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Launch Demo
                        </Link>
                      )}
                      {section.id === 'sports' && (
                        <Link 
                          href="/demos/sports-performance"
                          className="bg-purple-600 text-white px-6 py-3 text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center rounded-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Launch Demo
                        </Link>
                      )}
                      {section.id === 'fintech' && (
                        <Link 
                          href="/demos/fintech-optimizer"
                          className="bg-purple-600 text-white px-6 py-3 text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center rounded-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Launch Demo
                        </Link>
                      )}
                      {section.id === 'wellbeing' && (
                        <Link 
                          href="/demos/wellness-hub"
                          className="bg-purple-600 text-white px-6 py-3 text-sm font-medium hover:bg-purple-700 transition-colors flex items-center justify-center rounded-lg"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Activity className="w-4 h-4 mr-2" />
                          Launch Demo
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
              READY TO GROW YOUR BUSINESS?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
              Whether you&apos;re a small business looking to digitize, an agency needing custom tools, 
              or a growing company seeking technology solutions, we&apos;re here to accelerate your success.
            </p>
            
            {/* Smart Contact Form */}
            <div className="max-w-2xl mx-auto">
              <form 
                action="https://formspree.io/f/xgvyzvwk" 
                method="POST"
                onSubmit={handleSubmit} 
                className="space-y-6 text-left"
              >
                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-lg">
                    <p className="font-medium">Thank you! Your project brief has been sent successfully.</p>
                    <p className="text-sm mt-1">We&apos;ll review your details and get back to you within 24 hours.</p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
                    <p className="font-medium">Something went wrong. Please try again or email us directly.</p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company/Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-400"
                      placeholder="Your Company"
                    />
                  </div>
                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white"
                    >
                      <option value="">Select Project Type</option>
                      <option value="small-business-website">Small Business Website</option>
                      <option value="agency-tools">Agency Management Tools</option>
                      <option value="ecommerce-platform">E-commerce Platform</option>
                      <option value="custom-software">Custom Software Development</option>
                      <option value="digital-transformation">Digital Transformation</option>
                      <option value="consulting">Technology Consulting</option>
                      <option value="mobile-app">Mobile App Development</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Tell us about your project, timeline, and specific requirements..."
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-4 text-lg font-medium transition-colors rounded-lg ${
                      isSubmitting 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                        : 'bg-white text-black hover:bg-gray-200'
                    }`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Project Brief'}
                  </button>
                  <a 
                    href="mailto:handy.hasan@yahoo.com"
                    className="border border-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-black transition-colors rounded-lg text-center"
                  >
                    Quick Email Instead
                  </a>
                </div>
              </form>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 text-center mt-12">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Response Time</h3>
                <p className="text-gray-400">Within 24 hours for all inquiries</p>
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

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {caseStudies[selectedCaseStudy as keyof typeof caseStudies].title}
                    </h2>
                    <p className="text-lg text-gray-600">
                      {caseStudies[selectedCaseStudy as keyof typeof caseStudies].company}
                    </p>
                  </div>
                  <button
                    onClick={closeCaseStudy}
                    className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                {/* Content */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Challenge</h3>
                      <p className="text-gray-700">
                        {caseStudies[selectedCaseStudy as keyof typeof caseStudies].challenge}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Solution</h3>
                      <p className="text-gray-700">
                        {caseStudies[selectedCaseStudy as keyof typeof caseStudies].solution}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Key Results</h3>
                      <ul className="space-y-2">
                        {caseStudies[selectedCaseStudy as keyof typeof caseStudies].results.map((result, index) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <span className="text-green-600 mr-3">✓</span>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Performance Metrics</h3>
                      <div className="grid grid-cols-1 gap-4">
                        {Object.entries(caseStudies[selectedCaseStudy as keyof typeof caseStudies].metrics).map(([key, value]) => (
                          <div key={key} className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-600">{key}</div>
                            <div className="text-xl font-bold text-gray-900">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Technology Stack</h3>
                      <div className="flex flex-wrap gap-2">
                        {caseStudies[selectedCaseStudy as keyof typeof caseStudies].technologies.map((tech, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Project Outcome</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Timeline:</span>
                          <span className="font-semibold">{caseStudies[selectedCaseStudy as keyof typeof caseStudies].timeline}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ROI:</span>
                          <span className="font-semibold text-green-600">{caseStudies[selectedCaseStudy as keyof typeof caseStudies].roi}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Ready to achieve similar results?</h4>
                    <p className="text-gray-600 mb-4">Let&apos;s discuss your project and technology challenges.</p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={closeCaseStudy}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Start a Project
                      </button>
                      <button
                        onClick={closeCaseStudy}
                        className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        View More Cases
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
