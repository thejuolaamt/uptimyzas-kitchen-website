import Image from "next/image";

export default function FeaturedFood() {
  const featuredItems = [
    {
      name: "Jollof Rice",
      description:
        "Freshly made, perfectly spiced. The classic Nigerian party rice, hot and satisfying.",
      price: "₦800",
            imageUrl:
        "https://media.istockphoto.com/id/644021564/photo/jollof-rice-with-chicken-and-fried-plantain-west-african-cuisine.webp?a=1&b=1&s=612x612&w=0&k=20&c=BHwQb4K_f-CTao10uWxNmZNDxwUgect6SZqwOWUygpw=",
    },
    {
      name: "Bread & Egg",
      description:
        "Soft bread with golden fried egg. Simple, filling, and always hits the spot.",
      price: "₦600",
            imageUrl:
        "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&h=400&fit=crop",
    },
    {
      name: "Pepper Soup",
      description:
        "Rich, spicy broth that warms you up. Perfect comfort food for any time of day.",
      price: "₦1,200",
      imageUrl:
        "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&h=400&fit=crop",
    },
    {
      name: "Pupuru",
      description:
        "Creamy, smooth swallow. Made fresh and served hot with your favorite soup.",
      price: "₦1,000",
      imageUrl:
        "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=600&h=400&fit=crop",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-3">
            What's Cooking
          </h2>
          <p className="text-[#666666] text-lg max-w-2xl mx-auto">
            Our most popular dishes, made fresh daily.
          </p>
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              {/* Real Food Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-[#2C2C2C]">
                    {item.name}
                  </h3>
                  <span className="text-lg font-bold text-[#8B1E1E]">
                    {item.price}
                  </span>
                </div>
                <p className="text-[#666666] text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <a
                  href="/menu"
                  className="block w-full text-center bg-[#8B1E1E] text-white font-semibold text-sm px-4 py-2.5 rounded-full hover:bg-[#6d1717] transition-colors"
                >
                  Order Now
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Menu Link */}
        <div className="text-center mt-10">
          <a
            href="/menu"
            className="inline-flex items-center gap-2 text-[#8B1E1E] font-bold hover:underline"
          >
            View Full Menu
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}