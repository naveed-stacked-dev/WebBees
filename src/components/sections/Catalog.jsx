import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ExternalLink, CheckCircle2, Zap, Globe, ShoppingCart,
  Palette, Database, Puzzle, ChevronDown, ChevronUp, Star, Code2,
  Layers, Send, Monitor, Smartphone
} from 'lucide-react';
// import img1 from '../../assets/UI-UX/1.png';
// import img2 from '../../assets/UI-UX/2.png';
// import img3 from '../../assets/UI-UX/3.png';
// import img4 from '../../assets/UI-UX/4.png';
// import img5 from '../../assets/UI-UX/5.png';
// import img6 from '../../assets/UI-UX/6.png';
// import img7 from '../../assets/UI-UX/7.png';
// import img8 from '../../assets/UI-UX/8.png';
// import img9 from '../../assets/UI-UX/9.png';
// import img10 from '../../assets/UI-UX/10.png';
// import img11 from '../../assets/UI-UX/11.png';
// import img12 from '../../assets/UI-UX/12.png';

import ghostverse from '../../assets/ghostverse.png';
import richess from '../../assets/richesse.png';
import lifelinkcare from '../../assets/LLC.png';
import zzhs from '../../assets/ZZHS.png';
import EE from '../../assets/EE.png';
import instahomoeo from '../../assets/instahomeo.png';

// ─── DATA ─────────────────────────────────────────────────────────────────────

const pricingCategories = [
  {
    id: 'static',
    label: '01 — Static & Landing Pages',
    icon: <Globe className="w-5 h-5" />,
    color: 'from-[#00ff9f] to-[#00e5ff]',
    glow: 'rgba(0,255,159,0.25)',
    packages: [
      {
        name: 'Basic Landing Page',
        price: '₹8,000 – ₹10,000',
        delivery: '2–4 Days',
        badge: 'Starter',
        features: ['1-page responsive website', 'Premium hero section', 'Contact form integration', 'Mobile responsive design', 'SEO meta setup', 'Fast loading optimization'],
      },
      {
        name: 'Multi-Page Static Website',
        price: '₹12,000 – ₹25,000',
        delivery: '5–8 Days',
        badge: 'Popular',
        features: ['Up to 8 pages', 'Modern UI/UX', 'Animations & transitions', 'Google Maps integration', 'Mobile-first design', 'Hosting support'],
      },
    ],
  },
  {
    id: 'dynamic',
    label: '02 — Dynamic Websites & Web Apps',
    icon: <Code2 className="w-5 h-5" />,
    color: 'from-[#56CCF2] to-[#2F80ED]',
    glow: 'rgba(86,204,242,0.25)',
    packages: [
      {
        name: 'Dynamic Website',
        price: '₹25,000 – ₹55,000',
        delivery: '12–18 Days',
        badge: 'Business',
        features: ['Login/Signup system', 'REST API integration', 'Database integration', 'Admin dashboard', 'User management', 'Secure authentication'],
      },
      {
        name: 'Premium Modern Web App',
        price: '₹60,000 – ₹1,00,000',
        delivery: '25–45 Days',
        badge: 'Enterprise',
        features: ['React / Node.js architecture', 'Dashboard systems', 'CMS support', 'PWA support', 'deployment', 'Performance optimization', 'Scalable backend setup'],
        highlight: true,
      },
    ],
  },
  {
    id: 'ecommerce',
    label: '03 — eCommerce Solutions',
    icon: <ShoppingCart className="w-5 h-5" />,
    color: 'from-[#FF9966] to-[#FF5E62]',
    glow: 'rgba(255,153,102,0.25)',
    packages: [
      {
        name: 'Basic eCommerce Store',
        price: '₹35,000 – ₹60,000',
        delivery: '15–22 Days',
        badge: 'Store',
        features: ['Product pages', 'Cart & checkout', 'Razorpay integration', 'Order management', 'Mobile optimized UI', 'Basic admin panel'],
      },
      {
        name: 'Full eCommerce Platform',
        price: '₹70,000 – ₹1,00,000',
        delivery: '25–40 Days',
        badge: 'Premium',
        features: ['Razorpay or Stripe integration', 'Shiprocket shipping setup', 'Inventory management', 'Return management', 'Admin CMS panel', 'Google Analytics', 'SEO optimization', 'Premium UI/UX'],
        highlight: true,
      },
    ],
  },
  {
    id: 'cms',
    label: '04 — CMS & Admin Panels',
    icon: <Database className="w-5 h-5" />,
    color: 'from-[#80FF72] to-[#7EE8FA]',
    glow: 'rgba(128,255,114,0.2)',
    packages: [
      {
        name: 'Website + CMS',
        price: '₹30,000 – ₹70,000',
        delivery: '15–25 Days',
        badge: 'CMS',
        features: ['Blog & page editor', 'Media manager', 'Role-based access', 'Content management', 'Analytics overview'],
      },
      {
        name: 'Custom Admin Panel',
        price: '₹40,000 – ₹90,000',
        delivery: '18–30 Days',
        badge: 'Admin',
        features: ['Custom data tables', 'Analytics widgets', 'User management', 'Export reports', 'Business management tools'],
      },
    ],
  },
];

