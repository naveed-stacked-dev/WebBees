import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

// Programmatically generate 25 gallery items based on the assets
const galleryItems = Array.from({ length: 25 }, (_, i) => {
    const id = i + 1;    
    return {
        id,
        url: `/classes-images/${id}.jpg`,
        title: `Session ${id}`,
        desc: `High-intensity development and collaborative learning from our WebBees curriculum.`
    };
});

export function PreviousClasses() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const itemsPerPage = 8;
  const maxIndex = Math.ceil(galleryItems.length / itemsPerPage) - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="gallery" className="relative min-h-screen py-24 flex flex-col justify-center bg-black/40 border-t border-white/5 overflow-hidden">
       {/* Ambient Glow */}
       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

       <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
             <div>
                <motion.h2 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-secondary mb-2 pb-2 leading-tight w-full inline-block"
                >
                   Previous Classes
                </motion.h2>
                <div className="w-24 h-[1px] bg-gradient-to-r from-primary to-transparent mb-4" />
                {/* <motion.p 
                   initial={{ opacity: 0, x: -20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.1 }}
                   className="text-gray-400 max-w-2xl text-xs md:text-sm leading-relaxed"
                >
                   Explore our intensive sessions, hackathons, and the vibrant WebBees community. 
                   We are showing 25 curated snapshots of our journey toward tech excellence.
                </motion.p> */}
             </div>
             
             <div className="flex items-center gap-4">
                <button 
                   onClick={prevSlide}
                   className="p-2 sm:p-3 rounded-full border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-all group"
                >
                   <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
                <button 
                   onClick={nextSlide}
                   className="p-2 sm:p-3 rounded-full border border-white/10 bg-white/5 hover:bg-secondary/20 hover:border-secondary/50 transition-all group"
                >
                   <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" />
                </button>
             </div>
          </div>

          <div className="relative overflow-hidden min-h-[450px]">
             <AnimatePresence mode="wait">
                <motion.div 
                   key={currentIndex}
                   initial={{ opacity: 0, x: 100 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -100 }}
                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
                   className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                >
                   {galleryItems.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage).map((item, idx) => (
                      <motion.div 
                         key={item.id}
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: idx * 0.05 }}
                         onClick={() => setSelectedImage(item)}
                         className="group relative h-40 sm:h-52 rounded-xl overflow-hidden border border-white/10 bg-gray-900/40 cursor-pointer"
                      >
                         <img 
                            src={item.url} 
                            alt={item.title} 
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                         />
                         
                         {/* Hover Overlay */}
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
                            <div className="flex items-center justify-between mb-1">
                               <h3 className="text-primary font-bold tracking-wider text-[10px] sm:text-xs uppercase">{item.title}</h3>
                               <Maximize2 className="w-3 h-3 text-white/50" />
                            </div>
                         </div>
                         
                         {/* Scanners */}
                         <div className="absolute top-0 left-0 w-full h-[1px] bg-primary/20 -translate-y-full group-hover:animate-[scan_2s_linear_infinite]" />
                      </motion.div>
                   ))}
                </motion.div>
             </AnimatePresence>
          </div>

          {/* Pagination Indicators */}
          <div className="flex justify-center gap-2 mt-8">
             {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button 
                   key={i}
                   onClick={() => setCurrentIndex(i)}
                   className={`h-1 rounded-full transition-all duration-500 ${currentIndex === i ? 'w-12 bg-primary shadow-[0_0_10px_#00ff9f]' : 'w-4 bg-white/10 hover:bg-white/20'}`}
                />
             ))}
          </div>
       </div>

       {/* Lightbox Modal */}
       <AnimatePresence>
          {selectedImage && (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-12 cursor-zoom-out"
             >
                <motion.div 
                   initial={{ scale: 0.9, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   exit={{ scale: 0.9, opacity: 0 }}
                   onClick={(e) => e.stopPropagation()}
                   className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                >
                   <img src={selectedImage.url} alt={selectedImage.title} className="w-full h-full object-contain bg-black" />
                   <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
                      <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">{selectedImage.title}</h2>
                      <p className="text-white/60 text-xs sm:text-base max-w-2xl">{selectedImage.desc}</p>
                   </div>
                   <button 
                     onClick={() => setSelectedImage(null)}
                     className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
                   >
                      <ChevronRight className="w-6 h-6 text-white rotate-45" />
                   </button>
                </motion.div>
             </motion.div>
          )}
       </AnimatePresence>
    </section>
  );
}
