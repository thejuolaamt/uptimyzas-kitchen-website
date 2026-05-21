"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Location() {
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
    <section className="py-20 md:py-28 bg-[#F9F9F9]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14 reveal-on-scroll">
          <p className="text-[#666666] text-sm uppercase tracking-widest mb-3">Where to find us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]">
            Right here in Ondo
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden h-72 lg:h-full relative reveal-on-scroll">
            <Image
  src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=600&fit=crop"
  alt="Ondo area"
  fill
  className="object-cover"
  sizes="(max-width: 1024px) 100vw, 50vw"
/>
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 text-center">
                <p className="text-[#2C2C2C] font-semibold">Beside Eric photoshop</p>
                <p className="text-[#666666] text-sm">Opposite Adeyemi Federal University</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center gap-8 reveal-on-scroll">
            <div className="bg-white rounded-2xl p-6 flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full flex-shrink-0 ${isOpen ? "bg-[#27AE60] animate-pulse" : "bg-red-500"}`} />
              <div>
                <p className="text-[#2C2C2C] font-bold text-lg">
                  {isOpen ? "Open now" : "Closed"}
                </p>
                <p className="text-[#666666]">
                  6am – 10pm, every day. Including Sundays.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#8B1E1E] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <p className="text-[#2C2C2C] font-semibold">Address</p>
                <p className="text-[#666666]">Beside Eric photoshop, opposite Adeyemi Federal University of Education, Ondo</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 flex items-start gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#8B1E1E] flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div>
                <p className="text-[#2C2C2C] font-semibold">Call or message</p>
                <a href="tel:+2348155423980" className="text-[#666666] hover:text-[#8B1E1E] transition-colors block">
                  0815 542 3980
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}