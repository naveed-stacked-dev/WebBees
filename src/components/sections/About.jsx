import React from 'react';
import { motion } from 'framer-motion';
import { InteractiveRobotSpline } from '../ui/interactive-3d-robot';

export function About() {
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  return (
    <section id="about" className="relative min-h-screen py-20 overflow-hidden bg-black/40 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-between gap-12 pt-10">
        
        {/* Left Side: Text / Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-2">About WebBees</h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">Building the <span className="gradient-text">Future</span> of Developers</h3>
            
            <p className="text-lg text-muted-foreground mb-4">
              I am Syed Naveedullah, a passionate developer and mentor. WebBees is not just a platform; it's a movement to bridge the gap between traditional education and industry requirements.
            </p>
            <p className="text-lg text-muted-foreground">
              Our mission is to make students industry-ready by providing hands-on mentorship, real-world project experience, and a supportive community of aspiring tech leaders.
            </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.3 }}
             className="grid grid-cols-2 gap-4"
          >
             <div className="glass-card p-6 rounded-xl">
                <h4 className="text-3xl font-bold text-primary mb-2">100+</h4>
                <p className="text-sm text-muted-foreground">Students Mentored</p>
             </div>
             <div className="glass-card p-6 rounded-xl">
                <h4 className="text-3xl font-bold text-secondary mb-2">50+</h4>
                <p className="text-sm text-muted-foreground">Projects Shipped</p>
             </div>
          </motion.div>
        </div>

        {/* Right Side: 3D Robot Spline */}
        <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full h-full relative"
          >
             <InteractiveRobotSpline scene={ROBOT_SCENE_URL} className="w-full h-full" />
             {/* Gradient fade to blend Spline edges */}
             <div className="absolute inset-0 ring-1 ring-inset ring-transparent shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none rounded-3xl" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