const addons = [
  { name: 'Razorpay / Stripe', price: '₹10,000' },
  { name: 'Shiprocket Integration', price: '₹12,000' },
  { name: 'Google Analytics', price: '₹2,000'},
  { name: 'SEO Optimization', price: '₹5,000' },
  { name: 'AWS / Cloud Deployment', price: '₹10,000' },
  { name: 'Hostinger Setup', price: '₹8,000' },
  { name: 'Domain + SSL Setup', price: '₹5,000/yr' },
  { name: 'Monthly Maintenance', price: '₹2,000/mo' },
];

const portfolioProjects = [
  {
    id: 1,
    tag: 'AI-Based Web Platform',
    title: 'Ghostverse.ai',
    desc: 'Developed frontend and backend using modern web technologies. Built responsive and scalable UI with React.js, designed and integrated REST APIs for seamless communication, and implemented AI-driven features and interactive workflows.',
    link: 'https://ghostverse.ai',
    image: ghostverse,
    tech: ['React.js', 'REST API', 'AI Integration'],
  },
  {
    id: 2,
    tag: 'FinTech Web Application',
    title: 'Richesse Solutions',
    desc: 'A comprehensive fintech web application enabling secure transactions, user management, and real-time analytics. Demonstrates expertise in building scalable and innovative financial web solutions.',
    link: 'https://richesse.solutions/',
    image: richess,
    tech: ['Node.js', 'React', 'Analytics'],
  },
  {
    id: 3,
    tag: 'Healthcare Platform',
    title: 'LifeLinkCare',
    desc: 'A full-stack healthcare website featuring medicine scanning, a virtual Dr. Bot assistant, and various therapeutic services. Showcases the ability to create impactful and user-centric healthcare web solutions.',
    link: 'https://github.com/syedNaveedullah/Life-Link-Care.git',
    image: lifelinkcare,
    tech: ['MERN Stack', 'AI Bot', 'Healthcare'],
  },
      {
    id: 4,
    tag: 'Ecommerce Platform',
    title: 'InstaHomeo.com',
    desc: 'Online homeo store with products, user management, cart & checkout, and Razorpay & Stripe integration.',
    link: 'http://instahomeo.com/',
    image: instahomoeo,
    tech: ['Dashboard', 'Admin', 'Payments', 'Shipping', 'Auth'],
  },
  {
    id: 5,
    tag: 'Educational Platform',
    title: 'ZZH School',
    desc: 'A full-fledged MERN stack educational website featuring seamless user management, interactive dashboards, and streamlined operations. Highlights proficiency in building robust and scalable web applications.',
    link: 'https://github.com/syedNaveedullah/ZZHS.git',
    image: zzhs,
    tech: ['MERN Stack', 'Dashboard', 'Auth'],
  },
  {
    id: 6,
    tag: 'Travel & Booking App',
    title: 'ExploreEase',
    desc: 'A MERN-based Airbnb-style clone featuring robust authentication, authorization, and advanced security measures. Showcases skills in creating scalable, secure, and user-friendly booking applications.',
    link: 'https://github.com/syedNaveedullah/ExploreEase.git',
    image: EE,
    tech: ['MERN Stack', 'Auth', 'Maps'],
  },
];

