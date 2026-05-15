import type { Metadata } from "next";
import MenuContent from "../components/MenuContent";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Explore our full menu of fresh Nigerian food. Jollof rice, pepper soup, bread & egg, pupuru, and more. Fair prices, cooked daily.",
  openGraph: {
    title: "Menu | Uptimyzas Kitchen",
    description:
      "Fresh Nigerian food made daily. Browse our full menu with prices.",
  },
};

export default function MenuPage() {
  return <MenuContent />;
}