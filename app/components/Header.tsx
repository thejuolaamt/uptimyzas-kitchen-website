"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Uptimyzas Kitchen"
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span className="text-lg font-bold text-[#2C2C2C]">
            Uptimyzas<span className="text-[#8B1E1E]"> Kitchen</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/menu" className="px-3 py-2 text-[#2C2C2C] hover:text-[#8B1E1E] text-sm font-medium transition-colors rounded-lg hover:bg-[#8B1E1E]/5">Menu</Link>
          <Link href="/blog" className="px-3 py-2 text-[#2C2C2C] hover:text-[#8B1E1E] text-sm font-medium transition-colors rounded-lg hover:bg-[#8B1E1E]/5">Blog</Link>
          <Link href="/about" className="px-3 py-2 text-[#2C2C2C] hover:text-[#8B1E1E] text-sm font-medium transition-colors rounded-lg hover:bg-[#8B1E1E]/5">About</Link>
          <Link href="/contact" className="px-3 py-2 text-[#2C2C2C] hover:text-[#8B1E1E] text-sm font-medium transition-colors rounded-lg hover:bg-[#8B1E1E]/5">Contact</Link>
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-3 flex-shrink-0">
          {user ? (
  <div className="flex items-center gap-2">
    {user.email === "uptimyzask@gmail.com" && (
      <Link
        href="/admin/menu"
        className="px-3 py-2 text-[#8B1E1E] text-sm font-medium hover:underline transition-colors"
      >
        Admin
      </Link>
    )}
    <Link
      href="/account"
      className="px-3 py-2 text-[#666666] text-sm hover:text-[#8B1E1E] transition-colors"
    >
      Account
    </Link>
    <button
      onClick={handleSignOut}
      className="px-3 py-2 text-[#666666] text-sm hover:text-[#8B1E1E] transition-colors"
    >
      Sign out
    </button>
  </div>
) : (
            <Link href="/auth/login" className="px-3 py-2 text-[#666666] text-sm hover:text-[#8B1E1E] transition-colors">Sign in</Link>
          )}

          <a
            href="https://wa.me/2348155423980"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#25D366] text-white font-medium px-4 py-2.5 rounded-full text-sm hover:bg-[#1ebe57] transition-colors flex-shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            Chat us
          </a>
        </div>

        {/* Mobile Right */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="https://wa.me/2348155423980"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#1ebe57] transition-colors flex-shrink-0"
            aria-label="Chat on WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
          </a>
          <button className="flex flex-col gap-1 p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            <span className={`block w-5 h-0.5 bg-[#2C2C2C] transition-transform duration-300 ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}></span>
            <span className={`block w-5 h-0.5 bg-[#2C2C2C] transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-5 h-0.5 bg-[#2C2C2C] transition-transform duration-300 ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 flex flex-col gap-1">
            <Link href="/menu" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-[#2C2C2C] font-medium rounded-lg hover:bg-[#8B1E1E]/5 transition-colors">Menu</Link>
            <Link href="/blog" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-[#2C2C2C] font-medium rounded-lg hover:bg-[#8B1E1E]/5 transition-colors">Blog</Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-[#2C2C2C] font-medium rounded-lg hover:bg-[#8B1E1E]/5 transition-colors">About</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-[#2C2C2C] font-medium rounded-lg hover:bg-[#8B1E1E]/5 transition-colors">Contact</Link>

            <div className="border-t border-gray-100 mt-2 pt-2">
              {user ? (
  <>
    {user.email === "uptimyzask@gmail.com" && (
      <Link
        href="/admin/menu"
        onClick={() => setMenuOpen(false)}
        className="px-3 py-3 text-[#8B1E1E] font-medium rounded-lg hover:bg-[#8B1E1E]/5 transition-colors block"
      >
        Admin
      </Link>
    )}
    <Link
      href="/account"
      onClick={() => setMenuOpen(false)}
      className="px-3 py-3 text-[#2C2C2C] font-medium rounded-lg hover:bg-[#8B1E1E]/5 transition-colors block"
    >
      Account
    </Link>
    <button
      onClick={() => { handleSignOut(); setMenuOpen(false); }}
      className="px-3 py-3 text-[#2C2C2C] font-medium rounded-lg hover:bg-[#8B1E1E]/5 transition-colors block w-full text-left"
    >
      Sign out
    </button>
  </>
) : (
                <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="px-3 py-3 text-[#2C2C2C] font-medium rounded-lg hover:bg-[#8B1E1E]/5 transition-colors block">Sign in</Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}