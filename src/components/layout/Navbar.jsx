import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { IoHomeOutline, IoInformationCircleOutline, IoRocketOutline, IoCodeSlashOutline, IoSchoolOutline, IoMailOutline, IoCloseOutline, IoMenuOutline } from 'react-icons/io5';

const menuItems = [
  { title: 'Home', href: '#home', icon: <IoHomeOutline />, gradientFrom: '#00ff9f', gradientTo: '#00ffff' },
  { title: 'About', href: '#about', icon: <IoInformationCircleOutline />, gradientFrom: '#56CCF2', gradientTo: '#2F80ED' },
  { title: 'Classes', href: '#classes', icon: <IoRocketOutline />, gradientFrom: '#FF9966', gradientTo: '#FF5E62' },
  { title: 'Projects', href: '#projects', icon: <IoCodeSlashOutline />, gradientFrom: '#80FF72', gradientTo: '#7EE8FA' },
  { title: 'Gallery', href: '#gallery', icon: <IoSchoolOutline />, gradientFrom: '#ffa9c6', gradientTo: '#f434e2' },
  { title: 'Contact', href: '#contact', icon: <IoMailOutline />, gradientFrom: '#a955ff', gradientTo: '#ea51ff' }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || isMobileMenuOpen ? 'bg-black/90 backdrop-blur-lg border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo and Text */}
        <a href="#home" className="flex items-center gap-3 group" onClick={() => setIsMobileMenuOpen(false)}>
          <img src="/logo.png" alt="WebBees Logo" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(0,255,159,0.8)]" />
          <div className="text-2xl font-black tracking-tighter">
            <span className="text-white drop-shadow-md">Web</span>
            <span className="gradient-text">Bees</span>
          </div>
        </a>

        {/* Gradient Menu (nav.txt style) */}
        <div className="hidden md:flex items-center">
          <ul className="flex gap-4 lg:gap-6">
            {menuItems.map(({ title, href, icon, gradientFrom, gradientTo }, idx) => (
              <li
                key={idx}
                style={{ '--gradient-from': gradientFrom, '--gradient-to': gradientTo }}
                className="relative w-12 h-12 bg-black/50 border border-white/10 shadow-lg rounded-full flex items-center justify-center transition-all duration-500 hover:w-[120px] hover:border-transparent group cursor-pointer"
              >
                <a href={href} className="w-full h-full flex items-center justify-center absolute inset-0 z-20">
                    {/* click target overlay */}
                    <span className="opacity-0">.</span>
                </a>
                {/* Gradient background on hover */}
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-screen pointer-events-none"></span>
                {/* Blur glow */}
                <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-0 -z-10 transition-opacity duration-500 group-hover:opacity-60 pointer-events-none"></span>

                {/* Icon */}
                <span className="relative z-10 transition-transform duration-500 group-hover:scale-0 delay-0 pointer-events-none text-white">
                  <span className="text-xl">{icon}</span>
                </span>

                {/* Title */}
                <span className="absolute top-[14px] font-bold text-black uppercase tracking-wide text-xs transition-transform duration-500 scale-0 group-hover:scale-100 delay-150 pointer-events-none z-10">
                  {title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white hover:text-primary transition-colors focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
           {isMobileMenuOpen ? <IoCloseOutline className="w-8 h-8" /> : <IoMenuOutline className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-4">
              {menuItems.map(({ title, href, icon, gradientFrom, gradientTo }, idx) => (
                <li key={idx}>
                  <a 
                    href={href} 
                    className="flex items-center gap-4 text-white hover:text-primary transition-colors p-2 rounded-lg hover:bg-white/5"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span 
                      className="text-2xl p-2 rounded-lg"
                      style={{ 
                        background: `linear-gradient(45deg, ${gradientFrom}30, ${gradientTo}30)`,
                        color: gradientFrom 
                      }}
                    >
                      {icon}
                    </span>
                    <span className="font-bold tracking-wide uppercase">{title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
