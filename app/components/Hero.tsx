"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Hero() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function checkOpenStatus() {
      const now = new Date();
      const hours = now.getHours();
      setIsOpen(hours >= 6 && hours < 22);
    }

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-[#2C2C2C] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1596803244618-8dbee441d70b?w=1200&h=800&fit=crop"
          alt="Delicious Nigerian food spread"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        {/* Dynamic Open/Closed Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div
            className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full ${
              isOpen
                ? "bg-[#27AE60] text-white"
                : "bg-red-500 text-white"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isOpen ? "bg-white animate-pulse" : "bg-white"
              }`}
            ></span>
            {isOpen ? "OPEN NOW" : "CLOSED"}
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
          Uptimyzas{" "}
          <span className="text-[#F4D03F]">Kitchen</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          The most reliable food destination in Ondo City.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/menu"
            className="w-full sm:w-auto bg-[#8B1E1E] text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-[#6d1717] transition-colors text-center"
          >
            View Menu
          </a>
          <a
            href="/contact"
            className="w-full sm:w-auto bg-white text-[#2C2C2C] font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition-colors text-center"
          >
            Find Us
          </a>
          <a
            href="tel:+2348155423980"
            className="w-full sm:w-auto bg-[#27AE60] text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-[#219a52] transition-colors text-center"
          >
            Call Now
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 animate-bounce">
          <span className="text-white/60 text-sm">Scroll down ↓</span>
        </div>
      </div>
    </section>
  );
}