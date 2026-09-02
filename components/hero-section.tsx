"use client"

import Image from "next/image"
import { scrollToEstimate } from "@/lib/scroll-to-estimate"

export default function HeroSection() {
  return (
    <section className="relative flex justify-center pb-16" style={{ minHeight: "100dvh" }}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_l7xel8l7xel8l7xe.png-NkJOymxjp3FPkfaW6xLSLZGoMUXzPW.jpeg"
        alt="Beautiful Arizona backyard with artificial turf, travertine pavers and pergola"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="relative z-10 text-center px-5 w-full max-w-md mx-auto flex flex-col items-center gap-[189px] pt-[114px]">
        <h1
          className="text-white leading-tight"
          style={{ fontFamily: '"Outfit", sans-serif' }}
        >
          <span
            className="block font-extrabold text-[48px]"
            style={{ color: "#ffffff", textShadow: "0 2px 4px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.4)" }}
          >
            Your{" "}
            <span style={{ color: "#FB9109", fontSize: "86px", textShadow: "0 2px 4px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.4)" }}>
              New
            </span>{" "}
            Backyard.
          </span>
          <span
            className="block font-normal text-[28px] mt-1"
            style={{ color: "#ffffff", textShadow: "0 2px 4px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.4)" }}
          >
            Design. Install. Done.
          </span>
        </h1>

        <a
          href="#estimate"
          onClick={scrollToEstimate}
          className="flex flex-col items-center gap-1 text-xl font-medium hover:text-white transition-colors"
          style={{ color: "#ffffff", textShadow: "0 2px 4px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.4)" }}
        >
          Get Your Estimate!
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  )
}
