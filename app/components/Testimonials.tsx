export default function Testimonials() {
  const reviews = [
    {
      name: "Adeyemi",
      quote:
        "I've been coming here since first year. Food is always hot, no delay.",
    },
    {
      name: "Chioma",
      quote:
        "The jollof here tastes like home. I keep coming back.",
    },
    {
      name: "Korede",
      quote:
        "I know when I'm hungry, Uptimyzas has me. Quick, warm, done.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-14 reveal-on-scroll">
          <p className="text-[#666666] text-sm uppercase tracking-widest mb-3">From people who eat here</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]">
            What they say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="text-center reveal-on-scroll"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <p className="text-[#2C2C2C] text-lg leading-relaxed mb-4">
                "{review.quote}"
              </p>
              <p className="text-[#666666] text-sm">— {review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}