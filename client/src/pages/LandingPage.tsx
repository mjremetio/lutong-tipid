import Hero from '../components/landing/Hero';
import HowItWorks from '../components/landing/HowItWorks';
import Testimonials from '../components/landing/Testimonials';

export default function LandingPage() {
  return (
    <div className="scroll-smooth">
      <Hero />
      <HowItWorks />
      <Testimonials />
    </div>
  );
}
