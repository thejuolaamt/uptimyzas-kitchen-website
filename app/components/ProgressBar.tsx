"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProgressBar() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let progressTimer: NodeJS.Timeout;

    function startLoading() {
      setLoading(true);
      setProgress(0);

      progressTimer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 85) {
            clearInterval(progressTimer);
            return 85;
          }
          const increment = Math.max(1, (85 - prev) / 10);
          return Math.min(85, prev + increment);
        });
      }, 150);
    }

    function finishLoading() {
      clearInterval(progressTimer);
      setProgress(100);
      timer = setTimeout(() => {
        setLoading(false);
      }, 400);
    }

    startLoading();
    finishLoading();

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <>
      <div className="fixed inset-0 z-[190] bg-white/60 backdrop-blur-sm transition-opacity duration-300" />
      <div className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none">
        <div className="w-56 md:w-64 flex flex-col items-center gap-3">
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8B1E1E] rounded-full transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[#8B1E1E] text-xs font-medium tracking-wider uppercase animate-pulse">
            Uptimyzas Kitchen
          </p>
        </div>
      </div>
    </>
  );
}