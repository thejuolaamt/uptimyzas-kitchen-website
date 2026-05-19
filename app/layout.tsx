import ProgressBar from "./components/ProgressBar";
import { NavigationEvents } from "./components/NavigationEvents";
import { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Popup from "./components/Popup";

const SITE_URL = "https://www.uptimyzaskitchen.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Uptimyzas Kitchen — Your food is ready.",
    template: "%s | Uptimyzas Kitchen",
  },

  description:
    "Good food, served fast. Nigerian staples, fair prices, open 6am to 10pm every day. Beside Eric photoshop, opposite Adeyemi Federal University, Ondo.",

  keywords: [
    "Uptimyzas Kitchen",
    "food in Ondo",
    "restaurant Ondo",
    "Nigerian food",
    "jollof rice",
    "affordable food Ondo",
  ],

  icons: {
    icon: "/logo.png",
  },

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    siteName: "Uptimyzas Kitchen",
    title: "Uptimyzas Kitchen — Your food is ready.",
    description: "Good food, served fast. Open every day, 6am to 10pm.",
    url: SITE_URL,
  },

  twitter: {
    card: "summary_large_image",
    title: "Uptimyzas Kitchen",
    description: "Good food, served fast. Right here in Ondo.",
  },

  verification: {
    google: "UtAvYysQz1zpUthKy02sye_vEpuT3p8uM5VXbjwCPG0",
  },

  robots: {
    index: true,
    follow: true,
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
    description: "Good food, served fast. Nigerian staples, fair prices, open every day.",
    image: `${SITE_URL}/logo.png`,
    url: SITE_URL,
    telephone: "+2348155423980",
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
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
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
        <Popup />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}