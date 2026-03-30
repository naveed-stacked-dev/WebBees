import React from 'react';

export function Footer() {
  return (
    <footer className="w-full bg-cyber-black pt-20 pb-10 border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 shadow-[0_0_20px_var(--color-primary)]"></div>
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start">
          <a href="#home" className="text-3xl font-bold tracking-tighter flex items-center gap-2 mb-2">
            <span className="text-white">Web</span>
            <span className="gradient-text">Bees</span>
          </a>
          <p className="text-muted-foreground text-sm">Empowering students through tech.</p>
        </div>

        <div className="flex gap-6">
          <a href="https://github.com/naveed-stacked-dev" target="_blank" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a>
          <a href="#" target="_blank" className="text-muted-foreground hover:text-secondary transition-colors">LinkedIn</a>
          <a href="#" target="_blank" className="text-muted-foreground hover:text-accent transition-colors">Instagram</a>
        </div>
      </div>
      
      <div className="mt-12 text-center text-xs text-muted-foreground/60">
        &copy; {new Date().getFullYear()} WebBees Platform. Built for the future.
      </div>
    </footer>
  );
}
