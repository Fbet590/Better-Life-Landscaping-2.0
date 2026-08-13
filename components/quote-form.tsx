"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { scrollToEstimate } from "@/lib/scroll-to-estimate"

declare global { interface Window { fbq?: (...args: unknown[]) => void } }

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/rDrIW6TO5WawA7pvJ58H/webhook-trigger/e588b77f-a13e-4d94-a6ad-29d7833a94a4"

// ── Validation helpers ──────────────────────────────────────────────

const DISPOSABLE_DOMAINS = [
  "mailinator.com","guerrillamail.com","tempmail.com","throwaway.email",
  "yopmail.com","sharklasers.com","trashmail.com","fakeinbox.com",
  "maildrop.cc","dispostable.com","spamgourmet.com","temp-mail.org",
  "getairmail.com","mailnull.com","spamevader.com","10minutemail.com",
  "getnada.com","spamherelots.com","safetymail.info","example.com",
  "test.com","fake.com","dummy.com","nowhere.com","noemail.com",
]

const FAKE_PHONES = new Set([
  "0000000000","1111111111","2222222222","3333333333","4444444444",
  "5555555555","6666666666","7777777777","8888888888","9999999999",
  "1234567890","0987654321","1231231234","1112223333",
])

function validateName(name: string): string {
  const trimmed = name.trim()
  if (trimmed.length < 2) return "Please enter your name."
  if (/\d/.test(trimmed)) return "Name should not contain numbers."
  return ""
}

function validateEmail(email: string): string {
  const trimmed = email.trim().toLowerCase()
  const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
  if (!emailRegex.test(trimmed)) return "Please enter a valid email address."
  const domain = trimmed.split("@")[1]
  if (DISPOSABLE_DOMAINS.includes(domain)) return "Please use a real email address."
  const [local] = trimmed.split("@")
  if (/^(.)\1+$/.test(local)) return "Please enter a valid email address."
  if (local.length < 2) return "Please enter a valid email address."
  const tld = domain.split(".").pop() ?? ""
  if (tld.length < 2) return "Please enter a valid email address."
  return ""
}

function validatePhone(phone: string): string {
  const digits = phone.replace(/\D/g, "")
  if (digits.length < 10) return "Please enter a 10-digit US phone number."
  if (digits.length > 11) return "Phone number is too long."
  const tenDigit = digits.length === 11 && digits[0] === "1" ? digits.slice(1) : digits
  if (tenDigit.length !== 10) return "Please enter a valid 10-digit phone number."
  if (FAKE_PHONES.has(tenDigit)) return "Please enter a real phone number."
  if (/^(\d)\1{9}$/.test(tenDigit)) return "Please enter a real phone number."
  if (tenDigit[0] === "0" || tenDigit[0] === "1") return "Please enter a valid US area code."
  return ""
}

const BUDGETS = [
  { label: "Pergola" },
  { label: "Artificial Turf" },
  { label: "Plants" },
  { label: "Decorative Rock" },
  { label: "Drip Irrigation" },
  { label: "Travertine" },
  { label: "Fire Pit" },
]

// Steps: 1=Budget, 2=Name, 3=Email, 4=Phone
const TOTAL_STEPS = 4

type FormData = {
  budget: string[]
  name: string
  email: string
  phone: string
}

