"use client";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[200] bg-white flex items-center justify-center">
      <div className="relative w-24 h-24 md:w-28 md:h-28">
        {/* Outer square border */}
        <div className="absolute inset-0 border-2 border-[#8B1E1E]/20 rounded-2xl" />

        {/* Fill animation — rises from bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 bg-[#8B1E1E] rounded-2xl"
          style={{
            animation: "fillUp 1.8s ease-in-out forwards",
          }}
        />

        {/* Logo — fades in as fill rises */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            animation: "logoReveal 1.8s ease-in-out forwards",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-12 h-12 md:w-14 md:h-14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="50" cy="65" rx="30" ry="10" stroke="white" strokeWidth="3" fill="none" />
            <ellipse cx="50" cy="58" rx="24" ry="7" stroke="white" strokeWidth="2.5" fill="none" />
            <path d="M42 50 Q40 40 44 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M50 48 Q48 36 52 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M58 50 Q56 40 60 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>

        {/* Brand text below */}
        <p
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[#8B1E1E] text-xs font-bold tracking-widest uppercase whitespace-nowrap"
          style={{
            animation: "textPulse 2.2s ease-in-out forwards",
          }}
        >
          Uptimyzas Kitchen
        </p>
      </div>

      <style jsx>{`
        @keyframes fillUp {
          0% { height: 0%; border-radius: 0 0 14px 14px; }
          40% { height: 100%; border-radius: 14px; }
          100% { height: 100%; border-radius: 14px; }
        }
        @keyframes logoReveal {
          0%, 30% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes textPulse {
          0%, 80% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}