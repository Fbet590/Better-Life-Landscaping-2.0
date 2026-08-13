import { PenTool, Home, Droplets, Square, Sun, RefreshCw } from "lucide-react"
import EstimateCTA from "./estimate-cta"

const SERVICES = [
  {
    icon: PenTool,
    title: "3D Landscape Design",
    desc: "Visualize your dream yard before we break ground with our custom 3D designs.",
  },
  {
    icon: Home,
    title: "Outdoor Kitchens & Pergolas",
    desc: "Create the perfect entertainment space with custom-built outdoor living areas.",
  },
  {
    icon: Droplets,
    title: "Artificial Turf Installation",
    desc: "Enjoy a lush, green lawn year-round without the water bill or maintenance.",
  },
  {
    icon: Square,
    title: "Travertine & Pavers",
    desc: "Elegant hardscaping with premium travertine, pavers, and natural stone.",
  },
  {
    icon: Sun,
    title: "Complete Yard Renovations",
    desc: "Full backyard transformations from concept to completion.",
  },
  {
    icon: RefreshCw,
    title: "Irrigation & Drainage",
    desc: "Smart watering systems and proper drainage to keep your yard healthy.",
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32" style={{ backgroundColor: "#faf7f2" }}>
      <div className="px-4 max-w-2xl mx-auto">
        <p className="text-xs font-bold tracking-widest text-[#7cb82f] uppercase mb-3">OUR SERVICES</p>
        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-3">
          Everything You Need for Your Dream Outdoor Space
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-10">
          From initial design to final installation, we handle every aspect of your landscape transformation.
        </p>

        {/* Service cards */}
        <div className="flex flex-col gap-4">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-[#f5f0e8] rounded-2xl p-6"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: "#e8f5d0" }}
              >
                <Icon size={24} className="text-[#7cb82f]" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <EstimateCTA
            label="Start Your Project Today"
            className="inline-block bg-[#7cb82f] hover:bg-[#6aa527] text-white font-bold px-8 py-4 rounded text-sm transition-colors"
          />
        </div>
      </div>
    </section>
  )
}
