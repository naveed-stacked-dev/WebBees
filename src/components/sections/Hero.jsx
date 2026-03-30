import React from 'react';
import { motion } from 'framer-motion';
import { BackgroundScene } from '../ui/aurora-section-hero';
import { Button } from '../ui/button';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Local Background Beams for Hero */}
      <BackgroundScene beamCount={40} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block px-4 py-1.5 mb-6 text-sm rounded-full border border-primary/30 bg-black/50 backdrop-blur-sm text-primary shadow-[0_0_15px_rgba(0,255,159,0.3)]"
        >
          Mentorship & Tech Education
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-tight"
        >
          The Future of <br className="hidden md:block" />
          <span className="gradient-text">Learning Tech</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
        >
          Empowering students through mentorship, real-world projects, and guided learning. Elevate your tech career to the next level.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button size="lg" className="px-8 py-6 text-lg font-bold rounded-xl" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Projects
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-bold rounded-xl bg-black/50 backdrop-blur-sm" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Join Classes
          </Button>
        </motion.div>
      </div>

       {/* Decorative gradient orb */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10" />
    </section>
  );
}
