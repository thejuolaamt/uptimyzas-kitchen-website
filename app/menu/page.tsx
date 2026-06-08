import type { Metadata } from "next";
import MenuContent from "../components/MenuContent";

const SITE_URL = "https://www.uptimyzaskitchen.com";

export const metadata: Metadata = {
  title: "Menu — Jollof Rice from ₦2499, Ewa Agoyin & More | Uptimyzas Kitchen Ondo City",
  description: "View our full menu: Jollof rice (₦2499), Ewa agoyin (₦1999), pepper soup, fried rice, egusi soup, bread & egg. Hot, fresh, ready in minutes. Order via WhatsApp.",
  alternates: {
    canonical: `${SITE_URL}/menu`,
  },
  openGraph: {
    title: "Menu | Uptimyzas Kitchen — Ondo City",
    description: "Jollof rice, Ewa agoyin, pepper soup & more. Fair prices, hot and fresh.",
  },
};

export default function MenuPage() {
  return <MenuContent />;
}