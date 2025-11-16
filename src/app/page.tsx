'use client';

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const phoneNumber = "+61 400 403 294";
const phoneHref = "tel:+61400403294";

const outcomes = [
  "More calls & enquiries in 7–14 days",
  "Fixed-price websites, fast turnaround",
  "SEO basics + Google Ads done for you",
  "Track every lead (calls + forms)"
];

const packages = [
  {
    title: "Starter Website",
    subtitle: "1–3 pages + landing page",
    price: "from $1,200",
    description: "Custom site built to convert – includes copy, mobile polish, and lead notifications.",
    items: [
      "Done-for-you copy & imagery",
      "On-page SEO + speed tune",
      "Lead notifications (email & SMS)"
    ]
  },
  {
    title: "Lead Machine",
    subtitle: "Website + Google Ads",
    price: "from $1,450",
    description: "Launch or refresh your site and pair it with a managed Google Ads funnel.",
    items: [
      "Everything in Starter Website",
      "Google Ads build + weekly optimisation",
      "Call tracking + form analytics"
    ]
  },
  {
    title: "Ads Only",
    subtitle: "Google Ads management",
    price: "from $390/mo",
    description: "Already have a site? We'll run and optimise your ads so you stay on top.",
    items: [
      "Account setup or clean-up",
      "Keyword + negative list management",
      "Weekly reporting loom or email"
    ],
    footer: "Pause anytime. No lock-ins."
  }
];

const proofTiles = [
  {
    title: "House Painter · Dandenong",
    metric: "+38% calls in 30 days",
    detail: "New lead site + tap-to-call tracking."
  },
  {
    title: "Locksmith · Footscray",
    metric: "$22 avg cost per lead",
    detail: "Search ads + suburb-specific landing pages."
  },
  {
    title: "Flyscreens · Cranbourne",
    metric: "Site live in 5 days",
    detail: "1-pager + booking form + Google Business updates."
  }
];

const proofScreens = [
  {
    src: "/handylabs-sponsored.png",
    alt: "Google sponsored listing for HandyLabs desktop",
    caption: "Desktop sponsored result with sitelinks for “handylabs live”."
  },
  {
    src: "/handylabs-proof-2.png",
    alt: "Google Ads overview for HandyLabs",
    caption: "Campaign diagnostics showing active ads + sitelinks."
  },
  {
    src: "/handylabs-proof-3.png",
    alt: "Google Business branded query screenshot",
    caption: "Branded coverage across Google surfaces captured 12 Nov 2025."
  }
];

const trustPhotos = [
  {
    title: "Tradie website handoff",
    caption: "Walking a Melbourne painter through their new quote form.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Google Ads workshop",
    caption: "Weekly optimisation sessions so every dollar is tracked.",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "On-site content shoot",
    caption: "Capturing real work photos to replace stale stock imagery.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
  }
];

const specialties = [
  "Painters",
  "Locksmiths",
  "Handymen",
  "Cleaners",
  "Landscapers",
  "Tradies",
  "Solo agencies",
  "Mobile services",
  "Restaurants & cafes"
];

const faqs = [
  {
    question: "How fast can we launch?",
    answer: "Most Starter Websites ship within 5–10 days once we have your brief or call recording."
  },
  {
    question: "Can I keep my domain & email?",
    answer: "Yes. We work with your existing domain, email, and hosting or help you transfer without downtime."
  },
  {
    question: "Do you lock me into contracts?",
    answer: "No lock-ins. Ads can pause anytime and websites are fixed-price quotes."
  },
  {
    question: "Do you work outside Melbourne?",
    answer: "Yes. Melbourne-based team, but we serve contractors and small businesses across Australia."
  },
  {
    question: "How do you track results?",
    answer: "Every call link is tagged, forms hit Formspree + email, and we send simple dashboards weekly."
  }
];

const needOptions = [
  "Website",
  "Google Ads",
  "Website + Google Ads",
  "SEO"
];

