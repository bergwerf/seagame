// Basic Layers
// ============

import '../util/gifler'
import * as m from '../util/math'
import * as canvas from '../util/canvas'
import { Layer } from '../story'

export class Switch implements Layer {
  private active = false

  constructor(private layer: Layer) { }

  load() {
    return this.layer.load()
  }

  draw(ctx: CanvasRenderingContext2D) {
    return this.active ? this.layer.draw(ctx) : null
  }

  pointer_down(v: m.vec2) {
    return this.active ? this.layer.pointer_down(v) : null
  }

  pointer_move(v: m.vec2) {
    return this.active ? this.layer.pointer_move(v) : null
  }

  pointer_up(v: m.vec2) {
    return this.active ? this.layer.pointer_up(v) : null
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

  pointer_down(v: m.vec2) {
    return this.run((layer) => layer.pointer_down(v))
  }

  pointer_move(v: m.vec2) {
    return this.run((layer) => layer.pointer_move(v))
  }

  pointer_up(v: m.vec2) {
    return this.run((layer) => layer.pointer_up(v))
  }
}

export class Image implements Layer {
  private image: HTMLImageElement

  constructor(public src: string) {
    this.image = document.createElement('img')
  }

  async load() {
    return new Promise<void>((res, _) => {
      this.image.addEventListener('load', () => res(), { once: true })
      this.image.src = this.src
    })
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, 0, 0)
    return null
  }

  pointer_down() { return null }
  pointer_move() { return null }
  pointer_up() { return null }
}

export class Video implements Layer {
  private video: HTMLVideoElement
  private cache: HTMLCanvasElement
  private cache_ctx: CanvasRenderingContext2D
  private finish_event: string

  constructor(public src: string, {
    on_finish = 'finish',
    muted = true,
    loop = false,
    autoplay = false } = {}) {
    this.finish_event = on_finish
    this.video = document.createElement("video")
    this.video.muted = muted
    this.video.loop = loop
    this.video.autoplay = autoplay
  }

  async load() {
    return new Promise<void>((resolve, _) => {
      this.video.addEventListener('canplaythrough', () => {
        const w = this.video.videoWidth
        const h = this.video.videoHeight
        this.cache = canvas.create(w, h)
        this.cache_ctx = this.cache.getContext('2d')!
        resolve()
      }, { once: true })
      this.video.src = this.src
    })
  }

  start() {
    this.video.pause()
    this.video.currentTime = 0
    this.video.load()
    this.video.play()
  }

  stop() {
    this.video.pause()
  }

  draw(ctx: CanvasRenderingContext2D) {
    // The frame cache mitigates blank frames between rewinds.
    if (this.cache) {
      this.cache_ctx.drawImage(this.video, 0, 0)
      ctx.drawImage(this.cache, 0, 0)
    } else {
      ctx.drawImage(this.video, 0, 0)
    }
    // Return event when a non-looped video ends.
    if (this.video.loop) {
      return null
    } else {
      const finish = this.video.currentTime == this.video.duration
      return finish ? this.finish_event : null
    }
  }

  pointer_down() { return null }
  pointer_move() { return null }
  pointer_up() { return null }
}

export class GIF implements Layer {
  anim: Animator
  canvas: HTMLCanvasElement

  constructor(public src: string) { }

  async load() {
    this.anim = await gifler(this.src).get()
    this.canvas = canvas.create()
    this.anim.animateInCanvas(this.canvas)
    this.anim.stop()
  }

  start() {
    this.anim.start()
  }

  stop() {
    this.anim.stop()
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.canvas, 0, 0)
    return null
  }

  pointer_down() { return null }
  pointer_move() { return null }
  pointer_up() { return null }
}

export class Click_Anywhere implements Layer {
  constructor(public click_event: string) { }

  pointer_up(v: m.vec2) {
    return this.click_event
  }

  async load() { }
  draw() { return null }
  pointer_down() { return null }
  pointer_move() { return null }
}

export class Click_Mask implements Layer {
  private mask: ImageData

  constructor(public src: string, public click_event: string) { }

  async load() {
    this.mask = await canvas.load_image_data(this.src)
  }

  pointer_up(v: m.vec2) {
    const c = canvas.lookup_pixel(this.mask, v.floor())
    return c[0] > 0 ? this.click_event : null
  }

  draw() { return null }
  pointer_down() { return null }
  pointer_move() { return null }
}
