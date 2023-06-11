// Drag and Drop Layer
// ===================

import * as m from '../util/math'
import { Layer, Trigger } from '../story'

export class Drag_to_Target implements Layer {
  offset = m.v00
  prev = m.v00
  dragging = false
  done = false

  constructor(
    public target: Layer,
    public item: Layer,
    public ready_event_name: string) { }

  async load() {
    await this.target.load()
    await this.item.load()
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.done) {
      ctx.save()
      ctx.translate(this.offset.x, this.offset.y)
      this.item.draw(ctx)
      ctx.restore()
    }
    return null
  }

  handle(v: m.vec2, t: Trigger) {
    if (this.done) {
      return null
    }
    switch (t) {
      case Trigger.Down:
        if (this.item.handle(v.minus(this.offset), t) == 'drag') {
          this.prev = v
          this.dragging = true
        }
        break
      case Trigger.Move:
        if (this.dragging) {
          const delta = this.prev.to(v)
          this.offset = this.offset.plus(delta)
          this.prev = v
        }
        break
      case Trigger.Cancel:
      case Trigger.Up:
        if (this.dragging) {
          this.dragging = false
          if (this.target.handle(v, t) == 'drop') {
            this.done = true
            return this.ready_event_name
          }
        }
    }
    return null
  }
}
