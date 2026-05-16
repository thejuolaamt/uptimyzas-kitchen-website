export default function Pillars() {
  const pillars = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="#8B1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "Always Available",
      description:
        "Open 6:00 AM to 10:00 PM daily. Reliable hours you can count on, right when you need food most.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="#8B1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: "Right Where You Are",
      description:
        "No long trips. We're right where you are. Always available for pick up and delivery withing Ondo City",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto" viewBox="0 0 24 24" fill="none" stroke="#8B1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
      title: "Fresh Daily",
      description:
        "Every meal cooked fresh every day. No reheated food. No compromises. Just honest, hot Nigerian meals.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F9F9F9]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-3">
            Why Students Choose Us
          </h2>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto">
            Three things that make Uptimyzas Kitchen the go-to spot.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 flex justify-center">{pillar.icon}</div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">
                {pillar.title}
              </h3>
              <p className="text-[#666666] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}