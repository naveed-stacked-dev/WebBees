import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../ui/card';
import { Target, Zap, Rocket } from 'lucide-react';

const startupData = [
  {
    id: 'problem',
    title: 'The Problem',
    icon: <Target className="w-10 h-10 text-destructive mb-4" />,
    description: "Students lack real-world experience. Traditional education focuses on theory, leaving a massive gap when it comes to shipping production-ready code.",
    delay: 0
  },
  {
    id: 'solution',
    title: 'The Solution',
    icon: <Zap className="w-10 h-10 text-secondary mb-4" />,
    description: "WebBees provides hands-on, project-based mentorship. We simulate real startup environments so you learn to build, deploy, and scale.",
    delay: 0.2
  },
  {
    id: 'impact',
    title: 'The Impact',
    icon: <Rocket className="w-10 h-10 text-primary mb-4" />,
    description: "Industry-ready developers. Our students land top-tier jobs, build their own startups, and contribute meaningfully to the tech ecosystem.",
    delay: 0.4
  }
];

export function Startup() {
  return (
    <section id="startup" className="relative min-h-screen py-24 bg-cyber-black">
      {/* Background Decor */}
      <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-20" />
      <div className="absolute left-1/4 top-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="text-center mb-20"
        >
          <span className="inline-block py-1 px-3 rounded-full border border-secondary/30 bg-secondary/10 text-secondary text-sm font-semibold tracking-wider uppercase mb-4 shadow-[0_0_10px_rgba(0,255,255,0.2)]">WebBees Startup</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Redefining Tech Education</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
             We aren't just teaching code. We are cultivating the next generation of tech innovators through high-impact mentorship.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {startupData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: item.delay }}
              whileHover={{ y: -10 }}
            >
              <Card className="h-full bg-black/50 border-white/5 hover:border-white/20 transition-all duration-300 relative overflow-hidden group">
                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none ${item.id === 'problem' ? 'bg-destructive' : item.id === 'solution' ? 'bg-secondary' : 'bg-primary'}`} />
                
                <CardHeader>
                  <div className="flex justify-center md:justify-start">
                    {item.icon}
                  </div>
                  <CardTitle className="text-2xl mt-2">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-400">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
