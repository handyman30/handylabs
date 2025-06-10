'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const portfolioSections = [
    {
      id: 'healthcare',
      title: 'HEALTHCARE',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    },
    {
      id: 'commerce',
      title: 'COMMERCE',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    },
    {
      id: 'sports',
      title: 'SPORTS',
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    },
    {
      id: 'wellbeing',
      title: 'WELLBEING',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2320&q=80',
    },
    {
      id: 'fintech',
      title: 'FINTECH',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80',
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
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
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Technology Studio Building the Future
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
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid - Prince Group Style */}
      <section className="min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
          {portfolioSections.slice(0, 4).map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="relative h-full group cursor-pointer overflow-hidden"
            >
              <Image
                src={section.image}
                alt={section.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-700"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.h2
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[0.2em] text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  {section.title}
                </motion.h2>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Fifth section - Full width */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="relative h-screen group cursor-pointer overflow-hidden"
        >
          <Image
            src={portfolioSections[4].image}
            alt={portfolioSections[4].title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-700"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.h2
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-[0.2em] text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              {portfolioSections[4].title}
            </motion.h2>
          </div>
        </motion.div>
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
              LET&apos;S BUILD SOMETHING GREAT
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-center">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Email</h3>
                <p className="text-gray-400">handy.hasan@yahoo.com</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-white">Location</h3>
                <p className="text-gray-400">120 Spencer St, Melbourne VIC 3000</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center text-gray-400 max-w-7xl">
          <p>&copy; 2024 HandyLabs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
