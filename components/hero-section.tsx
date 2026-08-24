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
      {/* Overlay for text legibility */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center px-5 w-full max-w-md mx-auto flex flex-col items-center gap-[46px] pt-[158px]">
        <h1
          className="text-white font-extrabold leading-tight text-[48px]"
          style={{ fontFamily: '"Outfit", sans-serif' }}
        >
          Your New Backyard. Design. Install. Done.
        </h1>

        <a href="#estimate" onClick={scrollToEstimate} className="flex flex-col items-center gap-1 text-white/90 text-xl font-medium hover:text-white transition-colors">
          SCROLL
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </a>

        {/* Your Life Arizona logo — full width, natural aspect ratio, no extra space */}
        <div className="w-full" style={{ mixBlendMode: "screen", lineHeight: 0, fontSize: 0 }}>
          <Image
            src="/your-life-arizona.png"
            alt="Your Life Arizona"
            width={800}
            height={360}
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

        {/* Trust badges — inline below logo */}
        <div className="flex flex-row items-center justify-center gap-5 flex-wrap pb-[43px]" style={{ lineHeight: "1em" }}>
          {[
            { icon: <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>, label: "Licensed" },
            { icon: <svg viewBox="0 0 24 24" className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>, label: "Bonded & Insured" },
            { icon: null, label: "ROC #355730" },
          ].map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-white">
              {b.icon}
              <span
                className="font-bold tracking-wide uppercase"
                style={{
                  fontSize: b.label === "ROC #355730" ? "24px" : "18px",
                  fontFamily: '"Oswald", sans-serif',
                }}
              >
                {b.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
