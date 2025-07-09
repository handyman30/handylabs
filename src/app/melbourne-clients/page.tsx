'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Check, Star } from "lucide-react";
import Image from "next/image";

export default function MelbourneClientsPage() {
  const clients = [
    {
      id: 'michelle-limanjae',
      name: 'Michelle Limanjae',
      industry: 'Arts & Entertainment',
      role: 'Professional Singer & Artist',
      location: 'Melbourne, VIC',
      website: 'https://bright-truffle-977299.netlify.app/',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      gradient: 'from-purple-600 to-pink-600',
      emoji: '🎤',
      challenge: 'Michelle needed a professional online presence to showcase her musical talent, connect with fans, and attract booking opportunities in Melbourne\'s competitive music scene.',
      solution: 'We created an elegant, mobile-responsive portfolio website featuring her music catalog, performance videos, upcoming events, and integrated booking system. The site was optimized for discovery by event organizers and fans.',
      features: [
        'Spotify & Apple Music Integration',
        'Event Calendar & Booking System',
        'Media Gallery with Performance Videos',
        'SEO Optimized for "Melbourne Singer"',
        'Mobile-First Responsive Design',
        'Social Media Integration',
        'Contact & Booking Forms',
        'Newsletter Subscription'
      ],
      results: [
        '300% increase in booking inquiries',
        '2.5K monthly visitors within 3 months',
        'Featured in Melbourne Music Weekly',
        'Direct bookings worth $15K+ in first quarter'
      ],
      testimonial: {
        text: "HandyLabs transformed my online presence completely. The website they built has been instrumental in growing my music career. I'm now getting regular bookings and my fan base has grown significantly.",
        rating: 5
      },
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'Vercel', 'Formspree']
    },
    {
      id: 're-coded',
      name: 'Re-Coded',
      industry: 'Recruitment & HR Tech',
      role: 'Tech Recruitment Agency',
      owner: 'Charlie Beattie',
      location: 'Melbourne, VIC',
      website: 'https://www.re-coded.com.au/',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      gradient: 'from-blue-600 to-cyan-600',
      emoji: '💼',
      challenge: 'Re-Coded needed a professional platform to compete with established recruitment agencies, showcase job listings, and streamline the application process for both candidates and employers.',
      solution: 'We developed a comprehensive recruitment platform with job board functionality, candidate management system, and employer portal. The platform automates much of the recruitment workflow while maintaining a personal touch.',
      features: [
        'Dynamic Job Board with Filters',
        'Candidate Application Portal',
        'Employer Dashboard',
        'Resume Parser & ATS Integration',
        'Automated Email Notifications',
        'Interview Scheduling System',
        'Analytics & Reporting',
        'Mobile-Optimized Interface'
      ],
      results: [
        '150+ active job listings',
        '5,000+ registered candidates',
        '45% reduction in time-to-hire',
        '80+ successful placements in 6 months'
      ],
      testimonial: {
        text: "The platform HandyLabs built has revolutionized how we operate. We've automated 70% of our manual processes and can now compete with agencies 10x our size. The ROI has been exceptional.",
        rating: 5
      },
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe']
    },
    {
      id: 'hangtime-melbourne',
      name: 'Hangtime Melbourne',
      industry: 'Sports & Community',
      role: 'Basketball Community Platform',
      location: 'Melbourne, VIC',
      website: 'In Development',
      caseStudy: '/sports',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
      gradient: 'from-orange-600 to-red-600',
      emoji: '🏀',
      challenge: 'Melbourne\'s basketball community lacked a centralized platform to organize games, find players, and book courts. Players struggled to find games at their skill level.',
      solution: 'We built a comprehensive community platform with real-time game matching, court booking integration, skill-based matchmaking, and social features to connect 10,000+ basketball players across Melbourne.',
      features: [
        'Real-time Game Matchmaking',
        'Court Booking Integration',
        'Skill Level Matching',
        'Team Formation Tools',
        'League Management',
        'In-app Messaging',
        'Payment Processing',
        'Performance Analytics'
      ],
      results: [
        '10,000+ active players',
        '500+ games organized weekly',
        '25+ partner courts',
        '$2M+ in court bookings facilitated'
      ],
      testimonial: {
        text: "HandyLabs didn't just build us an app, they built a thriving community. The platform has become essential infrastructure for Melbourne's basketball scene.",
        rating: 5
      },
      technologies: ['React Native', 'Firebase', 'Node.js', 'Stripe', 'Google Maps API']
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-gray-800">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center max-w-7xl">
          <Link href="/" className="text-2xl font-bold text-white tracking-tight">
            HANDYLABS
          </Link>
          <Link href="/" className="flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="mr-2">📍</span> Proudly Based in Melbourne
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Melbourne Clients
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
              Building technology solutions for Melbourne&apos;s most innovative businesses and creative professionals
            </p>
            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-gray-400">Melbourne Clients</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-gray-400">Client Satisfaction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">$2M+</div>
                <div className="text-gray-400">Revenue Generated</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Clients */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Success Stories</h2>
            <p className="text-xl text-gray-400">Real results for real Melbourne businesses</p>
          </motion.div>

          <div className="space-y-32">
            {clients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                {/* Image Side */}
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="relative rounded-lg overflow-hidden group h-96">
                    {client.id === 'michelle-limanjae' ? (
                      <Image
                        src="/michelle.png"
                        alt={client.name}
                        fill
                        className="object-cover object-top"
                      />
                    ) : client.id === 're-coded' ? (
                      <Image
                        src="/re-coded.png"
                        alt={client.name}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <>
                        <img
                          src={client.image}
                          alt={client.name}
                          className="w-full h-96 object-cover"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${client.gradient} opacity-80`}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-8xl mb-4">{client.emoji}</div>
                            <h3 className="text-3xl font-bold text-white">{client.name}</h3>
                            <p className="text-white/80">{client.role}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Content Side */}
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                        {client.industry}
                      </span>
                      <span className="text-sm bg-gray-800 text-gray-300 px-3 py-1 rounded-full">
                        {client.location}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{client.name}</h3>
                    {client.owner && (
                      <p className="text-gray-400 mb-4">Founded by {client.owner}</p>
                    )}
                  </div>

                  <div className="space-y-6 mb-8">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-300 mb-2">The Challenge</h4>
                      <p className="text-gray-400">{client.challenge}</p>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-gray-300 mb-2">Our Solution</h4>
                      <p className="text-gray-400">{client.solution}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-300 mb-3">Key Features</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {client.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-300 mb-3">Results</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {client.results.map((result, i) => (
                          <div key={i} className="bg-gray-900 p-3 rounded-lg">
                            <p className="text-sm font-medium text-white">{result}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="bg-gray-900 p-6 rounded-lg mb-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(client.testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 italic mb-2">&ldquo;{client.testimonial.text}&rdquo;</p>
                    <p className="text-gray-500 text-sm">- {client.name} Team</p>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {client.technologies.map((tech, i) => (
                        <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-4">
                    {client.website !== 'In Development' && (
                      <a
                        href={client.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center bg-white text-black px-6 py-3 font-medium hover:bg-gray-200 transition-colors rounded-lg"
                      >
                        View Live Site
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    )}
                    {client.caseStudy && (
                      <Link
                        href={client.caseStudy}
                        className="inline-flex items-center border border-white px-6 py-3 font-medium hover:bg-white hover:text-black transition-colors rounded-lg"
                      >
                        Full Case Study →
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Melbourne Businesses Choose Us */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Melbourne Businesses Choose HandyLabs</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Local expertise combined with world-class technology solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏢</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Local Presence</h3>
              <p className="text-gray-400">
                Based in Melbourne CBD, we understand the local market and can meet face-to-face for important discussions
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Proven Results</h3>
              <p className="text-gray-400">
                Our Melbourne clients see average 250% ROI within the first year through increased efficiency and revenue
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Ongoing Support</h3>
              <p className="text-gray-400">
                We don&apos;t just build and leave. Our Melbourne team provides continuous support and optimization
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black border-t border-gray-800">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Melbourne&apos;s Digital Leaders
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss how we can transform your business with custom technology solutions
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="mailto:handy.hasan@yahoo.com?subject=Melbourne Business Inquiry"
                className="bg-white text-black px-8 py-4 text-lg font-medium hover:bg-gray-200 transition-colors rounded-lg"
              >
                Schedule Consultation
              </a>
              <Link 
                href="/"
                className="border border-white px-8 py-4 text-lg font-medium hover:bg-white hover:text-black transition-colors rounded-lg"
              >
                View All Services
              </Link>
            </div>
            <p className="text-gray-400 mt-8">
              <span className="text-white font-medium">Melbourne Office:</span> 120 Spencer St, Melbourne VIC 3000
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center text-gray-400 max-w-7xl">
          <p>&copy; 2024 HandyLabs Technology Studio. Proudly serving Melbourne businesses.</p>
        </div>
      </footer>
    </div>
  );
} 