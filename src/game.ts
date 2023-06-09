// Game Logic
// ==========

import * as m from './math'
import * as layer from './layer'

enum View {
  Loading,
  Intro,
  Character,
  Walk
}

export class Seagame implements layer.Layer {
  layer_bunny = new layer.VideoLayer('assets/bunny.mp4')
  layer_loading = new layer.ImageLayer('assets/loading.jpg')
  layer_start = new layer.ImageLayer('assets/start.jpg')
  layer_intro = new layer.VideoLayer('assets/intro.mp4')
  layer_navigation = new layer.ImageLayer('assets/navigation.jpg')

  view = View.Loading
  layers = [
    this.layer_bunny
  ]

  async load() {
    await Promise.all([
      this.layer_bunny.load()
    ])
  }

  reset() { }

  update(event: string) {
    switch (this.view) {
      case View.Loading:
        switch (event) {
          case 'loaded':
            this.layer_bunny.video.play()
            break
        }
        break
    }
  }

  draw(ctx: CanvasRenderingContext2D, size: m.vec2) {
    for (let layer of this.layers) {
      layer.draw(ctx, size)
    }
    return null
  }

  pointer_down(v: m.vec2) {
    return null
  }

  pointer_move(v: m.vec2) {
    return null
  }

  pointer_up(v: m.vec2) {
    return null
  }
}
