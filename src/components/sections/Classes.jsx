import React from 'react';
import { motion } from 'framer-motion';
import { Marquee } from '../ui/marquee';
import { Button } from '../ui/button';

const classesList = [
  { title: "MERN Stack", level: "Beginner to Pro", desc: "Master MongoDB, Express, React, and Node.js.", color: "from-green-500 to-emerald-700" },
  { title: "React.js", level: "Intermediate", desc: "Advanced conceptual deep dive into React ecosystem.", color: "from-blue-400 to-indigo-600" },
  { title: "JavaScript", level: "Beginner", desc: "The foundational language of the web built from scratch.", color: "from-yellow-400 to-orange-500" },
  { title: "Java DSA", level: "Advanced", desc: "Data Structures & Algorithms optimized for interviews.", color: "from-red-500 to-rose-700" },
  { title: "Cloud Computing", level: "Intermediate", desc: "AWS, Docker, CI/CD, and scaling architecture.", color: "from-sky-400 to-cyan-600" },
  { title: "Hosting & SEO", level: "All Levels", desc: "Deploy your sites and rank them on Google.", color: "from-purple-500 to-fuchsia-700" },
  { title: "Graphic Designing", level: "Beginner", desc: "UI/UX, Figma, Adobe Suite fundamentals.", color: "from-pink-500 to-rose-500" },
  { title: "Prompt Engineering", level: "All Levels", desc: "Master AI workflows and maximize productivity.", color: "from-teal-400 to-emerald-500" },
];

export function Classes() {
  return (
    <section id="classes" className="relative min-h-screen py-24 bg-cyber-black overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,159,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="gradient-text">Masterclasses</span></h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Intensive, mentor-led programs designed to rapidly accelerate your career.
        </p>
      </div>

      {/* Marquee Row 1 */}
      <div className="w-full relative z-10 pb-8">
        <Marquee speed="slow" pauseOnHover className="py-4">
          {classesList.slice(0, 4).map((c, i) => (
            <div key={i} className={`relative overflow-hidden group w-[350px] p-6 rounded-2xl bg-black border border-white/10 hover:border-white/30 transition-all`}>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${c.color}`} />
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-xl font-bold text-white">{c.title}</h3>
                 <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-gray-300">{c.level}</span>
              </div>
              <p className="text-muted-foreground text-sm mb-6">{c.desc}</p>
              {/* <Button className="w-full bg-white/5 hover:bg-white/20 text-white border-white/10 shadow-none">Join Now</Button> */}
            </div>
          ))}
        </Marquee>
      </div>

      {/* Marquee Row 2 (Reverse) */}
      <div className="w-full relative z-10 pb-16">
        <Marquee speed="slow" reverse pauseOnHover className="py-4">
          {classesList.slice(4, 8).map((c, i) => (
            <div key={i} className={`relative overflow-hidden group w-[350px] p-6 rounded-2xl bg-black border border-white/10 hover:border-white/30 transition-all`}>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${c.color}`} />
              <div className="flex justify-between items-start mb-4">
                 <h3 className="text-xl font-bold text-white">{c.title}</h3>
                 <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-gray-300">{c.level}</span>
              </div>
              <p className="text-muted-foreground text-sm mb-6">{c.desc}</p>
              {/* <Button className="w-full bg-white/5 hover:bg-white/20 text-white border-white/10 shadow-none">Join Now</Button> */}
            </div>
          ))}
        </Marquee>
      </div>

      {/* Fade overlays for marquee */}
      <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-cyber-black to-transparent pointer-events-none z-20" />
      <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-cyber-black to-transparent pointer-events-none z-20" />
    </section>
  );
}
