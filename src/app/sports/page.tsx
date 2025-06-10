'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import Link from 'next/link';
import { ArrowLeft, Users, Trophy, Activity, Target } from 'lucide-react';

export default function SportsPage() {
  const projects = [
    {
      title: "Hangtime Melbourne - Basketball Community",
      description: "Community-driven platform connecting over 10,000 basketball players across Melbourne with games, leagues, and social features",
      impact: "10K+ athletes connected",
      tech: ["React Native", "Node.js", "Social Features", "Real-time Matching", "Community Management"],
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Sports Analytics Platform",
      description: "Advanced analytics platform providing performance insights, injury prevention, and training optimization for athletes and coaches",
      impact: "60% performance improvement",
      tech: ["Data Analytics", "Machine Learning", "Performance Tracking", "Predictive Modeling"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Athletic Event Management",
      description: "Comprehensive tournament and event management system streamlining registration, scheduling, and results tracking",
      impact: "200+ events managed",
      tech: ["Event Management", "Payment Processing", "Scheduling Systems", "Live Updates"],
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    }
  ];

  const metrics = [
    { icon: Users, number: "10K+", label: "Athletes Connected" },
    { icon: Trophy, number: "200+", label: "Events Managed" },
    { icon: Activity, number: "60%", label: "Performance Boost" },
    { icon: Target, number: "95%", label: "User Retention" }
  ];

  const techStack = [
    "React Native", "Node.js", "Real-time Systems", "Social Platforms", 
    "Data Analytics", "Machine Learning", "Performance Tracking",
    "Event Management", "Payment Processing", "Community Features", "Mobile Development"
  ];

  return (
    <div className="min-h-screen bg-white text-black">
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
              SPORTS
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Connecting Communities Through Sport and Athletic Excellence
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
                  Sports communities struggle with fragmented communication, difficult player matching, 
                  limited performance insights, and inefficient event management across various athletic disciplines.
                </p>
                <p>
                  Traditional sports organization relies on outdated systems that fail to leverage data analytics, 
                  social connectivity, and modern technology to enhance athletic performance and community engagement.
                </p>
                <p>
                  Athletes and organizers need integrated platforms that combine community building, 
                  performance tracking, and seamless event management.
                </p>
              </div>
            </div>
            <div className="relative h-80">
              <Image
                src="https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
                alt="Sports Challenge"
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
              Technology-driven sports platforms that enhance athletic performance and strengthen community connections
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
                    <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Community Impact</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Measurable results that demonstrate how sports technology strengthens athletic communities
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
              Specialized technologies powering sports communities and athletic performance platforms
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
              Ready to Build Your Sports Community?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can create technology solutions that enhance athletic performance and strengthen sports communities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
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