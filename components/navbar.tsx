"use client"

import { useState } from "react"
import Image from "next/image"
import { scrollToEstimate } from "@/lib/scroll-to-estimate"

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black shadow-sm">
        <div className="flex items-center justify-between px-4 h-24 max-w-6xl mx-auto">
          <a href="#">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%20%281%29-TpbmzwSc7TC7OuxsGGsB0vXyIs1IHc.png"
              alt="Better Life Landscaping & Design Co."
              width={260}
              height={96}
              className="h-24"
              style={{ width: "auto" }}
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="text-sm font-semibold text-gray-700 hover:text-[#7cb82f] transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#estimate" onClick={scrollToEstimate} className="bg-[#7cb82f] hover:bg-[#6aa527] text-white text-sm font-semibold px-5 py-2 rounded transition-colors">
              Get a Quote
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col p-6">
          <div className="flex items-center justify-between mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%20%20%281%29-TpbmzwSc7TC7OuxsGGsB0vXyIs1IHc.png"
              alt="Better Life Landscaping"
              width={130}
              height={48}
              className="h-12"
              style={{ width: "auto" }}
            />
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-xl font-bold text-gray-900 hover:text-[#7cb82f] transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto">
            <a href="#estimate" onClick={(e) => { setOpen(false); scrollToEstimate(e) }} className="block w-full text-center bg-[#7cb82f] hover:bg-[#6aa527] text-white font-bold py-4 rounded text-lg transition-colors">
              Free In-Home Estimate
            </a>
          </div>
        </div>
      )}
    </>
  )
}
