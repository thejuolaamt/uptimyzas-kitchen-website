import type { Metadata } from "next";
import MenuContent from "../components/MenuContent";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore our full menu of fresh Nigerian food. Jollof rice, pepper soup, bread & egg, pupuru, and more. Fair prices, cooked daily.",
  openGraph: {
    title: "Menu | Uptimyzas Kitchen",
    description:
      "Browse our full menu with prices, take your time.",
  },
};

export default function MenuPage() {
  return <MenuContent />;
}