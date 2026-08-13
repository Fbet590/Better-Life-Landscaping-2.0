"use client"

import Image from "next/image"
import AnimatedHeadline from "./animated-headline"
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

      <div className="relative z-10 text-center px-5 w-full max-w-md mx-auto flex flex-col items-center gap-[46px] pt-[152px]">
        {/* Stars badge */}
        <div className="flex items-center gap-2 bg-white/90 text-gray-800 text-sm font-semibold px-4 py-2 rounded-full shadow-md">
          <span className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </span>
          <span className="text-lg">5.0 on Google</span>
        </div>

        <AnimatedHeadline />

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
        <div className="flex flex-row items-center justify-center gap-5 flex-wrap pb-4" style={{ lineHeight: "1em" }}>
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
