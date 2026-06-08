import type { Metadata } from "next";
import Hero from "./components/Hero";
import Pillars from "./components/Pillars";
import FeaturedFood from "./components/FeaturedFood";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import Location from "./components/Location";
import CTA from "./components/CTA";

export const metadata: Metadata = {
  title: "Uptimyzas Kitchen — Best Nigerian Food in Ondo City | Open 6am-10pm Daily",
  description: "Hungry? Get hot Jollof rice (₦2499), Ewa agoyin (₦1999) & more. Fast service, fair prices. Located beside Eric photoshop, opposite Adeyemi Federal University. Order now!",
  openGraph: {
    title: "Uptimyzas Kitchen — Best Nigerian Food in Ondo",
    description: "Hot Jollof rice, Ewa agoyin & more. Open 6am-10pm daily.",
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