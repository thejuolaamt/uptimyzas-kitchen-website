"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();
      // Only allow your email
      if (data.user?.email === "uptimyzask@gmail.com") {
        setAuthorized(true);
      }
      setLoading(false);
    }
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
        <p className="text-[#666666]">Loading...</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F9F9]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#2C2C2C] mb-2">Access denied</h1>
          <p className="text-[#666666]">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "Menu", href: "/admin/menu" },
    { label: "Blog", href: "/admin/blog" },
    { label: "Popups", href: "/admin/popups" },
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {/* Admin header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin/menu" className="font-bold text-[#2C2C2C]">
              Admin
            </Link>
            <nav className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "bg-[#8B1E1E] text-white"
                      : "text-[#666666] hover:text-[#2C2C2C] hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <Link href="/" className="text-sm text-[#666666] hover:text-[#2C2C2C]">
            View site →
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}