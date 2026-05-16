import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story behind Uptimyzas Kitchen — fresh Nigerian food, fair prices, and a mission to feed Ondo students right. Open daily.",
  openGraph: {
    title: "About Us | Uptimyzas Kitchen",
    description:
      "Our mission: be the most reliable, accessible student food destination in Ondo.",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-[#F9F9F9]">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-3">
            About Uptimyzas Kitchen
          </h1>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto">
            Good food. No pretense. Just honest Nigerian meals served fresh, right here on campus.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="relative h-64 md:h-96 bg-[#2C2C2C]">
        <Image
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=600&fit=crop"
          alt="Nigerian restaurant interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </section>

      {/* The Story */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-6 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-[#8B1E1E]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 20V10" />
              <path d="M18 20V4" />
              <path d="M6 20v-4" />
            </svg>
            The Story
          </h2>
          <div className="text-[#666666] leading-relaxed space-y-4 text-lg">
            <p>
              Started with a simple mission: Feed students well. Always be there
              when they need us.
            </p>
            <p>
              From first-year survival sessions to
              final-year all-nighters, Uptimyzas Kitchen has been the spot
              students count on.
            </p>
            <p>
              We know what it means to be hungry between lectures, to need
              something hot after a long day, to want food that tastes like home
              without breaking the bank. That's exactly why we're here.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-4">
        <hr className="border-gray-200" />
      </div>

      {/* The Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-6 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-[#8B1E1E]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            The Mission
          </h2>
          <p className="text-[#2C2C2C] text-lg font-semibold leading-relaxed">
            Be the most reliable, accessible, student-dominant food destination
            in Ondo.
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-4">
        <hr className="border-gray-200" />
      </div>

      {/* The Promise */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-6 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-[#8B1E1E]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            The Promise
          </h2>
          <ul className="space-y-4">
            {[
              "Fresh food cooked daily",
              "Open 6:00 AM to 10:00 PM, every day",
              "Fair prices that work for students",
              "Quick service — no long waits",
              "No compromises on quality",
            ].map((promise, index) => (
              <li key={index} className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-[#27AE60] flex-shrink-0 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-[#666666] text-lg">{promise}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-4">
        <hr className="border-gray-200" />
      </div>

      {/* The Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-6 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7 text-[#8B1E1E]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            The Vision
          </h2>
          <p className="text-[#666666] leading-relaxed text-lg mb-6">
            5 locations across Ondo. One brand. Same promise. We're growing to
            serve more students without losing what makes us special — fresh
            food, fair prices, and a place you can always count on.
          </p>

          {/* CTA */}
          <div className="bg-[#F9F9F9] rounded-2xl p-6 text-center">
            <p className="text-[#2C2C2C] font-semibold mb-3">
              Want to partner? Work with us?
            </p>
            <a
              href="/contact"
              className="inline-block bg-[#8B1E1E] text-white font-bold px-6 py-3 rounded-full hover:bg-[#6d1717] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}