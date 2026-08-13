import Image from "next/image"

const PHOTOS = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/581340514_18089028650494359_7206347635675663245_n-MG3eYZHM6Q4A69zFbZeFaEv9RIQNs6.jpg",
    alt: "Modern pergola with louvered privacy wall, wicker seating, and travertine steppers in artificial turf",
    tall: true,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/581725911_18089028632494359_1821105402713154570_n-CSdijgsUKcI2iEP0IdFW30VRKt0zKv.jpg",
    alt: "House patio cover with travertine stepping stones set in lush artificial turf lawn",
    tall: false,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/583974895_18089028605494359_961148997636219226_n%28043%29-D8ewTZaGpEy7k8o1e2PIOpoaI7TqmH.jpg",
    alt: "Wide aerial view of backyard with pergola, artificial turf, gravel borders, and travertine steppers",
    tall: false,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/467732255_18048955919494359_3849966889398284574_n-gqEasxws1AxStEXxwQIHN8UHfxS7E9.jpg",
    alt: "Aerial drone view of backyard with herringbone pavers, artificial turf, gravel, and palm trees",
    tall: true,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/584075862_18089028623494359_6381060976168545644_n-IvYw4Ff9Pm9xKHtbRef27Orq15COB9.jpg",
    alt: "Overhead view of artificial turf corner with travertine border edging, trees, and gravel",
    tall: false,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/580847199_18089028614494359_3800897000015613730_n-FGiZUJjrDzvn3bLXUsUj0TE6Ki8r5f.jpg",
    alt: "Symmetrical backyard with pergola seating, gravel borders, and 3x3 grid of travertine steppers in turf",
    tall: false,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/582896408_18089028641494359_762984994241653408_n-GnBLWWDnjWH1oS6zXbfk9aP5B6W8Vr.jpg",
    alt: "Ground-level view of large travertine stepping stones set in lush artificial turf leading to pergola",
    tall: true,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/513492822_18073619216494359_3862028397811590176_n-vOoCOCtrPfKgTpG3cmmmV2K9fPfvXT.jpg",
    alt: "Bronze pergola with louvered privacy screen over brick paver patio with wicker chairs, gravel border and artificial turf",
    tall: false,
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/513758031_18073619195494359_3556877729393142884_n-l4AWsXS7xkbcSf2hSolBzcBs2OX2BS.jpg",
    alt: "Wide backyard view of bronze pergola and brick paver patio with large artificial turf lawn, desert shrubs, and block wall fence",
    tall: true,
  },
]

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 lg:py-32" style={{ backgroundColor: "#f2efe8" }}>
      <div className="px-4 max-w-2xl mx-auto">
        <p className="text-lg font-bold tracking-widest text-[#FB9109] uppercase mb-3">OUR PORTFOLIO</p>
        <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2">Our Work Speaks for Itself</h2>
        <p className="text-gray-500 text-lg leading-relaxed mb-8">
          Every project is a reflection of our commitment to quality and craftsmanship.
        </p>

        {/* 2-column masonry grid */}
        <div className="columns-2 gap-3">
          {PHOTOS.map((photo, i) => (
            <div
              key={i}
              className="mb-3 break-inside-avoid overflow-hidden rounded-xl group"
              style={{ aspectRatio: photo.tall ? "2/3" : "1/1" }}
            >
              <div className="relative w-full h-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href="#estimate"
            className="inline-block bg-[#FB9109] hover:bg-[#e67e00] text-white font-bold px-8 py-4 rounded text-lg transition-colors"
          >
            Get Your Backyard Transformation Options
          </a>
        </div>
      </div>
    </section>
  )
}
