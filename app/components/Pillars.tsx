export default function Pillars() {
  const pillars = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-auto" viewBox="0 0 24 24" fill="none" stroke="#8B1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ),
      title: "Fast",
      description:
        "Your food is ready before you settle in. No waiting around.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-auto" viewBox="0 0 24 24" fill="none" stroke="#8B1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1v22" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
      title: "Affordable",
      description:
        "Good food doesn't have to cost a lot. Fair prices, always.",
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-auto" viewBox="0 0 24 24" fill="none" stroke="#8B1E1E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4" />
          <path d="M8 2v4" />
          <path d="M3 10h18" />
        </svg>
      ),
      title: "Every day",
      description:
        "Monday to Sunday, 6am to 10pm. Even on Sundays.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F9F9F9]">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-14 reveal-on-scroll">
          <p className="text-[#666666] text-sm uppercase tracking-widest mb-3">Why us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]">
            Three things that matter
          </h2>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="text-center reveal-on-scroll"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="mb-5 flex justify-center">{pillar.icon}</div>
              <h3 className="text-xl font-bold text-[#2C2C2C] mb-3">
                {pillar.title}
              </h3>
              <p className="text-[#666666] leading-relaxed max-w-xs mx-auto">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}