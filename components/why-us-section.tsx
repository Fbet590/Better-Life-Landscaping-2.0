import { Shield, Award, CheckCircle, Lightbulb, Users, DollarSign } from "lucide-react"
import EstimateCTA from "./estimate-cta"

const FEATURES = [
  {
    icon: Shield,
    title: "Fully Insured",
    desc: "Our landscapers are fully insured for their safety and your peace of mind. Safety is our top priority.",
  },
  {
    icon: Award,
    title: "Quality Work",
    desc: "From the tools we use to the materials we source, we're committed to delivering high-quality results.",
  },
  {
    icon: CheckCircle,
    title: "Satisfaction Guaranteed",
    desc: "We guarantee you'll love your new yard. If you're not 100% satisfied, we'll make it right.",
  },
  {
    icon: Lightbulb,
    title: "3D Design Preview",
    desc: "We use advanced 3D design software to help you visualize your dream yard before we even get started.",
  },
  {
    icon: Users,
    title: "Professional Team",
    desc: "A team of highly skilled professionals committed to providing the best service possible.",
  },
  {
    icon: DollarSign,
    title: "Competitive Pricing",
    desc: "Quality landscaping at fair prices. We also offer financing options – free to apply.",
  },
]

export default function WhyUsSection() {
  return (
    <section id="about" className="py-20 lg:py-32" style={{ backgroundColor: "#f5f0e8" }}>
      <div className="px-4 max-w-2xl mx-auto">
        <p className="text-xs font-bold tracking-widest text-[#7cb82f] uppercase mb-3">WHY CHOOSE US</p>
        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-8">
          Why Homeowners Choose Better Life Landscape
        </h2>

        {/* Stat card */}
        <div className="bg-[#7cb82f] rounded-xl p-5 flex items-center gap-4 mb-6">
          <span className="text-5xl font-extrabold text-white leading-none">15+</span>
          <p className="text-white/90 text-sm font-medium leading-snug">
            Years of experience serving<br />the West Valley community
          </p>
        </div>

        {/* CTA */}
        <EstimateCTA
          label="Schedule Your Consultation"
          className="block w-full text-center bg-[#7cb82f] hover:bg-[#6aa527] text-white font-bold py-4 rounded text-sm tracking-wide transition-colors mb-10"
        />

        {/* Features list */}
        <div className="flex flex-col gap-7">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#e8f5d0" }}>
                <Icon size={20} className="text-[#7cb82f]" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm mb-1">{title}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
