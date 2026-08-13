"use client"

import { useEffect, useRef, useState } from "react"

/* Delay after the "O" enters view before the checkmark starts its first draw. */
const CHECK_DELAY_MS = 250
/* Full loop duration: draw -> hold -> erase -> pause -> repeat, forever. */
const LOOP_DURATION_S = 3.2

/*
  AnimatedO — stands in for the capital "O" in "One". Renders as a circular
  checkbox that matches the surrounding letterform (same color, size, and
  baseline as the rest of the headline). Once it scrolls into view, a
  hand-drawn-looking checkmark repeatedly draws itself in, holds, erases,
  and redraws — an ongoing "still checking" loop rather than a one-shot
  reveal.
*/
function AnimatedO() {
  const [inView, setInView] = useState(false)
  const wrapperRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <span
      ref={wrapperRef}
      className="relative inline-flex items-center justify-center align-middle"
      style={{ width: "0.78em", height: "0.78em", marginBottom: "0.02em" }}
    >
      <style>{`
        @keyframes handcheck-loop {
          0%   { stroke-dashoffset: 1; opacity: 0; }
          6%   { opacity: 1; }
          32%  { stroke-dashoffset: 0; }
          60%  { stroke-dashoffset: 0; }
          82%  { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 1; opacity: 1; }
        }
      `}</style>
      <svg
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          {/* Subtle wobble so the check reads as pen-drawn rather than a vector icon */}
          <filter id="handcheck-wobble" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9 1.3" numOctaves="2" seed="7" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* The letter "O" itself, drawn as a circular ring in the same color as the surrounding text */}
        <circle cx="36" cy="36" r="30" stroke="currentColor" strokeWidth="9" fill="none" />

        {/* Hand-drawn checkmark: two uneven curved strokes with a slight tilt, looping draw/erase */}
        <path
          d="M16 37.5
             C 19.5 40, 24 44.5, 27.5 47.5
             C 29.5 49, 31 48.5, 32.5 46.5
             C 40 37, 47.5 27, 55.5 17.5"
          stroke="#FB9109"
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#handcheck-wobble)"
          transform="rotate(-4 36 36)"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: 1,
            opacity: 0,
            animation: inView ? `handcheck-loop ${LOOP_DURATION_S}s cubic-bezier(0.65,0,0.35,1) infinite` : "none",
            animationDelay: `${CHECK_DELAY_MS}ms`,
          }}
        />
      </svg>
    </span>
  )
}

export default function AnimatedHeadline() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150)
    return () => clearTimeout(t)
  }, [])

  return (
    <h1
      aria-label="One Package. Fully Installed."
      className="text-white font-extrabold leading-tight text-[48px]"
      style={{
        fontFamily: '"Outfit", sans-serif',
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <span aria-hidden="true">
        <AnimatedO />
        ne Package. Fully Installed.
      </span>
    </h1>
  )
}
