'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from 'next/link';
import { ArrowRight, Mail, Linkedin } from 'lucide-react';

export default function BusinessPortfolio() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'portfolio', 'about', 'contact'];
      const scrollY = window.scrollY;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop - 100 && scrollY < offsetTop + offsetHeight - 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const portfolioSections = [
    {
      id: 'healthcare',
      title: 'HEALTHCARE',
      subtitle: 'Medical Innovation',
      description: 'Revolutionizing medical technology and patient care through innovative software solutions, AI-powered diagnostics, and strategic healthcare partnerships.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      projects: [
        '4DMedical - Advanced Lung Imaging Platform',
        'AI-Powered Diagnostic Tools',
        'Telemedicine Solutions',
        'Medical Data Analytics'
      ],
      stats: '10M+ patients impacted'
    },
    {
      id: 'commerce',
      title: 'COMMERCE',
      subtitle: 'Digital Retail',
      description: 'Building next-generation e-commerce platforms and retail technology that drives growth, enhances customer satisfaction, and optimizes business operations.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      projects: [
        'The Good Guys - Enterprise E-commerce Platform',
        'EssentialsDash - Product Discovery Engine',
        'Payment Gateway Solutions',
        'Inventory Management Systems'
      ],
      stats: '5M+ transactions processed'
    },
    {
      id: 'sports',
      title: 'SPORTS',
      subtitle: 'Community Building',
      description: 'Connecting communities through sport and creating platforms that enhance athletic experiences, foster social connections, and promote active lifestyles.',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      projects: [
        'Hangtime Melbourne - Basketball Community Platform',
        'Sports Analytics & Performance Tracking',
        'Athletic Event Management Systems',
        'Community Engagement Tools'
      ],
      stats: '10K+ athletes connected'
    },
    {
      id: 'wellbeing',
      title: 'WELLBEING',
      subtitle: 'Holistic Health',
      description: 'Developing comprehensive wellness solutions that promote mental health, physical fitness, and overall life balance through technology-driven approaches.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2320&q=80',
      projects: [
        'LifeGPT - AI Reflection & Wellness Platform',
        'Mental Health Support Applications',
        'Fitness Tracking & Analytics',
        'Wellness Community Platforms'
      ],
      stats: '50K+ wellness interactions'
    },
    {
      id: 'fintech',
      title: 'FINTECH',
      subtitle: 'Financial Innovation',
      description: 'Creating innovative financial technology solutions that democratize access to financial services, investment opportunities, and secure payment systems.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      projects: [
        'Payment Processing Infrastructure',
        'Investment Platform Development',
        'Financial Analytics & Reporting Tools',
        'Cryptocurrency Solutions'
      ],
      stats: '$100M+ processed securely'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-200">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
          <Link href="/" className="text-2xl font-bold text-black tracking-tight">
            HANDYLABS
          </Link>
          <div className="hidden md:flex space-x-8">
            <a 
              href="#portfolio" 
              className={`text-sm font-medium transition-colors hover:text-gray-600 ${
                activeSection === 'portfolio' ? 'text-black' : 'text-gray-500'
              }`}
            >
              Portfolio
            </a>
            <a 
              href="#about" 
              className={`text-sm font-medium transition-colors hover:text-gray-600 ${
                activeSection === 'about' ? 'text-black' : 'text-gray-500'
              }`}
            >
              About
            </a>
            <a 
              href="#contact" 
              className={`text-sm font-medium transition-colors hover:text-gray-600 ${
                activeSection === 'contact' ? 'text-black' : 'text-gray-500'
              }`}
            >
              Contact
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="min-h-[60vh] flex items-center justify-center relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              HANDYLABS
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8"
            >
              <p className="text-lg md:text-xl text-gray-300 mb-3 max-w-3xl mx-auto leading-relaxed">
                Technology Studio Building the Future
              </p>
              <p className="text-base text-gray-400 max-w-2xl mx-auto">
                Across Healthcare, Commerce, Sports, Wellbeing, and Fintech
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section id="portfolio" className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
              PORTFOLIO
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Five strategic sectors where technology meets opportunity
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {portfolioSections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group cursor-pointer bg-white border border-gray-200 hover:border-gray-400 transition-all duration-500 hover:shadow-xl"
              >
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-500"></div>
                  <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8 text-white">
                    <motion.div
                      className="transform group-hover:scale-105 transition-transform duration-500"
                    >
                      <h3 className="text-3xl md:text-4xl font-bold mb-2 tracking-widest">
                        {section.title}
                      </h3>
                      <p className="text-lg text-gray-300 mb-4">
                        {section.subtitle}
                      </p>
                      <div className="text-sm text-gray-400 font-medium">
                        {section.stats}
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                <div className="p-8">
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {section.description}
                  </p>
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                      Key Projects
                    </h4>
                    <ul className="space-y-2">
                      {section.projects.map((project, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-600">
                          <span className="w-1.5 h-1.5 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {project}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10M+', label: 'Users Impacted' },
              { number: '5', label: 'Industry Sectors' },
              { number: '7+', label: 'Years Experience' },
              { number: '100%', label: 'Success Rate' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group"
              >
                <div className="text-3xl md:text-5xl font-bold mb-2 text-black group-hover:text-gray-600 transition-colors">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm uppercase tracking-wide font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              ABOUT
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 text-gray-700 leading-relaxed"
            >
              <p className="text-xl text-gray-900 font-medium">
                Building technology that creates meaningful impact across industries that matter most.
              </p>
              
              <p>
                From healthcare platforms processing millions of medical scans to e-commerce systems handling enterprise-scale transactions, my journey has been defined by solving complex problems with elegant solutions.
              </p>
              
              <p>
                At The Good Guys, I architected systems serving millions of customers. At 4DMedical, I helped revolutionize lung imaging technology. With Hangtime Melbourne, I built community platforms connecting thousands of athletes.
              </p>
              
              <p>
                Today, I focus on five strategic sectors where technology can create the most significant positive impact: Healthcare, Commerce, Sports, Wellbeing, and Fintech.
              </p>
              
              <p className="text-lg font-medium text-black">
                My mission: Build technology that matters, create lasting value, and inspire innovation.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-gray-50 p-8 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-black">Core Expertise</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Full-Stack Development
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    System Architecture
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Product Strategy
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Team Leadership
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                    Business Development
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black text-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              LET'S BUILD SOMETHING GREAT
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Ready to discuss your next venture, explore partnership opportunities, or collaborate on innovative projects? Let's connect and create something extraordinary.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <a 
                href="mailto:handy.hasan@yahoo.com" 
                className="bg-white text-black px-8 py-4 text-lg font-medium hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group"
              >
                <Mail className="mr-2 h-5 w-5" />
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="https://www.linkedin.com/in/handyhasan" 
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center"
              >
                <Linkedin className="mr-2 h-5 w-5" />
                Connect on LinkedIn
              </a>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 text-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-gray-400">handy.hasan@yahoo.com</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Location</h3>
                <p className="text-gray-400">120 Spencer St, Melbourne VIC 3000</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-6 text-center text-gray-400 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 HandyLabs. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 