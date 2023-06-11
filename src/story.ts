// Interactive Story Based on Layers
// =================================

import * as m from './util/math'

export type View_Map<View_Id extends string | number> =
  { [id in View_Id]: Layer }

export type Event_Map<View_Id extends string | number> =
  { [view in View_Id]: { [event: string]: () => View_Id | void } }

export enum Trigger { Down, Move, Cancel, Up }

export interface Layer {
  load(): Promise<void>
  draw(ctx: CanvasRenderingContext2D): string | null
  handle(v: m.vec2, t: Trigger): string | null
}

export class Story<View_Id extends string | number> {
  constructor(
    public views: View_Map<View_Id>,
    public events: Event_Map<View_Id>,
    public current_view: View_Id) { }

  trigger(event: string) {
    let callback = this.events[this.current_view][event]
    if (callback != undefined) {
      this.current_view = callback() || this.current_view
    }
  }

  private run(f: (l: Layer) => string | null) {
    let event = f(this.views[this.current_view])
    if (event != null) {
      this.trigger(event)
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.run((layer) => layer.draw(ctx))
  }

  handle(v: m.vec2, t: Trigger) {
    this.run((layer) => layer.handle(v, t))
  }
}
