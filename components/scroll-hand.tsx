"use client"

export default function ScrollHand({ size = 90 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size * 1.4 }} className="relative flex flex-col items-center">
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .scroll-hand-anim {
            animation: swipeDown 1.8s cubic-bezier(0.45,0,0.55,1) infinite;
          }
          .scroll-hand-anim:hover { animation-play-state: paused; }
          .chevron-1 { animation: chevronPulse 1.8s ease-in-out infinite 0s; }
          .chevron-2 { animation: chevronPulse 1.8s ease-in-out infinite 0.22s; }
          .chevron-3 { animation: chevronPulse 1.8s ease-in-out infinite 0.44s; }
        }
        @keyframes swipeDown {
          0%   { transform: translateY(-6px) scale(1);    }
          10%  { transform: translateY(-6px) scale(1);    }
          55%  { transform: translateY(22px) scale(0.97); }
          70%  { transform: translateY(22px) scale(0.97); }
          88%  { transform: translateY(-6px) scale(1);    }
          100% { transform: translateY(-6px) scale(1);    }
        }
        @keyframes chevronPulse {
          0%   { opacity: 0;   transform: translateY(-4px); }
          30%  { opacity: 0.55; transform: translateY(0px);  }
          60%  { opacity: 0;   transform: translateY(6px);  }
          100% { opacity: 0;   transform: translateY(6px);  }
        }
      `}</style>

      {/* Hand SVG */}
      <svg
        className="scroll-hand-anim"
        width={size}
        height={size * 1.1}
        viewBox="0 0 100 110"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Skin base gradient — warm Apple emoji tone */}
          <radialGradient id="skinBase" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFCC99" />
            <stop offset="60%" stopColor="#FFAB6E" />
            <stop offset="100%" stopColor="#E8894A" />
          </radialGradient>
          {/* Finger highlight */}
          <radialGradient id="fingerHL" cx="40%" cy="20%" r="55%">
            <stop offset="0%" stopColor="#FFE0C0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFAB6E" stopOpacity="0" />
          </radialGradient>
          {/* Palm highlight */}
          <radialGradient id="palmHL" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#FFE5CC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E8894A" stopOpacity="0" />
          </radialGradient>
          {/* Shadow overlay */}
          <radialGradient id="shadowGrad" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#A0522D" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#A0522D" stopOpacity="0" />
          </radialGradient>
          {/* Nail gradient */}
          <linearGradient id="nailGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFE8D8" />
            <stop offset="100%" stopColor="#D4956A" />
          </linearGradient>
        </defs>

        {/* ── PALM ── */}
        <path
          d="M22 60 C22 55 24 52 28 51 L72 51 C76 51 78 54 78 58 L78 82 C78 94 70 102 58 102 L42 102 C30 102 22 94 22 82 Z"
          fill="url(#skinBase)"
        />
        <path
          d="M22 60 C22 55 24 52 28 51 L72 51 C76 51 78 54 78 58 L78 82 C78 94 70 102 58 102 L42 102 C30 102 22 94 22 82 Z"
          fill="url(#palmHL)"
        />
        <path
          d="M22 60 C22 55 24 52 28 51 L72 51 C76 51 78 54 78 58 L78 82 C78 94 70 102 58 102 L42 102 C30 102 22 94 22 82 Z"
          fill="url(#shadowGrad)"
        />
        {/* Palm crease lines */}
        <path d="M30 72 Q50 68 70 72" stroke="#C8713A" strokeOpacity="0.3" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <path d="M28 82 Q50 78 72 82" stroke="#C8713A" strokeOpacity="0.2" strokeWidth="1" fill="none" strokeLinecap="round" />

        {/* ── THUMB — left side, natural rest position ── */}
        <path
          d="M22 62 C18 58 14 58 12 62 C10 66 12 74 16 76 L22 77 Z"
          fill="url(#skinBase)"
        />
        <path d="M14 65 Q16 62 20 63" stroke="#C8713A" strokeOpacity="0.3" strokeWidth="0.9" fill="none" strokeLinecap="round" />

        {/* ── PINKY — curled, rightmost, short ── */}
        <path d="M67 51 L67 39 C67 36 69 34 71.5 34 C74 34 76 36 76 39 L76 51 Z" fill="url(#skinBase)" />
        <ellipse cx="71.5" cy="34.5" rx="4.5" ry="4" fill="url(#skinBase)" />
        <path d="M68 45 Q71.5 44 75 45" stroke="#C8713A" strokeOpacity="0.25" strokeWidth="0.8" fill="none" strokeLinecap="round" />

        {/* ── RING FINGER — curled ── */}
        <path d="M55 51 L55 35 C55 31.8 57 30 59.5 30 C62 30 64 31.8 64 35 L64 51 Z" fill="url(#skinBase)" />
        <ellipse cx="59.5" cy="30.5" rx="4.5" ry="4" fill="url(#skinBase)" />
        <path d="M56 43 Q59.5 42 63 43" stroke="#C8713A" strokeOpacity="0.25" strokeWidth="0.8" fill="none" strokeLinecap="round" />

        {/* ── MIDDLE FINGER — curled, tallest of curled ── */}
        <path d="M43 51 L43 32 C43 28.5 45.2 26.5 48 26.5 C50.8 26.5 53 28.5 53 32 L53 51 Z" fill="url(#skinBase)" />
        <ellipse cx="48" cy="27" rx="5" ry="4.5" fill="url(#skinBase)" />
        <path d="M44 42 Q48 41 52 42" stroke="#C8713A" strokeOpacity="0.25" strokeWidth="0.9" fill="none" strokeLinecap="round" />

        {/* ── INDEX FINGER — extended, curved slightly downward like touching screen ── */}
        {/* Shaft — slightly tapered, curves toward screen */}
        <path
          d="M30 51 C30 51 29 36 30 24 C30.5 17 33 12 37 10 C41 8 44 10 44.5 17 C45 24 43 36 43 51 Z"
          fill="url(#skinBase)"
        />
        {/* Fingertip — rounded dome */}
        <ellipse cx="36.5" cy="11" rx="7" ry="6.5" fill="url(#skinBase)" />
        {/* Finger highlight */}
        <path
          d="M30 51 C30 51 29 36 30 24 C30.5 17 33 12 37 10 C41 8 44 10 44.5 17 C45 24 43 36 43 51 Z"
          fill="url(#fingerHL)"
        />
        <ellipse cx="36.5" cy="11" rx="7" ry="6.5" fill="url(#fingerHL)" />
        {/* Fingernail */}
        <path
          d="M31.5 8 C33 5.5 40 5.5 41.5 8 C42.5 10 42 15 41 16.5 C39 18.5 34 18.5 32 16.5 C31 15 30.5 10 31.5 8 Z"
          fill="url(#nailGrad)"
          opacity="0.75"
        />
        {/* Nail shine */}
        <path d="M33 9 C34.5 7.5 38.5 7.5 40 9" stroke="white" strokeOpacity="0.6" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* Knuckle crease 1 */}
        <path d="M30.5 34 Q36.5 32.5 42.5 34" stroke="#C8713A" strokeOpacity="0.3" strokeWidth="1" fill="none" strokeLinecap="round" />
        {/* Knuckle crease 2 */}
        <path d="M30 44 Q36.5 42.5 43 44" stroke="#C8713A" strokeOpacity="0.22" strokeWidth="0.9" fill="none" strokeLinecap="round" />

        {/* Overall gloss highlight on top of everything */}
        <ellipse cx="38" cy="30" rx="14" ry="22" fill="white" fillOpacity="0.07" />
      </svg>

      {/* Motion chevrons below the hand */}
      <div className="flex flex-col items-center gap-[3px] mt-1">
        {[0, 1, 2].map((i) => (
          <svg
            key={i}
            className={`chevron-${i + 1}`}
            width="18"
            height="9"
            viewBox="0 0 18 9"
            fill="none"
          >
            <path
              d="M2 2 L9 7 L16 2"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.85"
            />
          </svg>
        ))}
      </div>
    </div>
  )
}
