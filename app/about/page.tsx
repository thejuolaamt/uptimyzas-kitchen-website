import type { Metadata } from "next";
import Image from "next/image";

const SITE_URL = "https://uptimyzas-kitchen-website.vercel.app";

export const metadata: Metadata = {
  title: "About",
  description:
    "Uptimyzas Kitchen — good food, served fast. Right here in Ondo, open 6am to 10pm every day.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "About | Uptimyzas Kitchen",
    description:
      "Good food, served fast. Open every day, 6am to 10pm.",
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-24 pb-12 bg-[#F9F9F9]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-3">
            About us
          </h1>
          <p className="text-[#666666] text-lg max-w-xl mx-auto">
            Good food, no pretense. Just honest meals served hot, right here in Ondo.
          </p>
        </div>
      </section>

      {/* Image */}
      <section className="relative h-64 md:h-96 bg-[#2C2C2C]">
        <Image
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&h=600&fit=crop"
          alt="Uptimyzas Kitchen"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </section>

      {/* The Story */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-6">
            How we started
          </h2>
          <div className="text-[#666666] leading-relaxed space-y-4 text-lg">
            <p>
              Uptimyzas Kitchen started with one idea — make good food, serve it fast, and keep the doors open every day.
            </p>
            <p>
              We're beside Eric photoshop, opposite Adeyemi Federal University. People come here because the food is hot, the price is fair, and nobody makes you wait.
            </p>
            <p>
              No long talk. No gimmicks. Just good food, whenever you're ready.
            </p>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-3xl mx-auto px-4">
        <hr className="border-gray-200" />
      </div>

      {/* What matters */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2C2C2C] mb-6">
            What matters to us
          </h2>
          <ul className="space-y-4">
            {[
              "Food cooked fresh every day",
              "Open 6am to 10pm, Monday to Sunday",
              "Prices that make sense",
              "Fast service — no long waits",
              "Quality you can taste",
            ].map((item, index) => (
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
                <span className="text-[#666666] text-lg">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#F9F9F9]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-[#2C2C2C] text-lg font-semibold mb-3">
            Want to get in touch?
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#8B1E1E] text-white font-medium px-6 py-3 rounded-full hover:bg-[#6d1717] transition-colors"
          >
            Contact us
          </a>
        </div>
      </section>
    </>
  );
}