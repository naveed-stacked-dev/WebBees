import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

export function InteractiveRobotSpline({ scene, className }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true); // Once loaded, keep it
        }
      },
      { rootMargin: '200px', threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasLoaded]);

  return (
    <div ref={containerRef} className={`w-full h-full ${className || ''}`}>
      {isVisible ? (
        <Suspense
          fallback={
            <div className={`w-full h-full flex items-center justify-center bg-transparent`}>
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          <Spline scene={scene} className={className} />
        </Suspense>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-transparent">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
