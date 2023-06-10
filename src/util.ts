// Utilities
// =========

import * as m from './math'

type rgba = [number, number, number, number]

// OffscreenCanvas is not yet supported by default on Firefox ESR.
export function create_canvas(width: number, height: number) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  return canvas
}

export function load_image_data(src: string): Promise<ImageData> {
  return new Promise((resolve, _) => {
    const image = new Image()
    image.addEventListener('load', () => {
      const canvas = create_canvas(image.width, image.height)
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(image, 0, 0)
      const data = ctx.getImageData(0, 0, image.width, image.height)
      resolve(data)
    }, { once: true })
    image.src = this.src
  })
}

export function lookup_pixel(image: ImageData, pixel: m.vec2): rgba {
  const i = 4 * (pixel.y * image.width + pixel.x)
  const d = image.data
  return [d[i], d[i + 1], d[i + 2], d[i + 3]]
}
