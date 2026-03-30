import { cn } from "@/lib/utils";
import { useState } from "react";

export const BluetoothKey = ({ onClick }) => {
  const [checked, setChecked] = useState(false);

  const handleClick = (e) => {
    setChecked(!checked);
    if(onClick) onClick(e);
  };

  return (
    <div className="flex justify-center items-center py-10 scale-75 md:scale-100">
      <label htmlFor="bt-button" className="wrap cursor-pointer group">
        <input 
            id="bt-button" 
            aria-label="Bluetooth" 
            type="checkbox" 
            className="hidden" 
            checked={checked} 
            onChange={handleClick} 
        />
        <div className="button relative w-[200px] h-[200px] flex items-center justify-center bg-black rounded-[40px] border border-white/10 shadow-[inset_0_5px_15px_rgba(255,255,255,0.1)] group-hover:border-primary/50 transition-colors">
          <div className="corner" />
          <div className="inner absolute inset-4 rounded-[30px] flex items-center justify-center bg-gradient-to-b from-gray-900 to-black overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]">
            <svg
              className="w-24 h-24 text-white/20 group-hover:text-primary transition-colors duration-500 delay-100"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 390 430"
              style={{ filter: checked ? 'drop-shadow(0 0 10px rgba(0,255,159,0.8))' : 'none' }}
            >
              <g className="symbol">
                <path
                  d="M202.884 13.3026C196.814 7.84601 188.099 6.46854 180.642 9.78694C173.182 13.1055 168.377 20.4983 168.377 28.6551V164.683L78.6175 75.0327C70.5431 66.9664 57.4523 66.9664 49.3779 75.0327C41.3037 83.0988 41.3037 96.1768 49.3779 104.243L159.813 214.548L49.3787 324.853C41.3045 332.919 41.3045 345.997 49.3787 354.063C57.453 362.129 70.5439 362.129 78.6182 354.063L168.377 264.413V400.441C168.377 408.598 173.182 415.99 180.642 419.309C188.099 422.629 196.814 421.251 202.884 415.794L306.262 322.847C310.618 318.931 313.105 313.35 313.105 307.495C313.105 301.639 310.618 296.06 306.262 292.142L219.958 214.548L306.262 136.954C310.618 133.037 313.105 127.457 313.105 121.602C313.105 115.746 310.618 110.166 306.262 106.249L202.884 13.3026ZM261.524 307.495L209.728 260.926V354.063L261.524 307.495ZM261.524 121.602L209.728 168.171V75.0327L261.524 121.602Z"
                  fill="currentColor"
                  clipRule="evenodd"
                  fillRule="evenodd"
                />
                <circle r={30} cy={215} cx={343} fill="currentColor" />
                <circle r={30} cy={215} cx={46} fill="currentColor" />
              </g>
            </svg>
          </div>
          
          {/* LED Indicator */}
          <div className={cn("absolute top-6 right-6 w-3 h-3 rounded-full transition-all duration-300", checked ? "bg-primary shadow-[0_0_15px_#00ff9f]" : "bg-gray-800 shadow-none")} />
        </div>
      </label>
      
      {/* Label Text */}
      <div className="absolute mt-[220px] text-center pointer-events-none">
        <p className="text-secondary font-mono tracking-widest text-sm uppercase opacity-70">Initialize Dashboard</p>
      </div>
    </div>
  );
};
