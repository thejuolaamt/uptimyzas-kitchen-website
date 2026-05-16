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
    "restaurant near me",
    "Ondo restaurant",
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
  verification: {
        google: "1hXgFB9lh749DSCR9gl_bZeCIGbSFQDm2PdbsJkz30M",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Uptimyzas Kitchen",
    description:
      "The most reliable, accessible student food destination in Ondo. Fresh Nigerian food cooked daily.",
    image: "https://uptimyzas-kitchen-website.vercel.app/logo.png",
    url: "https://uptimyzas-kitchen-website.vercel.app",
    telephone: "+2347039279650",
    email: "info@uptimyzaskitchen.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Beside Eric photoshop, opposite Adeyemi Federal University of Education, Ondo",
      addressLocality: "Ondo",
      addressCountry: "NG",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "06:00",
        closes: "22:00",
      },
    ],
    servesCuisine: "Nigerian",
    priceRange: "₦500 - ₦10,000",
  };

  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}