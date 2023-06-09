// Main Program
// ============

import * as m from './math'
import { Seagame } from './game'

// Auto-playing video with sound is allowed after user interaction:
// https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide

const size = m.vec2(1920, 1080)
const game = new Seagame()

// Setup canvas
// ------------

const canvas = document.getElementById("canvas") as HTMLCanvasElement
canvas.width = size.x
canvas.height = size.y
const ctx = canvas.getContext("2d")!

// Setup event handling
// --------------------

function coordinate(e: PointerEvent) {
  const b = m.dom_bounding_box(canvas)
  const v = m.client_position(e)
  return v.minus(b.position).times(b.size.inv())
}

canvas.addEventListener('pointerdown', (e) => {
  game.pointer_down(coordinate(e))
})

canvas.addEventListener('pointermove', (e) => {
  game.pointer_move(coordinate(e))
})

canvas.addEventListener('pointerup', (e) => {
  game.pointer_up(coordinate(e))
})

// Setup continuous render cycle
// -----------------------------

function draw() {
  game.draw(ctx, size)
  requestAnimationFrame(draw)
}

draw()

// Start loading the game.
game.load().then(() => game.update('loaded'))
