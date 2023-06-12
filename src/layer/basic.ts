// Basic Layers
// ============

import * as m from '../util/math'
import * as canvas from '../util/canvas'
import { Layer, Trigger } from '../story'

export class Switch<T extends Layer[]> implements Layer {
  public index = -1

  constructor(public layers: T) { }

  async load() {
    await Promise.all(this.layers.map((l) => l.load()))
  }

  draw(ctx: CanvasRenderingContext2D) {
    return this.index >= 0 ? this.layers[this.index].draw(ctx) : null
  }

  handle(v: m.vec2, t: Trigger) {
    return this.index >= 0 ? this.layers[this.index].handle(v, t) : null
  }
}

export class Composite<T extends Layer[]> implements Layer {
  constructor(private layers: T) { }

  async load() {
    await Promise.all(this.layers.map((l) => l.load()))
  }

  private run(f: (l: Layer) => string | null) {

  }

  draw(ctx: CanvasRenderingContext2D) {
    let event: string | null = null
    for (let layer of this.layers) {
      const e = layer.draw(ctx)
      event = event || e
    }
    return event
  }

  handle(v: m.vec2, t: Trigger) {
    // Ad-hoc rule: return after the first non-null event.
    for (let layer of this.layers) {
      const e = layer.handle(v, t)
      if (e != null) {
        return e
      }
    }
    return null
  }
}

export class Click_Anywhere implements Layer {
  constructor(
    public event_name: string,
    public event_trigger: Trigger = Trigger.Up) { }

  handle(v: m.vec2, t: Trigger) {
    return t == this.event_trigger ? this.event_name : null
  }

  async load() { }
  draw() { return null }
}

export class Click_Mask implements Layer {
  private mask: ImageData

  constructor(
    public src: string,
    public event_name: string,
    public event_trigger: Trigger = Trigger.Up) { }

  async load() {
    this.mask = await canvas.load_image_data(this.src)
  }

  handle(v: m.vec2, t: Trigger) {
    if (t == this.event_trigger) {
      const c = canvas.lookup_pixel(this.mask, v.floor())
      return c[0] > 0 ? this.event_name : null
    }
    return null
  }

  draw() { return null }
}
