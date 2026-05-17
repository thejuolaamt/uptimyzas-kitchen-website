import type { Metadata } from "next";
import Hero from "./components/Hero";
import Pillars from "./components/Pillars";
import FeaturedFood from "./components/FeaturedFood";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Location from "./components/Location";
import CTA from "./components/CTA";

export const metadata: Metadata = {
  title: "Uptimyzas Kitchen — Your food is ready.",
  description:
    "Good food, served fast. Nigerian staples, fair prices, open 6am to 10pm every day. Beside Eric photoshop, opposite Adeyemi Federal University, Ondo.",
  openGraph: {
    title: "Uptimyzas Kitchen — Your food is ready.",
    description:
      "Good food, served fast. Open every day, 6am to 10pm.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <FeaturedFood />
      <HowItWorks />
      <Testimonials />
      <Location />
      <CTA />
    </>
  );
}