import Image from "next/image"
import EstimateCTA from "./estimate-cta"

const AREAS = [
  ["Buckeye, AZ", "Tempe, AZ"],
  ["Goodyear, AZ", "Mesa, AZ"],
  ["Old Town, AZ", "Gilbert, AZ"],
  ["Tolleson, AZ", "Scottsdale, AZ"],
  ["Peoria, AZ", "Chandler, AZ"],
]

export default function FooterSection() {
  return (
    <>
      {/* Service Areas */}
      <section id="areas" className="py-16 lg:py-24" style={{ backgroundColor: "#f5f0e8" }}>
        <div className="px-4 max-w-2xl mx-auto">
          <p className="text-lg font-bold tracking-widest text-[#FB9109] uppercase mb-3">SERVICE AREAS</p>
          <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-8">
            Proudly Serving the Whole Valley!
          </h2>

          {/* City grid */}
          <div className="flex flex-col gap-3 mb-8">
            {AREAS.map((row, i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                {row.map((city) => (
                  <div
                    key={city}
                    className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100"
                  >
                    <svg className="w-4 h-4 text-[#FB9109] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700 text-sm font-medium">{city}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="text-center mb-6">
            <span className="inline-block border-2 border-[#FB9109] text-[#FB9109] font-semibold px-5 py-2 rounded-full text-base">
              ...and surrounding areas!
            </span>
          </div>

          <EstimateCTA
            label="Get Free Estimate"
            className="block w-full text-center bg-[#FB9109] hover:bg-[#e67e00] text-white font-bold py-4 rounded text-xl transition-colors"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-4" style={{ backgroundColor: "#000000" }}>
        <div className="max-w-2xl mx-auto">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%20%281%29-TpbmzwSc7TC7OuxsGGsB0vXyIs1IHc.png"
            alt="Better Life Landscaping"
            width={140}
            height={52}
            className="h-12 w-auto mb-5 brightness-0 invert"
          />

          <div className="border-t border-white/10 pt-6">
            <p className="text-white/40 text-xs text-center">
              &copy; {new Date().getFullYear()} Better Life Landscaping LLC. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
