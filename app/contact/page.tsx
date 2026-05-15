import type { Metadata } from "next";
import ContactContent from "../components/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Uptimyzas Kitchen. Call, WhatsApp, email, or send us a message. We're right here on Ondo Campus.",
  openGraph: {
    title: "Contact Us | Uptimyzas Kitchen",
    description:
      "Have a question? Want to order? We'd love to hear from you.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}