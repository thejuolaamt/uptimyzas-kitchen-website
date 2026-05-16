import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2C2C2C] text-white">
      {/* Main Footer */}
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
            <span className="text-2xl font-bold text-[#8B1E1E]">Uptimyzas</span>
            <span className="text-2xl font-bold text-white">Kitchen</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            The most reliable, accessible student food destination in Ondo.
            Fresh Nigerian food cooked daily. Always here when you need us.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>🕐</span>
            <span>Open Daily: 6:00 AM – 10:00 PM</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2">
            {[
              { label: "Home", href: "/" },
              { label: "Menu", href: "/menu" },
              { label: "About Us", href: "/about" },
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

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
            Find Us
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span>📍</span>
              <span>Beside Eric photoshop, opposite Adeyemi Federal Univeristy of Education, Ondo</span>
            </li>
            <li className="flex items-center gap-2">
              <span>🕐</span>
              <span>6:00 AM – 10:00 PM Daily</span>
            </li>
            <li className="flex items-center gap-2">
              <span>☎️</span>
              <a href="tel:+2348155423980" className="hover:text-[#F4D03F] transition-colors">
                0815 542 3980
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span>📧</span>
              <a href="mailto:info@uptimyzaskitchen.com" className="hover:text-[#F4D03F] transition-colors">
                uptimyzask@gmail.com
              </a>
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-3 mt-5">
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#8B1E1E] flex items-center justify-center text-xs font-bold transition-colors" aria-label="Instagram" title="Instagram">I</a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#8B1E1E] flex items-center justify-center text-xs font-bold transition-colors" aria-label="Facebook" title="Facebook">F</a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#8B1E1E] flex items-center justify-center text-xs font-bold transition-colors" aria-label="TikTok" title="TikTok">T</a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#8B1E1E] flex items-center justify-center text-xs font-bold transition-colors" aria-label="Twitter" title="Twitter">X</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Uptimyzas Kitchen. All rights reserved.</span>
          <span>Fresh Food, Right Here.</span>
        </div>
      </div>
    </footer>
  );
}