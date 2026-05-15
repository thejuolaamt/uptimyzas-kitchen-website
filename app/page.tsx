import Hero from "./components/Hero";
import Pillars from "./components/Pillars";
import FeaturedFood from "./components/FeaturedFood";
import Testimonials from "./components/Testimonials";
import Location from "./components/Location";
import CTA from "./components/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Pillars />
      <FeaturedFood />
      <Testimonials />
      <Location />
      <CTA />
    </>
  );
}