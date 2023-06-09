// Game Logic
// ==========

import * as layer from './layer'

export const layer_bunny = new layer.VideoLayer('assets/bunny.mp4')
export const layer_loading = new layer.ImageLayer('assets/loading.jpg')
export const layer_start = new layer.ImageLayer('assets/start.jpg')
export const layer_intro = new layer.VideoLayer('assets/intro.mp4')
export const layer_navigation = new layer.ImageLayer('assets/navigation.jpg')

export const view = [
  layer_bunny
]
