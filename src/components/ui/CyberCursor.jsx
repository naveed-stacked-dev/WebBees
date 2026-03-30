"use client";
import React, { useEffect, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CyberCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Reduced trailing dots from 4 to 2 for better performance
  const mainX = useSpring(cursorX, { damping: 25, stiffness: 120, mass: 0.8 });
  const mainY = useSpring(cursorY, { damping: 25, stiffness: 120, mass: 0.8 });

  const dot1X = useSpring(cursorX, { damping: 30, stiffness: 70, mass: 1.2 });
  const dot1Y = useSpring(cursorY, { damping: 30, stiffness: 70, mass: 1.2 });

  const dot2X = useSpring(cursorX, { damping: 40, stiffness: 30, mass: 1.8 });
  const dot2Y = useSpring(cursorY, { damping: 40, stiffness: 30, mass: 1.8 });

  useEffect(() => {
    // Throttle mouse movement updates to ~60fps
    let rafId = null;
    const moveCursor = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX - 16);
        cursorY.set(e.clientY - 16);
        rafId = null;
      });
    };
    window.addEventListener("mousemove", moveCursor, { passive: true });
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [cursorX, cursorY]);

  // If mobile/touch device, don't show custom cursor
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Reduced trail: 2 dots instead of 4 */}
      <motion.div
         className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9998]"
         style={{ x: dot2X, y: dot2Y, translateX: 24, translateY: 24, opacity: 0.3, scale: 0.5 }}
      />
      <motion.div
         className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9998]"
         style={{ x: dot1X, y: dot1Y, translateX: 16, translateY: 16, opacity: 0.6, scale: 0.8 }}
      />

      {/* Main Logo Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] flex items-center justify-center p-1"
        style={{
          x: mainX,
          y: mainY,
          filter: 'drop-shadow(0 0 6px rgba(0,255,159,0.6))',
        }}
      >
         <img src="/logo.png" alt="cursor" className="w-full h-full object-contain" />
      </motion.div>
    </>
  );
}
