// Game Logic
// ==========

import * as m from './util/math'
import * as layer from './layer/basic'
import { Story, Layer, Event_Map } from './story'

const layers = {
  // Navigation
  nav_rewind: new layer.Composite([
    new layer.Image('assets/nav/rewind.png'),
    new layer.Click_Mask('assets/nav/rewind_mask.png', 'rewind')
  ]),
  nav_next: new layer.Composite([
    new layer.Image('assets/nav/next.png'),
    new layer.Click_Mask('assets/nav/next_mask.png', 'next')
  ]),

  // Introduction
  intro_hourglass: new layer.Video('assets/intro/hourglass.mp4', { loop: true }),
  intro_dunes: new layer.Image('assets/intro/dunes.jpg'),
  intro_crab: new layer.Video('assets/intro/crab.mp4'),
  intro_sea: new layer.Video('assets/intro/sea.mp4'),
  intro_hand: new layer.Video('assets/intro/hand.mp4'),
  intro_shell: new layer.Composite([
    new layer.Image('assets/intro/shell.jpg'),
    new layer.Click_Mask('assets/intro/shell_mask.png', 'pickup')
  ]),
  intro_shell_pickup: new layer.Video('assets/intro/shell_pickup.mp4'),
  intro_welcome: new layer.Video('assets/intro/welcome.mp4', { loop: true }),
  intro_load: new layer.Video('assets/intro/jellyload.mp4'),

  // Character selection
  character_background: new layer.Video('assets/character/background.mp4', { loop: true }),
  character_characters: new layer.GIF('assets/character/characters.gif'),
  character_orange: new layer.Switch(new layer.Image('assets/character/orange_selected.png')),
  character_orange_mask: new layer.Click_Mask('assets/character/orange_mask.png', 'orange'),
  character_yellow: new layer.Switch(new layer.Image('assets/character/yellow_selected.png')),
  character_yellow_mask: new layer.Click_Mask('assets/character/yellow_mask.png', 'yellow'),
  character_green: new layer.Switch(new layer.Image('assets/character/green_selected.png')),
  character_green_mask: new layer.Click_Mask('assets/character/green_mask.png', 'green'),
}

const views = {
  loading: layers.intro_hourglass,
  intro_dunes: new layer.Composite([
    layers.intro_dunes,
    new layer.Click_Anywhere('continue')
  ]),
  intro_crab: layers.intro_crab,
  intro_crab_nav: new layer.Composite([
    layers.intro_crab,
    layers.nav_rewind,
    layers.nav_next
  ]),
  intro_sea: layers.intro_sea,
  intro_sea_nav: new layer.Composite([
    layers.intro_sea,
    layers.nav_rewind,
    layers.nav_next
  ]),
  intro_hand: layers.intro_hand,
  intro_hand_nav: new layer.Composite([
    layers.intro_hand,
    layers.nav_rewind,
    layers.nav_next
  ]),
  intro_shell: layers.intro_shell,
  intro_shell_pickup: layers.intro_shell_pickup,
  intro_welcome: new layer.Composite([
    layers.intro_welcome,
    layers.nav_next
  ]),
  intro_load: layers.intro_load,
  intro_character: new layer.Composite([
    layers.character_background,
    layers.character_orange,
    layers.character_orange_mask,
    layers.character_yellow,
    layers.character_yellow_mask,
    layers.character_green,
    layers.character_green_mask,
    layers.character_characters
  ])
}

const audio = {
  sea: new Audio('assets/sound/sea.mp3')
}

function set_character(color: string) {
  layers.character_orange.active = color == 'orange'
  layers.character_yellow.active = color == 'yellow'
  layers.character_green.active = color == 'green'
}

const events: Event_Map<keyof typeof views> = {
  loading: {
    loaded: () => {
      layers.intro_hourglass.stop()
      return 'intro_dunes'
    }
  },
  intro_dunes: {
    continue: () => {
      layers.intro_crab.start()
      audio.sea.loop = true
      audio.sea.play()
      return 'intro_crab'
    }
  },
  intro_crab: {
    finish: () => 'intro_crab_nav'
  },
  intro_crab_nav: {
    rewind: () => {
      layers.intro_crab.start()
      return 'intro_crab'
    },
    next: () => {
      layers.intro_sea.start()
      return 'intro_sea'
    }
  },
  intro_sea: {
    finish: () => 'intro_sea_nav'
  },
  intro_sea_nav: {
    rewind: () => {
      layers.intro_sea.start()
      return 'intro_sea'
    },
    next: () => {
      layers.intro_hand.start()
      return 'intro_hand'
    }
  },
  intro_hand: {
    finish: () => 'intro_hand_nav'
  },
  intro_hand_nav: {
    rewind: () => {
      layers.intro_hand.start()
      return 'intro_hand'
    },
    next: () => 'intro_shell'
  },
  intro_shell: {
    pickup: () => {
      layers.intro_shell_pickup.start()
      return 'intro_shell_pickup'
    }
  },
  intro_shell_pickup: {
    finish: () => {
      layers.intro_welcome.start()
      return 'intro_welcome'
    }
  },
  intro_welcome: {
    next: () => {
      layers.intro_welcome.stop()
      layers.intro_load.start()
      return 'intro_load'
    }
  },
  intro_load: {
    finish: () => {
      layers.intro_hourglass.stop()
      layers.character_background.start()
      layers.character_characters.start()
      return 'intro_character'
    }
  },
  intro_character: {
    orange: () => {
      set_character('orange')
    },
    yellow: () => {
      set_character('yellow')
    },
    green: () => {
      set_character('green')
    }
  }
}

export const story = new Story<keyof typeof views>(
  views, events, 'loading')

export async function start() {
  // First load the load animation.
  await layers.intro_hourglass.load()
  layers.intro_hourglass.start()

  // Then load all other assets.
  const promises: Promise<void>[] = []
  for (let l in layers) {
    if (l != 'intro_hourglass') {
      promises.push(layers[l].load())
    }
  }
  await Promise.all(promises)
  story.handle('loaded')
}
