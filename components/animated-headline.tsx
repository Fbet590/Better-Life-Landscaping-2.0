"use client"

import { useEffect, useRef, useState } from "react"

/* Delay after the "O" enters view before the checkmark starts drawing,
   so the headline reads for a beat first. */
const CHECK_DELAY = 250
/* Duration of the checkmark stroke-draw animation. */
const CHECK_DURATION = 500
/* Arc length of the checkmark path below (measured to match its geometry). */
const CHECK_LEN = 46

/*
  AnimatedO — stands in for the capital "O" in "One". Renders as a circular
  checkbox that matches the surrounding letterform (same color, size, and
  baseline as the rest of the headline), then draws a checkmark inside it
  once it scrolls into view (or on mount if already visible).
*/
function AnimatedO() {
  const [inView, setInView] = useState(false)
  const [checked, setChecked] = useState(false)
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

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setChecked(true), CHECK_DELAY)
    return () => clearTimeout(t)
  }, [inView])

  return (
    <span
      ref={wrapperRef}
      className="relative inline-flex items-center justify-center align-middle"
      style={{ width: "0.78em", height: "0.78em", marginBottom: "0.02em" }}
    >
      <svg
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        {/* The letter "O" itself, drawn as a circular ring in the same color as the surrounding text */}
        <circle cx="36" cy="36" r="30" stroke="currentColor" strokeWidth="9" fill="none" />

        {/* Checkmark that draws inside the O, in the brand accent color */}
        <path
          d="M21 37 L31 47 L52 24"
          stroke="#FB9109"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: CHECK_LEN,
            strokeDashoffset: checked ? 0 : CHECK_LEN,
            transition: `stroke-dashoffset ${CHECK_DURATION}ms cubic-bezier(0.16,1,0.3,1)`,
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
