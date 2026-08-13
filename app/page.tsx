import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import QuoteForm from "@/components/quote-form"
import TestimonialsSection from "@/components/testimonials-section"
import PortfolioSection from "@/components/portfolio-section"
import FooterSection from "@/components/footer-section"

export default function Home() {
  return (
    <div style={{ backgroundColor: "#f5f0e8" }}>
      <Navbar />
      <main>
        <HeroSection />
        {/* Form overlaps into hero by 60px */}
        <div className="relative z-10 -mt-16">
          <QuoteForm />
        </div>
        <TestimonialsSection />
        <PortfolioSection />
        <FooterSection />
      </main>
    </div>
  )
}
