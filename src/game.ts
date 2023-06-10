// Game Logic
// ==========

import * as m from './math'
import { Image_Layer, Video_Layer } from './layer/basic'
import { View_Map, Event_Map, Story } from './story'

const layer = {
  bunny: new Video_Layer('assets/bunny.mp4'),
  startscherm: new Image_Layer('assets/Startscherm.jpg')
}

type Views = 'loading' | 'intro'

const views: View_Map<Views> = {
  loading: [
    layer.bunny
  ],
  intro: [
    layer.startscherm
  ]
}

const events: Event_Map<keyof typeof views> = {
  loading: {
    loaded: () => layer.bunny.play(),
    finish: () => 'intro'
  },
  intro: {}
}

export const story = new Story(views, events, 'loading')

export async function start() {
  const promises: Promise<void>[] = []
  for (let s in layer) {
    promises.push(layer[s].load())
  }
  await Promise.all(promises)
  story.handle('loaded')
}