export default function QuoteForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [form, setForm] = useState<FormData>({
    budget: [],
    name: "",
    email: "",
    phone: "",
  })

  const toggleBudget = (label: string) => {
    setForm((p) => ({
      ...p,
      budget: p.budget.includes(label)
        ? p.budget.filter((b) => b !== label)
        : [...p.budget, label],
    }))
  }

  const canContinue = () => {
    if (step === 1) return form.budget.length > 0
    if (step === 2) return form.name.trim().length > 1 && !validateName(form.name)
    if (step === 3) return !validateEmail(form.email)
    if (step === 4) return !validatePhone(form.phone)
    return false
  }

  const handleContinue = async () => {
    // Run validators on text steps before advancing
    if (step === 2) {
      const err = validateName(form.name)
      if (err) { setErrors((e) => ({ ...e, name: err })); return }
    }
    if (step === 3) {
      const err = validateEmail(form.email)
      if (err) { setErrors((e) => ({ ...e, email: err })); return }
    }
    if (step === 4) {
      const err = validatePhone(form.phone)
      if (err) { setErrors((e) => ({ ...e, phone: err })); return }
    }

    if (step < TOTAL_STEPS) {
      setErrors({})
      setStep((s) => s + 1)
    } else {
      // Facebook Lead conversion event
      if (typeof window !== "undefined" && window.fbq) {
        window.fbq("track", "Lead")
      }
      // Fire webhook — don't block the success screen on it
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.name,
          email: form.email,
          phone: form.phone,
          budget: form.budget.join(", "),
        }),
      }).catch(() => {/* silent — lead already shown success */})
      setSubmitted(true)
    }
  }

  return (
    <section
      id="estimate"
      className="py-10 px-4"
      style={{ backgroundColor: "#f5f0e8", fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Headline above the card */}
      <div className="max-w-lg mx-auto mb-6 text-center">
        <h2
          className="text-[36px] font-black leading-tight text-gray-900 mb-2"
          style={{ fontFamily: '"Space Grotesk", sans-serif', fontWeight: 900 }}
        >
          Backyard Makeover Needed? Done. Final Price? $17,500.
        </h2>
        <p className="text-gray-500 text-lg font-medium">Not all homes qualify! Let&apos;s find out if yours does!</p>
      </div>

      {/* Card — warm dark brown, matches beige landing page palette */}
      <div className="max-w-lg mx-auto rounded-2xl overflow-hidden shadow-xl" style={{ backgroundColor: "#2c1a0e" }}>

        {/* Progress bar */}
        <div className="w-full h-1" style={{ backgroundColor: "rgba(255,220,170,0.15)" }}>
          <div
            className="h-full transition-all duration-500"
            style={{
              backgroundColor: "#FB9109",
              width: submitted ? "100%" : `${(step / TOTAL_STEPS) * 100}%`,
            }}
          />
        </div>

        <div className="px-5 pt-[14px] pb-4">

          {submitted ? (
            /* ── Success ── */
            <div className="flex flex-col items-start gap-6 pt-4">
              <div>
                <h2 className="font-extrabold text-3xl leading-tight mb-3" style={{ color: "#f5e6cc" }}>
                  {"✅  You're all set,"}
                  <br />
                  {form.name.split(" ")[0]}.
                </h2>
                <p className="text-xl leading-relaxed" style={{ color: "rgba(245,230,200,0.85)" }}>
                  {"We'll reach out in a couple of mins! Look out for a text! 📲"}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* ── Step label + question ── */}
              <div className="mb-8">
                <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: "rgba(245,220,170,0.4)" }}>
                  Step {step} of {TOTAL_STEPS}
                </p>
                {step === 1 && (
                  <>
                    <h2 className="font-extrabold text-3xl leading-tight" style={{ color: "#f9f9f9" }}>What options would you like for your project?</h2>
                    <p className="text-sm mt-2" style={{ color: "rgba(245,220,170,0.45)" }}>Select all that apply</p>
                  </>
                )}
                {step === 2 && (
                  <h2 className="font-extrabold text-3xl leading-tight" style={{ color: "#f5e6cc" }}>{"What's your"}<br />name?</h2>
                )}
                {step === 3 && (
                  <h2 className="font-extrabold text-3xl leading-tight" style={{ color: "#f5e6cc" }}>{"What's your"}<br />email?</h2>
                )}
                {step === 4 && (
                  <h2 className="font-extrabold text-3xl leading-tight" style={{ color: "#f5e6cc" }}>{"What's your"}<br />phone number?</h2>
                )}
              </div>

              {/* ── Step 1: Budget ── */}
              {step === 1 && (
                <div className="flex flex-col gap-3">
                  {BUDGETS.map((b) => {
                    const sel = form.budget.includes(b.label)
                    return (
                      <button
                        key={b.label}
                        type="button"
                        onClick={() => toggleBudget(b.label)}
                        aria-pressed={sel}
                        className="relative flex flex-row items-center justify-between gap-3 px-4 py-4 rounded-xl text-left transition-all"
                        style={{
                          border: `2px solid ${sel ? "#FB9109" : "rgba(245,220,170,0.15)"}`,
                          backgroundColor: sel ? "rgba(251,145,9,0.12)" : "rgba(255,235,200,0.06)",
                        }}
                      >
                        <div className="flex flex-col items-start min-w-0">
                          <span
                            className="text-xl font-bold leading-snug transition-colors"
                            style={{ color: "#fefefe" }}
                          >
                            {b.label}
                          </span>
                        </div>
                        <span
                          className="shrink-0 w-5 h-5 rounded-md flex items-center justify-center"
                          style={{
                            border: `2px solid ${sel ? "#FB9109" : "rgba(245,220,170,0.25)"}`,
                            backgroundColor: sel ? "#FB9109" : "transparent",
                          }}
                        >
                          {sel && <Check size={11} className="text-white" strokeWidth={3} />}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* ── Step 2: Name ── */}
              {step === 2 && (
                <div className="flex flex-col gap-2 mt-2">
                  <label htmlFor="name" className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: "rgba(245,220,170,0.45)" }}>
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoFocus
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, name: e.target.value }))
                      setErrors((err) => ({ ...err, name: "" }))
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.nativeEvent.isComposing) handleContinue()
                    }}
                    className="bg-transparent outline-none pb-3 text-xl font-semibold transition-colors"
                    style={{
                      borderBottom: `2px solid ${errors.name ? "#f87171" : "rgba(245,220,170,0.2)"}`,
                      borderRadius: 0,
                      color: "#f5e6cc",
                    }}
                  />
                  {errors.name && <p className="text-red-400 text-xs font-medium mt-1">{errors.name}</p>}
                </div>
              )}

              {/* ── Step 3: Email ── */}
              {step === 3 && (
                <div className="flex flex-col gap-2 mt-2">
                  <label htmlFor="email" className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: "rgba(245,220,170,0.45)" }}>
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="text"
                    autoFocus
                    autoComplete="email"
                    inputMode="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, email: e.target.value }))
                      setErrors((err) => ({ ...err, email: "" }))
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.nativeEvent.isComposing) handleContinue()
                    }}
                    className="bg-transparent outline-none pb-3 text-xl font-semibold transition-colors"
                    style={{
                      borderBottom: `2px solid ${errors.email ? "#f87171" : "rgba(245,220,170,0.2)"}`,
                      borderRadius: 0,
                      color: "#f5e6cc",
                    }}
                  />
                  {errors.email && <p className="text-red-400 text-xs font-medium mt-1">{errors.email}</p>}
                </div>
              )}

              {/* ── Step 4: Phone ── */}
              {step === 4 && (
                <div className="flex flex-col gap-2 mt-2">
                  <label htmlFor="phone" className="text-xs font-bold tracking-[0.15em] uppercase" style={{ color: "rgba(245,220,170,0.45)" }}>
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    autoFocus
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="(555) 000-0000"
                    value={form.phone}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, phone: e.target.value }))
                      setErrors((err) => ({ ...err, phone: "" }))
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.nativeEvent.isComposing) handleContinue()
                    }}
                    className="bg-transparent outline-none pb-3 text-xl font-semibold transition-colors"
                    style={{
                      borderBottom: `2px solid ${errors.phone ? "#f87171" : "rgba(245,220,170,0.2)"}`,
                      borderRadius: 0,
                      color: "#f5e6cc",
                    }}
                  />
                  {errors.phone && <p className="text-red-400 text-xs font-medium mt-1">{errors.phone}</p>}
                </div>
              )}

              {/* ── Navigation ── */}
              <div className="flex items-center justify-between mt-10">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-1.5 text-sm font-semibold transition-colors"
                    style={{ color: "rgba(245,220,170,0.4)" }}
                  >
                    <ChevronLeft size={16} />
                    Back
                  </button>
                ) : <div />}

                <button
                  type="button"
                  disabled={!canContinue()}
                  onClick={handleContinue}
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm transition-all"
                  style={{
                    backgroundColor: canContinue() ? "#FB9109" : "rgba(245,220,170,0.1)",
                    color: canContinue() ? "#fff" : "rgba(245,220,170,0.3)",
                    cursor: canContinue() ? "pointer" : "not-allowed",
                  }}
                >
                  {step < TOTAL_STEPS ? "Continue" : "Start My Project"}
                  <ChevronRight size={15} />
                </button>
              </div>

              {/* ── Dot indicators ── */}
              <div className="flex items-center justify-center gap-2 mt-10">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i + 1 === step ? "20px" : "6px",
                      height: "6px",
                      backgroundColor: i + 1 <= step ? "#FB9109" : "rgba(245,220,170,0.2)",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
