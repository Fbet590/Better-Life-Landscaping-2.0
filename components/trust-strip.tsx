const BADGES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Licensed",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    label: "Bonded & Insured",
  },
  {
    icon: null,
    label: "ROC #355730",
  },
]

export default function TrustStrip() {
  return (
    <div className="bg-[#7cb82f] py-5 px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-3">
        {BADGES.map((badge, i) => (
          <div key={i} className="flex items-center gap-3 text-white">
            {badge.icon}
            <span className="font-bold text-lg tracking-wide uppercase leading-tight">
              {badge.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
