"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";

interface Order {
  id: string;
  items: { name: string; quantity: number; price: number }[];
  total: number;
  status: string;
  created_at: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "orders">("profile");

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

        const { data: orderData } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", data.user.id)
          .order("created_at", { ascending: false });

        if (orderData) setOrders(orderData);
        setOrdersLoading(false);
      }
      setLoading(false);
    }
    init();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (loading) {
  return (/* skeleton */);
}

if (!user) {
  window.location.href = "/auth/login";
  return null;
}

return (/* account page */);
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
      <section className="pt-24 pb-16 min-h-screen bg-[#F9F9F9]">
        <div className="max-w-2xl mx-auto px-4">
          <div className="animate-pulse space-y-6">
            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto"></div>
            <div className="w-48 h-6 bg-gray-200 rounded mx-auto"></div>
            <div className="w-full h-40 bg-gray-100 rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="pt-24 pb-16 min-h-screen bg-[#F9F9F9]">
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

  const initial = (fullName || user.email || "U")[0].toUpperCase();

  return (
    <section className="pt-24 pb-16 min-h-screen bg-[#F9F9F9]">
      <div className="max-w-2xl mx-auto px-4">
        {/* Avatar + Name */}
        <div className="text-center mb-10">
          <div className="w-28 h-28 rounded-full bg-[#8B1E1E] flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4 shadow-lg">
            {initial}
          </div>
          <h1 className="text-2xl font-bold text-[#2C2C2C]">{fullName || "Your name"}</h1>
          <p className="text-[#666666] text-sm">{user.email}</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "profile"
                ? "bg-[#8B1E1E] text-white"
                : "bg-white text-[#666666] hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === "orders"
                ? "bg-[#8B1E1E] text-white"
                : "bg-white text-[#666666] hover:bg-gray-100 border border-gray-200"
            }`}
          >
            Orders {orders.length > 0 && `(${orders.length})`}
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-1.5">Full name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8B1E1E] outline-none transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#2C2C2C] mb-1.5">Phone number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#8B1E1E] outline-none transition-colors"
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
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            {ordersLoading ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                    <div className="w-32 h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="w-full h-10 bg-gray-100 rounded"></div>
                  </div>
                ))}
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center">
                <p className="text-4xl mb-4">📋</p>
                <p className="text-[#666666] text-lg mb-2">No orders yet</p>
                <p className="text-[#999] text-sm mb-6">When you place an order, it'll show up here.</p>
                <Link
                  href="/menu"
                  className="inline-block bg-[#8B1E1E] text-white font-medium px-6 py-3 rounded-full hover:bg-[#6d1717] transition-colors"
                >
                  Browse menu
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-[#999]">
                        {new Date(order.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                        order.status === "delivered" ? "bg-green-100 text-green-600" :
                        order.status === "cancelled" ? "bg-red-100 text-red-600" :
                        order.status === "ready" ? "bg-[#F4D03F]/20 text-[#8B1E1E]" :
                        "bg-blue-100 text-blue-600"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="space-y-2 mb-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-[#2C2C2C]">{item.quantity}x {item.name}</span>
                          <span className="text-[#666666]">₦{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-100 pt-3 flex justify-between font-bold">
                      <span className="text-[#2C2C2C]">Total</span>
                      <span className="text-[#8B1E1E]">₦{order.total.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick links */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-sm space-y-3">
          <Link href="/menu" className="block text-[#2C2C2C] hover:text-[#8B1E1E] transition-colors font-medium">See the menu →</Link>
          <Link href="/blog" className="block text-[#2C2C2C] hover:text-[#8B1E1E] transition-colors font-medium">Read our blog →</Link>
        </div>

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