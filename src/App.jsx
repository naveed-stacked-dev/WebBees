import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AuroraBackground } from './components/ui/aurora-background';
import { CyberCursor } from './components/ui/CyberCursor';
import { SciFiButton } from './components/ui/scifi-button';
import { Dashboard } from './components/pages/Dashboard';

import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Startup } from './components/sections/Startup';
import { Projects } from './components/sections/Projects';
import { Classes } from './components/sections/Classes';
import { PreviousClasses } from './components/sections/PreviousClasses';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';

import { UserCircle, Server } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-cyber-black text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary">
      {/* Global Background */}
      <AuroraBackground />
      
      {/* Navigation */}
      <Navbar />

      <main>
        <Hero />
        <About />
        <Startup />
        <Projects />
        
        {/* Dual Actions */}
        <section className="relative z-10 py-16 flex flex-col md:flex-row items-center justify-center gap-12 border-t border-b border-white/5 bg-black/40">
           <SciFiButton 
              icon={UserCircle} 
              label="Dev Profile" 
              onClick={() => window.open('https://naveedstackeddev.netlify.app/', '_blank')} 
           />
           <SciFiButton 
              icon={Server} 
              label="System Dash" 
              onClick={() => window.open('/dashboard', '_blank')} 
           />
        </section>

        <Classes />
        <PreviousClasses />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <>
      {/* Custom Cursor is constant across routes */}
      <CyberCursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard onBack={() => {
            if (window.history.length > 2) {
               window.history.back();
            } else {
               window.location.href = '/';
            }
        }} />} />
      </Routes>
    </>
  );
}

export default App;
