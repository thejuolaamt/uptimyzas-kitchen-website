export default function Testimonials() {
  const reviews = [
    {
      name: "Adeyemi",
      detail: "300 Level, FUTO",
      quote:
        "Been coming here since first year. Never disappointed! The food is always hot and the service is quick.",
      rating: 5,
    },
    {
      name: "Chioma",
      detail: "200 Level, OAU",
      quote:
        "Best food on campus. Period. The jollof rice here is unbeatable — and I've tried everywhere.",
      rating: 5,
    },
    {
      name: "Korede",
      detail: "400 Level, LAUTECH",
      quote:
        "Open late = lifesaver for study sessions. When I'm grinding at night, I know Uptimyzas has my back.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F9F9F9]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-3">
            What Students Say
          </h2>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto">
            Real reviews from real students who eat here. No fake stories — just honest food love.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative"
            >
              {/* Quote Icon */}
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-[#F4D03F]"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="#F4D03F"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[#2C2C2C] leading-relaxed mb-6 italic">
                "{review.quote}"
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                {/* Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-[#8B1E1E] flex items-center justify-center text-white font-bold text-sm">
                  {review.name[0]}
                </div>
                <div>
                  <p className="font-bold text-[#2C2C2C] text-sm">
                    {review.name}
                  </p>
                  <p className="text-[#666666] text-xs">{review.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}