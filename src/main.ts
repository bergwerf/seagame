// Main Program
// ============

import * as m from './math'
import * as game from './game'

// Auto-playing video with sound is allowed after user interaction:
// https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide

export const size = m.vec2(1920, 1080)

// Initialize canvas.
const canvas = document.getElementById("canvas") as HTMLCanvasElement
canvas.width = size.x
canvas.height = size.y
const ctx = canvas.getContext("2d")!

canvas.addEventListener('pointermove', (e) => {
  const bbox = m.dom_bounding_box(canvas)
  const v_client = m.client_position(e)
  const v = v_client.minus(bbox.position).times(bbox.size.inv()).times(size)
})

game.layer_bunny.load().then(() => {
  game.layer_bunny.video.play()
})

// Render continuously.
function draw() {
  for (let layer of game.view) {
    layer.draw(ctx, size)
  }
  requestAnimationFrame(draw)
}
draw()
