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

      {/* Sunset-tinted sky darkening for text contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(30,15,10,0.72) 0%, rgba(75,38,20,0.55) 22%, rgba(105,52,25,0.28) 42%, rgba(0,0,0,0) 60%)",
        }}
      />

      {/* Warm sunset-orange glow added into the sky, centered near the middle of the image */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 30% at 50% 22%, rgba(251,145,9,0.55) 0%, rgba(240,120,30,0.35) 45%, rgba(220,100,30,0.15) 70%, rgba(0,0,0,0) 90%)",
        }}
      />

      <div className="relative z-10 text-center px-5 w-full max-w-md mx-auto flex flex-col items-center gap-[210px] pt-[114px]">
        <h1
          className="text-white leading-tight"
          style={{ fontFamily: '"Outfit", sans-serif' }}
        >
          <span className="block font-extrabold text-[48px]" style={{ color: "#ffffff" }}>
            Your{" "}
            <span
              style={{
                fontSize: "86px",
                color: "#fbfbfb",
                WebkitTextStroke: "6px #FB9109",
                paintOrder: "stroke fill",
              }}
            >
              New
            </span>{" "}
            Backyard.
          </span>
          <span className="block font-normal text-[28px] mt-1" style={{ color: "#ffffff" }}>
            Design. Install. Done.
          </span>
        </h1>

        <a
          href="#estimate"
          onClick={scrollToEstimate}
          className="flex flex-col items-center gap-1 text-xl font-medium hover:text-white transition-colors"
          style={{ color: "#ffffff" }}
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
