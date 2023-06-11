// Maze Path Drawing Layer
// =======================

import * as m from '../util/math'
import { Layer, Trigger } from '../story'

export class Complete_Maze implements Layer {
  reverse = false
  drawing = false
  solved = false
  line: m.vec2[] = []

  constructor(
    public start: Layer,
    public end: Layer,
    public maze: Layer,
    public line_inner_width: number = 20,
    public line_outer_width: number = 24,
    public line_inner_color: string = 'black',
    public line_outer_color: string = 'red') { }

  async load() {
    await this.start.load()
    await this.maze.load()
    await this.end.load()
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.line.length > 0) {
      let v = this.line[0]
      ctx.beginPath()
      ctx.moveTo(v.x, v.y)
      for (let i = 1; i < this.line.length; i++) {
        v = this.line[i]
        ctx.lineTo(v.x, v.y)
      }
      ctx.lineCap = 'round'
      ctx.strokeStyle = this.line_outer_color
      ctx.lineWidth = this.line_outer_width
      ctx.stroke()
      ctx.strokeStyle = this.line_inner_color
      ctx.lineWidth = this.line_inner_width
      ctx.stroke()
    }
    return null
  }

  handle(v: m.vec2, t: Trigger) {
    switch (t) {
      case Trigger.Down:
        if (!this.solved && this.start.handle(v, Trigger.Down) == 'hit') {
          this.reverse = false
          this.drawing = true
          this.line.push(v)
        } else if (!this.solved && this.end.handle(v, Trigger.Down) == 'hit') {
          this.reverse = true
          this.drawing = true
          this.line.push(v)
        }
        break
      case Trigger.Move:
        if (this.drawing) {
          if (this.maze.handle(v, Trigger.Down) == 'hit') {
            this.line.push(v)
          } else {
            this.drawing = false
            this.line = []
            return 'error'
          }
        }
        break
      case Trigger.Up:
        if (this.drawing) {
          this.drawing = false
          if (this.reverse ?
            this.start.handle(v, Trigger.Down) == 'hit' :
            this.end.handle(v, Trigger.Down) == 'hit') {
            this.solved = true
            return 'solved'
          } else {
            this.line = []
            return 'error'
          }
        }
        break
    }
    return null
  }
}
