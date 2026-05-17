"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Uptimyzas Kitchen"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-[#8B1E1E]">Uptimyzas</span>
          <span className="text-xl font-bold text-[#2C2C2C]">Kitchen</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-[#2C2C2C] hover:text-[#8B1E1E] font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/menu"
            className="text-[#2C2C2C] hover:text-[#8B1E1E] font-medium transition-colors"
          >
            Menu
          </Link>
          <Link
            href="/about"
            className="text-[#2C2C2C] hover:text-[#8B1E1E] font-medium transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-[#2C2C2C] hover:text-[#8B1E1E] font-medium transition-colors"
          >
            Contact
          </Link>
          
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#2C2C2C] transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-[#2C2C2C] transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-[#2C2C2C] transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <div
            className={`flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full w-fit ${
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
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-[#2C2C2C] font-medium text-lg"
          >
            Home
          </Link>
          <Link
            href="/menu"
            onClick={() => setMenuOpen(false)}
            className="text-[#2C2C2C] font-medium text-lg"
          >
            Menu
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="text-[#2C2C2C] font-medium text-lg"
          >
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="text-[#2C2C2C] font-medium text-lg"
          >
            Contact
          </Link>
          
        </div>
      )}
    </header>
  );
}