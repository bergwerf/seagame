// Main Program
// ============

import * as m from './util/math'
import { Event } from './story'
import { story, start } from './game'

// Auto-playing video with sound is allowed after user interaction:
// https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide

const size = m.vec2(1920, 1080)

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
  return v.minus(b.position).times(b.size.inv()).times(size)
}

canvas.addEventListener('pointerdown', (e) => {
  story.handle(coordinate(e), Event.Down)
})

canvas.addEventListener('pointermove', (e) => {
  story.handle(coordinate(e), Event.Move)
})

canvas.addEventListener('pointerup', (e) => {
  story.handle(coordinate(e), Event.Up)
})

// Setup continuous render cycle
// -----------------------------

function draw() {
  // Don't clear to prevent flashes between views.
  //ctx.clearRect(0, 0, size.x, size.y)
  story.draw(ctx)
  requestAnimationFrame(draw)
}

draw()
start()
