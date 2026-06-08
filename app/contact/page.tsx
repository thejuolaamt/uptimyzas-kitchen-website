import type { Metadata } from "next";
import ContactContent from "../components/ContactContent";

const SITE_URL = "https://www.uptimyzaskitchen.com";

export const metadata: Metadata = {
  title: "Contact — Call 0815 542 3980, WhatsApp, or Visit Us in Ondo City | Uptimyzas Kitchen",
  description: "Reach us at 0815 542 3980 or uptimyzask@gmail.com. Walk in: Beside Eric photoshop, opposite Adeyemi Federal University, Ondo City. Open 6am-10pm daily.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact | Uptimyzas Kitchen — Ondo City",
    description: "Call, WhatsApp, or walk in. Your food is waiting.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}