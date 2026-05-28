"use client";

import { useState, useEffect, useCallback } from "react";

export default function Hero() {
  const slides = [
    {
      title: "Welcome to Uptimyzas Kitchen",
      subtitle: "We are ready to serve you.",
    },
    {
      title: "Your food is ready.",
      subtitle: "Come pick it up or we'll get it to you.",
    },
    {
      title: "Everyday Energy — Refuel Here",
      subtitle: "Get your day going with Uptimyzas Kitchen.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  return (
    <>
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center bg-white overflow-hidden">
        {/* Foodie background texture */}
        <div className="absolute inset-0 z-0 opacity-[0.04]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="foodPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <ellipse cx="30" cy="90" rx="22" ry="10" fill="#8B1E1E" />
                <ellipse cx="30" cy="82" rx="18" ry="7" fill="#8B1E1E" />
                <path d="M22 75 Q20 65 24 58" stroke="#8B1E1E" strokeWidth="1.5" fill="none" />
                <path d="M30 73 Q32 62 28 54" stroke="#8B1E1E" strokeWidth="1.5" fill="none" />
                <path d="M38 75 Q36 65 40 58" stroke="#8B1E1E" strokeWidth="1.5" fill="none" />
                <line x1="90" y1="30" x2="90" y2="80" stroke="#8B1E1E" strokeWidth="1.5" />
                <line x1="86" y1="30" x2="86" y2="45" stroke="#8B1E1E" strokeWidth="1.5" />
                <line x1="90" y1="30" x2="90" y2="45" stroke="#8B1E1E" strokeWidth="1.5" />
                <line x1="94" y1="30" x2="94" y2="45" stroke="#8B1E1E" strokeWidth="1.5" />
                <line x1="70" y1="55" x2="70" y2="85" stroke="#8B1E1E" strokeWidth="1.5" />
                <ellipse cx="70" cy="88" rx="5" ry="4" fill="#8B1E1E" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#foodPattern)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto pb-16 w-full">
          {/* Slides */}
          <div className="relative overflow-hidden mb-10">
            <div
              className="transition-all duration-700 ease-in-out"
              key={activeIndex}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-[#2C2C2C] mb-4 leading-[1.1] tracking-tight animate-fadeSlideIn">
                {slides[activeIndex].title}
              </h1>
              <p className="text-base md:text-lg text-[#666666] animate-fadeSlideIn delay-200">
                {slides[activeIndex].subtitle}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mb-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  goToSlide(index);
                  setIsPaused(true);
                  setTimeout(() => setIsPaused(false), 6000);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-[#8B1E1E] w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/menu"
              className="w-full sm:w-auto bg-[#8B1E1E] text-white font-medium px-7 py-3.5 rounded-full text-base hover:bg-[#6d1717] transition-colors text-center"
            >
              Place an order
            </a>
            <a
              href="/contact"
              className="w-full sm:w-auto bg-[#F9F9F9] text-[#2C2C2C] font-medium px-7 py-3.5 rounded-full text-base hover:bg-gray-200 transition-colors text-center border border-gray-200"
            >
              Find us
            </a>
          </div>
        </div>

        {/* Bottom fade — peek-through effect */}
        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <div className="h-6 bg-gradient-to-t from-[#FDF6F0] to-transparent" />
          <div className="h-4 bg-[#FDF6F0]" />
        </div>
      </section>

      {/* Peek-through: beginning of Pillars section */}
      <div className="bg-[#FDF6F0] -mt-2 relative z-10">
        <div className="max-w-5xl mx-auto px-4 pt-10 pb-6">
          <p className="text-[#666666] text-sm uppercase tracking-widest mb-3 text-center reveal-on-scroll">Why us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] text-center reveal-on-scroll">
            Three things that matter
          </h2>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeSlideIn {
          animation: fadeSlideIn 0.6s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
      `}</style>
    </>
  );
}