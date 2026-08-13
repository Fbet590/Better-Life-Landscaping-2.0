"use client"

import { useState } from "react"
import { scrollToEstimate } from "@/lib/scroll-to-estimate"

const TESTIMONIALS = [
  {
    name: "Torrmall Thomas",
    text: "This is our 4th time working with Jamal. We just had a baby last October and we wanted an area he could roam outside. So we got back in touch with Jamal to work his magic and we couldn't be anymore thrilled. Our son is happy conquering his new playground.",
    rating: 5,
  },
  {
    name: "Sean Kelly",
    text: "After rescuing two dogs a year after the pandemic, our yard was a mess — full of foxholes worthy of an 18-year-old in basic training. We waited to start landscaping until our pool renovation was done, and the difference between the two companies was night and day. While we love how our pool turned out, the process was full of delays. Jamal and the Better Life team were the opposite — professional, communicative, and on-schedule. They emailed updates, showed up like clockwork between 8–9 AM, and turned our mess into a dream backyard. We only did half the yard this time, but we'll definitely call Better Life when it's time for Phase 2. Highly recommend!",
    rating: 5,
  },
  {
    name: "Dallis Smith",
    text: "Amazing! Highly recommend!",
    rating: 5,
  },
  {
    name: "Tawana Pierce",
    text: "I love my backyard! Jamal and his crew are very professional. Jamal explained everything about the project, answered all my questions and kept me updated throughout the process. I would 100% recommend Better Life Landscaping to my friends and family!",
    rating: 5,
  },
  {
    name: "Bruce Fleck",
    text: "Jamal and his crew did a great job on my new backyard. They cleared and leveled the old area. Then layed artificial turf lined with pavers. Then added decorative touches to add to the esthetic. He helped us design a nice space. Delivered it as expected on time. And kept me in the loop every step of the way. His rates are reasonable. Overall, it's great value and a great experience working with Jamal.",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [idx, setIdx] = useState(0)
  const t = TESTIMONIALS[idx]

  return (
    <section id="testimonials" className="py-16 lg:py-24" style={{ backgroundColor: "#FB9109" }}>
      <div className="px-4 max-w-2xl mx-auto">
        <p className="text-center text-lg font-bold tracking-widest text-white uppercase mb-3">TESTIMONIALS</p>
        <h2 className="text-3xl font-extrabold text-white text-center mb-8">What Our Clients Say</h2>

        {/* Review card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {/* Google header */}
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-sm font-semibold text-gray-700">Google Review</span>
          </div>

          {/* Stars */}
          <div className="flex gap-1 mb-3">
            {[...Array(t.rating)].map((_, i) => (
              <svg key={i} className="w-5 h-5 fill-yellow-400" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <p className="text-gray-700 text-base leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
          <p className="font-bold text-gray-900 text-lg">{t.name}</p>
        </div>

        {/* Carousel dots */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Review ${i + 1}`}
              className="rounded-full transition-all"
              style={{
                width: i === idx ? "28px" : "8px",
                height: "8px",
                backgroundColor: i === idx ? "white" : "rgba(255,255,255,0.4)",
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <a
            href="#estimate"
            onClick={scrollToEstimate}
            className="inline-block bg-white text-black font-bold px-8 py-4 rounded text-lg hover:bg-gray-50 transition-colors"
          >
            See Options For My Home!
          </a>
        </div>
      </div>
    </section>
  )
}
