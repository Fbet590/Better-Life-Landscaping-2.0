"use client"

import { useEffect, useRef, useState } from "react"

/* Delay after the "O" enters view before the checkmark starts its first draw. */
const CHECK_DELAY_MS = 250
/* Full loop duration: draw -> hold -> erase -> pause -> repeat, forever. */
const LOOP_DURATION_S = 3.4

/*
  AnimatedO — stands in for the capital "O" in "One". Renders as a circular
  checkbox that matches the surrounding letterform (same color, size, and
  baseline as the rest of the headline). Once it scrolls into view, a
  thick-ink-pen checkmark repeatedly draws itself in, holds, erases, and
  redraws — an ongoing "still checking" loop rather than a one-shot reveal.

  To read as ink rather than a vector icon, the mark is built from:
  - an irregular, slightly wobbly path (not a mathematically clean curve)
  - two overlapping strokes of different weight/opacity, like a pen
    re-tracing the same line unevenly
  - a small ink blot where the pen touches down, and a thin tapering
    flick where it lifts off
  - a coarse+fine turbulence filter that roughens the stroke edges so
    they don't render as crisp vector lines
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
          34%  { stroke-dashoffset: 0; }
          58%  { stroke-dashoffset: 0; }
          80%  { stroke-dashoffset: 1; }
          100% { stroke-dashoffset: 1; opacity: 1; }
        }
        @keyframes handcheck-blot {
          0%   { opacity: 0; }
          4%   { opacity: 1; }
          58%  { opacity: 1; }
          78%  { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
      <svg
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          {/* Coarse tremor (unsteady hand) + fine grain (ink edge roughening), stacked */}
          <filter id="ink-rough-1" x="-40%" y="-40%" width="180%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.045 0.09" numOctaves="2" seed="11" result="tremor" />
            <feDisplacementMap in="SourceGraphic" in2="tremor" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="wobbled" />
            <feTurbulence type="fractalNoise" baseFrequency="0.7 1.4" numOctaves="3" seed="4" result="grain" />
            <feDisplacementMap in="wobbled" in2="grain" scale="1.4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="ink-rough-2" x="-40%" y="-40%" width="180%" height="180%">
            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.1" numOctaves="2" seed="27" result="tremor" />
            <feDisplacementMap in="SourceGraphic" in2="tremor" scale="2.6" xChannelSelector="R" yChannelSelector="G" result="wobbled" />
            <feTurbulence type="fractalNoise" baseFrequency="0.8 1.6" numOctaves="3" seed="19" result="grain" />
            <feDisplacementMap in="wobbled" in2="grain" scale="1.7" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        {/* The letter "O" itself, drawn as a circular ring in the same color as the surrounding text */}
        <circle cx="36" cy="36" r="30" stroke="currentColor" strokeWidth="9" fill="none" />

        {/* Ink blot where the pen touches down to start the checkmark */}
        <ellipse
          cx="16.5"
          cy="37"
          rx="2.6"
          ry="2.1"
          fill="#E8790A"
          transform="rotate(-4 36 36)"
          style={{
            animation: inView ? `handcheck-blot ${LOOP_DURATION_S}s cubic-bezier(0.65,0,0.35,1) infinite` : "none",
            animationDelay: `${CHECK_DELAY_MS}ms`,
            opacity: 0,
          }}
        />

        {/* Primary ink pass: uneven, slightly irregular checkmark (not a clean symmetric curve) */}
        <path
          d="M16 37.3
             C 18.8 39.6, 22 42.3, 24.8 45.1
             C 27.3 47.6, 29.6 49.4, 32 46.6
             C 36.4 40.9, 41.3 34.3, 46.2 28.1
             C 49.6 23.8, 52.7 20.3, 55.6 17.4"
          stroke="#FB9109"
          strokeWidth="7.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#ink-rough-1)"
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

        {/* Second ink pass: thinner, offset, lower opacity — mimics an uneven pen retrace */}
        <path
          d="M16.6 36.5
             C 19.4 39, 22.4 41.9, 25 44.6
             C 27.5 47.2, 29.3 48.6, 31.4 45.9
             C 35.9 40, 40.9 33.4, 45.8 27.3
             C 49.1 23.2, 52.1 19.9, 54.9 17"
          stroke="#FB9109"
          strokeWidth="4"
          strokeOpacity="0.55"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          filter="url(#ink-rough-2)"
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

        {/* Thin tapering flick where the pen lifts off at the end of the stroke */}
        <path
          d="M55.6 17.4 C 57.4 15.4, 58.7 13.9, 59.6 12.9"
          stroke="#FB9109"
          strokeWidth="2.4"
          strokeOpacity="0.4"
          strokeLinecap="round"
          fill="none"
          filter="url(#ink-rough-2)"
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
