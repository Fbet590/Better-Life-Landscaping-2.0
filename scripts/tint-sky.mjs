import sharp from "sharp"

const inputPath = "public/images/hero-backyard-original.jpg"
const outputPath = "public/images/hero-backyard-sunset.jpg"

async function main() {
  const meta = await sharp(inputPath).metadata()
  const { width, height } = meta

  // Sky occupies roughly the top 40% of this photo (pergola roofline starts
  // around there). Build a raw RGBA buffer with a warm sunset-orange color
  // whose alpha fades in from 0 at the very top, peaks in the sky's middle,
  // and fades fully back to 0 well before the roofline so nothing below the
  // sky (pergola, lawn, pavers) is touched.
  const skyEnd = Math.round(height * 0.38) // fade out completes before roofline
  const peakStart = Math.round(height * 0.08)
  const peakEnd = Math.round(height * 0.22)

  const channels = 4
  const raw = Buffer.alloc(width * height * channels)

  const color = { r: 232, g: 126, b: 44 } // warm sunset orange
  const maxAlpha = 130 // out of 255, moderate strength

  for (let y = 0; y < height; y++) {
    let alpha = 0
    if (y < peakStart) {
      alpha = maxAlpha * (y / peakStart)
    } else if (y <= peakEnd) {
      alpha = maxAlpha
    } else if (y <= skyEnd) {
      alpha = maxAlpha * (1 - (y - peakEnd) / (skyEnd - peakEnd))
    } else {
      alpha = 0
    }
    const a = Math.max(0, Math.min(255, Math.round(alpha)))
    const rowStart = y * width * channels
    for (let x = 0; x < width; x++) {
      const idx = rowStart + x * channels
      raw[idx] = color.r
      raw[idx + 1] = color.g
      raw[idx + 2] = color.b
      raw[idx + 3] = a
    }
  }

  const overlayBuffer = await sharp(raw, {
    raw: { width, height, channels },
  })
    .png()
    .toBuffer()

  await sharp(inputPath)
    .composite([{ input: overlayBuffer, blend: "over" }])
    .jpeg({ quality: 90 })
    .toFile(outputPath)

  console.log("[v0] Wrote tinted image to", outputPath)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
