"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);

      if (data.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, phone")
          .eq("id", data.user.id)
          .single();

        if (profile) {
          setFullName(profile.full_name || "");
          setPhone(profile.phone || "");
        }
      }
      setLoading(false);
    }
    init();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setSaved(false);

    await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName,
      phone: phone,
      updated_at: new Date().toISOString(),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = "/";
  }

  if (loading) {
    return (
      <section className="pt-24 pb-16 min-h-screen bg-white">
        <div className="max-w-md mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="w-32 h-8 bg-gray-200 rounded mx-auto"></div>
            <div className="w-full h-20 bg-gray-100 rounded-2xl"></div>
            <div className="w-full h-20 bg-gray-100 rounded-2xl"></div>
            <div className="w-full h-12 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="pt-24 pb-16 min-h-screen bg-white">
        <div className="max-w-md mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-[#2C2C2C] mb-4">Your account</h1>
          <p className="text-[#666666] mb-6">Sign in to see your account details.</p>
          <Link
            href="/auth/login"
            className="inline-block bg-[#8B1E1E] text-white font-medium px-6 py-3 rounded-full hover:bg-[#6d1717] transition-colors"
          >
            Sign in
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-24 pb-16 min-h-screen bg-[#F9F9F9]">
      <div className="max-w-lg mx-auto px-4">
        <h1 className="text-2xl font-bold text-[#2C2C2C] mb-8">Your account</h1>

        {/* Profile card */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-[#8B1E1E] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
              {user.email?.[0].toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-semibold text-[#2C2C2C]">{fullName || "Your name"}</p>
              <p className="text-[#666666] text-sm">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-[#2C2C2C] mb-1.5">Full name</label>
              <input
                id="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8B1E1E] outline-none transition-colors text-[#2C2C2C]"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-[#2C2C2C] mb-1.5">Phone number</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8B1E1E] outline-none transition-colors text-[#2C2C2C]"
                placeholder="080..."
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-[#8B1E1E] text-white font-medium px-6 py-3 rounded-full hover:bg-[#6d1717] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : saved ? "Saved ✓" : "Save changes"}
            </button>
          </form>
        </div>

        {/* Quick links */}
        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-3">
          <Link
            href="/blog"
            className="block text-[#2C2C2C] hover:text-[#8B1E1E] transition-colors font-medium"
          >
            Read our blog →
          </Link>
          <Link
            href="/menu"
            className="block text-[#2C2C2C] hover:text-[#8B1E1E] transition-colors font-medium"
          >
            See the menu →
          </Link>
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          className="w-full mt-4 text-[#666666] text-sm py-3 hover:text-[#8B1E1E] transition-colors"
        >
          Sign out
        </button>
      </div>
    </section>
  );
}