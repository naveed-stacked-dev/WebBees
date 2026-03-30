import React from 'react';
import { AnimatedRoadmap } from '../ui/animated-roadmap';
import { Button } from '../ui/button';
import { Mail, MapPin, Send } from 'lucide-react';

const contactMilestones = [
  { id: 1, name: "1. Reach Out", status: "complete", position: { top: "80%", left: "5%" } },
  { id: 2, name: "2. Mentorship Call", status: "complete", position: { top: "25%", left: "25%" } },
  { id: 3, name: "3. Build Projects", status: "in-progress", position: { top: "45%", left: "50%" } },
  { id: 4, name: "4. Get Hired", status: "pending", position: { top: "20%", right: "10%" } },
];

export function Contact() {
  return (
    <section id="contact" className="relative min-h-screen py-24 bg-cyber-black">
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center mb-16">
         <h2 className="text-4xl md:text-5xl font-bold mb-4">Start Your <span className="gradient-text">Journey</span></h2>
         <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Get in touch with us to begin your journey towards becoming a top-tier developer.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* Left Side: Roadmap */}
        <div className="flex flex-col justify-center">
           <h3 className="text-2xl font-semibold mb-6 text-white text-center lg:text-left">The WebBees Path</h3>
           <AnimatedRoadmap milestones={contactMilestones} />
        </div>

        {/* Right Side: Form */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-md p-8 rounded-2xl bg-black border border-white/10 shadow-2xl relative">
            {/* Form Glow Underlay */}
            <div className="absolute inset-0 bg-primary/5 blur-[50px] rounded-2xl -z-10 pointer-events-none" />
            
            <h3 className="text-2xl font-semibold mb-6 text-white">Send a Message</h3>
            <form action="https://formsubmit.co/webbees10@gmail.com" method="POST" className="space-y-6">
              <input type="hidden" name="_subject" value="New submission from WebBees Contact Form!" />
              <input type="hidden" name="_captcha" value="false" />
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Your Name</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Enter your name" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Your Email</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="Enter your email" 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Message</label>
                <textarea 
                  rows="4"
                  name="message"
                  required
                  placeholder="I'm interested in the AWS classes..." 
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] resize-none"
                />
              </div>
              
              <Button type="submit" className="w-full py-6 text-lg tracking-wide rounded-lg flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(0,255,159,0.4)] border border-primary/50 relative overflow-hidden bg-gradient-to-r from-primary/80 to-primary text-black font-bold">
                 <span className="relative z-10 flex items-center gap-2">Send Message <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></span>
                 <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-white/10 flex justify-center gap-6">
               <a href="mailto:[webbees10@gmail.com]" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-primary hover:bg-white/10 transition-colors border border-white/5">
                 <Mail className="w-5 h-5" />
               </a>
               <a href="https://goo.gl/maps/ZTVtAUZ7t7HgPijN9" target="_blank" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-secondary hover:bg-white/10 transition-colors border border-white/5">
                 <MapPin className="w-5 h-5" />
               </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
