import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Uptimyzas Kitchen — Always Fresh, Right Here.",
    template: "%s | Uptimyzas Kitchen",
  },
  description:
    "The most reliable, accessible student food destination in Ondo. Fresh Nigerian food cooked daily. Open 6AM to 10PM, right on campus.",
  keywords: [
    "Nigerian food",
    "student food",
    "Ondo campus food",
    "jollof rice",
    "Uptimyzas Kitchen",
  ],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    type: "website",
    siteName: "Uptimyzas Kitchen",
    title: "Uptimyzas Kitchen — Always Fresh, Right Here.",
    description:
      "Fresh Nigerian food cooked daily. Open 6AM to 10PM, right on campus.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}