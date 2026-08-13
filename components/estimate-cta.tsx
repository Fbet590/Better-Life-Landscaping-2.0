"use client"

import { scrollToEstimate } from "@/lib/scroll-to-estimate"
import { cn } from "@/lib/utils"

interface EstimateCTAProps {
  label: string
  className?: string
}

export default function EstimateCTA({ label, className }: EstimateCTAProps) {
  return (
    <a
      href="#estimate"
      onClick={scrollToEstimate}
      className={cn(className)}
    >
      {label}
    </a>
  )
}
