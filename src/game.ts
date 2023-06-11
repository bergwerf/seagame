// Game Logic
// ==========

import * as m from './util/math'
import * as layer from './layer/all'
import { Story, Layer, Trigger, Event_Map } from './story'

function garden_item_layer(name: string) {
  return new layer.Composite([
    new layer.Image(`assets/garden/items/${name}.png`),
    new layer.Click_Mask(`assets/garden/items/${name}_mask.png`, 'drag', Trigger.Down),
  ])
}

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
  character_selection: new layer.Switch([
    new layer.Image('assets/character/orange_selected.png'),
    new layer.Image('assets/character/yellow_selected.png'),
    new layer.Image('assets/character/green_selected.png')
  ]),
  character_mask: new layer.Composite([
    new layer.Click_Mask('assets/character/orange_mask.png', 'orange'),
    new layer.Click_Mask('assets/character/yellow_mask.png', 'yellow'),
    new layer.Click_Mask('assets/character/green_mask.png', 'green')
  ]),
  character_start_mask: new layer.Click_Mask('assets/character/start_mask.png', 'start'),

  // Side-scroll landscape
  landscape_bg1: new layer.Video('assets/landscape/bg_sad_sad.mp4', { loop: true }),
  landscape_bg2: new layer.Video('assets/landscape/bg_happy_sad.mp4', { loop: true }),
  landscape_bg3: new layer.Video('assets/landscape/bg_sad_happy.mp4', { loop: true }),
  landscape_lmask: new layer.Click_Mask('assets/landscape/farmer_left_mask.png', 'farmer_left'),
  landscape_rmask: new layer.Click_Mask('assets/landscape/farmer_right_mask.png', 'farmer_right'),
  landscape_bg: new layer.Switch([]),
  landscape_nav: new layer.Composite([
    new layer.Image('assets/landscape/button_left.png'),
    new layer.Image('assets/landscape/button_right.png'),
    new layer.Click_Mask('assets/landscape/button_left_mask.png', 'left'),
    new layer.Click_Mask('assets/landscape/button_right_mask.png', 'right')
  ]),

  // Garden minigame
  garden_intro: new layer.Video('assets/garden/intro.mp4', { muted: false, loop: true }),
  garden_start: new layer.Click_Mask('assets/garden/start_mask.png', 'start'),
  garden_background: new layer.Image('assets/garden/background.png'),
  garden_trashcan: new layer.GIF('assets/garden/trashcan.gif'),
  garden_trashcan_mask: new layer.Click_Mask('assets/garden/trashcan_mask.png', 'drop', Trigger.Up),
  garden_item1: garden_item_layer('bag'),
  garden_item2: garden_item_layer('can'),
  garden_item3: garden_item_layer('carton'),
  garden_item4: garden_item_layer('cup'),
  garden_item5: garden_item_layer('fish'),
  garden_item6: garden_item_layer('lamp'),
  garden_item7: garden_item_layer('paper'),
  garden_item8: garden_item_layer('spoon'),
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
    layers.character_selection,
    layers.character_characters,
    layers.character_mask,
    layers.character_start_mask
  ]),

  landscape: new layer.Sidescroll(
    new layer.Composite([
      layers.landscape_bg,
      layers.landscape_lmask,
      layers.landscape_rmask
    ]),
    layers.landscape_nav,
    5760, 1920, -1950),

  garden_intro: new layer.Composite([
    layers.garden_intro,
    layers.garden_start
  ]),
  garden_game: new layer.Composite([
    layers.garden_background,
    layers.garden_trashcan,
    new layer.DragToTarget(layers.garden_trashcan_mask, layers.garden_item1, 'trash'),
    new layer.DragToTarget(layers.garden_trashcan_mask, layers.garden_item2, 'trash'),
    new layer.DragToTarget(layers.garden_trashcan_mask, layers.garden_item3, 'trash'),
    new layer.DragToTarget(layers.garden_trashcan_mask, layers.garden_item4, 'trash'),
    new layer.DragToTarget(layers.garden_trashcan_mask, layers.garden_item5, 'trash'),
    new layer.DragToTarget(layers.garden_trashcan_mask, layers.garden_item6, 'trash'),
    new layer.DragToTarget(layers.garden_trashcan_mask, layers.garden_item7, 'trash'),
    new layer.DragToTarget(layers.garden_trashcan_mask, layers.garden_item8, 'trash')
  ])
}

const audio = {
  sea: new Audio('assets/sound/sea.mp3'),
  trashcan: new Audio('assets/sound/trashcan.mp3')
}

const state = {
  cleanup: 0
}

function play_garden_trashcan_once() {
  layers.garden_trashcan.start()
  window.setTimeout(() => {
    layers.garden_trashcan.stop()
  }, 1220)
}

function set_character(color: string) {
  const colors = ['orange', 'yellow', 'green']
  layers.character_selection.index = colors.indexOf(color)
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
      audio.sea.loop = true
      audio.sea.play()
      layers.intro_crab.start()
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
      layers.intro_load.stop()
      layers.character_background.start()
      layers.character_characters.start()
      set_character('yellow')
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
    },
    start: () => {
      layers.character_background.stop()
      layers.character_characters.stop()
      layers.landscape_bg.layers = [
        layers.landscape_bg1,
        layers.landscape_bg2,
        layers.landscape_bg3
      ]
      layers.landscape_bg1.start()
      layers.landscape_bg.index = 0
      return 'landscape'
    }
  },
  landscape: {
    farmer_left: () => {
    },
    farmer_right: () => {
      layers.garden_intro.start()
      return 'garden_intro'
    }
  },
  garden_intro: {
    start: () => {
      layers.garden_intro.stop()
      play_garden_trashcan_once()
      return 'garden_game'
    }
  },
  garden_game: {
    trash: () => {
      play_garden_trashcan_once()
      audio.trashcan.play()
      state.cleanup++
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
  story.trigger('loaded')
}
