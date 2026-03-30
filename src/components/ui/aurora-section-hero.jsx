import React, { useState, useEffect } from 'react';

export function BackgroundScene({ beamCount = 20 }) {
  const [beams, setBeams] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: beamCount }).map((_, i) => {
      const riseDur = Math.random() * 2 + 4;
      const fadeDur = riseDur;

      return {
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.floor(Math.random() * 2) + 1}px`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${riseDur}s, ${fadeDur}s`,
          backgroundColor: 'rgba(0, 255, 159, 0.4)',
          position: 'absolute',
          bottom: '0',
          height: '100%',
          opacity: '0',
          animationName: 'rise, fade',
          willChange: 'transform, opacity',
        },
      };
    });
    setBeams(generated);
  }, [beamCount]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" role="img" aria-label="Animated digital data background">
      <div 
        className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none opacity-80"
        style={{ animation: 'floorGlow 5s infinite' }}
      />
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {beams.map((beam) => (
          <div key={beam.id} style={beam.style} />
        ))}
      </div>
      <div 
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"
        style={{ animation: 'moveGrid 10s linear infinite' }}
      />
    </div>
  );
}
