"use client"

import { useEffect, useRef, useState } from "react"

/*
  InkCheckbox — stands in for one "o" in "Choose".
  Phase 1 (once): the box border draws itself like an inked pen stroke.
  Phase 2 (loop): a wobbly, hand-drawn checkmark sweeps in, pauses, then
                  erases and redraws — giving the "someone keeps checking
                  the box" effect.
*/
function InkCheckbox({ boxDelay, checkDelay }: { boxDelay: number; checkDelay: number }) {
  const [boxDrawn, setBoxDrawn] = useState(false)
  const [checkPhase, setCheckPhase] = useState<"hidden" | "drawing" | "shown" | "erasing">("hidden")
  const loopRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* The hand-drawn checkmark path — deliberately wobbly / slightly curved
     so it looks like a real pen mark rather than a geometric vector. */
  const CHECK_PATH = "M13 39 C16 41 22 47 27 54 C33 44 44 30 59 18"
  /* Approximate arc-length of the path above — measured visually; 95px works well */
  const CHECK_LEN = 95

  /* Timings */
  const DRAW_MS   = 420   // how long the stroke takes to draw
  const HOLD_MS   = 1100  // how long it sits fully checked before erasing
  const ERASE_MS  = 260   // how long the erase takes
  const PAUSE_MS  = 320   // gap between erase finishing and next draw

  const startLoop = () => {
    setCheckPhase("drawing")

    loopRef.current = setTimeout(() => {
      setCheckPhase("shown")

      loopRef.current = setTimeout(() => {
        setCheckPhase("erasing")

        loopRef.current = setTimeout(() => {
          setCheckPhase("hidden")

          loopRef.current = setTimeout(() => {
            startLoop()
          }, PAUSE_MS)
        }, ERASE_MS)
      }, HOLD_MS)
    }, DRAW_MS)
  }

  useEffect(() => {
    // Step 1: draw the box border
    const t1 = setTimeout(() => setBoxDrawn(true), boxDelay)
    // Step 2: kick off the looping checkmark
    const t2 = setTimeout(() => startLoop(), checkDelay)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      if (loopRef.current) clearTimeout(loopRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* Derive CSS values from phase */
  const checkOffset = (() => {
    switch (checkPhase) {
      case "hidden":   return CHECK_LEN         // fully hidden
      case "drawing":  return 0                 // animate to fully visible
      case "shown":    return 0                 // stay fully visible
      case "erasing":  return -CHECK_LEN        // animate to fully erased (reverse)
    }
  })()

  const checkTransition = (() => {
    switch (checkPhase) {
      case "drawing":  return `stroke-dashoffset ${DRAW_MS}ms cubic-bezier(0.1,0,0.3,1)`
      case "erasing":  return `stroke-dashoffset ${ERASE_MS}ms cubic-bezier(0.7,0,1,1)`
      default:         return "none"
    }
  })()

  const BOX_PERIM = 288

  return (
    <span
      className="inline-flex items-center justify-center align-middle"
      style={{ width: "0.82em", height: "0.82em", marginBottom: "0.06em" }}
    >
      <svg
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        {/* Hand-drawn box — slightly imperfect rounded rect */}
        <rect
          x="4" y="4" width="64" height="64"
          rx="7" ry="7"
          stroke="white"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: BOX_PERIM,
            strokeDashoffset: boxDrawn ? 0 : BOX_PERIM,
            transition: `stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)`,
          }}
        />

        {/* Hand-drawn / wobbly checkmark */}
        <path
          d={CHECK_PATH}
          stroke="#FB9109"
          strokeWidth="8.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{
            strokeDasharray: `${CHECK_LEN} ${CHECK_LEN}`,
            strokeDashoffset: checkOffset,
            transition: checkTransition,
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
      className="text-white font-extrabold leading-tight text-[48px]"
      style={{
        fontFamily: '"Outfit", sans-serif',
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      Ch
      <InkCheckbox boxDelay={650}  checkDelay={1050} />
      <InkCheckbox boxDelay={900}  checkDelay={1350} />
      se Your Options.{" "}
      <br />
      Transform Your Yard.
    </h1>
  )
}
