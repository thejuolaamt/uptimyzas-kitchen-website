"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function ProgressBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timers
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    // Start loading
    setLoading(true);
    setWidth(0);

    // Realistic progress: fast start, slow middle, pause near end
    let progress = 0;
    intervalRef.current = setInterval(() => {
      progress += Math.random() * 15 + 5;
      if (progress > 90) {
        progress = 90;
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      setWidth(progress);
    }, 200);

    // Mark as complete when page actually renders
    timeoutRef.current = setTimeout(() => {
      setWidth(100);
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }, 800);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <>
      {/* Dimmed background overlay */}
      <div className="fixed inset-0 z-[190] bg-white/50 backdrop-blur-sm transition-opacity duration-200" />

      {/* Centered loader */}
      <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
        <div className="w-56 md:w-64 flex flex-col items-center gap-3">
          {/* Progress bar */}
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8B1E1E] rounded-full transition-all duration-150 ease-out"
              style={{ width: `${width}%` }}
            />
          </div>

          {/* Brand text */}
          <p className="text-[#8B1E1E] text-xs font-medium tracking-wider uppercase">
            Uptimyzas Kitchen
          </p>
        </div>
      </div>
    </>
  );
}