const techStack = {
  Frontend: ['React.js', 'Next.js', 'HTML5', 'Tailwind CSS', 'JavaScript', '3D Web'],
  Backend: ['Node.js', 'Express.js', 'REST APIs'],
  Database: ['MongoDB', 'MySQL'],
  'Cloud & Hosting': ['AWS', 'Hostinger', 'Domain & SSL'],
};

const whyUs = [
  'Modern Premium Design', 'Fast Delivery', 'Scalable Architecture',
  'SEO-Friendly Development', 'Mobile-First Experience', 'Full Deployment Support',
  'Clean & Maintainable Code', 'Business-Focused Solutions',
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function PricingCard({ pkg, color, glow }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative rounded-2xl border overflow-hidden flex flex-col h-full transition-all duration-300 group ${
        pkg.highlight
          ? 'border-white/30 bg-gradient-to-b from-white/5 to-black shadow-[0_0_40px_rgba(255,255,255,0.05)]'
          : 'border-white/10 bg-black/60 hover:border-white/20'
      }`}
      style={pkg.highlight ? { boxShadow: `0 0 50px ${glow}` } : {}}
    >
      {pkg.highlight && (
        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${color}`} />
      )}

      <div className="p-6 flex-1">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`text-xs font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-gradient-to-r ${color} text-black mb-3 inline-block`}>
              {pkg.badge}
            </span>
            <h3 className="text-xl font-bold text-white mt-1">{pkg.name}</h3>
          </div>
        </div>

        <div className="mb-2">
          <span className={`text-2xl font-black bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
            {pkg.price}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-xs text-gray-400">Delivery: {pkg.delivery}</span>
        </div>

        <ul className="space-y-2.5">
          {pkg.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#00ff9f]" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="p-6 pt-0">
        <a
          href="#contact-catalog"
          className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
            pkg.highlight
              ? `bg-gradient-to-r ${color} text-black shadow-lg hover:opacity-90`
              : 'border border-white/15 text-white hover:border-white/30 hover:bg-white/5'
          }`}
        >
          Get a Quote <Send className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}

