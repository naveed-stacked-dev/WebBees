import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { Badge } from '../ui/badge';

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A scalable online store built with React, Node.js, and Stripe integration.',
    tags: ['React', 'Node.js', 'Stripe'],
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80'
  },
  {
    title: 'AI Content Generator',
    description: 'Leveraging OpenAI to generate marketing copy for businesses automatically.',
    tags: ['Next.js', 'OpenAI', 'Tailwind', "LLM"],
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80'
  },
  {
    title: 'FinTech Dashboard',
    description: 'A real-time analytics dashboard for a B2B software-as-a-service product.',
    tags: ['React', 'Chart.js', 'Firebase', "Trading View"],
    github: '#',
    demo: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'
  }
];

export function Projects() {
  return (
    <section id="projects" className="relative min-h-screen py-24 bg-black/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">Featured <span className="gradient-text">Projects</span></h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Real-world applications built by our mentors and top students. Explore the code and live demos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="glass-card rounded-2xl overflow-hidden group flex flex-col h-full relative"
            >
              {/* Overlay reveal effect */}
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 mix-blend-overlay" />
              
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-300 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>

              <div className="p-6 flex flex-col flex-1 relative z-20">
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-muted-foreground mb-6 flex-1">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="bg-white/10 text-gray-300 border-none hover:bg-white/20">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <a href={project.github} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <FaGithub className="w-4 h-4" /> Code
                  </a>
                  <a href={project.demo} className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
