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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-3">
            Find Us
          </h2>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto">
            Right here on campus. Easy to reach, impossible to miss.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map / Location Image */}
          <div className="rounded-2xl overflow-hidden h-80 lg:h-auto relative">
            <Image
              src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=600&fit=crop"
              alt="Campus area map location"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl px-6 py-4 text-center">
                <p className="text-[#8B1E1E] font-bold text-lg">📍</p>
                <p className="text-[#2C2C2C] font-semibold">Ondo Campus</p>
                <p className="text-[#666666] text-sm">Upright Road</p>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-[#F9F9F9] rounded-2xl p-8 md:p-10 flex flex-col justify-center">
            {/* Dynamic Open/Closed Badge */}
            <div className="mb-6">
              <div
                className={`inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full ${
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

            {/* Address */}
            <div className="flex items-start gap-3 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-[#8B1E1E] flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <h3 className="font-bold text-[#2C2C2C] mb-1">Address</h3>
                <p className="text-[#666666]">
                  Ondo Campus, Upright Road
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-[#8B1E1E] font-semibold text-sm mt-2 hover:underline"
                >
                  Get Directions
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-[#8B1E1E] flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <div>
                <h3 className="font-bold text-[#2C2C2C] mb-1">Hours</h3>
                <p className="text-[#666666]">
                  Monday – Sunday
                </p>
                <p className="text-[#2C2C2C] font-semibold">
                  6:00 AM – 10:00 PM
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-start gap-3 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-[#8B1E1E] flex-shrink-0 mt-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div>
                <h3 className="font-bold text-[#2C2C2C] mb-1">Contact</h3>
                <a
                  href="tel:+234XXXXXXXXXX"
                  className="text-[#666666] hover:text-[#8B1E1E] transition-colors block"
                >
                  +234 (XXX) XXXX XXXX
                </a>
                <a
                  href="mailto:hello@uptimyzaskitchen.ng"
                  className="text-[#666666] hover:text-[#8B1E1E] transition-colors block"
                >
                  hello@uptimyzaskitchen.ng
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}