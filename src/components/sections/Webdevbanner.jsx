import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe, ShoppingCart, Code2, Smartphone } from 'lucide-react';

const services = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Landing Pages',
    desc: 'Stunning single-page sites that convert visitors into customers.',
    color: 'from-[#00ff9f] to-[#00e5ff]',
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: 'Web Applications',
    desc: 'Full-stack apps with auth, dashboards, and real-time data.',
    color: 'from-[#56CCF2] to-[#2F80ED]',
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: 'eCommerce Stores',
    desc: 'D2C-ready stores with Razorpay, Stripe, and Shiprocket built in.',
    color: 'from-[#FF9966] to-[#FF5E62]',
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: 'UI/UX Design',
    desc: 'Figma-first designs that are both beautiful and conversion-optimized.',
    color: 'from-[#a955ff] to-[#ea51ff]',
  },
];

export function WebDevBanner() {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 bg-black/80 border-t border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00ff9f]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-widest text-[#00ff9f] mb-3 block"
            >
              We Don't Just Teach — We Build
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight"
            >
              Got an Idea?{' '}
              <span className="gradient-text">We Make It Live.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-md lg:text-right"
          >
            From concept to deployment — we build premium websites and web apps
            for businesses, startups, and founders across India.
          </motion.p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-black/60 p-6 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-default"
            >
              {/* Top gradient bar */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${service.color} text-black mb-5`}>
                {service.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-white/10 bg-gradient-to-r from-[#00ff9f]/5 to-[#00e5ff]/5 p-8"
        >
          <div>
            <p className="text-white font-bold text-xl mb-1">
              See our full pricing & portfolio
            </p>
            <p className="text-gray-400 text-sm">
              Transparent rates. Real projects. No fluff.
            </p>
          </div>
          <button
            onClick={() => navigate('/catalog')}
            className="flex-shrink-0 flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-black bg-gradient-to-r from-[#00ff9f] to-[#00e5ff] shadow-[0_0_25px_rgba(0,255,159,0.35)] hover:shadow-[0_0_35px_rgba(0,255,159,0.55)] hover:gap-3 transition-all duration-300 whitespace-nowrap"
          >
            View Catalog <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}