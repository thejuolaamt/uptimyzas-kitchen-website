import type { Metadata } from "next";
import ContactContent from "../components/ContactContent";

const SITE_URL = "https://www.uptimyzaskitchen.com";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Uptimyzas Kitchen. Call, WhatsApp, or walk in. Beside Eric photoshop, opposite Adeyemi Federal University, Ondo.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: "Contact | Uptimyzas Kitchen",
    description:
      "Message us or walk in. Your food is waiting.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}