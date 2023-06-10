// Basic Layers
// ============

import * as m from '../math'
import * as util from '../util'
import { Layer } from '../story'

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
        if (this.video.loop) {
          this.cache = util.create_canvas(
            this.video.videoWidth,
            this.video.videoHeight)
          this.cache_ctx = this.cache.getContext('2d')!
        }
        resolve()
      }, { once: true })
      this.video.src = this.src
    })
  }

  draw(ctx: CanvasRenderingContext2D) {
    // This fixes blank frames between loop rewinds.
    if (this.video.loop && this.cache_ctx) {
      this.cache_ctx.drawImage(this.video, 0, 0)
      ctx.drawImage(this.cache, 0, 0)
      return null
    } else {
      ctx.drawImage(this.video, 0, 0)
      const finish = this.video.currentTime == this.video.duration
      return finish ? this.finish_event : null
    }
  }

  play() {
    this.video.pause()
    this.video.currentTime = 0
    this.video.play()
  }

  pointer_down() { return null }
  pointer_move() { return null }
  pointer_up() { return null }
}

export class Click_Anywhere implements Layer {
  private click_event: string

  constructor({ on_click = 'click' } = {}) {
    this.click_event = on_click
  }

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
  private click_event: string

  constructor(public src: string, { on_click = 'click' } = {}) {
    this.click_event = on_click
  }

  async load() {
    this.mask = await util.load_image_data(this.src)
  }

  pointer_up(v: m.vec2) {
    const c = util.lookup_pixel(this.mask, v.floor())
    return c[0] > 0 ? this.click_event : null
  }

  draw() { return null }
  pointer_down() { return null }
  pointer_move() { return null }
}

export class Switch implements Layer {
  private active = false

  constructor(private layer: Layer) { }

  load() {
    return this.layer.load()
  }

  draw(ctx: CanvasRenderingContext2D, size: m.vec2) {
    return this.active ? this.layer.draw(ctx, size) : null
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
