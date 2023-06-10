// Game Logic
// ==========

import * as m from './math'
import * as layer from './layer/basic'
import { Story, Layer, View_Map, Event_Map } from './story'

const layers = {
  hourglass: new layer.Video('assets/start/hourglass.mp4',
    { loop: true, autoplay: true }),
  startscreen: new layer.Image('assets/start/startscreen.jpg'),
  crab: new layer.Video('assets/start/crab.mp4')
}

type Views = 'loading' | 'start' | 'intro1'

const views: View_Map<Views> = {
  loading: [
    layers.hourglass
  ],
  start: [
    layers.startscreen,
    new layer.Click_Anywhere({ on_click: 'continue' })
  ],
  intro1: [
    layers.crab
  ]
}

const events: Event_Map<keyof typeof views> = {
  loading: {
    loaded: () => 'start'
  },
  start: {
    continue: () => {
      layers.crab.play()
      return 'intro1'
    }
  },
  intro1: {

  }
}

export const story = new Story(views, events, 'loading')

export async function start() {
  // First load the load animation.
  await layers.hourglass.load()

  // Then load all other assets.
  await Promise.all(Object.values(layers).map((l: Layer) => l.load()))
  story.handle('loaded')
}
