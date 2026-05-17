import Image from "next/image";

export default function FeaturedFood() {
  const featuredItems = [
    {
      name: "Jollof Rice",
      description: "Party rice, done right. Hot and fresh.",
      price: "₦800",
      imageUrl:
        "https://media.istockphoto.com/id/644021564/photo/jollof-rice-with-chicken-and-fried-plantain-west-african-cuisine.webp?a=1&b=1&s=612x612&w=0&k=20&c=BHwQb4K_f-CTao10uWxNmZNDxwUgect6SZqwOWUygpw=",
    },
    {
      name: "Bread & Egg",
      description: "Soft bread, golden egg. Simple.",
      price: "₦600",
      imageUrl:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop",
    },
    {
      name: "Pepper Soup",
      description: "Rich, spicy broth. Warms you right up.",
      price: "₦1,200",
      imageUrl:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
    },
    {
      name: "Pupuru",
      description: "Smooth, creamy swallow. Served hot.",
      price: "₦1,000",
      imageUrl:
        "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&h=400&fit=crop",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section heading */}
        <div className="text-center mb-14 reveal-on-scroll">
          <p className="text-[#666666] text-sm uppercase tracking-widest mb-3">What we serve</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C]">
            Food you know and love
          </h2>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, index) => (
            <div
              key={index}
              className="group reveal-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden rounded-2xl mb-4">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Text */}
              <div className="px-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-lg font-bold text-[#2C2C2C]">
                    {item.name}
                  </h3>
                  <span className="text-base font-bold text-[#8B1E1E]">
                    {item.price}
                  </span>
                </div>
                <p className="text-[#666666] text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View full menu link */}
        <div className="text-center mt-12 reveal-on-scroll">
          <a
            href="/menu"
            className="inline-flex items-center gap-2 text-[#8B1E1E] font-semibold hover:underline"
          >
            See full menu
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}