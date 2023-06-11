// Image Scrolling Layer
// =====================

import * as m from '../util/math'
import * as canvas from '../util/canvas'
import { Event, Layer } from '../story'

export class Sidescroll implements Layer {
  mask_l: ImageData
  mask_r: ImageData

  step = 200
  x = 0

  constructor(
    public bg: Layer,
    public nav: Layer,
    public bg_width: number,
    public view_width: number) { }

  async load() {
    await this.bg.load()
    await this.nav.load()
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save()
    ctx.translate(this.x, 0)
    this.bg.draw(ctx)
    ctx.restore()
    this.nav.draw(ctx)
    return null
  }

  handle(v: m.vec2, e: Event) {
    const nav_result = this.nav.handle(v, e)
    if (nav_result != null) {
      const dx = nav_result == 'left' ? 1 : nav_result == 'right' ? -1 : 0
      this.x += this.step * dx
      this.x = Math.min(0, Math.max(-this.bg_width + this.view_width, this.x))
      return null
    } else {
      return this.bg.handle(v.plus(m.vec2(-this.x, 0)), e)
    }
  }
}
