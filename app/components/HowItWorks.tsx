"use client";

import { useState, useEffect, useCallback } from "react";

export default function HowItWorks() {
  const steps = [
    { number: "1", title: "Message us or walk in" },
    { number: "2", title: "Your food is dished" },
    { number: "3", title: "You eat" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const duration = 3000; // 3 seconds per step

  const goToStep = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex((prevIndex) => (prevIndex + 1) % steps.length);
          return 0;
        }
        return prev + 2; // Increment by 2 for smooth 3-second fill
      });
    }, 60);

    return () => clearInterval(interval);
  }, [isPaused, steps.length]);

  function handleTap(index: number) {
    setIsPaused(true);
    goToStep(index);

    // Resume auto-rotation after 5 seconds of inactivity
    setTimeout(() => setIsPaused(false), 5000);
  }

  return (
    <section className="py-20 md:py-28 bg-[#F0F4F8]">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10 reveal-on-scroll">
          <p className="text-[#666666] text-sm uppercase tracking-widest mb-3">How it works</p>
        </div>

        {/* Steps */}
        <div className="space-y-3 mb-3">
          {steps.map((step, index) => {
            const isActive = activeIndex === index;

            return (
              <button
                key={index}
                onClick={() => handleTap(index)}
                className={`w-full text-left rounded-2xl transition-all duration-500 ease-out overflow-hidden relative ${
                  isActive
                    ? "bg-white shadow-md"
                    : "bg-white/40 hover:bg-white/70 shadow-sm"
                }`}
              >
                <div className="p-4 md:p-5 flex items-center gap-4">
                  {/* Number */}
                  <span
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                      isActive
                        ? "bg-[#8B1E1E] text-white scale-110"
                        : "bg-[#8B1E1E]/10 text-[#8B1E1E]"
                    }`}
                  >
                    {step.number}
                  </span>

                  {/* Text */}
                  <span
                    className={`text-[#2C2C2C] font-medium transition-all duration-500 text-base md:text-lg ${
                      isActive
                        ? "opacity-100 translate-x-0"
                        : "opacity-50 translate-x-1"
                    }`}
                  >
                    {step.title}
                  </span>

                  {/* Active indicator dot on right */}
                  {isActive && (
                    <span className="ml-auto w-2 h-2 rounded-full bg-[#8B1E1E] animate-pulse flex-shrink-0" />
                  )}
                </div>

                {/* Progress bar — only on active step */}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gray-100">
                    <div
                      className="h-full bg-[#8B1E1E] transition-all duration-100 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Hint */}
        <p className="text-center text-[#999] text-xs mt-2">
          {isPaused ? "Tap a step to resume" : "Auto-playing — tap any step to explore"}
        </p>
      </div>
    </section>
  );
}