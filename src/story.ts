// Interactive Story Based on Layers
// =================================

import * as m from './util/math'

export type View_Map<View_Id extends string | number> =
  { [id in View_Id]: Layer }

export type Event_Map<View_Id extends string | number> =
  { [view in View_Id]: { [event: string]: () => View_Id | void } }

export interface Layer {
  load(): Promise<void>
  draw(ctx: CanvasRenderingContext2D): string | null
  pointer_down(v: m.vec2): string | null
  pointer_move(v: m.vec2): string | null
  pointer_up(v: m.vec2): string | null
}

export class Story<View_Id extends string | number> {
  constructor(
    public views: View_Map<View_Id>,
    public events: Event_Map<View_Id>,
    public current_view: View_Id) { }

  handle(event: string) {
    let callback = this.events[this.current_view][event]
    if (callback != undefined) {
      this.current_view = callback() || this.current_view
    }
  }

  private run(f: (l: Layer) => string | null) {
    let event = f(this.views[this.current_view])
    if (event != null) {
      this.handle(event)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.run((layer) => layer.draw(ctx))
  }

  pointer_down(v: m.vec2) {
    this.run((layer) => layer.pointer_down(v))
  }

  pointer_move(v: m.vec2) {
    this.run((layer) => layer.pointer_move(v))
  }

  pointer_up(v: m.vec2) {
    this.run((layer) => layer.pointer_up(v))
  }
}
