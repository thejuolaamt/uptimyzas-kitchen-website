"use client";

import { useState } from "react";
import Image from "next/image";
import { menuItems, categories } from "../menuData";

export default function MenuContent() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-[#F9F9F9]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-3">
            Our Menu
          </h1>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto">
            Fresh Nigerian food made daily. Filter by category to find exactly what you're craving.
          </p>
        </div>
      </section>

      {/* Category Filters - Sticky */}
      <div className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#8B1E1E] text-white"
                    : "bg-gray-100 text-[#666666] hover:bg-gray-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {item.popular && (
                    <div className="absolute top-3 left-3 bg-[#F4D03F] text-[#2C2C2C] text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-[#2C2C2C]">
                      {item.name}
                    </h3>
                    <span className="text-lg font-bold text-[#8B1E1E]">
                      ₦{item.price.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[#666666] text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <a
                    href={`https://wa.me/2348155423980?text=I'd%20like%20to%20order%20${encodeURIComponent(item.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-[#27AE60] text-white font-semibold text-sm px-4 py-2.5 rounded-full hover:bg-[#219a52] transition-colors"
                  >
                    Order via WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#666666] text-lg">
                No items found in this category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}