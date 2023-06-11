// Multimedia Layers
// =================

import '../util/gifler'
import * as m from '../util/math'
import * as canvas from '../util/canvas'
import { Layer, Trigger } from '../story'

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

  handle() { return null }
}

export class Video implements Layer {
  private video: HTMLVideoElement
  private cache: HTMLCanvasElement
  private cache_ctx: CanvasRenderingContext2D
  private finish_event: string

  constructor(public src: string, {
    on_finish = 'finish',
    muted = true,
    loop = false } = {}) {
    this.finish_event = on_finish
    this.video = document.createElement("video")
    this.video.muted = muted
    this.video.loop = loop
    this.video.playsInline = true
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
      this.video.load()
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
    // Return event when video has ended.
    return this.video.ended ? this.finish_event : null
  }

  handle() { return null }
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
    this.anim.reset()
    this.anim.start()
  }

  stop() {
    this.anim.stop()
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.canvas, 0, 0)
    return null
  }

  handle() { return null }
}