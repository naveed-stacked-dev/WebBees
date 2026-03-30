"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react';

const MediaItem = ({ item, className, onClick }) => {
    const videoRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);

    useEffect(() => {
        const options = { root: null, rootMargin: '50px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting);
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }
        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    useEffect(() => {
        let mounted = true;
        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return;
            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play();
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) {
                            videoRef.current.oncanplay = resolve;
                        }
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await videoRef.current.play();
                    }
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };

        if (isInView) {
            handleVideoPlay();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }

        return () => {
            mounted = false;
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [isInView]);

    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden`}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    style={{
                        opacity: isBuffering ? 0.8 : 1,
                        transition: 'opacity 0.2s',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <img
            src={item.url}
            alt={item.title}
            className={`${className} object-cover cursor-pointer hover:scale-105 transition-transform duration-500`}
            onClick={onClick}
            loading="lazy"
            decoding="async"
        />
    );
};

const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

    if (!isOpen) return null;

    return (
        <>
            <motion.div
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="fixed inset-0 w-full min-h-screen sm:h-[90vh] md:h-[600px] backdrop-blur-lg rounded-none sm:rounded-lg md:rounded-xl overflow-hidden z-[100] flex items-center justify-center bg-black/80"
            >
                <div className="h-full w-full flex flex-col pt-12">
                    <div className="flex-1 p-2 sm:p-3 md:p-4 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedItem.id}
                                className="relative w-full aspect-[16/9] max-w-[95%] sm:max-w-[85%] md:max-w-4xl h-auto max-h-[80vh] rounded-lg overflow-hidden shadow-2xl border border-white/10"
                                initial={{ y: 20, scale: 0.97 }}
                                animate={{ y: 0, scale: 1, transition: { type: "spring", stiffness: 500, damping: 30, mass: 0.5 } }}
                                exit={{ y: 20, scale: 0.97, transition: { duration: 0.15 } }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <MediaItem item={selectedItem} className="w-full h-full object-contain bg-black/50" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent pointer-events-none">
                                    <h3 className="text-white text-xl font-bold">{selectedItem.title}</h3>
                                    <p className="text-primary text-sm mt-1">{selectedItem.desc}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <motion.button
                    className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-primary transition-colors backdrop-blur-md z-50 border border-white/10"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X className='w-5 h-5' />
                </motion.button>
            </motion.div>

            <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.1}
                initial={false}
                animate={{ x: dockPosition.x, y: dockPosition.y }}
                onDragEnd={(_, info) => setDockPosition(prev => ({ x: prev.x + info.offset.x, y: prev.y + info.offset.y }))}
                className="fixed z-[110] left-1/2 bottom-8 -translate-x-1/2 touch-none"
            >
                <motion.div className="relative rounded-2xl bg-black/60 backdrop-blur-xl border border-primary/30 shadow-[0_0_20px_rgba(0,255,159,0.2)] cursor-grab active:cursor-grabbing p-1">
                    <div className="flex items-center space-x-2 px-3 py-2">
                        {mediaItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onClick={(e) => { e.stopPropagation(); setSelectedItem(item); }}
                                style={{ zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index }}
                                className={`relative group w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer hover:z-20 border ${selectedItem.id === item.id ? 'border-primary shadow-[0_0_10px_rgba(0,255,159,0.5)]' : 'border-white/10 hover:border-primary/50'}`}
                                initial={{ rotate: index % 2 === 0 ? -10 : 10 }}
                                animate={{
                                    scale: selectedItem.id === item.id ? 1.2 : 1,
                                    rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -10 : 10,
                                    y: selectedItem.id === item.id ? -8 : 0,
                                }}
                                whileHover={{ scale: 1.3, rotate: 0, y: -10, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                            >
                                <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/20 pointer-events-none" />
                                {selectedItem.id === item.id && (
                                    <motion.div
                                        layoutId="activeGlow"
                                        className="absolute -inset-2 bg-primary/20 blur-xl pointer-events-none"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

export function InteractiveBentoGallery({ mediaItems, title, description }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, setItems] = useState(mediaItems);
    const [isDragging, setIsDragging] = useState(false);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedItem]);

    return (
        <div className="w-full">
            <div className="mb-12 text-center">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {title}
                </motion.h2>
                <motion.p
                    className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {description}
                </motion.p>
            </div>
            <AnimatePresence mode="wait">
                {selectedItem ? (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={items}
                    />
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[250px]"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                    >
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layoutId={`media-${item.id}`}
                                className={`relative overflow-hidden rounded-2xl cursor-pointer group border border-white/5 hover:border-primary/50 transition-colors shadow-lg ${item.span}`}
                                onClick={() => !isDragging && setSelectedItem(item)}
                                variants={{
                                    hidden: { y: 50, scale: 0.9, opacity: 0 },
                                    visible: { y: 0, scale: 1, opacity: 1, transition: { type: "spring", stiffness: 350, damping: 25, delay: index * 0.05 } }
                                }}
                                whileHover={{ scale: 1.02, zIndex: 10 }}
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                dragElastic={1}
                                onDragStart={() => setIsDragging(true)}
                                onDragEnd={(e, info) => {
                                    setIsDragging(false);
                                    const moveDistance = info.offset.x + info.offset.y;
                                    if (Math.abs(moveDistance) > 50) {
                                        const newItems = [...items];
                                        const draggedItem = newItems[index];
                                        const targetIndex = moveDistance > 0 ? Math.min(index + 1, items.length - 1) : Math.max(index - 0, 0); // Simplified swap
                                        newItems.splice(index, 1);
                                        newItems.splice(targetIndex, 0, draggedItem);
                                        setItems(newItems);
                                    }
                                }}
                            >
                                <MediaItem item={item} className="absolute inset-0 w-full h-full" onClick={() => !isDragging && setSelectedItem(item)} />
                                <motion.div
                                    className="absolute inset-x-0 bottom-0 p-4 pt-12"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileHover={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent -z-10" />
                                    <h3 className="text-white text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h3>
                                    <p className="text-gray-300 text-sm mt-1 line-clamp-2">{item.desc}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
