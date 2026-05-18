import type { Metadata } from "next";
import MenuContent from "../components/MenuContent";

const SITE_URL = "https://www.uptimyzaskitchen.com";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "See what we serve — Jollof rice, pepper soup, bread & egg, pupuru, and more. Fair prices, hot and fresh.",
  alternates: {
    canonical: `${SITE_URL}/menu`,
  },
  openGraph: {
    title: "Menu | Uptimyzas Kitchen",
    description:
      "Good food, served fast. Browse our menu.",
  },
};

export default function MenuPage() {
  return <MenuContent />;
}