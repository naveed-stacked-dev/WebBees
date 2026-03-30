import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const MilestoneMarker = ({ milestone }) => {
  const statusClasses = {
    complete: "bg-primary border-primary",
    "in-progress": "bg-secondary border-secondary animate-pulse",
    pending: "bg-muted border-border",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: milestone.id * 0.3, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.8 }}
      className="absolute flex flex-col md:flex-row items-start md:items-center gap-4"
      style={milestone.position}
    >
      <div className="relative flex h-8 w-8 items-center justify-center">
        <div className={cn("absolute h-4 w-4 rounded-full border-2", statusClasses[milestone.status])} />
        <div className="absolute h-full w-full rounded-full bg-primary/20 blur-[4px]" />
      </div>
      <div className="rounded-xl border border-white/10 bg-black/80 px-4 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-md whitespace-nowrap">
        {milestone.name}
      </div>
    </motion.div>
  );
};

const AnimatedRoadmap = React.forwardRef(({ className, milestones, mapImageSrc, ...props }, ref) => {
  const targetRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useTransform(scrollYProgress, [0.15, 0.7], [0, 1]);

  return (
    <div ref={targetRef} className={cn("relative w-full max-w-2xl mx-auto py-12", className)} {...props}>
      {mapImageSrc && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="absolute inset-0 top-10 pointer-events-none opacity-30"
        >
          <img src={mapImageSrc} alt="Map" className="h-full w-full object-contain" />
        </motion.div>
      )}

      <div className="relative h-[300px] md:h-[400px]">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 800 400"
          preserveAspectRatio="none"
          className="absolute top-0 left-0"
        >
          <motion.path
            d="M 50 350 Q 200 50 400 200 T 750 100"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeDasharray="10 5"
            strokeLinecap="round"
            style={{ pathLength }}
          />
        </svg>

        {milestones.map((milestone) => (
          <MilestoneMarker key={milestone.id} milestone={milestone} />
        ))}
      </div>
    </div>
  );
});

AnimatedRoadmap.displayName = "AnimatedRoadmap";
export { AnimatedRoadmap };
