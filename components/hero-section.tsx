"use client"

import Image from "next/image"
import { scrollToEstimate } from "@/lib/scroll-to-estimate"

export default function HeroSection() {
  return (
    <section className="relative flex justify-center pb-16" style={{ minHeight: "100dvh" }}>
      {/* Blurred backdrop fills the screen edge-to-edge without cropping the main photo */}
      <Image
        src="/images/hero-backyard-new.png"
        alt=""
        fill
        aria-hidden="true"
        className="object-cover object-center scale-125 blur-2xl opacity-90"
        priority
      />

      {/* Full, un-cropped photo, sized to its true aspect ratio so nothing is zoomed in.
          Its own top/bottom edges fade into the blurred backdrop below. */}
      <div
        className="absolute left-0 right-0 top-1/2 w-full -translate-y-1/2"
        style={{
          aspectRatio: "1535 / 1024",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
        }}
      >
        <Image
          src="/images/hero-backyard-new.png"
          alt="Beautiful Arizona backyard at sunset with artificial turf, travertine pavers and pergola"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Sunset-tinted sky darkening for text contrast */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(30,15,10,0.72) 0%, rgba(75,38,20,0.55) 22%, rgba(105,52,25,0.28) 42%, rgba(0,0,0,0) 60%)",
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