function CategoryAccordion({ cat, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false);

  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 bg-black/60 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className={`p-2 rounded-lg bg-gradient-to-r ${cat.color} text-black`}>
            {cat.icon}
          </span>
          <span className="text-white font-bold text-lg">{cat.label}</span>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6 bg-black/30">
              {cat.packages.map((pkg, i) => (
                <PricingCard key={i} pkg={pkg} color={cat.color} glow={cat.glow} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PortfolioItem({ project, index }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center py-12 border-b border-white/5 last:border-0`}
    >
      {/* Image */}
      <div className="w-full lg:w-1/2">
        <div className="relative group rounded-2xl overflow-hidden border border-white/10 aspect-video bg-gray-900">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm font-bold text-[#00ff9f] border border-[#00ff9f]/40 px-4 py-2 rounded-full hover:bg-[#00ff9f]/10 transition-colors"
            >
              View Live <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          {/* Corner accent */}
          <div className="absolute top-4 left-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00ff9f] bg-black/70 px-3 py-1 rounded-full border border-[#00ff9f]/30">
              {project.tag}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-mono">
          Project 0{project.id}
        </p>
        <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
          {project.title}
        </h3>
        <p className="text-gray-400 text-base leading-relaxed mb-6">
          {project.desc}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
              {t}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#00ff9f] hover:gap-3 transition-all duration-200"
        >
          View Project <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export function Catalog() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-cyber-black text-foreground overflow-x-hidden">
      {/* Grid texture */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,159,0.02)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none z-0" />

      {/* Back button */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 border border-white/10 text-white text-sm hover:border-[#00ff9f]/40 hover:text-[#00ff9f] transition-all duration-200 backdrop-blur-md"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,159,0.08)_0%,transparent_60%)] pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-widest rounded-full border border-[#00ff9f]/30 bg-[#00ff9f]/5 text-[#00ff9f]">
            Web Solutions That Sting
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
            <span className="text-white">Web</span>
            <span className="gradient-text">Bees</span>
            <br />
            <span className="text-3xl md:text-5xl font-bold text-gray-300">Service Catalog</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
            Full-stack web development — from clean landing pages to powerful eCommerce platforms.
            <span className="text-white"> Built fast, built right.</span>
          </p>
          {/* Tech pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['React', 'Next.js', 'Razorpay', 'Stripe', 'Shiprocket', 'AWS', 'Hostinger', 'SEO Friendly'].map((t) => (
              <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                {t}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-4">
            {[['100+', 'Students Mentored'], ['50+', 'Projects Shipped'], ['3+', 'Years Experience'], ['60', 'Days Bug Support']].map(([num, label]) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-black text-[#00ff9f]">{num}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 bg-black/40 p-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {whyUs.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle2 className="w-4 h-4 text-[#00ff9f] flex-shrink-0" />
              {item}
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── PRICING PACKAGES ── */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Our <span className="gradient-text">Packages</span>
          </h2>
          <p className="text-gray-400 text-lg">Transparent pricing for every stage of your business.</p>
        </div>

        <div>
          {pricingCategories.map((cat, i) => (
            <CategoryAccordion key={cat.id} cat={cat} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      {/* ── ADD-ONS TABLE ── */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            06 — <span className="gradient-text">Integrations & Add-Ons</span>
          </h2>
          <p className="text-gray-400">Stack onto any project at any time.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-white/10 overflow-hidden"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {addons.map((addon, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-4 border-b border-white/5 last:border-0 even:border-l even:border-white/5 hover:bg-white/3 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Puzzle className="w-4 h-4 text-[#00ff9f]" />
                  <span className="text-white text-sm font-medium">{addon.name}</span>
                </div>
                <span className="text-[#00ff9f] font-bold text-sm font-mono">{addon.price}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00ff9f] mb-3 block">Real-World Delivery</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Projects We've <span className="gradient-text">Built</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From AI platforms to fintech dashboards — here are some of the live products we've shipped for clients and for ourselves.
          </p>
        </div>

        <div>
          {portfolioProjects.map((project, i) => (
            <PortfolioItem key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            Our <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="text-gray-400">Every tool chosen for performance, scalability, and real-world reliability.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(techStack).map(([category, items]) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-white/10 bg-black/40 p-5"
            >
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#00ff9f] mb-4">{category}</h4>
              <ul className="space-y-2">
                {items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff9f] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PROCESS & TERMS ── */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            07 — <span className="gradient-text">Terms & Process</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: '💰', title: 'Payment', desc: '50% Advance — 50% On Delivery' },
            { icon: '🔄', title: 'Revisions', desc: '2 Free Rounds then extra charges apply' },
            { icon: '🛡️', title: 'Bug Support', desc: '60 Days Free Post Delivery' },
            { icon: '📦', title: 'You Provide', desc: 'Content, Logo & Project Brief' },
            { icon: '🌐', title: 'Mode', desc: 'Remote via WhatsApp / Email' },
            { icon: '💡', title: 'Custom?', desc: 'Quote available for complex builds' },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border border-white/10 bg-black/40 p-5 text-center"
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
              <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA CONTACT ── */}
      <section id="contact-catalog" className="px-6 pb-32 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-white/15 bg-black/60 p-12 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,159,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff9f] to-transparent opacity-50" />

          <h2 className="text-4xl font-black text-white mb-3">Let's Build Something <span className="gradient-text">Premium.</span></h2>
          <p className="text-gray-400 mb-8">Have an idea? Tell us what you need and we'll make it live — fast and right.</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:webbees10@gmail.com"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-black bg-gradient-to-r from-[#00ff9f] to-[#00e5ff] shadow-[0_0_25px_rgba(0,255,159,0.4)] hover:shadow-[0_0_35px_rgba(0,255,159,0.6)] transition-all duration-300"
            >
              <Send className="w-4 h-4" /> Email Us
            </a>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all duration-300"
            >
              <Monitor className="w-4 h-4" /> View Full Site
            </button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500">
            <span>📧 webbees10@gmail.com</span>
            <span>Phone: +91 7995943170</span>
            <span className='underline' href="https://webbees.tech/">🌐 www.webbees.tech</span>
          </div>
        </motion.div>
      </section>
    </div>
  );
}