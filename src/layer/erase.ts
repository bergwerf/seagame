// Image Erase Layer
// =================

import * as m from '../util/math'
import * as canvas from '../util/canvas'
import { Layer, Trigger } from '../story'

export class Erase_Canvas implements Layer {
  image: HTMLImageElement = new Image()
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  drawing = false

  constructor(public src: string, public radius: number) { }

  async load() {
    return new Promise<void>((resolve, _) => {
      this.image.addEventListener('load', () => {
        this.canvas = canvas.create(this.image.width, this.image.height)
        this.ctx = this.canvas.getContext('2d')!
        this.ctx.globalCompositeOperation = 'lighter'
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
        this.drawing = true
        break
      case Trigger.Move:
        this.ctx.beginPath()
        this.ctx.arc(v.x, v.y, this.radius, 0, 2 * Math.PI)
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0)'
        this.ctx.fill()
        break
      case Trigger.Cancel:
      case Trigger.Up:
        this.drawing = false
        const data = this.ctx.getImageData(0, 0, this.image.width, this.image.height).data
        let nonzero = 0
        for (let i = 0; i < data.length; i++) {
          if (data[i] > 0) {
            nonzero++
          }
        }
        console.log(nonzero)
        break
    }
    return null
  }
}
