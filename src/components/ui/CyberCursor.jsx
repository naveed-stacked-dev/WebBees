"use client";
import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CyberCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Main logo physics (trailing behind pointer)
  const mainX = useSpring(cursorX, { damping: 25, stiffness: 120, mass: 0.8 });
  const mainY = useSpring(cursorY, { damping: 25, stiffness: 120, mass: 0.8 });

  // Distribute trailing dots with progressively looser springs
  const dot1X = useSpring(cursorX, { damping: 25, stiffness: 90, mass: 1.0 });
  const dot1Y = useSpring(cursorY, { damping: 25, stiffness: 90, mass: 1.0 });

  const dot2X = useSpring(cursorX, { damping: 30, stiffness: 70, mass: 1.2 });
  const dot2Y = useSpring(cursorY, { damping: 30, stiffness: 70, mass: 1.2 });

  const dot3X = useSpring(cursorX, { damping: 35, stiffness: 50, mass: 1.4 });
  const dot3Y = useSpring(cursorY, { damping: 35, stiffness: 50, mass: 1.4 });

  const dot4X = useSpring(cursorX, { damping: 40, stiffness: 30, mass: 1.8 });
  const dot4Y = useSpring(cursorY, { damping: 40, stiffness: 30, mass: 1.8 });

  useEffect(() => {
    const moveCursor = (e) => {
      // Offset by roughly half the size to center the image (32px / 2 = 16)
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  // If mobile/touch device, don't show custom cursor
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Particle Trail */}
      <motion.div
         className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9998] shadow-[0_0_8px_#00ff9f]"
         style={{ x: dot4X, y: dot4Y, translateX: 24, translateY: 24, opacity: 0.2, scale: 0.4 }}
      />
      <motion.div
         className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9998] shadow-[0_0_8px_#00ff9f]"
         style={{ x: dot3X, y: dot3Y, translateX: 20, translateY: 20, opacity: 0.4, scale: 0.6 }}
      />
      <motion.div
         className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9998] shadow-[0_0_8px_#00ff9f]"
         style={{ x: dot2X, y: dot2Y, translateX: 16, translateY: 16, opacity: 0.6, scale: 0.8 }}
      />
      <motion.div
         className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9998] shadow-[0_0_8px_#00ff9f]"
         style={{ x: dot1X, y: dot1Y, translateX: 12, translateY: 12, opacity: 0.8, scale: 1 }}
      />

      {/* Main Logo Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] drop-shadow-[0_0_10px_rgba(0,255,159,0.8)] flex items-center justify-center p-1"
        style={{
          x: mainX,
          y: mainY,
        }}
      >
         <img src="/logo.png" alt="cursor" className="w-full h-full object-contain" />
      </motion.div>
    </>
  );
}
