"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { FeaturedCardSkeleton } from "./Skeleton";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

export default function FeaturedFood() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase
        .from("menu_items")
        .select("id, name, description, price, image_url")
        .eq("available", true)
        .eq("popular", true)
        .order("created_at", { ascending: false })
        .limit(4);

      if (data) setItems(data);
      setLoading(false);
    }

    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="w-32 h-4 bg-gray-200 rounded mx-auto mb-3 animate-pulse" />
            <div className="w-64 h-8 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <FeaturedCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14 reveal-on-scroll">
          <p className="text-[#666666] text-sm uppercase tracking-widest mb-3">What we serve</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]">
            Food you know and love
          </h2>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#666666]">No featured items yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="group reveal-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-52 overflow-hidden rounded-2xl mb-4">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="px-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-lg font-bold text-[#2C2C2C]">
                      {item.name}
                    </h3>
                    <span className="text-base font-bold text-[#8B1E1E]">
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[#666666] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12 reveal-on-scroll">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-[#8B1E1E] font-semibold hover:underline"
          >
            See full menu
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}