// Basic Layers
// ============

import * as m from '../math'
import * as util from '../util'
import { Layer } from '../story'

export class Image_Layer implements Layer {
  private image: HTMLImageElement

  constructor(public src: string) {
    this.image = new Image()
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

export class Video_Layer implements Layer {
  private video: HTMLVideoElement

  constructor(public src: string, public finish_event = 'finish',
    muted = true, loop = false) {
    this.video = document.createElement("video")
    this.video.muted = muted
    this.video.loop = loop
  }

  async load() {
    return new Promise<void>((res, _) => {
      this.video.addEventListener('canplaythrough', () => res(), { once: true })
      this.video.src = this.src
    })
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.video, 0, 0)
    const finish = this.video.currentTime == this.video.duration
    return finish ? this.finish_event : null
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

export class Click_Layer implements Layer {
  private mask: ImageData

  constructor(public src: string, public click_event = 'click') { }

  async load() {
    this.mask = await util.loadImageData(this.src)
  }

  pointer_up(v: m.vec2) {
    const c = util.lookupPixel(this.mask, v.floor())
    return c[0] > 0 ? this.click_event : null
  }

  draw() { return null }
  pointer_down() { return null }
  pointer_move() { return null }
}

export class Switched_Layer implements Layer {
  private show = false

  constructor(private layer: Layer) { }

  load() {
    return this.layer.load()
  }

  draw(ctx: CanvasRenderingContext2D, size: m.vec2) {
    return this.show ? this.layer.draw(ctx, size) : null
  }

  pointer_down(v: m.vec2) {
    return this.show ? this.layer.pointer_down(v) : null
  }

  pointer_move(v: m.vec2) {
    return this.show ? this.layer.pointer_move(v) : null
  }

  pointer_up(v: m.vec2) {
    return this.show ? this.layer.pointer_up(v) : null
  }
}
