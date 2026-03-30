import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const SciFiButton = ({ icon: Icon, label, onClick, className }) => {
  const [checked, setChecked] = useState(false);

  const handleClick = (e) => {
    setChecked(true);
    setTimeout(() => setChecked(false), 500); // Release button check state
    if(onClick) onClick(e);
  };

  return (
    <div className={cn("flex flex-col justify-center items-center py-4 scale-75 md:scale-100", className)}>
      <label className="wrap cursor-pointer group relative">
        <input 
            aria-label={label} 
            type="button" 
            className="hidden" 
            onClick={handleClick}
        />
        <div className="button relative w-[200px] h-[200px] flex items-center justify-center bg-black rounded-[40px] border border-white/10 shadow-[inset_0_5px_15px_rgba(255,255,255,0.1)] group-hover:border-primary/50 transition-colors">
          <div className="corner" />
          <div className="inner absolute inset-4 rounded-[30px] flex items-center justify-center bg-gradient-to-b from-gray-900 to-black overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]">
            <Icon
              className="w-16 h-16 text-white/20 group-hover:text-primary transition-colors duration-500 delay-100"
              style={{ filter: checked ? 'drop-shadow(0 0 10px rgba(0,255,159,0.8))' : 'none' }}
              strokeWidth={1}
            />
          </div>
          
          {/* LED Indicator */}
          <div className={cn("absolute top-6 right-6 w-3 h-3 rounded-full transition-all duration-300", checked ? "bg-primary shadow-[0_0_15px_#00ff9f]" : "bg-gray-800 shadow-none")} />
        </div>
      </label>
      
      {/* Label Text */}
      <div className="mt-8 text-center">
        <p className="text-secondary font-mono tracking-widest text-sm uppercase opacity-70 group-hover:opacity-100 transition-opacity">{label}</p>
      </div>
    </div>
  );
};
