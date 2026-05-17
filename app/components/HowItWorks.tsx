"use client";

import { useState, useEffect } from "react";

export default function HowItWorks() {
  const steps = [
    { number: "1", title: "Message us or walk in" },
    { number: "2", title: "Your food is dished" },
    { number: "3", title: "You eat" },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hasPulsed, setHasPulsed] = useState(false);

  useEffect(() => {
    // Pulse the first card once after a short delay
    const timer = setTimeout(() => {
      setHasPulsed(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  function handleTap(index: number) {
    if (openIndex === index) {
      setOpenIndex(null); // close if same card tapped
    } else {
      setOpenIndex(index);
    }
  }

  return (
    <section className="py-20 md:py-28 bg-[#F9F9F9]">
      <div className="max-w-3xl mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-14 reveal-on-scroll">
          <p className="text-[#666666] text-sm uppercase tracking-widest mb-3">How it works</p>
        </div>

        {/* Steps */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-5">
          {steps.map((step, index) => {
            const isOpen = openIndex === index;
            const isFirst = index === 0;
            const showPulse = isFirst && !hasPulsed && openIndex === null;

            return (
              <button
                key={index}
                onClick={() => handleTap(index)}
                className={`group relative flex-1 text-left rounded-2xl transition-all duration-500 ease-out overflow-hidden
                  ${isOpen
                    ? "bg-white shadow-md md:flex-[2]"
                    : "bg-white/60 hover:bg-white shadow-sm md:flex-1"
                  }
                  ${showPulse ? "animate-pulseOnce" : ""}
                `}
              >
                {/* Shimmer on closed cards */}
                {!isOpen && (
                  <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-12 translate-x-[-150%] animate-shimmerMove" />
                  </div>
                )}

                <div className="p-5 md:p-6 flex md:flex-col items-center md:items-start gap-4 md:gap-3">
                  {/* Number */}
                  <span
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-500
                      ${isOpen
                        ? "bg-[#8B1E1E] text-white"
                        : "bg-[#8B1E1E]/10 text-[#8B1E1E]"
                      }
                    `}
                  >
                    {step.number}
                  </span>

                  {/* Text */}
                  <span
                    className={`text-[#2C2C2C] font-medium transition-all duration-500
                      ${isOpen
                        ? "opacity-100 translate-y-0 text-base md:text-lg"
                        : "opacity-0 translate-y-2 md:opacity-100 md:translate-y-0 text-base"
                      }
                    `}
                  >
                    {step.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile hint */}
        <p className="text-center text-[#999] text-xs mt-4 md:hidden">
          Tap a step to reveal
        </p>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes pulseOnce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        .animate-pulseOnce {
          animation: pulseOnce 1s ease-in-out;
        }
        @keyframes shimmerMove {
          0% { transform: translateX(-150%) skewX(-12deg); }
          100% { transform: translateX(150%) skewX(-12deg); }
        }
        .animate-shimmerMove {
          animation: shimmerMove 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}