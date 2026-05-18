import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Image
              src="/logo.png"
              alt="Uptimyzas Kitchen"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <span className="text-2xl font-bold text-white">
              Uptimyzas<span className="text-[#8B1E1E]"> Kitchen</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Good food, served fast. Right here in Ondo.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>🕐</span>
            <span>6am – 10pm, every day. Including Sundays.</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
            Pages
          </h3>
          <ul className="flex flex-col gap-2">
            {[
              { label: "Home", href: "/" },
              { label: "Menu", href: "/menu" },
              { label: "Blog", href: "/blog" },
              { label: "About", href: "/about" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-[#F4D03F] text-sm transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Find Us */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
            Find Us
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>Beside Eric photoshop, opposite Adeyemi Federal University, Ondo</span>
            </li>
            <li className="flex items-center gap-2">
              <span>🕐</span>
              <span>6am – 10pm Daily</span>
            </li>
            <li className="flex items-center gap-2">
              <span>☎️</span>
              <a href="tel:+2348155423980" className="hover:text-[#F4D03F] transition-colors">
                0815 542 3980
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>📧</span>
              <a href="mailto:uptimyzask@gmail.com" className="hover:text-[#F4D03F] transition-colors">
                uptimyzask@gmail.com
              </a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-3 mt-5">
  <a
    href="https://instagram.com/uptimyzaskitchen"
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8B1E1E] flex items-center justify-center transition-colors"
    aria-label="Instagram"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="white">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  </a>
  <a
    href="https://facebook.com/uptimyzaskitcehn"
    target="_blank"
    rel="noopener noreferrer"
    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8B1E1E] flex items-center justify-center transition-colors"
    aria-label="Facebook"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="white">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
    </svg>
  </a>
</div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Uptimyzas Kitchen. All rights reserved.</span>
          <span>Your food is ready.</span>
        </div>
      </div>
    </footer>
  );
}