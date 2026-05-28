export function MenuCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden animate-pulse">
      <div className="h-52 bg-gray-100" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between">
          <div className="w-24 h-5 bg-gray-200 rounded" />
          <div className="w-14 h-5 bg-gray-200 rounded" />
        </div>
        <div className="w-full h-4 bg-gray-100 rounded" />
        <div className="w-3/4 h-4 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

export function FeaturedCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-52 bg-gray-100 rounded-2xl mb-4" />
      <div className="px-1 space-y-2">
        <div className="flex justify-between">
          <div className="w-20 h-5 bg-gray-200 rounded" />
          <div className="w-12 h-5 bg-gray-200 rounded" />
        </div>
        <div className="w-full h-4 bg-gray-100 rounded" />
      </div>
    </div>
  );
}

export function TestimonialSkeleton() {
  return (
    <div className="bg-[#F9F9F9] rounded-2xl p-6 animate-pulse">
      <div className="flex gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className="w-4 h-4 bg-gray-200 rounded" />
        ))}
      </div>
      <div className="w-full h-16 bg-gray-100 rounded mb-3" />
      <div className="w-20 h-4 bg-gray-200 rounded" />
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-52 bg-gray-100 rounded-2xl mb-4" />
      <div className="w-32 h-3 bg-gray-200 rounded mb-2" />
      <div className="w-3/4 h-6 bg-gray-200 rounded mb-2" />
      <div className="w-full h-4 bg-gray-100 rounded" />
    </div>
  );
}