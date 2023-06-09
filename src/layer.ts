// Layer Interface
// ===============

import * as m from './math'

export interface Layer {
  load(): Promise<void>
  reset(): void
  draw(ctx: CanvasRenderingContext2D, size: m.vec2): string | null
  pointer_down(v: m.vec2): string | null
  pointer_move(v: m.vec2): string | null
  pointer_up(v: m.vec2): string | null
}

/*export class ClickLayer implements Layer {

}*/

export class ImageLayer implements Layer {
  image: HTMLImageElement

  constructor(public src: string) {
    const image = new Image()
  }

  async load() {
    return new Promise<void>((res, _) => {
      this.image.addEventListener('load', () => res(), { once: true })
      this.image.src = this.src
    })
  }

  draw(ctx: CanvasRenderingContext2D, size: m.vec2) {
    ctx.drawImage(this.image, 0, 0, size.x, size.y)
    return null
  }

  reset() { }
  pointer_down() { return null }
  pointer_move() { return null }
  pointer_up() { return null }
}

export class VideoLayer implements Layer {
  video: HTMLVideoElement

  constructor(public src: string, muted = true) {
    this.video = document.createElement("video")
    this.video.muted = muted
  }

  async load() {
    return new Promise<void>((res, _) => {
      this.video.addEventListener('canplaythrough', () => res(), { once: true })
      this.video.src = this.src
    })
  }

  draw(ctx: CanvasRenderingContext2D, size: m.vec2) {
    ctx.drawImage(this.video, 0, 0, size.x, size.y)
    return null
  }

  reset() { }
  pointer_down() { return null }
  pointer_move() { return null }
  pointer_up() { return null }
}