const recentWork = [
  {
    title: "Michelle Limanjae",
    subtitle: "Performer & Creative",
    description: "Portfolio overhaul with instant booking form, showreel embeds, and mobile polish.",
    metric: "300% more booking enquiries",
    image: "/michelle.png",
    link: "https://bright-truffle-977299.netlify.app/"
  },
  {
    title: "Re-Coded Talent",
    subtitle: "Recruitment Agency",
    description: "Lead-gen site + automations that turned manual outreach into 80+ placements in 6 months.",
    metric: "70% of workflow automated",
    image: "/re-coded.png",
    link: "https://re-coded.com.au"
  },
  {
    title: "Hangtime Melbourne",
    subtitle: "Sports Community",
    description: "Custom web app powering 10k+ hoopers with games, leagues, and payments each week.",
    metric: "500+ games managed weekly",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=900&q=80",
    link: "https://hangtime.au"
  }
];

const navLinks = [
  { label: "Packages", href: "#packages" },
  { label: "Proof", href: "#proof" },
  { label: "Work", href: "#work" },
  { label: "Quote", href: "#quote" }
];

const trustedCustomers = [
  {
    name: "OnCall Plumbing Co.",
    industry: "Emergency Plumbing",
    metric: "42 inbound calls / month",
    badge: "Lead-Gen",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Brightside Painters",
    industry: "Residential Painting",
    metric: "11 booked jobs / month",
    badge: "Website + Ads",
    image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "MetroLock 24/7",
    industry: "Locksmith",
    metric: "Avg $24 cost per lead",
    badge: "Google Ads",
    image: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=600&q=80"
  },
  {
    name: "Laneway Eats",
    industry: "Restaurant & Catering",
    metric: "Booked out 3 weekends",
    badge: "Menu + Ads",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&q=80"
  }
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    bizType: "",
    suburb: "",
    need: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch("https://formspree.io/f/xgvyzvwk", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          phone: "",
          bizType: "",
          suburb: "",
          need: ""
        });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNavSelection = () => setIsMobileNavOpen(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "HandyLabs",
    "areaServed": "Melbourne",
    "url": "https://handylabs.live",
    "telephone": "+61 400 403 294",
    "priceRange": "$$",
    "description": "Websites, SEO, and Google Ads for small businesses and independent contractors.",
    "sameAs": []
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>HandyLabs · Websites & Google Ads for Small Businesses & Contractors</title>
        <meta
          name="description"
          content="Get more calls, quotes, and bookings with fast, affordable websites and Google Ads for small businesses & independent contractors."
        />
        <meta property="og:title" content="HandyLabs · Websites & Google Ads for Small Businesses & Contractors" />
        <meta
          property="og:description"
          content="Melbourne-based websites, SEO basics, and Google Ads that drive calls and bookings for tradies and solo operators."
        />
        <meta property="og:image" content="https://handyhasan.live/og-image.jpg" />
        <meta property="og:url" content="https://handylabs.live" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HandyLabs · Websites & Google Ads for Small Businesses & Contractors" />
        <meta
          name="twitter:description"
          content="Websites & Google Ads for small businesses and independent contractors. Clear pricing, no lock-ins."
        />
        <meta name="twitter:image" content="https://handyhasan.live/og-image.jpg" />
      </Head>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="fixed top-0 w-full bg-black/90 backdrop-blur border-b border-gray-900 z-50">
        <nav className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tight">HANDYLABS</Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label === "Work" ? "Recent Work" : link.label === "Quote" ? "Get a Quote" : link.label}
                </Link>
              ))}
              <a href={phoneHref} className="inline-flex items-center gap-2 border border-white/30 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-colors">
                Call {phoneNumber}
              </a>
            </div>
            <button
              type="button"
              className="md:hidden inline-flex flex-col gap-1.5 border border-white/30 px-3 py-2 rounded-lg"
              onClick={() => setIsMobileNavOpen(prev => !prev)}
              aria-expanded={isMobileNavOpen}
              aria-label="Toggle navigation"
            >
              <span className={`h-0.5 w-6 bg-white transition-transform ${isMobileNavOpen ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`h-0.5 w-6 bg-white transition-opacity ${isMobileNavOpen ? "opacity-0" : "opacity-80"}`} />
              <span className={`h-0.5 w-6 bg-white transition-transform ${isMobileNavOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </button>
          </div>
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ${
              isMobileNavOpen ? "max-h-[400px] mt-4" : "max-h-0"
            }`}
          >
            <div className="border border-gray-800 rounded-2xl p-4 bg-black/70 space-y-4">
              <div className="flex flex-col gap-3 text-sm font-semibold">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleNavSelection}
                    className="flex items-center justify-between text-white/80 hover:text-white"
                  >
                    <span>{link.label === "Work" ? "Recent Work" : link.label === "Quote" ? "Get a Quote" : link.label}</span>
                    <span className="text-gray-600 text-xs">›</span>
                  </Link>
                ))}
              </div>
              <a
                href={phoneHref}
                onClick={handleNavSelection}
                className="block text-center border border-white/30 rounded-xl py-3 font-semibold text-white hover:bg-white hover:text-black transition-colors"
              >
                Call {phoneNumber}
              </a>
              <a
                href="mailto:handy.hasan@yahoo.com"
                onClick={handleNavSelection}
                className="block text-center border border-gray-800 rounded-xl py-3 font-semibold text-gray-300 hover:text-white transition-colors"
              >
                Email handy.hasan@yahoo.com
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-32 space-y-24 pb-32">
        <section className="min-h-[80vh] flex items-center justify-center text-center relative overflow-hidden px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black pointer-events-none" />
          <motion.div
            className="relative z-10 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="uppercase tracking-[0.3em] text-sm text-gray-500 mb-4">
              Melbourne · Websites · Google Ads
            </p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              Websites & Google Ads for Small Businesses & Independent Contractors
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Get more calls, quotes, bookings, and table reservations—fast, affordable, Melbourne-based.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <a
                href="#quote"
                className="bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get a Free Quote
              </a>
              <a
                href={phoneHref}
                className="border border-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Call Now
              </a>
            </div>
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500">
              No lock-ins • Clear pricing • Results you can track
            </p>
          </motion.div>
        </section>

        <section className="px-6">
          <div className="max-w-6xl mx-auto rounded-3xl border border-blue-900/40 bg-gradient-to-r from-blue-950 via-indigo-900 to-purple-900 p-8 shadow-[0_20px_80px_rgba(59,130,246,0.25)]">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-blue-200/80 mb-2">Trusted by Melbourne operators</p>
                <h2 className="text-3xl font-bold text-white">Customers who stick around.</h2>
                <p className="text-sm text-blue-100/90 mt-2">
                  Borrowing a page from the ELK HQ playbook: show the wins. These are the types of clients we ship for every week.
                </p>
              </div>
              <a
                href="#quote"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white hover:text-black transition-colors"
              >
                Book a 15‑min chat →
              </a>
            </div>
            <div className="grid gap-4 mt-8 md:grid-cols-2 xl:grid-cols-4">
              {trustedCustomers.map(customer => (
                <div key={customer.name} className="rounded-2xl bg-white/5 border border-white/10 p-4 backdrop-blur">
                  <div className="flex items-center justify-between mb-3">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden border border-white/20">
                      <Image
                        src={customer.image}
                        alt={`${customer.name} project`}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <span className="text-xs uppercase tracking-[0.3em] text-blue-200">{customer.badge}</span>
                  </div>
                  <p className="text-white font-semibold">{customer.name}</p>
                  <p className="text-sm text-blue-100/90">{customer.industry}</p>
                  <p className="text-sm text-emerald-200 mt-3">{customer.metric}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-4">In the field</p>
            <h2 className="text-3xl font-bold mb-4">Real teams, real builds, real Melbourne jobs.</h2>
            <p className="text-gray-400">We show up on-site, gather proof-of-work, and keep ads + websites aligned with what you actually do.</p>
          </div>
          <div className="max-w-6xl mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {trustPhotos.map(photo => (
              <motion.div
                key={photo.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border border-gray-900 rounded-3xl overflow-hidden bg-gray-900/40"
              >
                <div className="relative w-full h-64">
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={photo.title === "Tradie website handoff"}
                  />
                </div>
                <div className="p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-2">On the tools</p>
                  <h3 className="text-xl font-semibold mb-1">{photo.title}</h3>
                  <p className="text-sm text-gray-400">{photo.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6" id="outcomes">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-4">Outcomes</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-10">What you get when we launch.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {outcomes.map(item => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="border border-gray-800 rounded-2xl px-6 py-5 bg-gray-900/40"
              >
                <p className="text-lg text-gray-100">{item}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6" id="packages">
          <div className="max-w-6xl mx-auto text-center mb-12">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-4">Packages</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Pick the setup that matches your next job.</h2>
            <p className="text-gray-400">Pause anytime. No lock-ins.</p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            {packages.map(pkg => (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border border-gray-800 rounded-3xl p-6 bg-gradient-to-b from-gray-900/60 to-black"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">{pkg.subtitle}</p>
                <h3 className="text-2xl font-bold mb-1">{pkg.title}</h3>
                <p className="text-3xl font-semibold text-blue-300 mb-4">{pkg.price}</p>
                <p className="text-gray-400 mb-6 text-sm">{pkg.description}</p>
                <ul className="space-y-3 text-sm text-gray-200 mb-4">
                  {pkg.items.map(item => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-blue-400">•</span> {item}
                    </li>
                  ))}
                </ul>
                {pkg.footer && (
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-500">{pkg.footer}</p>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6" id="proof">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-4">Proof</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Local service businesses getting real numbers.</h2>
            <p className="text-gray-400">Two weeks after launch you should see more calls or we keep fixing it free.</p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
            {proofTiles.map(tile => (
              <motion.div
                key={tile.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="border border-gray-800 rounded-2xl p-6 bg-gray-900/50"
              >
                <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">{tile.title}</p>
                <h3 className="text-2xl font-semibold text-white mb-3">{tile.metric}</h3>
                <p className="text-sm text-gray-400">{tile.detail}</p>
              </motion.div>
            ))}
          </div>
          <div className="max-w-4xl mx-auto text-center mt-10">
            <p className="text-lg text-green-300 font-semibold">If you don’t see more enquiries in 30 days, we fix it free.</p>
          </div>
          <div className="max-w-5xl mx-auto mt-12 space-y-6">
            <div className="border border-gray-800 rounded-3xl p-6 bg-gray-900/40">
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">Verified search presence</p>
              <div className="flex flex-col gap-2 text-left">
                <p className="text-xl font-semibold text-white">Sponsored Google result for “handylabs live”</p>
                <p className="text-sm text-gray-400">
                  We run what we sell. Type our name into Google and you’ll see a sponsored listing with sitelinks driving to Portfolio and Recent Work pages.
                </p>
                <a
                  href="https://www.google.com/search?q=handylabs+live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 text-sm font-medium hover:text-blue-300"
                >
                  View search result →
                </a>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {proofScreens.map(screen => (
                <div key={screen.alt} className="border border-gray-800 rounded-2xl overflow-hidden bg-black/60">
                  <div className="relative w-full h-48">
                    <Image
                      src={screen.src}
                      alt={screen.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <p className="text-xs text-gray-400 px-4 py-3 border-t border-gray-800">{screen.caption}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6" id="work">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-4">Recent work</p>
            <h2 className="text-3xl font-bold mb-4">Proof you can click through.</h2>
            <p className="text-gray-400">Live builds and campaigns for Melbourne creatives, agencies, and service pros.</p>
          </div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {recentWork.map(work => (
              <motion.div
                key={work.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-black border border-gray-800 rounded-3xl overflow-hidden flex flex-col"
              >
                <div className="relative w-full h-56">
                  <Image
                    src={work.image}
                    alt={`${work.title} website preview`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">{work.subtitle}</p>
                  <h3 className="text-2xl font-semibold mb-2 text-white">{work.title}</h3>
                  <p className="text-sm text-gray-400 mb-4 flex-1">{work.description}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-green-400 mb-4">{work.metric}</p>
                  <a
                    href={work.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-sm font-medium hover:text-blue-300"
                  >
                    View project →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-6">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-4">Specialties</p>
            <h2 className="text-3xl font-bold mb-4">Small biz & solo operators we help.</h2>
            <p className="text-gray-400">Tell us what you do, we’ll bring the leads.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {specialties.map(item => (
              <span key={item} className="px-4 py-2 border border-gray-800 rounded-full text-sm text-gray-200 bg-gray-900/40">
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="px-6">
          <div className="max-w-5xl mx-auto border border-gray-800 rounded-3xl p-8 bg-gradient-to-br from-gray-900/70 to-black">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-3">Done-for-you leads</p>
                <h3 className="text-3xl font-bold mb-4">Need a “salesperson” more than a website?</h3>
                <p className="text-gray-400 text-lg mb-6">
                  We run your Google Ads, answer missed calls with an AI/VA callback, and book jobs straight into your calendar.
                </p>
                <ul className="space-y-3 text-gray-200 text-sm">
                  <li>• Pay monthly or per-lead — your choice</li>
                  <li>• Scripts + follow-up handled for you</li>
                  <li>• Shared dashboard with recordings</li>
                </ul>
              </div>
              <div className="border border-gray-800 rounded-2xl p-6 bg-black/60">
                <p className="text-gray-300 mb-4">
                  “HandyLabs feels like our in-house sales engineer — leads come in, they’re tracked, and jobs are booked without me chasing.”
                </p>
                <p className="text-sm text-gray-500">— Service business owner, Melbourne</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6" id="quote">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to get more calls?</h2>
            <p className="text-xl text-gray-400">Call, request a quote, or book a 15-min chat. We reply within 1 hour (9am–6pm).</p>
          </div>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-10">
            <div className="border border-gray-800 rounded-2xl p-6 bg-gray-900/40 text-left">
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">Call now</p>
              <a href={phoneHref} className="text-2xl font-semibold text-white">{phoneNumber}</a>
              <p className="text-sm text-gray-500 mt-2">Tap to call or SMS for urgent jobs.</p>
            </div>
            <div className="border border-gray-800 rounded-2xl p-6 bg-gray-900/40 text-left">
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">Email</p>
              <a href="mailto:handy.hasan@yahoo.com" className="text-lg font-semibold text-white">handy.hasan@yahoo.com</a>
              <p className="text-sm text-gray-500 mt-2">Send plans, screenshots, or goals.</p>
            </div>
            <div className="border border-gray-800 rounded-2xl p-6 bg-gray-900/40 text-left">
              <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-2">Book a 15-min call</p>
              <a
                href="https://calendly.com/handylabs/intro-call"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-blue-400 hover:text-blue-300"
              >
                calendly.com/handylabs
              </a>
              <p className="text-sm text-gray-500 mt-2">Pick a time that suits you.</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto border border-gray-800 rounded-3xl p-8 bg-gray-900/60">
            <h3 className="text-2xl font-bold mb-2 text-center">Get My Free Quote</h3>
            <p className="text-center text-gray-400 mb-8">We’ll call you within 1 hour, 9am–6pm.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitStatus === "success" && (
                <div className="bg-green-900/40 border border-green-600 text-green-200 px-4 py-3 rounded-lg text-sm">
                  Thanks! We’ve got your details and will call shortly.
                </div>
              )}
              {submitStatus === "error" && (
                <div className="bg-red-900/40 border border-red-600 text-red-200 px-4 py-3 rounded-lg text-sm">
                  Something went wrong. Please try again or call us directly.
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm text-gray-300 mb-2">Name *</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm text-gray-300 mb-2">Phone *</label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  inputMode="tel"
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
                  placeholder="Best number to call"
                />
              </div>
              <div>
                <label htmlFor="bizType" className="block text-sm text-gray-300 mb-2">Business type</label>
                <input
                  id="bizType"
                  name="bizType"
                  value={formData.bizType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
                  placeholder="Painter, Locksmith…"
                />
              </div>
              <div>
                <label htmlFor="suburb" className="block text-sm text-gray-300 mb-2">Suburb / Postcode *</label>
                <input
                  id="suburb"
                  name="suburb"
                  value={formData.suburb}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:outline-none"
                  placeholder="e.g. Cranbourne 3977"
                />
              </div>
              <div>
                <label htmlFor="need" className="block text-sm text-gray-300 mb-2">What do you need? *</label>
                <select
                  id="need"
                  name="need"
                  value={formData.need}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-white focus:outline-none text-white"
                >
                  <option value="">Select an option</option>
                  {needOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-white text-black py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Get My Free Quote"}
              </button>
            </form>
          </div>
        </section>

        <section className="px-6">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <p className="text-sm uppercase tracking-[0.4em] text-gray-500 mb-4">FAQ</p>
            <h2 className="text-3xl font-bold mb-4">Answers before you book.</h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map(faq => (
              <div key={faq.question} className="border border-gray-800 rounded-2xl p-6 bg-gray-900/40">
                <p className="text-lg font-semibold mb-2">{faq.question}</p>
                <p className="text-gray-400 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <a className="sticky-call" href={phoneHref}>
        Call HandyLabs Now – {phoneNumber}
      </a>

      <style jsx global>{`
        .sticky-call {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          display: block;
          text-align: center;
          padding: 14px 16px;
          background: #111;
          color: #fff;
          font-weight: 600;
          letter-spacing: 0.3px;
          z-index: 9999;
          box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.15);
        }
        @media (min-width: 768px) {
          .sticky-call {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
