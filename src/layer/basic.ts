// Basic Layers
// ============

import * as m from '../util/math'
import * as canvas from '../util/canvas'
import { Event, Layer } from '../story'

export class Switch implements Layer {
  public index = -1

  constructor(public layers: Layer[]) { }

  async load() {
    await Promise.all(this.layers.map((l) => l.load()))
  }

  draw(ctx: CanvasRenderingContext2D) {
    return this.index >= 0 ? this.layers[this.index].draw(ctx) : null
  }

  handle(v: m.vec2, e: Event) {
    return this.index >= 0 ? this.layers[this.index].handle(v, e) : null
  }
}

export class Composite implements Layer {
  constructor(private layers: Layer[]) { }

  async load() {
    await Promise.all(this.layers.map((l) => l.load()))
  }

  private run(f: (l: Layer) => string | null) {
    let event: string | null = null
    for (let layer of this.layers) {
      const f_event = f(layer)
      event = event || f_event
    }
    return event
  }

  draw(ctx: CanvasRenderingContext2D) {
    return this.run((layer) => layer.draw(ctx))
  }

  handle(v: m.vec2, e: Event) {
    return this.run((layer) => layer.handle(v, e))
  }
}

export class Click_Anywhere implements Layer {
  constructor(
    public event_name: string,
    public event_trigger: Event = Event.Up) { }

  handle(v: m.vec2, e: Event) {
    return e == this.event_trigger ? this.event_name : null
  }

  async load() { }
  draw() { return null }
}

export class Click_Mask implements Layer {
  private mask: ImageData

  constructor(
    public src: string,
    public event_name: string,
    public event_trigger: Event = Event.Up) { }

  async load() {
    this.mask = await canvas.load_image_data(this.src)
  }

  handle(v: m.vec2, e: Event) {
    if (e == this.event_trigger) {
      const c = canvas.lookup_pixel(this.mask, v.floor())
      return c[0] > 0 ? this.event_name : null
    }
    return null
  }

  draw() { return null }
}
