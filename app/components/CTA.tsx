export default function CTA() {
  return (
    <section className="py-16 md:py-24 bg-[#8B1E1E]">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-16 h-16 text-[#F4D03F]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
            <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
            <line x1="6" y1="1" x2="6" y2="4" />
            <line x1="10" y1="1" x2="10" y2="4" />
            <line x1="14" y1="1" x2="14" y2="4" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Ready to Eat?
        </h2>
        <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
          Fresh food, fair prices, right here on campus. Come through — we're ready for you.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/menu"
            className="w-full sm:w-auto bg-[#F4D03F] text-[#2C2C2C] font-bold px-8 py-4 rounded-full text-lg hover:bg-[#e0c030] transition-colors text-center"
          >
            Order Now
          </a>
          <a
            href="tel:+234XXXXXXXXXX"
            className="w-full sm:w-auto bg-white text-[#8B1E1E] font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition-colors text-center"
          >
            Call Us
          </a>
          <a
            href="#"
            className="w-full sm:w-auto bg-transparent text-white font-bold px-8 py-4 rounded-full text-lg border-2 border-white hover:bg-white/10 transition-colors text-center"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}