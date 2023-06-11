// Image Erase Layer
// =================

import * as m from '../util/math'
import * as canvas from '../util/canvas'
import { Layer, Trigger } from '../story'

export class Erase_Image implements Layer {
  image: HTMLImageElement = new Image()
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  prev = m.v00
  erasing = false
  alpha_threshold = 64
  count_threshold = 100

  constructor(public src: string, public radius: number) { }

  async load() {
    return new Promise<void>((resolve, _) => {
      this.image.addEventListener('load', () => {
        this.canvas = canvas.create(this.image.width, this.image.height)
        this.ctx = this.canvas.getContext('2d')!
        this.ctx.drawImage(this.image, 0, 0)
        resolve()
      }, { once: true })
      this.image.src = this.src
    })
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.canvas, 0, 0)
    return null
  }

  handle(v: m.vec2, t: Trigger) {
    switch (t) {
      case Trigger.Down:
        this.erasing = true
        this.prev = v
        break
      case Trigger.Move:
        if (this.erasing) {
          this.ctx.beginPath()
          this.ctx.moveTo(this.prev.x, this.prev.y)
          this.ctx.lineTo(v.x, v.y)
          this.ctx.lineCap = 'round'
          this.ctx.lineWidth = this.radius * 2
          this.ctx.globalCompositeOperation = 'destination-out'
          this.ctx.stroke()
          this.prev = v
        }
        break
      case Trigger.Cancel:
      case Trigger.Up:
        if (this.erasing) {
          this.erasing = false
          const data = this.ctx.getImageData(0, 0, this.image.width, this.image.height).data
          let visible_pixels = 0
          for (let i = 3; i < data.length; i += 4) {
            if (data[i] > this.alpha_threshold) {
              visible_pixels++
            }
          }
          if (visible_pixels < this.count_threshold) {
            return 'erased'
          }
        }
        break
    }
    return null
  }
}
