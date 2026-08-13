/**
 * Smoothly scrolls to the #estimate section, offsetting for the fixed navbar.
 * Works across all modern browsers including iOS Safari.
 */
export function scrollToEstimate(e?: React.MouseEvent | React.TouchEvent) {
  if (e) e.preventDefault()
  const el = document.getElementById("estimate")
  if (!el) return
  const navbar = document.querySelector("header")
  const offset = navbar ? navbar.getBoundingClientRect().height : 96
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: "smooth" })
}
